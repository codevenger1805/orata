export type PracticeMode = "impromptu" | "interview" | "communication";

export type TopicNiche =
  | "Random"
  | "Technology"
  | "Business"
  | "Startups"
  | "Career"
  | "Education"
  | "Fashion"
  | "Entertainment"
  | "Sports"
  | "Travel"
  | "Lifestyle"
  | "Society"
  | "Psychology"
  | "Science"
  | "Environment"
  | "Finance"
  | "Politics"
  | "Culture"
  | "Relationships"
  | "Everyday Life";

export interface TopicInsight {
  whyInteresting: string;
  quickAngles: string[];
  usefulFact: string;
  tryThisAngle: string;
  beginnerStarter?: string;
}

export interface TopicItem {
  id: string;
  title: string;
  mode: PracticeMode;
  niche: TopicNiche;
  suggestedSeconds: number;
  insight: TopicInsight;
}

export const TOPIC_NICHES: TopicNiche[] = [
  "Random",
  "Technology",
  "Business",
  "Startups",
  "Career",
  "Education",
  "Fashion",
  "Entertainment",
  "Sports",
  "Travel",
  "Lifestyle",
  "Society",
  "Psychology",
  "Science",
  "Environment",
  "Finance",
  "Politics",
  "Culture",
  "Relationships",
  "Everyday Life",
];

