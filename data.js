/* =====================================================================
   ALL YOUR CONTENT LIVES HERE. Edit this file only — every page reads it.
   Filled from your public GitHub (yokshith09) and LinkedIn profiles.
   To update your CV: replace resume.pdf (keep the same name) and push.
   ===================================================================== */
window.SITE = {
  name: 'Yokshith',
  fullName: 'Yokshith Kuchipudi',
  role: 'AI/ML Engineer & Full-Stack Developer',
  status: 'Open to internships & full-time',
  email: 'yokshithkuchipudi09@gmail.com',
  location: 'Coimbatore, India',
  resume: 'resume.pdf',
  photo: 'yokshith.jpg',
  heroWords: ['Ship', 'Scale', 'See', 'Think'],
  intro: "I'm Yokshith, a CS undergrad at Amrita (class of 2027) building AI agents, LLM apps, computer vision and full-stack products that ship, from YOLOv8 on a Raspberry Pi to agent benchmarks and live marketplaces, with the goal of turning them into businesses.",
  stats: [
    { n: 30, plus: true,  label: 'Projects' },
    { n: 2,  plus: false, label: 'Hackathon Wins' },
    { n: 10, plus: true,  label: 'Live Apps' },
  ],
  highlight: { n: 2, plus: false, label: 'Internships', title: 'AI & Business, Both Sides', text: 'AI Development at SurgeX Digital; Business Development at Franco Rugs.' },
  shipped: { n: 30, plus: true },
  marquee: ['Machine Learning', 'Computer Vision', 'Agentic AI', 'Full-Stack Dev', 'Edge AI', 'Design Systems', 'Entrepreneurship'],

  /* Home → "Design that feels alive". `image` optional; without it a styled tile is drawn. */
  designWork: [
    { name: 'OpsMind Dashboard', text: 'Operations dashboard design system — data-dense, calm and interactive.', tag: 'Dashboard', colors: ['#1a1c1c', '#3031b6'] },
    { name: 'DRIP', text: 'Editorial fashion store with try-on and a 3D fitting room.', tag: 'E-commerce UI', image: 'shots/drip.png', url: 'https://dripivory.vercel.app', colors: ['#efeee6', '#1a1c1c'] },
    { name: 'WearShare', text: 'Warm, trustworthy marketplace for community clothing rentals.', tag: 'Marketplace UI', image: 'shots/wearshare.png', url: 'https://wearshare.qzz.io/', colors: ['#ffede6', '#ea6c11'] },
    { name: 'Pluto Landing Page', text: 'A live planet, a desktop pet and a story told through scroll.', tag: 'Landing page', colors: ['#e1e0ff', '#6f6ff0'] },
    { name: 'Pluto In-App UI/UX', text: 'Notes, tasks, meetings and a companion pet in one calm desktop app.', tag: 'Product UI/UX', colors: ['#dae2ff', '#00419f'] },
  ],

  services: [
    { icon: 'search',  title: 'ML & Computer Vision',  text: 'Dataset curation, YOLO-format annotation, training with PyTorch and YOLOv8, and self-supervised learning with SimCLR.' },
    { icon: 'bot',     title: 'Agentic AI Systems',    text: 'Multi-agent systems and MCP servers that detect, decide and act — from supply chains to industrial symbiosis.' },
    { icon: 'cursor',  title: 'Full-Stack Products',   text: 'Next.js, React and Supabase apps with auth, payments and AI features, deployed and live.' },
    { icon: 'flow',    title: 'Edge AI Deployment',    text: 'Real-time inference on constrained hardware like the Raspberry Pi 4 using ONNX Runtime.' },
    { icon: 'palette', title: 'Entrepreneurship',      text: 'Building products as businesses — from idea and market to sales, marketing and launch.' },
    { icon: 'pen',     title: 'Interactive Design Systems', text: 'Dashboards, landing pages and in-app UI/UX that feel alive — OpsMind, DRIP, WearShare and Pluto.' },
  ],

  /* Case studies. `image` = real screenshot; without it a mock preview is drawn. */
  projects: [
    { id: 'passwordpal', title: 'PasswordPal — Zero-Knowledge Password Manager', summary: 'A cross-platform desktop app where the server never sees your plaintext passwords — everything is encrypted on your device first.',
      tags: ['Security', 'Desktop'], duration: 'Personal project', role: 'Full-stack & DevOps', tools: 'React, TypeScript, Tauri, Rust, Node.js, Supabase', team: 'Solo',
      colors: ['#dae2ff', '#3031b6'], type: 'desktop',
      stats: [{ n: 34, plus: false, label: 'Automated Tests' }, { n: 3, plus: false, label: 'Operating Systems' }, { n: 256, plus: false, label: 'Bit AES-GCM' }],
      sections: [
        { title: 'Project Overview', body: ['PasswordPal is a zero-knowledge password manager: the encrypted vault is never decrypted on the server.', 'Frontend in React + TypeScript on Tauri (Rust); backend in Node.js + Express with Supabase (PostgreSQL).'] },
        { title: 'Key Design Decisions', callout: true, body: ['Security is decided by architecture, not by promises.'],
          list: ['Zero-knowledge architecture — the vault is never decrypted server-side', 'AES-256-GCM with Argon2 key derivation, implemented in Rust', 'Rust wipes key material from memory (zeroize) after use', 'Infrastructure as code with render.yaml, versioned alongside the app'] },
        { title: 'CI/CD Pipeline', body: ['A full DevOps pipeline built from scratch with GitHub Actions.'],
          list: ['Unit tests on every push — React (jsdom) + Rust, 34 tests', 'Security audit of all production dependencies', 'Auto-deploy to Render on merge to main, with health-check polling', 'Tauri matrix builds for Linux, macOS and Windows in parallel', 'GitHub Releases with native installers: .deb, .AppImage, .dmg, .exe, .msi'] },
        { title: 'What I Learned', body: ['Hands-on experience running a project from first commit to live deployment and automated cross-platform releases.'] },
      ] },
    { id: 'supplyshock', title: 'SupplyShock — Multi-Agent Supply-Chain AI', summary: 'A multi-agent system that detects supply-chain disruptions, analyses supplier exposure, recommends recovery strategies and executes approved actions.',
      tags: ['Agentic AI', 'Fetchathon 3.0'], duration: 'Hackathon', role: 'AI Engineer', tools: 'Python, Fetch.ai uAgents', team: 'Team',
      colors: ['#ffede6', '#ea6c11'], type: 'desktop', chart: 'bars', repo: 'https://github.com/yokshith09/SupplyShock-FETCHATHON-3.0',
      sections: [
        { title: 'Project Overview', body: ['Built for Fetchathon 3.0: a team of cooperating agents that manage supply-chain disruption end to end.'] },
        { title: 'Problem Statement', callout: true, body: ['When a supplier fails, teams lose time working out who is exposed and what to do next.'] },
        { title: 'How It Works', body: ['Specialised agents built on Fetch.ai uAgents split the job:'], list: ['Detect risk signals', 'Analyse supplier exposure', 'Recommend recovery strategies', 'Execute actions only after human approval'] },
      ] },
    { id: 'drip', title: 'DRIP — AI 3D Virtual Try-On', summary: 'A fashion e-commerce platform with AI virtual try-on, AI stylist chat, personalised recommendations and a 3D fitting room.',
      tags: ['AI', 'E-commerce', 'Live'], duration: 'Live product', role: 'Full-stack Developer', tools: 'TypeScript, React', team: 'Solo',
      colors: ['#f4f3ee', '#1a1c1c'], type: 'desktop', image: 'shots/drip.png', url: 'https://dripivory.vercel.app',
      sections: [
        { title: 'Project Overview', body: ['DRIP makes online clothes shopping interactive: try garments on virtually before buying.'] },
        { title: 'Features', list: ['AI virtual try-on', 'AI chatbot stylist', 'Personalised style recommendations', '3D fitting room using structural garment data'], body: [] },
        { title: 'Live', body: ['DRIP is live at dripivory.vercel.app.'] },
      ] },
    { id: 'weedplucker', title: 'WeedPlucker — YOLOv8 Edge Vision', summary: 'Weed and crop detection with YOLOv8 instance segmentation, built on a hand-annotated field dataset and aimed at robotic plucking.',
      tags: ['Computer Vision', 'Edge AI'], duration: 'Research project', role: 'ML Engineer', tools: 'Python, PyTorch, YOLOv8, ONNX Runtime', team: 'Team',
      colors: ['#b8ffb5', '#00530d'], type: 'desktop', chart: 'bars', repo: 'https://github.com/yokshith09/WeedPlucker-YOLOv8-Intelligent-Weed-Detection-Robotic-Plucking-System',
      sections: [
        { title: 'Project Overview', body: ['A precision-agriculture vision system: detect crops and weeds in real fields so a robot can pluck the weeds.'] },
        { title: 'The Dataset', callout: true, body: ['Real field images under natural lighting, with occlusions, shadows and complex backgrounds — annotated for instance segmentation.'] },
        { title: 'Model & Deployment', body: ['YOLOv8n-seg trained for high-precision detection and segmentation, exported for real-time inference on a Raspberry Pi 4 with ONNX Runtime.'] },
      ] },
    { id: 'jobhunter', title: 'Job Hunter: AI Agent Skill for Job Search and Tailored Resumes', summary: 'A portable AI agent skill that finds jobs, scores them against my profile, and builds a tailored one-page LaTeX resume for each job I approve. Works with Claude Code, Antigravity, Gemini CLI and other agents that support Agent Skills.',
      tags: ['AI Agents', 'Developer Tools'], duration: 'Personal project', role: 'Builder', tools: 'Python (stdlib only), Agent Skills (SKILL.md), LaTeX + Tectonic, HTML/JS dashboard', team: 'Solo',
      colors: ['#e1e0ff', '#3031b6'], type: 'desktop', repo: 'https://github.com/yokshith09/JOB-SEARCH-SKILL',
      sections: [
        { title: 'Project Overview', body: ['Job Hunter is an Agent Skill: a folder with a SKILL.md that any compatible coding agent can load. It runs the whole job search loop, from finding postings to a compiled, tailored resume.'],
          list: ['Pulls live postings from company career APIs (Greenhouse, Lever, Ashby) and job boards; dedupes by normalised URL so a listing is never shown twice.', 'Scores each job 0 to 100 with eligibility gates, a "why it fits" summary and honest skill gaps.'] },
        { title: 'Human in the Loop', callout: true, body: ['Nothing is prepared until I approve. Before preparing, it shows the current settings (template, projects, package parts, file name) and asks whether to continue, reset to defaults, or change them.'] },
        { title: 'Tailored Resumes', body: ['Each approved job gets its own resume, built only from facts I have provided.'],
          list: ['Picks exactly 3 projects per resume from a role to project table.', 'Writes LaTeX from my own template and compiles it with Tectonic.', 'Auto-checks the result: exactly 1 page, at least 90% filled, correct project count.', 'Never invents skills or numbers.'] },
        { title: 'Links, Tracking and Privacy', body: [],
          list: ['Only uses job links copied from sources; links that cannot be checked are marked unverified, with a company link as a fallback.', 'Saves applications in dated day folders, named by company and role.', 'Tracks status from found to offer, and serves a local dashboard on 127.0.0.1.', 'All personal data stays in ~/.job-hunter/, separate from the published skill. MIT licensed.'] },
      ] },
  ],
  ribbon: ['PasswordPal', 'SupplyShock', 'DRIP', 'WeedPlucker', 'WearShare', 'AgentArena'],

  /* Works page. `groups` = sections it appears in (AI, Machine Learning, Full-Stack, Cloud, Desktop, Robotics, Hackathons);
     `cats` are the small chips. `id` links to a case study; otherwise `url` (live) or `repo` (GitHub). */
  works: [
    // AI
    { groups: ['AI', 'Hackathons'], title: 'AgentArena', text: 'Benchmarks AI agents as black boxes: hidden tests, fault injection, cost and latency tracking. Finished 67th of 480 teams at a hackathon.', cats: ['AI Agents', 'Top 67 / 480'], repo: 'https://github.com/yokshith09/AgentArena', colors: ['#1a1c1c', '#00a825'] },
    { groups: ['AI'], id: 'jobhunter', title: 'Job Hunter', mark: 'Job Hunter', text: 'AI agent skill that finds jobs, scores them against my profile and builds a tailored one-page LaTeX resume for each job I approve.', cats: ['Agent + Skill', 'Python'], colors: ['#e1e0ff', '#3031b6'] },
    { groups: ['AI', 'Full-Stack'], id: 'drip', title: 'DRIP', text: 'AI 3D virtual try-on store: Avatar Studio, Style DNA and IDM-VTON try-on.', cats: ['AI', 'Live'], image: 'shots/drip.png', colors: ['#efeee6', '#1a1c1c'] },
    { groups: ['Full-Stack', 'Cloud'], title: 'OpsMind', text: 'GCP monitoring & support portal: logs, incidents and cost insights with Gemini explanations.', cats: ['GCP', 'Design System'], repo: 'https://github.com/yokshith09/OpsMind--GCP', colors: ['#1a1c1c', '#3031b6'] },
    { groups: ['Full-Stack'], title: 'Collab Space', text: 'AI collaboration platform: validate ideas, generate PRDs and find teammates.', cats: ['AI', 'Live'], url: 'https://collab-space-teal.vercel.app/', colors: ['#e1e0ff', '#3031b6'] },
    { groups: ['AI'], title: 'PACT', text: 'Shared project memory and module contracts for developers and AI coding agents, with impact analysis and MCP integration. Building now.', cats: ['MCP', 'In progress'], repo: 'https://github.com/yokshith09/PACT', colors: ['#ffede6', '#3031b6'] },
    { groups: ['Desktop'], title: 'Pluto', text: 'Local-first desktop productivity companion in Tauri v2 + React, with a desktop pet. Building now.', cats: ['Tauri', 'In progress'], repo: 'https://github.com/yokshith09/PLUTO-DESKTOP-PRODUCTIVITY-COMPANION', colors: ['#dae2ff', '#6f6ff0'] },
    { groups: ['Desktop', 'Hackathons'], title: 'Pluto Voice', text: 'Voice-driven desktop companion in Rust, built for the Gnani.ai Hackathon.', cats: ['Rust', 'Gnani.ai'], repo: 'https://github.com/yokshith09/PLUTO-VOICE', colors: ['#e1e0ff', '#3031b6'] },
    // Machine Learning
    { groups: ['Machine Learning'], id: 'weedplucker', title: 'WeedPlucker', text: 'YOLOv8 weed segmentation (0.953 weed mAP@50) guiding a robot arm, on Raspberry Pi.', cats: ['YOLOv8', 'Edge AI'], colors: ['#b8ffb5', '#00530d'] },
    { groups: ['Machine Learning'], title: 'Cauliflower Segmentation', text: 'YOLOv8n-seg model for precise cauliflower detection and instance segmentation.', cats: ['YOLOv8', 'Vision'], repo: 'https://github.com/yokshith09/cauliflower_detection', colors: ['#efeee6', '#594400'] },
    { groups: ['Machine Learning'], title: 'Diabetic Retinopathy Detection', text: 'Deep learning on retinal images to detect diabetic retinopathy.', cats: ['Medical AI', 'CNN'], repo: 'https://github.com/yokshith09/Advanced-Diabetic-Retinopathy-Detection', colors: ['#b8ffb5', '#00a825'] },
    { groups: ['Machine Learning'], title: 'Fake Currency Detection', text: 'LBP texture features and a Random Forest classifier: 77% accuracy.', cats: ['Image Processing'], repo: 'https://github.com/yokshith09/FAKE-CURRENCY-DETECTION-USING-MACHINE-LEARNING-AND-IMAGE-PROCESSING-TECHNIQUES', colors: ['#ffdf92', '#594400'] },
    // Full-Stack
    { groups: ['Desktop'], id: 'passwordpal', title: 'PasswordPal', text: 'Zero-knowledge password manager: AES-256-GCM, Argon2id, TOTP MFA, 34 tests, CI/CD.', cats: ['Tauri', 'Security'], colors: ['#dae2ff', '#3031b6'] },
    { groups: ['Full-Stack'], title: 'WearShare', text: 'P2P fashion rental marketplace: OTP auth, Razorpay, Groq/Gemini assistant with pgvector.', cats: ['Next.js', 'Live'], image: 'shots/wearshare.png', url: 'https://wearshare.qzz.io/', colors: ['#ffede6', '#ea6c11'] },
    { groups: ['Full-Stack'], title: 'Secure Travel Itinerary', text: 'Flask + MongoDB app with MFA, RBAC, AES-256 and RSA-2048 signatures.', cats: ['Flask', 'Security'], url: 'https://secured-travel-iternary.vercel.app', colors: ['#dae2ff', '#3031b6'] },
    { groups: ['Full-Stack'], title: 'Student Performance Tracker', text: 'Flask app to manage students, track grades and generate reports.', cats: ['Flask', 'Live'], url: 'https://student-performance-tracker-3sil.onrender.com', colors: ['#e1e0ff', '#3031b6'] },
    { groups: ['Full-Stack'], title: 'Atelier', text: 'Clothes rental platform front end.', cats: ['React', 'Live'], url: 'https://atelier-clothes-rental-platform-fro.vercel.app/', colors: ['#efeee6', '#ca36b2'] },
    // Robotics
    { groups: ['Robotics'], title: 'Autonomous Quadruped SLAM', text: 'Quadruped robot exploring unknown spaces with multi-agent SLAM, depth perception and frontier exploration.', cats: ['SLAM', 'CoppeliaSim'], repo: 'https://github.com/yokshith09/Autonomous-Quadruped-SLAM-Navigation-Perception', colors: ['#dae2ff', '#00419f'] },
    { groups: ['Robotics'], title: 'Smart Pet Food & Door Automation', text: 'Automated pet feeding and door control system.', cats: ['IoT'], repo: 'https://github.com/yokshith09/Smart-Pet-Food-Monitoring-and-Door-Automation-System', colors: ['#ffede6', '#e32e25'] },
    // Hackathons
    { groups: ['AI', 'Hackathons'], id: 'supplyshock', title: 'SupplyShock: Winner', text: 'Fetch-A-Thon 3.0 winner, Best Agentverse Deployment. Multi-agent supply-chain disruption system.', cats: ['Fetch.ai', 'Win'], colors: ['#ffede6', '#ea6c11'] },
    { groups: ['AI', 'Hackathons'], title: 'SymBioForge: 2nd Place', text: 'NitroStack Agentic AI Hackathon, Manufacturing & Industry 4.0 track. Industrial symbiosis MCP platform.', cats: ['MCP', '2nd Place'], image: 'shots/symbioforge.png', url: 'https://sym-bio-forge.vercel.app/', colors: ['#ffdf92', '#ea6c11'] },
    { groups: ['Hackathons'], title: 'Exam Whisperer', text: 'Team CREED’s first AI-powered prototype, built at Code Cubicle.', cats: ['AI'], colors: ['#ffede6', '#ca36b2'] },
  ],

  /* (no longer shown; the Works page uses `works` above) */
  showcase: [
    { title: 'SymBioForge — 2nd Place', text: '2nd place, Manufacturing & Industry 4.0 track, NitroStack 24-hour Agentic AI Hackathon, with Team CREED.', tag: 'Hackathon Win', colors: ['#ffdf92', '#ea6c11'] },
    { title: 'SupplyShock: Winner', text: 'Fetch-A-Thon 3.0, Best Agentverse Deployment category.', tag: 'Hackathon Win', colors: ['#e1e0ff', '#3031b6'] },
    { title: 'Exam Whisperer', text: 'Team CREED’s first AI-powered prototype, built at Code Cubicle.', tag: 'Hackathon', colors: ['#ffede6', '#ca36b2'] },
    { title: 'Autonomous Quadruped SLAM', text: 'A quadruped robot exploring unknown spaces with multi-agent SLAM, depth perception and frontier exploration in CoppeliaSim.', tag: 'Robotics', colors: ['#dae2ff', '#00419f'] },
    { title: 'Diabetic Retinopathy Detection', text: 'Deep learning on retinal images to detect diabetic retinopathy.', tag: 'Medical AI', colors: ['#b8ffb5', '#00a825'] },
    { title: 'Fake Currency Detection', text: 'Texture, histogram and edge features with LBP and a Random Forest classifier — 77% accuracy.', tag: 'Machine Learning', colors: ['#efeee6', '#594400'] },
  ],

  /* Live products + what you're building now */
  live: [
    { name: 'DRIP', text: 'AI fashion store with virtual try-on, an AI stylist and a 3D fitting room.', url: 'https://dripivory.vercel.app', image: 'shots/drip.png', metric: 'Live', tags: ['AI', 'E-commerce'], colors: ['#efeee6', '#1a1c1c'] },
    { name: 'WearShare', text: 'Peer-to-peer rental marketplace for premium ethnic and occasion wear.', url: 'https://wearshare.qzz.io/', image: 'shots/wearshare.png', metric: 'Live', tags: ['Next.js', 'Supabase', 'Razorpay'], colors: ['#ffede6', '#ea6c11'] },
    { name: 'Collab Space', text: 'AI collaboration platform: validate ideas, generate PRDs, find teammates and visualise architectures.', url: 'https://collab-space-teal.vercel.app/', metric: 'Live', tags: ['AI', 'Teams'], colors: ['#e1e0ff', '#3031b6'] },
  ],
  building: [
    { name: 'Pluto — Desktop Productivity Companion', text: 'A local-first desktop companion for notes, tasks, meetings and daily work logs — with a desktop pet. Voice features in Rust.', tags: ['TypeScript', 'Rust', 'Local-first'], url: 'https://github.com/yokshith09/PLUTO-DESKTOP-PRODUCTIVITY-COMPANION' },
    { name: 'PACT — Project Intelligence & Contracts', text: 'A developer tool where humans and AI coding agents share structured project memory and agree on module contracts: dependency and ownership tracking, contract-change impact analysis, implementation verification, and MCP integration. Goal: less context loss and fewer integration failures in AI-assisted teams.', tags: ['MCP', 'AI Agents', 'Dev Tools'], url: 'https://github.com/yokshith09/PACT' },
  ],

  /* slug = icon name on simpleicons.org */
  tools: [
    ['pytorch', 'EE4C2C', '#fbdcd6', 'PyTorch & YOLOv8', 'Training and deploying vision models — YOLOv8, SimCLR, ONNX Runtime on Raspberry Pi.'],
    ['python', '3776AB', '#f3e8c4', 'Python & Agents', 'Multi-agent systems, MCP servers, data pipelines and backend services.'],
    ['react', '149ECA', '#d4ecf5', 'React, Next.js & Rust', 'Production web apps and Tauri desktop apps with real CI/CD.'],
    ['typescript', '3178C6', '#d6e2f3'], ['nextdotjs', '111111', '#e2e0dc'], ['rust', '000000', '#ead9cc'], ['tauri', '24C8D8', '#d3f1f4'],
    ['supabase', '3ECF8E', '#d3f1e3'], ['opencv', '5C3EE8', '#dedaf9'], ['raspberrypi', 'A22846', '#f3d6dd'], ['onnx', '005CED', '#d4e3fa'], ['claude', 'D97757', '#f6ddd2'],
  ],
  languages: [['English', 95], ['Telugu', 100], ['Hindi', 70], ['Tamil', 55]],   // not in CV: edit if wrong
  process: ['Ideas', 'Data', 'Design', 'Build', 'Ship', 'Scale'],
  craftLine: "I don't build to impress. I build to express, solve, and simplify.",

  faq: [
    ['What roles are you looking for?', 'Internships and full-time roles in Machine Learning / Computer Vision, Data Science & Analytics, Python Development and Business Analysis.'],
    ['What do you build best?', 'End-to-end ML (data → model → edge deployment), multi-agent AI systems, and full-stack products that go live.'],
    ['Can I see the code?', 'Yes — most projects are public on GitHub at github.com/yokshith09.'],
    ['Do you work in teams?', "Yes. I've built hackathon projects with Team CREED and interned on both the AI and business sides."],
    ['How do I reach you?', 'Use the form below or email yokshithkuchipudi09@gmail.com — I reply quickly.'],
  ],
  social: [
    ['GitHub', 'https://github.com/yokshith09'],
    ['LinkedIn', 'https://www.linkedin.com/in/yokshith-kuchipudi-67a0452b3/'],
    ['Blog', 'https://www.blogger.com/profile/17676293803354109846'],
    ['Email', 'mailto:yokshithkuchipudi09@gmail.com'],
  ],

  /* About page */
  about: {
    bio: "I'm a Computer Science undergraduate at Amrita Vishwa Vidyapeetham (graduating 2027) building across AI agents, LLM applications, machine learning, computer vision and full-stack development. I ship working products with FastAPI, PostgreSQL and cloud services, and I measure them: agents and models judged on task success, reliability, cost and latency. My work ranges from AgentArena, a benchmarking platform for AI agents, to WeedPlucker's YOLOv8 segmentation on a Raspberry Pi, to live products like WearShare and DRIP. I won Fetch-A-Thon 3.0 and placed 2nd at the NitroStack Agentic AI Hackathon. I love designing interactive, beautiful systems (dashboards, landing pages, in-app UI/UX), and I'm driven by entrepreneurship: my goal is to build products into businesses. Outside tech I'm an NSS volunteer, and I play cricket and act.",
    experience: [
      { company: 'SurgeX Digital', role: 'AI Development Intern · AI-assisted lead generation', from: 'Aug 2026', to: 'Sep 2026', color: ['#dae2ff', '#3031b6'] },
      { company: 'Franco Rugs', role: 'Business Development Intern · Bhadohi / Remote', from: 'Nov 2025', to: 'May 2026', color: ['#ffede6', '#e32e25'] },
      { company: 'National Service Scheme', role: 'Volunteer · Social Services', from: 'Oct 2024', to: 'Present', color: ['#b8ffb5', '#00530d'] },
    ],
    education: [
      { title: 'B.Tech, Computer Science & Engineering', place: 'Amrita Vishwa Vidyapeetham, Coimbatore', from: '2023', to: '2027' },
      { title: 'Class XII · 96%', place: 'Telangana State Board of Intermediate Education', from: '2023', to: '2023' },
    ],
    certs: [
      { title: 'Nitrostack MCP Creator', place: 'Nitrostack', time: 'Jul 2026', url: 'https://nitrostack.ai/university/6a54bc7ccc0a343237365fb3/certificate/6a645749b7c23ca10dd2042b' },
    ],
    skills: {
      'Generative AI & Agents': ['LLM Integration', 'Prompt Engineering', 'RAG', 'Embeddings', 'Vector Search', 'Multi-Agent Systems', 'Tool Calling', 'MCP', 'Agent Benchmarking', 'Groq', 'Gemini', 'NitroStack', 'Fetch.ai uAgents'],
      'ML & Computer Vision': ['PyTorch', 'scikit-learn', 'YOLOv8', 'CNNs', 'Vision Transformers', 'Transfer Learning', 'SimCLR', 'OpenCV', 'Instance Segmentation', 'Grad-CAM', 'Quantization', 'ONNX Runtime'],
      'Backend & Data': ['Python', 'FastAPI', 'REST APIs', 'JWT / OTP / TOTP', 'Argon2 & bcrypt', 'Razorpay', 'PostgreSQL', 'Supabase', 'pgvector', 'Redis', 'SQL'],
      'Cloud & DevOps': ['GCP Cloud Run', 'Cloud Build', 'Cloud Monitoring', 'Docker', 'GitHub Actions', 'Vercel', 'Render', 'Linux', 'Git'],
      'Security': ['AES-256-GCM', 'Argon2id', 'Zero-Knowledge Architecture'],
      'Business': ['Sales Outreach', 'Cold Calling', 'Competitor Benchmarking', 'B2B Strategy'],
    },
    hobbies: [['🏏', 'Cricket'], ['🎭', 'Acting'], ['🤝', 'Volunteering'], ['🤖', 'Robotics'], ['📚', 'Learning'], ['🚀', 'Hackathons']],
  },
};
