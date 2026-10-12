import React from "react";

/** Large organic botanical branch illustration */
export const BotanicalBranch: React.FC<{ className?: string; flipped?: boolean }> = ({
  className = "",
  flipped = false,
}) => (
  <svg
    viewBox="0 0 280 400"
    className={`${className} ${flipped ? "scale-x-[-1]" : ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30 380 C 50 280, 80 180, 240 30"
      stroke="#6c584c"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.25"
    />
    <path
      d="M70 310 C 25 290, 20 250, 50 240 C 70 245, 80 280, 70 310 Z"
      fill="#dde5b6"
      stroke="#adc178"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <path
      d="M110 250 C 150 230, 160 190, 130 180 C 100 190, 100 230, 110 250 Z"
      fill="#adc178"
      stroke="#6d803b"
      strokeWidth="1.5"
      opacity="0.5"
    />
    <path
      d="M150 170 C 110 150, 100 110, 130 100 C 160 110, 160 150, 150 170 Z"
      fill="#dde5b6"
      stroke="#adc178"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <path
      d="M190 100 C 230 85, 235 50, 210 45 C 185 55, 180 85, 190 100 Z"
      fill="#adc178"
      stroke="#6d803b"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <circle cx="95" cy="285" r="4" fill="#a98467" opacity="0.6" />
    <circle cx="135" cy="210" r="3.5" fill="#a98467" opacity="0.6" />
    <circle cx="170" cy="135" r="4" fill="#a98467" opacity="0.6" />
  </svg>
);

/** Editorial Squiggle Underline / Accent */
export const SquiggleLine: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 160 16"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 9 C 14 3, 26 15, 38 9 C 50 3, 62 15, 74 9 C 86 3, 98 15, 110 9 C 122 3, 134 15, 146 9 C 152 6, 156 8, 158 9"
      stroke="#adc178"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/** Abstract Sun / Wheel / Idea Spark */
export const AbstractSunburst: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="16" fill="#f0ead2" stroke="#adc178" strokeWidth="2.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line
        key={deg}
        x1="50"
        y1="18"
        x2="50"
        y2="8"
        stroke="#a98467"
        strokeWidth="2.5"
        strokeLinecap="round"
        transform={`rotate(${deg} 50 50)`}
      />
    ))}
  </svg>
);

/** Hand-drawn Organic Blob Accent */
export const OrganicBlob: React.FC<{ className?: string; color?: string }> = ({
  className = "",
  color = "#dde5b6",
}) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M45.5,-59.2C58.4,-51.1,68.2,-37.7,73.4,-22.3C78.6,-6.9,79.2,10.6,73.7,25.8C68.2,41,56.5,53.8,42.4,62.8C28.3,71.7,11.8,76.8,-4.2,82.6C-20.2,88.4,-35.8,94.9,-48.1,89.5C-60.4,84.1,-69.5,66.8,-74.6,49.8C-79.7,32.8,-80.9,16.4,-77.7,1.8C-74.6,-12.8,-67.2,-25.6,-58.4,-36.8C-49.6,-48,-39.5,-57.6,-27.6,-66.2C-15.7,-74.8,-2,-82.3,10.7,-78.9C23.4,-75.5,32.6,-67.3,45.5,-59.2Z"
      transform="translate(100 100)"
      fill={color}
    />
  </svg>
);

/** Floating decorative organic dots */
export const FloatingDots: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <div className="absolute top-16 left-12 w-2 h-2 rounded-full bg-[#adc178]/60 animate-pulse-subtle" />
    <div className="absolute top-36 right-20 w-3 h-3 rounded-full bg-[#a98467]/50 animate-float-slow" />
    <div className="absolute top-1/2 left-8 w-2.5 h-2.5 rounded-full bg-[#dde5b6]/80 animate-pulse-subtle" />
    <div className="absolute bottom-24 right-16 w-2 h-2 rounded-full bg-[#6c584c]/40 animate-float-slow" />
    <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-[#adc178]/50" />
    <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-[#f0ead2]/80" />
  </div>
);

/** Ambient background organic watercolor-style shapes */
export const OrganicBlobs: React.FC = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
    {/* Large soft organic shape top right */}
    <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#dde5b6]/35 via-[#adc178]/25 to-transparent blur-3xl" />
    {/* Soft warm shape bottom left */}
    <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#f0ead2]/60 via-[#dde5b6]/30 to-transparent blur-3xl" />
    {/* Subtle center warm glow */}
    <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#a98467]/10 blur-3xl" />
  </div>
);
