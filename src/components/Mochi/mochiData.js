// Mochi's entire brain: predefined responses + simple keyword matching.
// No AI, no network calls, no storage. Everything here is static data.

export const CONTACT = {
  email: "rashmiisingh261@gmail.com",
  linkedin: "https://www.linkedin.com/in/rashmi-singh-5610b31b9/",
  github: "https://github.com/Rashmi1526",
  portfolio: "https://rashmisingh.netlify.app/",
};

export const GREETING = [
  "Hiii! Welcome to Rashmi's little corner of the internet! 🌸\n\nI'm Mochi, her tiny digital assistant.\n\nShe's probably busy securing networks, automating things or exploring something new right now.\n\nBut don't worry, I'll help you explore her work!\n\nFirst things first... who are you? 👀",
];

// Action helpers (rendered as small pill buttons under a message).
const A = {
  email: { label: "Email Rashmi 💌", href: `mailto:${CONTACT.email}` },
  linkedin: { label: "LinkedIn", href: CONTACT.linkedin, external: true },
  github: { label: "GitHub", href: CONTACT.github, external: true },
  portfolio: { label: "Portfolio", href: CONTACT.portfolio, external: true },
  resume: { label: "Download Resume 📄", resume: true },
  fullExperience: { label: "Explore full experience", to: "/resume" },
  projectsPage: { label: "See Projects page", to: "/project" },
  aboutPage: { label: "Visit About page", to: "/about" },
};

// Reusable text blocks. "- " lines render as bullets, **x** as bold.
const PALO_ALTO = [
  "**Palo Alto Networks**",
  "Technical Consulting Engineer | August 2026 – Present",
  "- Works within the Focused Services team.",
  "- Manages 10+ enterprise customer accounts.",
  "- Maintains 95%+ customer satisfaction.",
  "- Handles complex network security troubleshooting and technical escalations.",
  "- Conducts biweekly stakeholder meetings.",
  "- Develops AI-driven automation using Python and REST APIs.",
  "- Reduced manual troubleshooting effort by 45%.",
  "- Increased error identification by 30%.",
].join("\n");

const CISCO = [
  "**Cisco**",
  "Security Consulting Engineer | January 2023 – August 2026",
  "- Enterprise VPN and network security troubleshooting.",
  "- Experience across 1,000+ endpoints and 300+ sites.",
  "- Python automation reducing manual troubleshooting effort by 35–45%.",
  "- Contributed to Project Sherlock's TAC automation workflows.",
  "- Authored Cisco Knowledge Base articles used globally.",
].join("\n");

const SKILLS = [
  "**Networking**\nTCP/IP, BGP, OSPF, NAT, DHCP, DNS, VLANs, DMVPN, IPsec, IKEv1/v2, SSL VPN, AnyConnect.",
  "**Network Security**\nPAN-OS, Prisma Access, Next-Generation Firewalls, Zero Trust Architecture, SSE, ZTNA, SSO, SAML, MFA, Cisco Secure Access, SD-WAN.",
  "**Programming & Automation**\nPython, C++, JavaScript, REST APIs, Netmiko, Multithreading, Async Programming, AI-driven Automation.",
  "**Systems & Troubleshooting**\nLinux, Bash, Systemd, TCP/IP Stack, Packet Analysis, Wireshark, tcpdump.",
];

const PROJECTS = [
  "**DMVPN Deployment Automation**\n- Python, Netmiko, Cisco IOS/IOS-XE.\n- Automated provisioning of 1,000+ tunnels.\n- Reduced manual effort by 70%.",
  "**Network Monitoring & Diagnostics Toolkit**\n- Python, Linux and Networking.\n- Automated connectivity validation, DNS testing, route verification and latency monitoring.",
];

const CERTS =
  "**Certifications**\n- CCNP Security — Valid until October 2028.\n- CCNA — Valid until October 2028.\n- Cisco DevNet Associate — Valid until June 2028.";

