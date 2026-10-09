export const profile = {
  name: "Rajat Nanavati",
  handle: "@rajat258",
  role: "React Native Developer",
  location: "Ahmedabad, Gujarat, India",
  phone: "+91 9428190380",
  phoneHref: "tel:+919428190380",
  email: "rajatnanavati258@gmail.com",
  emailHref: "mailto:rajatnanavati258@gmail.com",
  github: "github.com/rajat258",
  githubHref: "https://github.com/rajat258",
  linkedin: "linkedin.com/in/rajat-nanavati",
  linkedinHref: "https://www.linkedin.com/in/rajat-nanavati-57446b209",
  medium: "medium.com/@rajatnanavati258",
  mediumHref: "https://medium.com/@rajatnanavati258",
  headline:
    "README.md - building scalable cross-platform apps for healthcare, retail, HRTech, and creator platforms.",
  summary:
    "Results-driven React Native Developer with 5+ years of experience building scalable cross-platform mobile applications across healthcare, retail, HRTech, and creator economy domains. Strong expertise in React Native architecture, Redux ecosystem, mobile performance optimization, and API integrations.",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const sectionMeta = {
  skills: {
    kicker: "Languages & Tools",
    title: "Pinned skill repositories",
    copy: "A compact map of the stack used across production mobile and web apps.",
  },
  work: {
    kicker: "Professional log",
    title: "Experience",
    copy: "Production React Native work across healthcare, retail, enterprise, and HRTech.",
  },
  projects: {
    kicker: "Open source & client work",
    title: "Featured projects",
    copy: "Production mobile apps and live websites, grouped by platform.",
  },
  credentials: {
    kicker: "Credentials",
    title: "Certification & education",
    copy: "A compact record of formal background and validated cloud fundamentals.",
  },
  contact: {
    kicker: "Profile modules",
  },
};

export const aboutContent = {
  kicker: "README.md",
  copy:
    "Rajat is a React Native Developer with strong expertise in mobile architecture, Redux ecosystem, mobile performance optimization, and API integrations. He has delivered production-ready applications with modern UI/UX, real-time workflows, and scalable SaaS solutions while collaborating with cross-functional teams.",
  code:
    "// Focus: scalable mobile architecture, reusable UI systems, API integration, performance, and production delivery.",
};

export const heroContent = {
  roleLabel: "React Native Developer",
  locationLabel: "Ahmedabad",
  portfolioRepo: "rajat258 / portfolio",
  repoVisibility: "public",
  photo: "/rajat-profile.jpg",
  photoAlt: "Rajat Nanavati",
  cardCopy: "Profile README for a React Native engineer shipping mobile systems.",
  downloadLabel: "Download Resume",
  contactLabel: "Contact Me",
  projectsLabel: "View Projects",
  nano: {
    download: "Good call! Grab the resume.",
    contact: "Say hi! Rajat would love to hear from you.",
    projects: "Ooh, let me show you the projects!",
  },
};

export const nanoContent = {
  name: "Nano",
  label: "Nano, Rajat's mascot",
  companionLabel: "Nano, Rajat's mascot. Say hi and jump to contact",
  sleepAfterMs: 25000,
  sections: [
    { id: "hero", mood: "idle" },
    { id: "about", mood: "listening", line: "Hey, that's Rajat. Glad you're here." },
    { id: "skills", mood: "thinking", line: "Hmm, which stack fits your idea?" },
    { id: "work", mood: "working", line: "Heads down, shipping production apps." },
    { id: "projects", mood: "excited", line: "Ooh, these are my favourites!" },
    { id: "credentials", mood: "proud", line: "AWS certified. Small flex." },
    { id: "contact", mood: "happy", line: "Say hi! The form is right here." },
  ],
  hoverLine: "Psst, click me.",
  helloLine: "Oh, hi! I'm Nano.",
  wakeLine: "Oh! I'm up, I'm up.",
  sleepLine: "Zzz...",
  celebrateLine: "Let's build something together!",
  credit: {
    label: "Nano is built with Bible Strong Avatar Lab",
    href: "https://github.com/smontlouis/bible-strong-avatar-lab",
    licenseLabel: "AGPL-3.0",
    sourceLabel: "View source",
    sourceHref: "https://github.com/rajat258/rajat-resume-portfolio",
  },
};

export const stats = [
  { value: "5+", label: "Years" },
  { value: "4", label: "Domains" },
  { value: "AWS", label: "Certified" },
];

export const skillGroups = [
  {
    title: "Mobile Development",
    icon: "code",
    nano: { line: "Phones are home turf. iOS and Android both.", mood: "excited" },
    chipLines: {
      "React Native": "React Native? 5+ years of it.",
      TypeScript: "He pairs TypeScript with React Native.",
    },
    items: ["React Native", "TypeScript", "JavaScript", "Android", "iOS"],
  },
  {
    title: "Frontend Architecture",
    icon: "briefcase",
    nano: { line: "Hmm, state, hooks and clean structure.", mood: "thinking" },
    chipLines: {
      "Redux Toolkit": "Redux Toolkit, used to keep apps scalable.",
      "Framer Motion": "Framer Motion animates this very site.",
    },
    items: [
      "React",
      "React Hooks",
      "Redux",
      "Redux Toolkit",
      "Redux Thunk",
      "Redux Saga",
      "React Router",
      "Vite",
      "Framer Motion",
    ],
  },
  {
    title: "Backend & Cloud",
    icon: "cloud",
    nano: { line: "APIs, Firebase and AWS, all wired up.", mood: "thinking" },
    chipLines: {
      AWS: "AWS Certified Cloud Practitioner, yes!",
      Firebase: "Firebase powers the chat in his movie app.",
      "Realtime workflows": "Realtime chat? He built it for CarePorch.",
    },
    items: ["AWS", "REST APIs", "Firebase", "Realtime workflows", "Vercel", "GitHub Pages"],
  },
  {
    title: "Tools",
    icon: "terminal",
    nano: { line: "The daily toolbox. Let's get to work.", mood: "working" },
    chipLines: {
      "GitHub Actions": "GitHub Actions runs his CI and deploys.",
      Xcode: "Xcode for iOS, Android Studio for Android.",
    },
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "SourceTree",
      "Android Studio",
      "Xcode",
      "VS Code",
      "Flipper",
    ],
  },
  {
    title: "Programming",
    icon: "terminal",
    nano: { line: "Beyond mobile, a few more languages.", mood: "thinking" },
    chipLines: {
      Python: "Python, with NumPy and Pandas too.",
      "C++": "C++! Old school and still fun.",
    },
    items: ["Python", "C", "C++", "HTML", "CSS", "CSS Modules", "NumPy", "Pandas"],
  },
  {
    title: "AI Tools",
    icon: "sparkles",
    nano: { line: "AI helpers! Rajat keeps a few handy.", mood: "playful" },
    chipLines: {
      "Claude Code": "Claude Code? Hey, that's a friend.",
      Cursor: "Cursor, another trusty sidekick.",
    },
    items: [
      "Claude",
      "Claude Code",
      "ChatGPT",
      "Codex",
      "Cursor",
      "GitHub Copilot",
      "Gemini",
      "Antigravity",
      "Muse",
    ],
  },
];