export const TOPIC_BANK: TopicItem[] = [
  // =========================================================================
  // 1. IMPROMPTU MODE (Questions + Creative Conversational One-Liners)
  // =========================================================================

  // Technology
  {
    id: "imp-tech-1",
    title: "Would you live without social media for an entire year?",
    mode: "impromptu",
    niche: "Technology",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Tests how much our real identity and friendships depend on algorithmic feeds.",
      quickAngles: ["Reclaiming mental focus", "Fear of missing out on friends", "How boredom sparks genuine creativity"],
      usefulFact: "The average adult spends over 2.5 hours on social platforms every single day.",
      tryThisAngle: "Be honest about the single app you would struggle the most to uninstall.",
      beginnerStarter: `"If you asked me to give up my phone tomorrow, here is the one app that would break me..."`
    }
  },
  {
    id: "imp-tech-2",
    title: "AI won't replace humans, but someone using AI will replace someone who isn't.",
    mode: "impromptu",
    niche: "Technology",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Reframes artificial intelligence from an existential threat into an everyday multiplier of human skill.",
      quickAngles: ["Curiosity vs fear of change", "What AI can never fake: genuine empathy and taste", "The new superpower of asking great prompts"],
      usefulFact: "Knowledge workers using generative tools complete tasks up to 40% faster with higher quality.",
      tryThisAngle: "Contrast someone who fears the tool with someone who treats it like an eager intern.",
      beginnerStarter: `"People keep asking if machines will take our jobs, but they're asking the wrong question..."`
    }
  },
  {
    id: "imp-tech-3",
    title: "Is our constant reliance on GPS quietly eroding our natural sense of adventure?",
    mode: "impromptu",
    niche: "Technology",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Explores how algorithmic efficiency removes serendipity and delightful accidental discoveries.",
      quickAngles: ["The joy of getting lost in an unfamiliar city", "Blind trust in glowing blue routes", "Efficiency vs genuine exploration"],
      usefulFact: "Neuroscientists found drivers who rely exclusively on GPS show reduced activity in the hippocampus.",
      tryThisAngle: "Recall a time you took a wrong turn and stumbled onto something unforgettable.",
      beginnerStarter: `"When was the last time you walked into a new neighborhood without looking at a blue dot on a screen?"`
    }
  },
  {
    id: "imp-tech-4",
    title: "Notifications are the modern equivalent of someone tapping your shoulder every 30 seconds.",
    mode: "impromptu",
    niche: "Technology",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "A fun and visceral critique of attentional fragmentation in modern life.",
      quickAngles: ["The phantom buzz syndrome", "How deep uninterrupted work has become a rare luxury", "The peaceful relief of Do Not Disturb mode"],
      usefulFact: "It takes an average of 23 minutes to regain deep focus after a single phone interruption.",
      tryThisAngle: "Describe the psychological feeling of turning your phone on airplane mode for an afternoon.",
      beginnerStarter: `"Think about what would happen if a coworker tapped your shoulder 80 times an hour..."`
    }
  },
  {
    id: "imp-tech-5",
    title: "Should smartphones be banned inside school classrooms worldwide?",
    mode: "impromptu",
    niche: "Technology",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Pits educational focus and childhood socialization against digital connectivity and parental security.",
      quickAngles: ["Classroom attention spans", "Playground social interaction without screens", "Emergency contact realities"],
      usefulFact: "Countries that banned classroom phones saw immediate measurable gains in student test scores.",
      tryThisAngle: "Contrast the quiet classroom of twenty years ago with a modern lecture hall.",
      beginnerStarter: `"The easiest way to help kids focus isn't better textbooks—it's putting phones in a locker..."`
    }
  },

  // Business & Startups
  {
    id: "imp-biz-1",
    title: "Would you rather have more time or more money right now?",
    mode: "impromptu",
    niche: "Business",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "A classic personal trade-off that reveals what stage of life and ambitions you prioritize.",
      quickAngles: ["Money can be earned back; hours can never be recovered", "Financial freedom buying back future time", "The illusion of being too busy"],
      usefulFact: "Studies show after basic financial comfort, buying free time brings double the happiness of buying luxury goods.",
      tryThisAngle: "Answer in the context of what you would do with an extra 4 hours tomorrow.",
      beginnerStarter: `"If someone handed me either ten thousand dollars or four extra hours every day, my choice is immediate..."`
    }
  },
  {
    id: "imp-biz-2",
    title: "Every great business is just an elegant solution to a tiny everyday annoyance.",
    mode: "impromptu",
    niche: "Startups",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Demystifies entrepreneurship from complex technology into customer empathy and friction removal.",
      quickAngles: ["Uber: hailing a cab in the rain", "Airbnb: expensive hotels during conventions", "What tiny annoyance you would fix today"],
      usefulFact: "Over 70% of unicorn startups originated from a founder trying to solve their own irritating problem.",
      tryThisAngle: "Pick one tiny irritation from your morning routine and pitch a fictional service to cure it.",
      beginnerStarter: `"Look around your room right now: almost every object exists because someone got tired of an annoying problem..."`
    }
  },
  {
    id: "imp-biz-3",
    title: "Why remote work permanently exposed which corporate meetings were completely useless.",
    mode: "impromptu",
    niche: "Business",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Humorous, relatable look at workplace culture, asynchronous communication, and calendar overload.",
      quickAngles: ["The meeting that should have been a 2-line email", "Calendar Tetris vs actually producing work", "The quiet power of focused deep work"],
      usefulFact: "Professionals waste an estimated 31 hours each month in meetings they consider unproductive.",
      tryThisAngle: "Humorously dissect the standard 'quick sync' that lasts 45 minutes without a single decision.",
      beginnerStarter: `"We all know that feeling when a meeting hits the thirty-minute mark and you realize: this could have been an email..."`
    }
  },
  {
    id: "imp-biz-4",
    title: "Failure in your twenties is cheap tuition; fear of failure is the real bankruptcy.",
    mode: "impromptu",
    niche: "Career",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Reframes early mistakes as essential data-gathering rather than permanent career stains.",
      quickAngles: ["The cost of inaction vs the lesson of an attempt", "Building resilience while your responsibilities are small", "Why safe choices often lead to regret"],
      usefulFact: "Serial entrepreneurs have an 85% higher success rate on their third venture compared to first-timers.",
      tryThisAngle: "Share one mistake you made early on that taught you more than any classroom.",
      beginnerStarter: `"The biggest mistake people make early in their career isn't trying something that fails—it's playing so safe they learn nothing..."`
    }
  },
  {
    id: "imp-biz-5",
    title: "Is ambition always a good thing, or does it blind us to present happiness?",
    mode: "impromptu",
    niche: "Career",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Explores the psychological hedonic treadmill and the boundary between healthy drive and endless dissatisfaction.",
      quickAngles: ["Moving the goalposts every time you succeed", "The fuel that builds skyscrapers and cures diseases", "Learning to celebrate milestones"],
      usefulFact: "Psychologists call this the 'arrival fallacy'—the mistaken belief that reaching a goal creates lasting joy.",
      tryThisAngle: "Distinguish between ambition driven by passion versus ambition driven by comparison.",
      beginnerStarter: `"Ambition builds worlds, but it also has a nasty habit of stealing the present moment..."`
    }
  },

  // Everyday Life & Lifestyle
  {
    id: "imp-life-1",
    title: "Morning coffee vs late night tea: the ultimate personality test.",
    mode: "impromptu",
    niche: "Everyday Life",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "A fun way to look at how different people wake up, work, and unwind.",
      quickAngles: ["What your favorite drink says about your energy", "The calm of an early sunrise vs the quiet focus of midnight", "Why simple rituals anchor our sanity"],
      usefulFact: "Over 2.25 billion cups of coffee and tea are enjoyed across the world every single day.",
      tryThisAngle: "Pick your camp right away and playfully tease the other side.",
      beginnerStarter: `"I will defend my favorite drink until the end of time..."`
    }
  },
  {
    id: "imp-life-2",
    title: "The secret art of having zero plans on a Sunday.",
    mode: "impromptu",
    niche: "Lifestyle",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "In a world that glorifies being busy, doing nothing is actually a superpower.",
      quickAngles: ["Why guilt-free rest makes you 10x more productive on Monday", "Your ideal lazy afternoon: music, snacks, or taking a long walk", "The pressure to always have weekend plans"],
      usefulFact: "Psychologists find that daydreaming and unstructured downtime boost creative problem-solving.",
      tryThisAngle: "Describe the feeling of waking up on a Sunday with zero calendar notifications.",
      beginnerStarter: `"There is no greater feeling in modern life than checking your calendar on Sunday morning and seeing absolutely nothing..."`
    }
  },
  {
    id: "imp-life-3",
    title: "Why cooking for someone is the most underrated form of storytelling.",
    mode: "impromptu",
    niche: "Everyday Life",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Connects food to memory, cultural inheritance, and hospitality.",
      quickAngles: ["Meals that bring back childhood memories", "The vulnerability of sharing a homemade dish", "Why dining together builds trust faster than speaking"],
      usefulFact: "Anthropologists believe sharing cooked food around a fire was the foundational catalyst for human language.",
      tryThisAngle: "Recall one specific dish that instantly teleports you back to a childhood memory.",
      beginnerStarter: `"When you cook a meal for someone, you're not just feeding them—you're telling them a story about who you are..."`
    }
  },
  {
    id: "imp-life-4",
    title: "Should people be allowed to work in complete silence, or does ambient noise help?",
    mode: "impromptu",
    niche: "Lifestyle",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Touches on individual sensory preferences and modern open-office design.",
      quickAngles: ["The buzz of a busy café vs the isolation of noise-canceling headphones", "How background audio prevents mind wandering", "The sensory overload of modern workspaces"],
      usefulFact: "Moderate ambient noise (around 70 decibels) enhances performance on creative tasks compared to silence.",
      tryThisAngle: "Defend your ideal soundscape: lo-fi beats, raindrops, café bustle, or absolute silence.",
      beginnerStarter: `"Some people need absolute pin-drop silence to think, but for me, a little background buzz changes everything..."`
    }
  },

  // Society, Psychology & Culture
  {
    id: "imp-soc-1",
    title: "Has convenience made us more impatient as a society?",
    mode: "impromptu",
    niche: "Society",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Explores how instant streaming, 10-minute delivery, and instant messaging shrink our tolerance for delay.",
      quickAngles: ["Waiting 3 seconds for a webpage to load feels like an eternity", "The erosion of delayed gratification in personal growth", "Why mastery still demands slow, boring repetition"],
      usefulFact: "In 2006, consumers tolerated a 4-second web load time; today, over 50% abandon a page if it takes longer than 2 seconds.",
      tryThisAngle: "Contrast our grandparents waiting weeks for a letter with us getting annoyed at a delivery driver.",
      beginnerStarter: `"We live in an age where everything arrives in five minutes, and somehow we're more impatient than ever..."`
    }
  },
  {
    id: "imp-soc-2",
    title: "Most arguments on the internet aren't about facts; they're about belonging to a tribe.",
    mode: "impromptu",
    niche: "Psychology",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Explains polarization, cognitive dissonance, and identity signaling in online debates.",
      quickAngles: ["Social belonging vs objective truth", "Why changing your mind in public feels like betrayal", "The lost art of intellectual humility"],
      usefulFact: "Studies show when people are confronted with facts contradicting their group identity, their brain registers it like physical threat.",
      tryThisAngle: "Explain why attacking someone's logic rarely changes their emotional allegiance.",
      beginnerStarter: `"If you spend five minutes on Twitter or Reddit, you quickly realize: nobody is actually trying to change anyone's mind..."`
    }
  },
  {
    id: "imp-soc-3",
    title: "Why small talk is actually the essential foundation of deep human connection.",
    mode: "impromptu",
    niche: "Relationships",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Challenges the popular internet trope of 'I hate small talk' by explaining its social utility.",
      quickAngles: ["Small talk as an emotional handshake and safety check", "How casual comments about the weather pave the way for vulnerability", "The awkwardness of diving into deep topics without rapport"],
      usefulFact: "Sociolinguists refer to small talk as 'phatic communication'—signals that establish goodwill rather than transmit information.",
      tryThisAngle: "Defend asking about the weekend as an invitation to see if someone wants to talk.",
      beginnerStarter: `"People always say they hate small talk and only want deep conversations, but imagine how terrifying that would be with a stranger..."`
    }
  },

  // Fashion, Entertainment & Sports
  {
    id: "imp-fash-1",
    title: "What you wear is the only speech you deliver before you open your mouth.",
    mode: "impromptu",
    niche: "Fashion",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Connects clothing choices to personal psychology, self-expression, and subconscious signaling.",
      quickAngles: ["Dressing for how you want to feel vs how you want others to perceive you", "The death of strict dress codes in modern offices", "Fashion as armor on difficult days"],
      usefulFact: "Cognitive psychologists call this 'enclothed cognition'—clothes systematically influence the wearer's psychological processes.",
      tryThisAngle: "Describe your go-to outfit that immediately makes you feel 20% more confident.",
      beginnerStarter: `"Before you ever say hello to someone, your outfit has already told them a complete story..."`
    }
  },
  {
    id: "imp-fash-2",
    title: "Fast fashion is the fast food of our closets: cheap, addictive, and terrible for everyone.",
    mode: "impromptu",
    niche: "Fashion",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Critiques micro-trends, disposable consumerism, and the shift away from quality craftsmanship.",
      quickAngles: ["Wearing an item twice before throwing it out", "The environmental mountain of synthetic textiles", "The quiet elegance of a timeless, durable wardrobe"],
      usefulFact: "The fashion industry produces over 92 million tons of textile waste every single year.",
      tryThisAngle: "Make a passionate pitch for buying one high-quality item instead of five cheap ones.",
      beginnerStarter: `"We used to buy clothes to keep them for five years; now people buy shirts just to post a photo and throw them away..."`
    }
  },
  {
    id: "imp-sport-1",
    title: "Sports aren't just games—they are the last unscripted live drama on television.",
    mode: "impromptu",
    niche: "Sports",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Explains why millions watch live athletics in an era where movies and entertainment are predictable.",
      quickAngles: ["The tension of a final second shot where nobody knows the ending", "Shared collective emotional highs with thousands of strangers", "Underdogs triumphing against impossible odds"],
      usefulFact: "Live sporting events account for over 90 of the top 100 most-watched television broadcasts every year.",
      tryThisAngle: "Describe the physical goosebumps of a dramatic comeback in the final minute.",
      beginnerStarter: `"In a world where every movie plot is spoiled on social media, sports are the only place left where nobody knows how the story ends..."`
    }
  },
  {
    id: "imp-ent-1",
    title: "Streaming algorithms killed the thrill of finding a hidden gem on your own.",
    mode: "impromptu",
    niche: "Entertainment",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Examines how recommendation engines create taste bubbles instead of serendipitous discoveries.",
      quickAngles: ["The nostalgia of browsing a record store or library shelf", "Infinite choice leading to decision paralysis", "Algorithms feeding you variations of what you already like"],
      usefulFact: "Over 80% of content watched on major streaming platforms is driven directly by automated recommendation algorithms.",
      tryThisAngle: "Recall a book, movie, or song you found purely by accident that changed your life.",
      beginnerStarter: `"Remember when you used to wander into a record shop or browse a video shelf and pick something just because the cover looked cool?"`
    }
  },

  // Travel, Environment, Science & Finance
  {
    id: "imp-trav-1",
    title: "Traveling to take photos for social media isn't exploring—it's just outdoor data entry.",
    mode: "impromptu",
    niche: "Travel",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "A witty, biting commentary on over-tourism and performing vacations for an audience.",
      quickAngles: ["Standing in a 40-minute line just to take the exact same photo as everyone else", "Experiencing a place through a camera lens vs through your senses", "The magic of wandering without checking geotags"],
      usefulFact: "Historic destinations like Venice and Kyoto have instituted tourist quotas to protect local daily life.",
      tryThisAngle: "Contrast two travelers: one taking 500 selfies, one sitting in a café talking to a local baker.",
      beginnerStarter: `"There is a huge difference between traveling to experience a city, and traveling to prove to your followers that you were there..."`
    }
  },
  {
    id: "imp-env-1",
    title: "Will individual eco-habits save the planet, or is that just corporate guilt-shifting?",
    mode: "impromptu",
    niche: "Environment",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Pits individual lifestyle responsibility against systemic industrial emissions and policy changes.",
      quickAngles: ["Paper straws while private jets fly overhead", "The psychological power of personal agency and civic pride", "Holding the 100 biggest corporate polluters accountable"],
      usefulFact: "The concept of a personal 'carbon footprint' was popularized by an advertising campaign for BP in 2004.",
      tryThisAngle: "Balance the moral value of personal habits with the necessity of industrial reform.",
      beginnerStarter: `"We spend all our time worrying about whether to use a paper straw, while factories pump out tons of emissions every hour..."`
    }
  },
  {
    id: "imp-fin-1",
    title: "Financial freedom isn't about buying fancy cars; it's about saying 'no' without panic.",
    mode: "impromptu",
    niche: "Finance",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Redefines wealth from luxury toys into peace of mind, autonomy, and psychological security.",
      quickAngles: ["The freedom to walk away from a toxic boss", "Sleeping peacefully without checking credit balances", "Why lifestyle inflation traps high earners"],
      usefulFact: "Morgan Housel famously wrote: 'The highest form of wealth is the ability to wake up every morning and say, I can do whatever I want today.'",
      tryThisAngle: "Describe the moment someone realizes an emergency fund gives them control over their time.",
      beginnerStarter: `"Real wealth has nothing to do with showing off fancy watches—it's the power to say 'no' to things that drain you..."`
    }
  },
  {
    id: "imp-sci-1",
    title: "Space exploration vs fixing Earth: why can't we be ambitious enough to do both?",
    mode: "impromptu",
    niche: "Science",
    suggestedSeconds: 60,
    insight: {
      whyInteresting: "Tackles the false dichotomy between solving terrestrial crises and reaching for cosmic frontiers.",
      quickAngles: ["How space missions gave us solar panels, water filters, and GPS", "The human spirit requires both survival and wonder", "Protecting our only home while exploring our future"],
      usefulFact: "Every dollar invested in NASA generates between $7 and $14 in economic and technological returns back on Earth.",
      tryThisAngle: "Explain how looking at Earth from the moon inspired modern environmental conservation in the 1960s.",
      beginnerStarter: `"People always say 'why spend money on Mars when we have problems here?'—as if human beings are only allowed to care about one thing at a time..."`
    }
  },

  // =========================================================================
  // 2. INTERVIEW MODE (Behavioral, Leadership, Situational & Communication)
  // =========================================================================

  {
    id: "int-tech-1",
    title: "Tell me about a time you had to explain a complex technical concept to a non-technical stakeholder.",
    mode: "interview",
    niche: "Technology",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Evaluates empathy, audience calibration, and ability to eliminate technical jargon.",
      quickAngles: ["Start with the business outcome, not the implementation", "Use a relatable real-world metaphor", "Check for understanding throughout"],
      usefulFact: "Leadership surveys cite cross-functional communication as the #1 differentiator for senior engineering promotions.",
      tryThisAngle: "Pick a concrete example like an API, a cache, or a database migration.",
      beginnerStarter: `"In my previous role, I had to explain why our backend needed a two-week architectural refactor to our VP of Sales..."`
    }
  },
  {
    id: "int-tech-2",
    title: "How do you decide between shipping a feature quickly versus building a clean, scalable architecture?",
    mode: "interview",
    niche: "Technology",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests technical pragmatism, business awareness, and management of technical debt.",
      quickAngles: ["Pragmatic MVP to test user demand first", "Documenting intentional shortcuts to pay back later", "When architectural rigor is non-negotiable: security and data integrity"],
      usefulFact: "Martin Fowler defined technical debt as taking on a loan: dangerous if neglected, but strategic if repaid promptly.",
      tryThisAngle: "Show you understand that building the wrong feature cleanly is still a waste of engineering time.",
      beginnerStarter: `"I view technical debt the same way a financial analyst views leverage: useful when deliberate, toxic when accidental..."`
    }
  },
  {
    id: "int-car-1",
    title: "Describe a high-stakes project where you failed or made a significant mistake. How did you handle it?",
    mode: "interview",
    niche: "Career",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests accountability, maturity under fire, and whether you reflect and adapt from failures.",
      quickAngles: ["Own the mistake immediately without shifting blame", "Action taken to mitigate the blast radius", "The systemic safeguard you instituted so it never recurred"],
      usefulFact: "Top tech companies value blameless postmortems because hiding errors causes repeated outages.",
      tryThisAngle: "State the mistake in one honest sentence, describe the fix in two, and emphasize the lesson.",
      beginnerStarter: `"Early in my career, I deployed a change without adequate regression testing, which caused a three-hour service interruption..."`
    }
  },
  {
    id: "int-car-2",
    title: "Tell me about a time you strongly disagreed with a team decision or your manager. What did you do?",
    mode: "interview",
    niche: "Career",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Evaluates professional courage, constructive disagreement, and the ability to commit once a decision is made.",
      quickAngles: ["Grounding your dissent in data and customer impact, not ego", "Listening deeply to the counter-perspective", "Disagreeing and committing wholeheartedly to execution"],
      usefulFact: "Amazon's leadership principle 'Have Backbone; Disagree and Commit' is one of the most widely adopted across modern industries.",
      tryThisAngle: "Show you can push back respectfully and still be a phenomenal team player.",
      beginnerStarter: `"When our team was debating our quarterly launch roadmap, I strongly believed we were prioritizing the wrong feature..."`
    }
  },
  {
    id: "int-car-3",
    title: "Where do you see yourself in three years, and how does this role fit your trajectory?",
    mode: "interview",
    niche: "Career",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests self-awareness, intentional career planning, and whether your ambitions align with the company's growth.",
      quickAngles: ["Mastering core execution and expanding into mentorship", "Building domain expertise in this specific problem space", "Balancing humility with hunger"],
      usefulFact: "Hiring managers look for trajectory and curiosity far more than rigid job-title ambitions.",
      tryThisAngle: "Tie your personal growth directly to the unsolved problems of this organization.",
      beginnerStarter: `"In three years, I want to be someone who not only executes at an elite level, but helps mentor newer teammates to do the same..."`
    }
  },
  {
    id: "int-biz-1",
    title: "How do you prioritize competing deadlines when everything is marked as high priority?",
    mode: "interview",
    niche: "Business",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests operational triage, stakeholder communication, and boundary setting under pressure.",
      quickAngles: ["Evaluating true business impact vs loud urgency", "Proactive communication with stakeholders before deadlines slip", "The Eisenhower Matrix: Urgent vs Important"],
      usefulFact: "Research indicates multitasking reduces effective cognitive IQ by up to 10 points during peak stress.",
      tryThisAngle: "Highlight how you proactively managed stakeholder expectations instead of silently burning out.",
      beginnerStarter: `"When three stakeholders all tell me their project is top priority, the first thing I do is bring them into alignment on the business impact..."`
    }
  },
  {
    id: "int-start-1",
    title: "How do you handle ambiguous goals when there are no clear instructions or precedent?",
    mode: "interview",
    niche: "Startups",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Crucial for early-stage and high-growth teams where nobody will write a playbook for you.",
      quickAngles: ["Formulating an educated hypothesis", "Running small, rapid experiments to gather signals", "Creating clarity for the teammates around you"],
      usefulFact: "Founders rate 'ability to navigate ambiguity' as the single most critical quality for early startup hires.",
      tryThisAngle: "Show that ambiguity excites you because it means you get to shape the outcome.",
      beginnerStarter: `"In environments where there is no playbook, I don't wait for permission—I build a lightweight prototype to test the waters..."`
    }
  },
  {
    id: "int-edu-1",
    title: "Describe a skill you had to teach yourself completely from scratch on a tight timeline.",
    mode: "interview",
    niche: "Education",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests autodidactic capacity, resourcefulness, and self-directed learning velocity.",
      quickAngles: ["Breaking a massive topic into fundamental first principles", "Leveraging documentation, peers, and fast failure", "Applying the skill immediately to solve a real task"],
      usefulFact: "The half-life of technical skills is now under 3 years; learning velocity beats existing knowledge.",
      tryThisAngle: "Focus on the systematic process you used to learn, not just the technical subject.",
      beginnerStarter: `"When a client required a tool our team had never touched, I had 72 hours to get production-ready..."`
    }
  },

  // =========================================================================
  // 3. COMMUNICATION MODE (Persuasion, Arguments, Pitches & Explanations)
  // =========================================================================

  {
    id: "com-tech-1",
    title: "Convince a leadership team that reducing technical debt will directly increase company revenue.",
    mode: "communication",
    niche: "Technology",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests translation of engineering pain into CFO and executive revenue language.",
      quickAngles: ["Developer velocity: faster time to market for customer features", "System stability: avoiding catastrophic downtime and lost contracts", "Engineering retention: top talent quits fragile codebases"],
      usefulFact: "Stripe found developers spend 42% of their work week dealing with technical debt and legacy maintenance.",
      tryThisAngle: "Frame it not as 'polishing code', but as removing the brakes from your product engine.",
      beginnerStarter: `"If you want our product team to ship features twice as fast next quarter, we have to fix the engine first..."`
    }
  },
  {
    id: "com-tech-2",
    title: "Explain why simple code is infinitely more valuable than clever code.",
    mode: "communication",
    niche: "Technology",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Challenges vanity in engineering and champions maintainability and long-term team collaboration.",
      quickAngles: ["Code is read 10x more often than it is written", "The 2 AM debugging nightmare test", "Anyone can write complex code; true mastery is making it obvious"],
      usefulFact: "Brian Kernighan famously wrote: 'Debugging is twice as hard as writing the code in the first place.'",
      tryThisAngle: "Paint a painful picture of a midnight on-call incident debugging overly clever code.",
      beginnerStarter: `"We all love writing clever code, but think about who has to fix it at 2 AM on a Saturday..."`
    }
  },
  {
    id: "com-soc-1",
    title: "Argue why public libraries remain vital in an era of universal internet access.",
    mode: "communication",
    niche: "Society",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Defends civic third spaces, democratic access to knowledge, and community safety nets.",
      quickAngles: ["Indoor spaces free of commercial demand to purchase things", "Digital literacy and internet access for underserved citizens", "Community cohesion and quiet contemplation"],
      usefulFact: "Public libraries are one of the last remaining public spaces where no money is required to exist.",
      tryThisAngle: "Anchor your case on what a neighborhood loses when physical civic commons disappear.",
      beginnerStarter: `"Where else in a city can you walk inside, sit down for four hours, and nobody asks you to buy anything?"`
    }
  },
  {
    id: "com-start-1",
    title: "Pitch an unconventional product idea that sounds ridiculous at first glance.",
    mode: "communication",
    niche: "Startups",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests pitch dynamics: turning counter-intuitive insights into compelling commercial value.",
      quickAngles: ["The secret insight the market ignores", "Why competitors won't copy it", "The customer aha moment"],
      usefulFact: "Airbnb and Uber both sounded like dangerous, absurd premises to early investors in 2008.",
      tryThisAngle: "State the absurdity clearly, pause for a second, then unveil the counter-intuitive mechanic.",
      beginnerStarter: `"When I tell you this idea, your first reaction will probably be 'that sounds crazy'..."`
    }
  },
  {
    id: "com-biz-1",
    title: "Persuade an executive that four-day workweeks can increase output, not decrease it.",
    mode: "communication",
    niche: "Business",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Tests argument construction against deeply entrenched cultural assumptions about hours vs results.",
      quickAngles: ["Parkinson's law: work expands to fill available time", "Rest drastically cuts cognitive fatigue and expensive rework", "Recruitment and retention advantage over rivals"],
      usefulFact: "In a nationwide UK trial of 61 companies testing 4-day workweeks, 92% chose to keep the policy permanently.",
      tryThisAngle: "Distinguish between hours spent sitting in a chair versus actual output delivered.",
      beginnerStarter: `"If we measure employees by hours in their chairs, five days makes sense; but if we measure them by actual output, the math changes completely..."`
    }
  },
  {
    id: "com-edu-1",
    title: "Explain a difficult concept to a ten-year-old without using a single piece of jargon.",
    mode: "communication",
    niche: "Education",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "The ultimate Feynman technique test: if you can't explain it simply, you don't understand it deeply.",
      quickAngles: ["Choose inflation, gravity, or computer memory", "Use physical analogies (like toy blocks, allowances, or soccer balls)", "Keep emotional resonance and curiosity alive"],
      usefulFact: "Richard Feynman claimed that complex jargon is often just a mask used to disguise incomplete comprehension.",
      tryThisAngle: "Pick inflation: explain it as a classroom with 10 cookies and 20 tickets.",
      beginnerStarter: `"Imagine our whole classroom has ten cookies, and the teacher gives everyone twice as many tickets..."`
    }
  },
  {
    id: "com-fin-1",
    title: "Explain the magic of compound interest to someone who has never saved a dollar.",
    mode: "communication",
    niche: "Finance",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Turns abstract exponential math into a concrete, empowering picture of future freedom.",
      quickAngles: ["Money making little baby coins that grow up and make more coins", "Why starting small at twenty beats starting huge at forty", "The snowball rolling down a snowy hill"],
      usefulFact: "Albert Einstein allegedly called compound interest the eighth wonder of the world.",
      tryThisAngle: "Use the snowball rolling down a hill analogy—it starts small, but with enough hill, it becomes an avalanche.",
      beginnerStarter: `"Imagine you have a single snowball at the top of a giant hill. At first it looks tiny, but as it rolls..."`
    }
  },
  {
    id: "com-env-1",
    title: "Persuade your local city council to convert empty parking lots into community parks.",
    mode: "communication",
    niche: "Environment",
    suggestedSeconds: 90,
    insight: {
      whyInteresting: "Balances economic arguments, environmental cooling, and citizen mental health.",
      quickAngles: ["Urban heat island reduction", "Small business foot traffic near public green spaces", "Mental well-being for families"],
      usefulFact: "Tree cover and green spaces reduce urban heat island temperatures by up to 9 degrees Fahrenheit.",
      tryThisAngle: "Show how foot traffic near green spaces actually boosts surrounding restaurant and retail sales.",
      beginnerStarter: `"Right now, the center of our neighborhood is an empty, blistering sheet of black asphalt..."`
    }
  }
];

export function getTopicsFor(mode: PracticeMode, niche: TopicNiche): TopicItem[] {
  // If Random, return everything in this mode
  if (niche === "Random") {
    const modePool = TOPIC_BANK.filter((item) => item.mode === mode);
    return modePool.length > 0 ? modePool : TOPIC_BANK;
  }

  // Exact mode and exact niche
  const exactMatches = TOPIC_BANK.filter(
    (item) => item.mode === mode && item.niche.toLowerCase() === niche.toLowerCase()
  );

  // Cross-mode niche matches
  const crossModeMatches = TOPIC_BANK.filter(
    (item) => item.niche.toLowerCase() === niche.toLowerCase() && item.mode !== mode
  );

  // Other related topics in this mode to ensure rich reel diversity
  const modeFallback = TOPIC_BANK.filter(
    (item) => item.mode === mode && item.niche.toLowerCase() !== niche.toLowerCase()
  );

  // Combine them: exact matches first, then cross-mode matches adapted to this mode, then fallback
  const combined: TopicItem[] = [
    ...exactMatches,
    ...crossModeMatches.map((m) => ({ ...m, mode })),
    ...modeFallback,
  ];

  return combined.length > 0 ? combined : TOPIC_BANK;
}
