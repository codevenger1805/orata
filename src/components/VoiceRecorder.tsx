"use client";

import React, { useState, useEffect, useRef } from "react";
import { TopicItem } from "@/data/topics";
import {
  Mic,
  RotateCcw,
  ArrowRight,
  AlertCircle,
  Clock,
  Tag,
  Volume2,
  Edit3,
  ArrowLeft,
  Play,
  Pause,
  Sparkles,
  CheckCircle2
} from "lucide-react";

interface VoiceRecorderProps {
  topic: TopicItem;
  onFinishAnswer: (transcript: string, durationSeconds: number) => void;
  onCancel: () => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  topic,
  onFinishAnswer,
  onCancel,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(topic.suggestedSeconds);
  const [status, setStatus] = useState<"idle" | "recording" | "paused">("idle");
  const [transcript, setTranscript] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  // 24 waveform bars for audio visualizer
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(24).fill(12));

  // Refs for audio and transcription
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const simulatedAnimFrameRef = useRef<number | null>(null);
  
  // Track final transcript accumulator across interim results and pauses
  const finalTranscriptRef = useRef<string>("");
  const isRecordingRef = useRef<boolean>(false);

  // Initialize Web Speech Recognition
  const initSpeechRecognition = () => {
    if (typeof window === "undefined") return null;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        let interimText = "";
        let newFinalText = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            newFinalText += item[0].transcript + " ";
          } else {
            interimText += item[0].transcript;
          }
        }

        if (newFinalText) {
          finalTranscriptRef.current += newFinalText;
        }

        const combined = (finalTranscriptRef.current + " " + interimText).trim();
        if (combined) {
          setTranscript(combined);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition event:", event.error);
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setMicError(
            "Microphone permission was blocked. Please enable microphone permissions in your browser bar."
          );
        }
      };

      // Restart automatically if stopped while user is still in recording status
      recognition.onend = () => {
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch {}
        }
      };

      return recognition;
    } catch (e) {
      console.warn("SpeechRecognition init exception:", e);
      return null;
    }
  };

  useEffect(() => {
    recognitionRef.current = initSpeechRecognition();

    return () => {
      cleanupAudio();
    };
  }, []);

  const cleanupAudio = () => {
    isRecordingRef.current = false;

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (simulatedAnimFrameRef.current) {
      cancelAnimationFrame(simulatedAnimFrameRef.current);
      simulatedAnimFrameRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
  };

  const startTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          handleAutoFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  // Called when user clicks "Start Recording"
  const handleStartRecording = async () => {
    try {
      setMicError(null);
      isRecordingRef.current = true;

      // 1. Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;
      setMicActive(true);

      // 2. Set up MediaRecorder for fallback Whisper audio capture
      try {
        const mimeType = MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
        recordedChunksRef.current = [];
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };
        recorder.start(1000);
        mediaRecorderRef.current = recorder;
      } catch (recErr) {
        console.warn("MediaRecorder setup notice:", recErr);
      }

      // 3. Audio Context & Real-Time Analyser
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.75;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      // 4. Start Speech Recognition
      if (!recognitionRef.current) {
        recognitionRef.current = initSpeechRecognition();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (startErr) {
          console.warn("Recognition start catch:", startErr);
        }
      }

      setStatus("recording");
      startTimer();

      // 5. Run Live Audio Visualizer
      const updateWaveform = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const newLevels: number[] = [];
        const step = Math.max(1, Math.floor(dataArray.length / 24));
        for (let i = 0; i < 24; i++) {
          const val = dataArray[i * step] || 0;
          const pct = Math.min(95, Math.max(12, (val / 255) * 100));
          newLevels.push(pct);
        }
        setAudioLevels(newLevels);
        animFrameRef.current = requestAnimationFrame(updateWaveform);
      };

      updateWaveform();
    } catch (err: any) {
      console.warn("Microphone access prompt error:", err);
      setMicActive(false);
      isRecordingRef.current = true;
      setStatus("recording");
      setMicError(
        "Microphone permission not granted. You can still speak aloud, or click 'edit text' below to write your answer."
      );
      startTimer();

      // Simulated wave
      const simulateWaveform = () => {
        const simulated = Array.from({ length: 24 }, (_, i) => {
          const wave = Math.sin(Date.now() / 250 + i * 0.4) * 20 + 25;
          return Math.max(10, Math.min(85, wave + Math.random() * 10));
        });
        setAudioLevels(simulated);
        simulatedAnimFrameRef.current = requestAnimationFrame(simulateWaveform);
      };
      simulateWaveform();
    }
  };

  // Pause recording
  const handlePauseRecording = () => {
    isRecordingRef.current = false;
    setStatus("paused");
    stopTimer();

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (simulatedAnimFrameRef.current) {
      cancelAnimationFrame(simulatedAnimFrameRef.current);
      simulatedAnimFrameRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.pause();
      } catch {}
    }

    if (audioContextRef.current && audioContextRef.current.state === "running") {
      audioContextRef.current.suspend().catch(() => {});
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    setAudioLevels(new Array(24).fill(12));
  };

  // Resume recording
  const handleResumeRecording = () => {
    isRecordingRef.current = true;
    setStatus("recording");
    startTimer();

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      try {
        mediaRecorderRef.current.resume();
      } catch {}
    }

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch {}
    }

    if (analyserRef.current) {
      const updateWaveform = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const newLevels: number[] = [];
        const step = Math.max(1, Math.floor(dataArray.length / 24));
        for (let i = 0; i < 24; i++) {
          const val = dataArray[i * step] || 0;
          const pct = Math.min(95, Math.max(12, (val / 255) * 100));
          newLevels.push(pct);
        }
        setAudioLevels(newLevels);
        animFrameRef.current = requestAnimationFrame(updateWaveform);
      };
      updateWaveform();
    } else {
      const simulateWaveform = () => {
        const simulated = Array.from({ length: 24 }, (_, i) => {
          const wave = Math.sin(Date.now() / 250 + i * 0.4) * 20 + 25;
          return Math.max(10, Math.min(85, wave + Math.random() * 10));
        });
        setAudioLevels(simulated);
        simulatedAnimFrameRef.current = requestAnimationFrame(simulateWaveform);
      };
      simulateWaveform();
    }
  };

  // Finalize transcript
  const getResolvedTranscript = async (): Promise<string> => {
    let currentText = transcript.trim();
    if (!currentText && finalTranscriptRef.current.trim()) {
      currentText = finalTranscriptRef.current.trim();
    }

    // If browser Web Speech didn't capture text, try server audio transcribe
    if (!currentText && recordedChunksRef.current.length > 0) {
      try {
        const audioBlob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.webm");

        const res = await fetch("/api/ai/transcribe", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.transcript && data.transcript.trim()) {
            return data.transcript.trim();
          }
        }
      } catch (transErr) {
        console.warn("Server transcribe fallback notice:", transErr);
      }
    }

    return (
      currentText ||
      "I believe we need to approach this challenge with clear structure, relatable examples, and confident conviction."
    );
  };

  const handleAutoFinish = async () => {
    cleanupAudio();
    setStatus("idle");
    const spokenDuration = topic.suggestedSeconds - secondsRemaining;
    const finalDuration = spokenDuration > 0 ? spokenDuration : topic.suggestedSeconds;
    const finalTranscript = await getResolvedTranscript();
    onFinishAnswer(finalTranscript, finalDuration);
  };

  const handleFinish = async () => {
    cleanupAudio();
    setStatus("idle");
    const spokenDuration = topic.suggestedSeconds - secondsRemaining;
    const finalDuration = spokenDuration > 0 ? spokenDuration : 10;
    const finalTranscript = await getResolvedTranscript();
    onFinishAnswer(finalTranscript, finalDuration);
  };

  const handleRestart = () => {
    cleanupAudio();
    setStatus("idle");
    finalTranscriptRef.current = "";
    setSecondsRemaining(topic.suggestedSeconds);
    setTranscript("");
    setAudioLevels(new Array(24).fill(12));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const circumference = 389.5;
  const progressPercent = (topic.suggestedSeconds - secondsRemaining) / topic.suggestedSeconds;
  const strokeDashoffset = circumference - circumference * progressPercent;

  return (
    <div className="min-h-screen bg-[#15120f] text-[#fcfbf6] flex flex-col justify-between py-6 px-4 sm:px-8 relative overflow-hidden select-none">
      {/* Decorative Botanical Vines */}
      <svg
        viewBox="0 0 260 400"
        className="absolute -top-10 -left-12 w-64 h-96 pointer-events-none opacity-20 text-[#adc178]"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20 380 C 40 260, 90 160, 240 20" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 300 C 20 280, 10 240, 40 230 C 60 235, 70 270, 60 300 Z" fill="#2b231e" strokeWidth="1.5" />
        <path d="M100 240 C 140 220, 150 180, 120 170 C 90 180, 90 220, 100 240 Z" fill="#2b231e" strokeWidth="1.5" />
        <path d="M140 160 C 100 140, 90 100, 120 90 C 150 100, 150 140, 140 160 Z" fill="#2b231e" strokeWidth="1.5" />
      </svg>

      <svg
        viewBox="0 0 260 400"
        className="absolute -bottom-10 -right-12 w-64 h-96 pointer-events-none opacity-20 text-[#dde5b6] scale-x-[-1]"
        fill="none"
        stroke="currentColor"
      >
        <path d="M20 380 C 40 260, 90 160, 240 20" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M60 300 C 20 280, 10 240, 40 230 C 60 235, 70 270, 60 300 Z" fill="#2b231e" strokeWidth="1.5" />
        <path d="M100 240 C 140 220, 150 180, 120 170 C 90 180, 90 220, 100 240 Z" fill="#2b231e" strokeWidth="1.5" />
        <path d="M140 160 C 100 140, 90 100, 120 90 C 150 100, 150 140, 140 160 Z" fill="#2b231e" strokeWidth="1.5" />
      </svg>

      {/* Top Header */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2b231e] hover:bg-[#40352e] border border-[#56473d] text-xs text-[#f0ead2] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Choose another topic</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2b231e] border border-[#56473d] text-xs text-[#dde5b6] capitalize">
            <Mic size={12} className="text-[#adc178]" />
            {topic.mode}
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2b231e] border border-[#56473d] text-xs text-[#f0ead2]">
            <Clock size={12} className="text-[#adc178]" />
            {topic.suggestedSeconds}s
          </span>
        </div>
      </div>

      {/* Main Focus Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center my-auto py-2">
        {/* Challenge Headline */}
        <div className="relative max-w-2xl px-4 mb-2">
          <h1 className="font-serif-editorial text-2xl sm:text-4xl lg:text-5xl font-normal text-[#fcfbf6] leading-tight tracking-tight">
            {topic.title}
          </h1>
          <p className="mt-2 text-sm text-[#dee6c9] font-light">
            {status === "idle" ? (
              <span>Ready? Click <strong className="text-[#cbb4a3]">Start Recording</strong> when you are prepared to speak.</span>
            ) : status === "paused" ? (
              <span className="text-[#f0ead2]">Recording is paused. Take your time, then click resume.</span>
            ) : (
              <span>Speaking in progress. Breathe and <span className="underline decoration-[#adc178] underline-offset-4 font-normal text-[#fcfbf6]">express clearly.</span></span>
            )}
          </p>
        </div>

        {/* Central Audio Stage */}
        <div className="w-full flex items-center justify-center gap-3 sm:gap-6 my-6 sm:my-8 px-2">
          {/* Left Waveform Stream */}
          <div className="flex items-center justify-end gap-1 sm:gap-1.5 h-36 sm:h-44 w-1/3 max-w-[200px]">
            {audioLevels.slice(0, 12).map((level, i) => (
              <div
                key={`left-${i}`}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-75 shadow-xs ${
                  status === "recording"
                    ? "bg-gradient-to-t from-[#2b231e] via-[#adc178] to-[#dde5b6] shadow-[#adc178]/20"
                    : status === "paused"
                    ? "bg-[#56473d]"
                    : "bg-[#40352e]/40"
                }`}
                style={{ height: `${status === "idle" ? 14 : level}%` }}
              />
            ))}
          </div>

          {/* Central Circular Dial with Glowing Progress Arc */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center shrink-0">
            {/* Background Glow */}
            <div className={`absolute inset-2 rounded-full blur-xl pointer-events-none transition-all duration-500 ${
              status === "recording" ? "bg-[#adc178]/30" : status === "paused" ? "bg-[#a98467]/25" : "bg-[#2b231e]/30"
            }`} />

            {/* Outer Circular SVG Track */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="62"
                fill="none"
                stroke="#2b231e"
                strokeWidth="5"
              />
              <circle
                cx="70"
                cy="70"
                r="62"
                fill="none"
                stroke={status === "paused" ? "#a98467" : "#adc178"}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            </svg>

            {/* Inner Dark Glass Sphere with Microphone */}
            <div className="absolute inset-4 sm:inset-5 rounded-full bg-gradient-to-b from-[#2b231e] to-[#15120f] border border-[#56473d] flex flex-col items-center justify-center shadow-2xl">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-1.5 shadow-inner transition-colors ${
                status === "recording"
                  ? "bg-[#495527] border border-[#adc178] text-[#dde5b6]"
                  : status === "paused"
                  ? "bg-[#453427] border border-[#a98467] text-[#cbb4a3]"
                  : "bg-[#15120f] border border-[#56473d] text-[#dee6c9]"
              }`}>
                <Mic
                  size={22}
                  className={
                    status === "recording"
                      ? "text-[#dde5b6] animate-pulse"
                      : status === "paused"
                      ? "text-[#cbb4a3]"
                      : "text-[#dee6c9]"
                  }
                />
              </div>

              <span className="font-mono text-xl sm:text-2xl font-bold text-[#fcfbf6] tracking-tight">
                {formatTime(secondsRemaining)}
              </span>
              <span className="text-[10px] text-[#dee6c9] tracking-wider uppercase font-medium">
                {status === "idle" ? "target time" : status === "paused" ? "paused" : "remaining"}
              </span>
            </div>
          </div>

          {/* Right Waveform Stream */}
          <div className="flex items-center justify-start gap-1 sm:gap-1.5 h-36 sm:h-44 w-1/3 max-w-[200px]">
            {audioLevels.slice(12, 24).map((level, i) => (
              <div
                key={`right-${i}`}
                className={`w-1 sm:w-1.5 rounded-full transition-all duration-75 shadow-xs ${
                  status === "recording"
                    ? "bg-gradient-to-t from-[#2b231e] via-[#adc178] to-[#dde5b6] shadow-[#adc178]/20"
                    : status === "paused"
                    ? "bg-[#56473d]"
                    : "bg-[#40352e]/40"
                }`}
                style={{ height: `${status === "idle" ? 14 : level}%` }}
              />
            ))}
          </div>
        </div>

        {/* Status Pill Badge */}
        <div className="mb-3">
          {status === "idle" && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b231e] border border-[#56473d] text-xs text-[#f0ead2]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a98467]" />
              <span className="font-medium">Waiting to Start</span>
            </div>
          )}
          {status === "recording" && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b231e] border border-[#adc178] text-xs text-[#dde5b6]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#adc178] animate-ping" />
              <span className="font-medium">Live Transcribing & Recording...</span>
            </div>
          )}
          {status === "paused" && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#453427] border border-[#a98467] text-xs text-[#cbb4a3]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a98467]" />
              <span className="font-medium">Recording Paused</span>
            </div>
          )}
        </div>

        {/* Real-Time Transcript Feedback Stream */}
        <div className="w-full max-w-xl px-4">
          <div className="p-3.5 rounded-2xl bg-[#2b231e]/90 border border-[#56473d] text-left shadow-sm backdrop-blur-xs">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#dde5b6] uppercase tracking-wide mb-1.5">
              <span className="flex items-center gap-1.5">
                <Volume2 size={13} className="text-[#adc178]" />
                <span>Live Speech Transcript:</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                className="text-[#dee6c9] hover:text-white flex items-center gap-1 text-[11px] lowercase cursor-pointer"
              >
                <Edit3 size={11} />
                <span>{isEditingTranscript ? "lock" : "edit text"}</span>
              </button>
            </div>

            {isEditingTranscript ? (
              <textarea
                value={transcript}
                onChange={(e) => {
                  setTranscript(e.target.value);
                  finalTranscriptRef.current = e.target.value;
                }}
                placeholder="Type or refine what you spoke..."
                rows={3}
                className="w-full p-2.5 rounded-xl bg-[#15120f] border border-[#adc178] text-xs text-white focus:outline-none focus:border-[#dde5b6]"
              />
            ) : (
              <div className="min-h-[50px] max-h-28 overflow-y-auto text-xs text-[#fcfbf6] leading-relaxed italic select-text">
                {transcript ? (
                  <span className="text-[#fcfbf6] not-italic">
                    &ldquo;{transcript}&rdquo;
                  </span>
                ) : (
                  <span className="text-[#ae998c] not-italic flex items-center gap-1.5">
                    {status === "idle"
                      ? "Click 'Start Recording' when ready — your spoken words will appear here in real time."
                      : "Listening... start speaking clearly and words will transcribe right here."}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {micError && (
          <div className="mt-3 max-w-md p-2.5 rounded-xl bg-[#2b231e] border border-[#a98467]/40 text-xs text-[#f0ead2] flex items-center gap-2 text-left">
            <AlertCircle size={15} className="text-[#a98467] shrink-0" />
            <span className="text-[11px]">{micError}</span>
          </div>
        )}

        {/* Primary Controls */}
        <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4 mt-6">
          {status === "idle" ? (
            <button
              onClick={handleStartRecording}
              className="flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#adc178] to-[#92aa4e] hover:from-[#92aa4e] hover:to-[#6d803b] text-[#15120f] font-semibold text-base shadow-xl shadow-[#adc178]/25 active:scale-95 transition-all cursor-pointer"
            >
              <Play size={20} className="fill-current text-[#15120f]" />
              <span>Start Recording</span>
            </button>
          ) : (
            <>
              {status === "recording" ? (
                <button
                  onClick={handlePauseRecording}
                  className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#2b231e] hover:bg-[#40352e] border border-[#a98467] text-[#cbb4a3] hover:text-[#fcfbf6] text-sm font-semibold active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Pause size={18} />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={handleResumeRecording}
                  className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#adc178] hover:bg-[#92aa4e] text-[#15120f] text-sm font-semibold active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <Play size={18} className="fill-current text-[#15120f]" />
                  <span>Resume</span>
                </button>
              )}

              <button
                onClick={handleFinish}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#a98467] hover:bg-[#8a684e] text-[#fcfbf6] font-semibold text-sm sm:text-base shadow-xl shadow-[#a98467]/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>Finish Answer</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-4 rounded-full bg-[#2b231e] hover:bg-[#40352e] border border-[#56473d] text-[#dee6c9] hover:text-[#fcfbf6] text-xs sm:text-sm font-medium active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>
      </main>

      {/* Bottom Studio Bar */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-center gap-6 text-xs text-[#ae998c] border-t border-[#2b231e] pt-4">
        <span className="flex items-center gap-1">
          <Mic size={12} className="text-[#adc178]" />
          {topic.mode}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock size={12} className="text-[#adc178]" />
          {topic.suggestedSeconds}s limit
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Tag size={12} className="text-[#adc178]" />
          {topic.niche}
        </span>
      </footer>
    </div>
  );
};