// Follow-up option sets shown after an answer.
export const MENUS = {
  start: [
    { label: "Recruiter / Hiring Manager 🧑‍💼", next: "recruiter" },
    { label: "Fellow Engineer 💻", next: "engineer" },
    { label: "Potential Collaborator 🤝", next: "collaborator" },
    { label: "Just a curious visitor 🌷", next: "curious" },
  ],
  recruiter: [
    { label: "Professional Experience", next: "experience" },
    { label: "Technical Skills", next: "skills" },
    { label: "Projects", next: "projects" },
    { label: "Certifications", next: "certs" },
    { label: "Download Resume", next: "resume" },
    { label: "Would I hire Rashmi?", next: "wouldHire" },
  ],
  engineer: [
    { label: "VPN Technologies", next: "vpn" },
    { label: "DMVPN Automation", next: "dmvpn" },
    { label: "Network Security", next: "netsec" },
    { label: "SASE and Prisma Access", next: "sase" },
    { label: "Python Automation", next: "pyauto" },
    { label: "Project Sherlock", next: "sherlock" },
  ],
  collaborator: [
    { label: "Technical Projects", next: "collabProjects" },
    { label: "Automation Ideas", next: "collabAutomation" },
    { label: "Cybersecurity Discussions", next: "collabSecurity" },
    { label: "Something Else", next: "collabElse" },
  ],
  curious: [
    { label: "Who is Rashmi?", next: "about" },
    { label: "What does she do?", next: "whatDoes" },
    { label: "What does she enjoy?", next: "enjoy" },
    { label: "Show me something interesting.", next: "funFacts" },
    { label: "Contact Rashmi.", next: "contact" },
  ],
};

const BACK = { label: "Back to start 🌸", next: "backToStart" };