export const experience = [
  {
    company: "Salinger and Dalley Holdings",
    period: "Present",
    role: "React Native Developer",
    location: "Remote (USA)",
    bullets: [
      "Built the real-time community messaging experience for CarePorch, a caregiver support platform, using React Native, Expo, and Stream Chat, with group channels, direct messages, threaded and quoted replies, swipe-to-reply gestures, and video compression before upload.",
      "Developed the Visits scheduling module end to end, covering recurring availability rules, the booking, rescheduling, and cancellation lifecycle, and two-way Google Calendar integration with conflict detection.",
      "Shipped features across iOS, Android, and Web from a single Expo codebase, delivering authentication, onboarding, and settings flows alongside shared components and hooks used throughout the app.",
      "Maintained quality through Vitest unit and integration tests, Playwright end-to-end and visual regression suites, and Maestro native regression flows running in GitHub Actions CI.",
    ],
  },
  {
    company: "Way to React Technologies",
    href: "https://waytoreact.com/",
    period: "2023 - 2026",
    role: "React Native Developer",
    location: "Ahmedabad, India",
    bullets: [
      "Developed and maintained scalable cross-platform mobile applications using React Native and TypeScript for healthcare, retail, and enterprise clients.",
      "Implemented modern state management solutions using Redux Toolkit, Redux Saga, and React Hooks to improve application scalability and maintainability.",
      "Collaborated with backend and design teams to integrate APIs, optimize mobile performance, and deliver seamless user experiences across Android and iOS platforms.",
      "Built reusable components and modular architectures that accelerated feature delivery and improved development efficiency across projects.",
    ],
  },
  {
    company: "Simform Solutions Pvt Ltd",
    href: "https://www.simform.com/",
    period: "2023",
    role: "React Native Developer Intern",
    location: "Ahmedabad, India",
    bullets: [
      "Contributed to React Native application development by implementing UI screens, debugging issues, and integrating APIs.",
      "Worked closely with senior developers to understand scalable mobile architecture and production deployment workflows.",
      "Participated in Agile development cycles, code reviews, and collaborative feature development.",
    ],
  },
];