// Every answer Mochi can give. `texts` = one chat bubble each.
// `menu` = which follow-up options to show (defaults to the visitor's role menu).
// `options` = explicit options (overrides menu). `role` = sets the visitor role.
export const NODES = {
  // ---------- visitor categories ----------
  recruiter: {
    role: "recruiter",
    texts: [
      "Ooooh, a potential hiring manager! 👀\n\nYou've come to the right place. Let me introduce you to Rashmi's professional side.\n\nWhat would you like to explore?",
    ],
    menu: "recruiter",
  },
  engineer: {
    role: "engineer",
    texts: [
      "Yayyy! A fellow techie! 💻\n\nFinally, someone I can talk to about packets, tunnels and things that make networks cry. 😂\n\nWhat are you interested in?",
    ],
    menu: "engineer",
  },
  collaborator: {
    role: "collaborator",
    texts: [
      "Ooooh, new connections! 🤝\n\nRashmi is always interested in learning, exchanging ideas and exploring interesting technical projects.\n\nWhat kind of collaboration are you thinking about?",
    ],
    menu: "collaborator",
  },
  curious: {
    role: "curious",
    texts: ["Just exploring? That's perfectly fine! 🌷\n\nHere's a tiny introduction to Rashmi."],
    menu: "curious",
  },
  backToStart: {
    role: null,
    texts: ["Fresh start! 🌸 So... who are you? 👀"],
    menu: "start",
  },
  greetingAgain: {
    texts: ["Hiii again! 🌸 I'm Mochi, Rashmi's tiny digital assistant.\n\nWho are you? 👀"],
    menu: "start",
  },

  // ---------- recruiter ----------
  experience: {
    texts: [PALO_ALTO, CISCO],
    actions: [A.fullExperience],
  },
  paloalto: { texts: [PALO_ALTO], actions: [A.fullExperience] },
  cisco: { texts: [CISCO], actions: [A.fullExperience] },
  skills: { texts: SKILLS },
  projects: { texts: PROJECTS, actions: [A.projectsPage, A.github] },
  certs: { texts: [CERTS] },
  resume: {
    texts: ["Here you go! Rashmi's resume, fresh and ready to download. 📄✨"],
    actions: [A.resume, A.linkedin],
  },
  wouldHire: {
    texts: [
      "Well, I'm obviously biased because Rashmi pays my imaginary salary. 😂\n\nBut let's look at the facts:\n- Cisco enterprise security experience.\n- Palo Alto Networks Focused Services experience.\n- Hands-on VPN and SASE knowledge.\n- Python automation.\n- AI-driven troubleshooting.\n- Measurable operational improvements.\n\nSo... I'd say she's worth an interview! But I'm just the assistant. The final decision is yours. 🌸",
    ],
    options: [
      { label: "Absolutely! Show me her resume.", next: "resume" },
      { label: "Interesting! I want to know more.", next: "moreRecruiter" },
      { label: "I need more convincing!", next: "convince" },
    ],
  },
  moreRecruiter: {
    role: "recruiter",
    texts: ["Love the curiosity! 🌸 Pick a topic and I'll dig in."],
    menu: "recruiter",
  },
  convince: {
    texts: [
      "Fair enough! Let me bring the receipts. 🧾",
      PALO_ALTO,
      CISCO,
    ],
    actions: [A.resume, A.email],
    menu: "recruiter",
  },

  // ---------- engineer ----------
  vpn: {
    texts: [
      "VPNs are where Rashmi's journey began! 🔐\n\nAt Cisco she did enterprise VPN and network security troubleshooting across 1,000+ endpoints and 300+ sites.\n\nThe toolbox: IPsec, IKEv1/v2, SSL VPN, AnyConnect and DMVPN.",
    ],
  },
  dmvpn: {
    texts: [
      "**DMVPN Deployment Automation** 🚇\n- Python, Netmiko, Cisco IOS/IOS-XE.\n- Automated provisioning of 1,000+ tunnels.\n- Reduced manual effort by 70%.\n\nTranslation: fewer humans typing the same config 1,000 times. The tunnels are grateful. 😂",
    ],
  },
  netsec: {
    texts: [
      "Network security is the common thread through Rashmi's career. 🛡️\n\nShe started with VPN and network security troubleshooting at Cisco, and now handles complex troubleshooting and technical escalations for enterprise customers at Palo Alto Networks.\n\nHer toolbox includes PAN-OS, Next-Generation Firewalls, Zero Trust Architecture, SSO, SAML and MFA.",
    ],
  },
  sase: {
    texts: [
      "SASE is where her interests have been heading! ☁️\n\nShe moved from traditional networking and VPN infrastructure toward Zero Trust, SASE and cloud-delivered security.\n\nRelevant tools on her list: Prisma Access, ZTNA, SSE, Cisco Secure Access and SD-WAN.\n\nAt Palo Alto Networks she works in the Focused Services team on enterprise customer accounts.",
    ],
  },
  pyauto: {
    texts: [
      "Python is Rashmi's automation sidekick. 🐍\n- At Cisco: Python automation reduced manual troubleshooting effort by 35–45%.\n- At Palo Alto Networks: AI-driven automation using Python and REST APIs reduced manual troubleshooting effort by 45% and increased error identification by 30%.\n- Also: Netmiko, multithreading and async programming.",
    ],
    actions: [A.projectsPage],
  },
  sherlock: {
    texts: [
      "Project Sherlock! 🕵️\n\nRashmi contributed to its TAC automation workflows while at Cisco.\n\nHonest Mochi moment: that's all the detail I've got. For the deep dive, ask Rashmi directly!",
    ],
    actions: [A.email, A.linkedin],
  },

  // ---------- collaborator ----------
  collabProjects: {
    texts: [
      "Technical projects? Yes please! 🛠️\n\nRashmi has worked with Python, Netmiko, REST APIs and JavaScript, so networking, automation and web ideas all sound fun.\n\nSend her a note with your idea!",
    ],
    actions: [A.email, A.linkedin],
  },
  collabAutomation: {
    texts: [
      "Automation ideas are Rashmi's happy place. 🤖\n\nShe's built Python automation to cut manual troubleshooting effort and works on AI-driven automation with REST APIs and log analysis.\n\nGot an idea? Tell her!",
    ],
    actions: [A.email, A.linkedin],
  },
  collabSecurity: {
    texts: [
      "Cybersecurity chats? Count her in. 🔒\n\nVPN, Zero Trust and SASE are her favourite topics to nerd out about.\n\nSay hi and start the discussion!",
    ],
    actions: [A.email, A.linkedin],
  },
  collabElse: {
    texts: [
      "Something else? Mysterious, I like it. ✨\n\nThe best way to reach Rashmi is a direct message.",
    ],
    actions: [A.email, A.linkedin],
  },

  // ---------- curious ----------
  about: {
    texts: [
      "Rashmi Singh is from Varanasi, India. 🌸\n\nShe's a Technical Consulting Engineer at Palo Alto Networks, working in the Focused Services team. Her journey began at Cisco, where she built her foundation in networking, VPN technologies and network security.\n\nThese days she's exploring the intersection of AI and cybersecurity.",
    ],
    actions: [A.aboutPage],
  },
  whatDoes: {
    texts: [
      "At Palo Alto Networks, Rashmi helps enterprise customers with complex network security challenges, manages technical escalations and strengthens their security posture. 🛡️\n\nShe also works on internal automation using Python, REST APIs, automated log analysis and AI-assisted troubleshooting.",
    ],
  },
  enjoy: {
    texts: [
      "Outside of work, Rashmi loves:\n- 🏓 Playing table tennis\n- 📚 Reading self-help books\n- 💃 Dancing\n- ✈️ Travelling and exploring new places\n- 🥾 Hiking and learning new things",
    ],
  },
  funFacts: {
    texts: [
      "A few fun facts! 🎀\n- 🏓 Rashmi represented her state in professional table tennis.\n- 🎌 She enjoys anime and manga.\n- 🥾 She loves travelling and hiking.\n- 🍳 She enjoys cooking and learning new technologies.",
    ],
  },
  contact: {
    texts: [
      `Here's how to reach Rashmi! 💌\n\n- Email: ${CONTACT.email}\n- LinkedIn: ${CONTACT.linkedin}\n- GitHub: ${CONTACT.github}\n- Portfolio: ${CONTACT.portfolio}`,
    ],
    actions: [A.email, A.linkedin, A.github],
  },
  linkedin: {
    texts: ["Here's Rashmi's LinkedIn! 💼"],
    actions: [A.linkedin],
  },
  github: {
    texts: ["Here's Rashmi's GitHub! 🐙"],
    actions: [A.github],
  },
  website: {
    texts: ["You're already here, but here's the link in case you want to share it! 🌸"],
    actions: [A.portfolio],
  },
  mochi: {
    texts: [
      "I'm Mochi, Rashmi's tiny digital assistant! 🌸\n\nI'm powered by a pile of predefined answers and simple keyword matching. No AI, no tokens, no cloud bill. I'll tell you honestly when I don't know something.",
    ],
  },
  thanks: {
    texts: ["Aww, anytime! 🌸 Anything else you'd like to know?"],
  },
  bye: {
    texts: ["Bye bye! 👋 Thanks for visiting Rashmi's corner of the internet. 🌸"],
  },
};