export const projectGroups = [
  {
    title: "App projects",
    items: [
      {
        title: "CarePorch",
        nano: "Real time chat plus Google Calendar visits!",
        href: "https://careporch.org/",
        meta: "React Native / Expo / Caregiving Platform / Ongoing",
        description:
          "Caregiver support app pairing a private, moderated community with private visit scheduling, built with React Native and Expo for iOS, Android, and Web. Contributed real-time messaging via Stream Chat and a Visits module with two-way Google Calendar integration.",
      },
      {
        title: "POPProbe",
        nano: "Retail workflows across 3+ continents!",
        href: "https://www.popprobe.com/",
        meta: "React Native / SaaS Platform / Ongoing",
        description:
          "Built enterprise retail execution mobile workflows for brands operating across 3+ continents, with scalable mobile modules for retail tracking, operational reporting, and field-force management.",
      },
      {
        title: "Glip",
        nano: "Medication tracking with predictive reminders.",
        href: "https://github.com/rajat258/glip-mobile",
        meta: "React Native / Healthcare / 2026",
        description:
          "Built healthcare-focused medication tracking for treatment cycles, dynamic forecasting, user insights, real-time cycle management, and predictive reminders.",
      },
      {
        title: "AttLed",
        nano: "Attendance, payroll and more. HRTech!",
        href: "https://attled.com/",
        meta: "React Native / HRTech / 2024-25",
        description:
          "Developed employee management, attendance tracking, payroll, branch organization, responsive UI, and optimized operational workflows.",
      },
      {
        title: "Sandwych",
        nano: "Care coordination for healthcare teams.",
        href: "https://sandwych.com/",
        meta: "Healthcare Platform / 2025",
        description:
          "Developed patient-centered care coordination, patient navigation, task tracking, reminders, and collaboration modules for healthcare teams.",
      },
      {
        title: "Mita",
        nano: "Creator analytics with dynamic charts!",
        href: "https://github.com/rajat258/mita",
        meta: "Creator Economy Platform / Prototype",
        description:
          "Built investment tracking and analytics workflows for creators and brands using React Native, interactive dashboards, dynamic charts, and profile analytics.",
      },
      {
        title: "rn-MovieDB",
        nano: "Movies, trailers and Firebase chat. Fun!",
        href: "https://github.com/rajat258/rn-movieDB",
        meta: "React Native / Firebase / Personal Project",
        description:
          "Developed a cross-platform movie and TV discovery application with ratings, trailers, authentication workflows, and dynamic chat functionality using Firebase.",
      },
      {
        title: "rn-groot",
        nano: "A test bench for custom native modules.",
        href: "https://github.com/rajat258/rn-groot",
        meta: "React Native Testing Platform / Personal Project",
        description:
          "Built a React Native testing application for validating custom modules, native integrations, reusable mobile components, and device compatibility.",
      },
    ],
  },
  {
    title: "Web projects",
    items: [
      {
        title: "ATC Group Website",
        nano: "A live site for an industrial packaging maker.",
        href: "https://akshaytradingco.in/",
        meta: "React / TypeScript / Vite / GitHub Pages",
        description:
          "Built the marketing site for ATC Group, an Ahmedabad FIBC and industrial packaging manufacturer, with a token based design system, CSS Modules, content driven product catalogue, responsive layout checks, and GitHub Actions deployment to a custom domain.",
      },
      {
        title: "Rajat Nanavati Portfolio",
        nano: "Hey, that's this site! I live here.",
        href: "https://github.com/rajat258/rajat-resume-portfolio",
        meta: "React / Vite / Framer Motion / CI-CD",
        description:
          "Built a minimal animated portfolio with modular React components, separated content configuration, Vercel deployment, and GitHub-based CI/CD workflows. Live at rajatnanavati.vercel.app.",
      },
    ],
  },
];

export const credentials = [
  {
    title: "AWS Certified Cloud Practitioner",
    label: "AWS Certification",
    href: "https://www.credly.com/badges/04095418-442f-42ba-88cc-c0ef7519febb/public_url",
  },
  {
    title: "B.Tech in Computer Science Engineering",
    label: "Education",
    href: "https://indusuni.ac.in/home.php",
    description: "Indus University / 2019 - 2023 / Ahmedabad, India",
  },
];

export const contributionCells = [
  3, 2, 0, 4, 1, 3, 2, 4, 0, 1, 3, 2, 4, 1, 0, 2, 3, 4, 2, 1,
  0, 3, 4, 2, 1, 2, 4, 3, 0, 1, 2, 3, 4, 0, 1, 3, 2, 4, 1, 0,
];

export const sayHiContent = {
  kicker: "Or just say hi",
  intro: "Leave a note here. It goes straight to Rajat's inbox.",
  endpoint: "https://formsubmit.co/ajax/rajatnanavati258@gmail.com",
  subject: "New message from rajatnanavati.vercel.app",
  template: "table",
  emailLabel: "Your email",
  emailPlaceholder: "you@company.com",
  messageLabel: "Message",
  messagePlaceholder: "Tell Rajat a little about what you're building",
  submitLabel: "Send message",
  sendingLabel: "Sending...",
  errors: {
    emailInvalid: "That email doesn't look quite right.",
    messageEmpty: "Please add a short message.",
    send: "Couldn't send that one. Please try again, or use the email link above.",
  },
  success: "Thanks! Your message is on its way to Rajat.",
  nano: {
    emailInvalid: "Hmm, that email looks a little off.",
    messageEmpty: "Add a short message for Rajat?",
    sending: "Sending it over to Rajat...",
    success: "Sent! It's in Rajat's inbox now.",
    error: "Oops. Try the email link above?",
  },
  links: {
    phone: "Rather talk? Give Rajat a call.",
    email: "Straight to Rajat's inbox!",
    linkedin: "Let's connect on LinkedIn!",
    github: "Peek at the code Rajat ships.",
    medium: "Here's Rajat on Medium.",
  },
};