// Used when nothing matches. First one is the exact signature message.
export const FALLBACKS = [
  "Oh nooo! You've officially exceeded my tiny brain capacity. 🥲\n\nMy AI budget is currently ₹0, so I can't answer that one yet. Maybe ask Rashmi directly?\n\n💌 " +
    CONTACT.email,
  "Hmm, my tiny brain just did a 404. 🫠\n\nI only know what's been written in my little script. Rashmi can answer this one properly!\n\n💌 " +
    CONTACT.email,
  "That's a great question and I have absolutely no idea. 😅\n\nI'm a scripted chatbot with a ₹0 budget. Try one of the buttons below, or ask Rashmi directly!\n\n💌 " +
    CONTACT.email,
  "My circuits are blushing, but I can't answer that. 🌸\n\nI'm only good for Rashmi's work, skills and fun facts. For anything else, email her!\n\n💌 " +
    CONTACT.email,
];

// Keyword rules, checked top to bottom: the FIRST match wins, so more
// specific topics are listed before general ones.
const RULES = [
  { node: "wouldHire", re: /\b(would (i|you|we) hire|should (i|we) hire|worth hiring|hire her)\b/ },
  { node: "greetingAgain", re: /^\s*(hi+|hello+|hey+|hola|yo|sup|namaste|good (morning|afternoon|evening))\b[\s!.?]*$/ },
  { node: "thanks", re: /\b(thanks|thank you|thx|ty)\b/ },
  { node: "bye", re: /^\s*(bye+|goodbye|see you|cya)\b/ },
  { node: "mochi", re: /\b(who are you|what are you|your name|who is mochi|what is mochi|are you (an )?(ai|bot|real))\b/ },

  { node: "linkedin", re: /\blinked ?in\b/ },
  { node: "github", re: /\bgit ?hub\b/ },
  { node: "website", re: /\b(website|portfolio|site) (link|url)\b|\blink to (her |your |the )?(website|portfolio|site)\b/ },
  { node: "resume", re: /\b(resume|resumes|cv|curriculum vitae)\b/ },
  { node: "contact", re: /\b(contact|e-?mail|reach|get in touch|message her|talk to her)\b/ },
  { node: "recruiter", re: /\b(hire|hiring|recruit\w*|job opening|opportunit\w*)\b/ },
  { node: "collaborator", re: /\b(collab\w*|work together|partner\w*)\b/ },

  { node: "sherlock", re: /\bsherlock\b/ },
  { node: "dmvpn", re: /\bdmvpn\b/ },
  { node: "sase", re: /\b(sase|prisma|sse|ztna|zero trust|secure access|sd-?wan|cloud security)\b/ },
  { node: "vpn", re: /\b(vpns?|ipsec|ikev?[12]?|anyconnect|ssl vpn|tunnels?)\b/ },
  { node: "paloalto", re: /\b(palo[ -]?alto|pan-?os)\b/ },
  { node: "cisco", re: /\bcisco\b/ },
  { node: "pyauto", re: /\b(python|automation|automate|automating|netmiko|rest ?api|scripting)\b/ },
  { node: "netsec", re: /\b(network security|cyber ?security|security|firewalls?|ngfw|saml|mfa|sso)\b/ },

  { node: "certs", re: /\b(certif\w*|ccnp|ccna|devnet|ccie)\b/ },
  { node: "skills", re: /\b(skills?|tech stack|technolog\w+|tools?|expertise|good at|languages?)\b/ },
  { node: "projects", re: /\b(projects?|portfolio|toolkit)\b/ },
  { node: "experience", re: /\b(experience|work history|career|jobs?|worked|employment|background)\b/ },

  { node: "funFacts", re: /\b(fun facts?|interesting|table tennis|ping pong|anime|manga|cooking|hiking|travel\w*)\b/ },
  { node: "enjoy", re: /\b(enjoy|hobby|hobbies|free time)\b/ },
  { node: "whatDoes", re: /\b(what does (she|rashmi) do|her role|current role|what do (she|you) do|where does she work|works? at)\b/ },
  { node: "about", re: /(\b(who is rashmi|who's rashmi|about rashmi|about her)\b|^\s*rashmi( singh)?\s*[?!.]*$)/ },
];

export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9'+\-\s?.!]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Returns a node id, or null when nothing in the script matches.
export function matchTopic(text) {
  const q = normalize(text);
  if (!q) return null;
  for (const rule of RULES) {
    if (rule.re.test(q)) return rule.node;
  }
  return null;
}

// Alternates the signature message with the funny variants. The very first
// unknown question always gets the exact signature message.
export function pickFallback(count) {
  if (count % 2 === 0) return FALLBACKS[0];
  const alts = FALLBACKS.slice(1);
  return alts[Math.floor(count / 2) % alts.length];
}

// Resolve the follow-up options for a node.
export function optionsFor(node, role) {
  if (node.options) return node.options;
  const key = node.menu || (role && MENUS[role] ? role : "start");
  const list = MENUS[key];
  return key === "start" ? list : [...list, BACK];
}

export function startOptions() {
  return MENUS.start;
}
