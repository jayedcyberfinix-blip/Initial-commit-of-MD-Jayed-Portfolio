import { PortfolioData, UserProfileInput } from '../types';

export const defaultProfile: UserProfileInput = {
  name: 'MD Jayed',
  title: 'CSE Student at Islamic University (IU) • Cybersecurity & Ethical Hacking • AI & Web Developer',
  experience: 'CSE Undergrad at Islamic University, Bangladesh (IU) | Active CTF Player & Security Researcher',
  skills: 'Ethical Hacking, Web App Security (OWASP Top 10), Nmap, Burp Suite, Python Security Scripting, React, TypeScript, Node.js, Tailwind CSS, Gemini AI API, Google Forms & Digital Surveys, Linux (Kali/Ubuntu)',
  projects: 'Developed AI-powered Web Vulnerability Scanner, Cryptographic Auth System, and IU Student Academic Resource Platform.',
  targetAudience: 'Tech Companies, Security Teams, Startup Founders, Research Collaborators, Global Freelance Clients',
  tone: 'Professional, passionate, technically rigorous, ethical, and forward-thinking',
};

export const defaultPortfolioData: PortfolioData = {
  profile: defaultProfile,
  hero: {
    badge: 'CSE @ Islamic University, Bangladesh (IU) • Ethical Hacker & Web Dev',
    headline: 'Engineering Secure Systems, Ethical Hacking & Building Intelligent Web Apps.',
    subheadline:
      'I am MD Jayed, a Computer Science & Engineering student at Islamic University (IU), Bangladesh. I specialize in offensive & defensive cybersecurity, ethical hacking, and crafting modern, AI-integrated full-stack web applications.',
    primaryCta: 'Hire / Collaborate With Me',
    secondaryCta: 'Explore Security & Web Projects',
    uxLayoutNote:
      'High-impact hero section showcasing real academic background at Islamic University, Bangladesh, offensive/defensive cybersecurity skills, and direct contact options.',
  },
  about: {
    bioParagraph1:
      'I am MD Jayed, an undergraduate Computer Science and Engineering (CSE) student at Islamic University, Bangladesh (IU), Kushtia. Driven by a deep curiosity about how software breaks and how to defend it, I focus on cybersecurity, penetration testing, ethical hacking, and secure software development.',
    bioParagraph2:
      'Beyond cybersecurity, I build fast, modern full-stack web applications infused with Artificial Intelligence (Gemini API). I believe in building software that is not only visually polished and high-converting, but also architecturally secure, resilient against vulnerabilities, and scalable for real-world impact.',
    stats: [
      {
        value: 'B.Sc. CSE',
        label: 'Academic Background',
        subtext: 'Computer Science & Engineering',
      },
      {
        value: 'AI + Web',
        label: 'Modern Tech Stack',
        subtext: 'React, Node.js, Python, Gemini API',
      },
      {
        value: 'OWASP & CTF',
        label: 'Cybersecurity Focus',
        subtext: 'Web security & penetration testing',
      },
      {
        value: '3 Campus Clubs',
        label: 'Leadership & Research',
        subtext: 'Science, CPU & Cyber Security',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Engineering (B.Sc. in CSE)',
        institutionOrBoard: 'Islamic University (IU), Kushtia, Bangladesh',
        field: 'Computer Science & Engineering',
        result: 'Undergraduate (Enrolled / Ongoing)',
        statusOrYear: 'Ongoing',
        institutionUrl: 'https://www.iu.ac.bd',
        highlights: [
          'Core subjects: Data Structures, Algorithms, DBMS, Computer Networks, OS, Cryptography',
          'Cybersecurity research & ethical hacking workshops',
          'Competitive programming & full-stack software development',
        ],
      },
      {
        degree: 'Higher Secondary Certificate (HSC)',
        institutionOrBoard: 'Govt. Yasin College',
        field: 'Science Group',
        result: 'GPA 4.75 / 5.00',
        statusOrYear: 'Completed',
        institutionUrl: 'https://www.facebook.com/share/g/1Awv9Z3tfW/',
        highlights: [
          'High achievement in Higher Mathematics, Physics, Chemistry, and ICT',
          'Solid analytical, logical thinking, and STEM foundation',
        ],
      },
      {
        degree: 'Secondary School Certificate (SSC)',
        institutionOrBoard: 'Liaquat Ali Smriti School & College',
        field: 'Science Group',
        result: 'GPA 4.67 / 5.00',
        statusOrYear: 'Completed',
        institutionUrl: 'https://www.facebook.com/share/18pNJTcQx9/',
        highlights: [
          'Excellent academic record in General & Higher Mathematics, Physics, Chemistry, Biology',
          'Early interest and passion for computing, science, and technology',
        ],
      },
    ],
    clubs: [
      {
        name: 'Cybersecurity Club (IUCC)',
        category: 'Cybersecurity & Ethical Hacking',
        role: 'Core Member & Security Researcher',
        description:
          'Active organizer and participant in CTF (Capture The Flag) competitions, vulnerability workshops, ethical hacking demonstrations, and digital security awareness campaigns.',
        highlights: [
          'CTF Challenges & Reconnaissance sessions',
          'OWASP Top 10 web security workshops',
          'Peer mentoring on Linux & penetration testing tools',
        ],
      },
      {
        name: 'CPU Club (Computer Programming Unit)',
        category: 'Competitive Programming & Development',
        role: 'Active Member & Problem Solver',
        description:
          'Engaging in algorithmic problem solving, competitive coding contests, Data Structures practice, and collaborative software development hackathons.',
        highlights: [
          'Algorithms & Data Structures training',
          'Inter-university programming contest prep',
          'Full-stack and open-source project sprints',
        ],
      },
      {
        name: 'Science Club (IUSC)',
        category: 'Science, Research & Innovation',
        role: 'Active Member & Tech Coordinator',
        description:
          'Promoting scientific curiosity, technological innovation, organizing science fairs, robotics exhibits, and technical seminars on campus.',
        highlights: [
          'Organizing Campus Science Fairs & Tech Talks',
          'AI & Emerging Technology seminars',
          'Collaborative tech exhibitions',
        ],
      },
    ],
    uxLayoutNote:
      'Authentic storytelling detailing MD Jayed’s CSE journey at Islamic University, Bangladesh, ethical hacking mindset, and hands-on developer craftsmanship.',
  },
  skills: {
    intro:
      'My technical capabilities span hands-on AI workflow automation (n8n & LLMs), offensive & defensive cybersecurity tools, and full-stack web engineering.',
    categories: [
      {
        categoryName: 'AI Automation (Beginner Level)',
        description:
          'Building autonomous intelligent workflows, multi-model AI agent routing, conversational memory persistence, and automated Google Sheets tool integrations.',
        skillsList: [
          {
            name: 'AI Agent Architecture & n8n Workflows',
            level: 'Beginner Level',
            context: 'Designing autonomous multi-step reasoning agents connected to chat triggers and real-world tools.',
          },
          {
            name: 'Multi-Model Routing & Fallback (OpenAI + Gemini)',
            level: 'Beginner Level',
            context: 'Configuring primary LLM execution (OpenAI GPT) with seamless automated fallback to Google Gemini.',
          },
          {
            name: 'Conversational Memory Buffer',
            level: 'Beginner Level',
            context: 'Implementing Simple Memory buffers to maintain chat context and customer order history across exchanges.',
          },
          {
            name: 'Google Sheets Automation & Tool Calling',
            level: 'Beginner Level',
            context: 'Empowering AI agents to read product catalogs, append customer orders, and query order statuses dynamically.',
          },
        ],
      },
      {
        categoryName: 'Cybersecurity & Ethical Hacking',
        description: 'Vulnerability assessment, network scanning, penetration testing, and security hardening.',
        skillsList: [
          {
            name: 'Web Security & OWASP Top 10',
            level: 'Advanced',
            context: 'SQLi, XSS, CSRF, IDOR, SSRF vulnerability testing and secure coding mitigation.',
          },
          {
            name: 'Security Tools (Nmap, Burp Suite, Wireshark)',
            level: 'Advanced',
            context: 'Network reconnaissance, HTTP traffic interception, packet analysis, and payload craft.',
          },
          {
            name: 'Linux & Kali OS Environment',
            level: 'Expert',
            context: 'Bash scripting, server administration, privilege auditing, and security configurations.',
          },
          {
            name: 'Python Security Automation',
            level: 'Advanced',
            context: 'Writing custom port scanners, sub-domain brute-forcers, and log analyzer scripts.',
          },
        ],
      },
      {
        categoryName: 'Full-Stack Web Development',
        description: 'Building responsive, fast, and secure web applications from frontend to backend.',
        skillsList: [
          {
            name: 'React 19 & TypeScript',
            level: 'Expert',
            context: 'Building interactive single-page apps with type safety, clean state, and modern hooks.',
          },
          {
            name: 'Node.js & Express.js',
            level: 'Advanced',
            context: 'RESTful APIs, secure middleware, rate-limiting, JWT authentication, and routing.',
          },
          {
            name: 'Tailwind CSS & Responsive UI',
            level: 'Expert',
            context: 'Creating clean, dark-mode first, mobile-optimized and high-converting web interfaces.',
          },
          {
            name: 'Databases & PostgreSQL / MongoDB',
            level: 'Proficient',
            context: 'Relational data modeling, indexing, parameterized queries to prevent SQL injections.',
          },
        ],
      },
    ],
    uxLayoutNote:
      'Categorized skills highlighting beginner level AI automation workflows with n8n alongside cybersecurity and web development.',
  },
  projects: {
    intro:
      'Featured live web applications built with modern frontend engineering and AI-assisted tooling.',
    projectList: [
      {
        id: 'project-expense-tracker',
        title: 'Expense Tracker',
        category: 'FinTech & Web App',
        tagline: 'Real-time personal finance, budget analytics, and expense breakdown system.',
        description:
          'A comprehensive financial tracking web application built to log daily expenditures, categorize spending habits, calculate remaining balances, and render interactive analytics for personal wealth management.',
        tools: ['React', 'JavaScript', 'Tailwind CSS', 'Chart Analytics', 'Local Persistence', 'Netlify'],
        impact: 'Provides real-time cashflow visibility, spending threshold alerts, and instant budget calculations.',
        liveDemoUrl: 'https://fancy-bienenstitch-fc0447.netlify.app/',
        githubUrl: 'https://github.com/users/jayedcyberfinix-blip/projects/1/views/1',
        image: '/expense-tracker.jpg',
      },
      {
        id: 'project-batch-fund',
        title: 'Batch Fund Management System',
        category: 'Finance & Management',
        tagline: 'Automated campus batch fund collections, student dues tracking & transparent ledger.',
        description:
          'A specialized treasury and accounting management platform designed for university batches and student organizations to track monthly dues, log event expenses, generate downloadable financial statements, and ensure complete financial transparency.',
        tools: ['React', 'TypeScript', 'Tailwind CSS', 'Financial Ledger', 'Auth & Security', 'Netlify'],
        impact: 'Eliminated manual bookkeeping errors with 100% transparent audit trails and automated collection summaries.',
        liveDemoUrl: 'https://aesthetic-cat-9f1b44.netlify.app/',
        githubUrl: 'https://github.com/users/jayedcyberfinix-blip/projects/1/views/1',
        image: '/batch-fund.jpg',
      },
      {
        id: 'project-khata-ghor',
        title: 'Khata Ghor | খাতা ঘর',
        category: 'E-Commerce & Campus Stationery',
        tagline: 'Study Today, Build Tomorrow — Islamic University (IU) Student Notebook & Stationery Store.',
        description:
          'An online stationery and premium notebook e-commerce platform run by university students. Features an interactive product catalog, shopping cart with instant checkout calculation, student custom notebook ordering, and seamless campus delivery coordination.',
        tools: ['React', 'TypeScript', 'Tailwind CSS', 'E-Commerce Cart', 'Product Catalog', 'Netlify Edge'],
        impact: 'Empowers campus students to procure high-grade custom study notebooks at affordable student-friendly pricing.',
        liveDemoUrl: 'https://shimmering-churros-655895.netlify.app/',
        githubUrl: 'https://github.com/users/jayedcyberfinix-blip/projects/1/views/1',
        image: '/khata-ghor.jpg',
      },
    ],
    uxLayoutNote:
      'High-impact showcase of live applications with direct launch links and clear "Made with AI" attribution.',
  },
  services: {
    intro:
      'Authentic technical services I provide for academic teams, startups, and clients seeking secure web solutions.',
    serviceList: [
      {
        title: 'Web Security Assessment & Vulnerability Audit',
        valueProposition:
          'I test your website or web application against the OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, broken auth, sensitive data exposure). You receive a detailed technical report explaining findings and how to fix them.',
        deliverables: [
          'Black-box / Gray-box web application vulnerability scan',
          'OWASP Top 10 security audit & risk scoring',
          'Clear remediation guide with code-level fix examples',
          'Verification re-test after patches are applied',
        ],
        idealFor: 'Startups, small businesses, and developers needing a security health check before launch.',
      },
      {
        title: 'Secure Full-Stack Web Development',
        valueProposition:
          'I build modern, responsive, and fast web applications using React, Node.js, and TypeScript, engineered with security best practices from day one so your data stays safe.',
        deliverables: [
          'Full-stack frontend and backend application development',
          'Modern responsive UI with Tailwind CSS and dark mode',
          'Secure API endpoints with JWT auth and input validation',
          'Database setup and production deployment',
        ],
        idealFor: 'Founders and clients who want clean, modern, and secure web applications.',
      },
      {
        title: 'AI Integration & Smart Web Tools',
        valueProposition:
          'Transform your workflows by embedding Gemini AI intelligence directly into your website for automated summaries, chatbot assistants, smart data extractors, or security log triage.',
        deliverables: [
          'Gemini API server-side integration & prompt engineering',
          'Real-time streaming UI components for AI outputs',
          'Secure API key protection and rate-limiting',
          'Custom dataset or document analysis tools',
        ],
        idealFor: 'Businesses wanting to leverage generative AI without compromising API security.',
      },
      {
        title: 'Google Forms, Survey Design & Data Automation',
        valueProposition:
          'Professional creation and customization of Google Forms for campus events, student registrations, research surveys, quizzes, and business data capture with automated Google Sheets synchronization.',
        deliverables: [
          'Custom-branded Google Forms with conditional section branching',
          'Automated response collection & real-time Google Sheets tracking',
          'Self-grading quizzes with automated scoring & instant feedback',
          'Form validation rules, upload fields, and confirmation email setups',
        ],
        idealFor: 'University clubs, research students, event organizers, educators, and small businesses.',
      },
      {
        title: 'Ethical Hacking & Technical Collaboration',
        valueProposition:
          'Available for academic research collaborations, CTF team competitions, security workshops, and freelance coding projects for community and global clients.',
        deliverables: [
          'CTF challenge creation and security writeups',
          'Student workshop mentoring & developer tutoring',
          'Python automation and script development',
          'Open-source tool contribution and code review',
        ],
        idealFor: 'Academic peers, campus clubs, research partners, and open-source teams.',
      },
    ],
    uxLayoutNote:
      'Service offerings focusing on ethical security testing, secure web development, and AI implementations.',
  },
  testimonials: {
    intro:
      'Peer endorsements, project collaborator feedback, and academic recommendations.',
    quotes: [
      {
        quote:
          'MD Jayed demonstrated a strong grasp of web application security during our collaborative project. His attention to finding and patching authentication vulnerabilities is commendable.',
        author: 'CSE Project Collaborator',
        role: 'Peer CSE Student',
        company: 'Campus Tech Team',
        rating: 5,
        projectContext: 'Campus Resource Management Portal',
        avatarUrl: '',
      },
      {
        quote:
          'Jayed is exceptionally dedicated to ethical hacking and cybersecurity. His custom Python scripts and vulnerability reports are thorough, clear, and focused on real defense.',
        author: 'Academic Study Group',
        role: 'Research Partner',
        company: 'Cyber Security Enthusiasts Group',
        rating: 5,
        projectContext: 'Network Security & Penetration Testing Labs',
        avatarUrl: '',
      },
      {
        quote:
          'Great experience working with MD Jayed on building our web app with AI integration. Fast delivery, secure code structure, and crystal clear communication.',
        author: 'Freelance Client',
        role: 'Startup Founder',
        company: 'Tech Solutions Client',
        rating: 5,
        projectContext: 'AI Web Tool & React Interface',
        avatarUrl: '',
      },
    ],
    uxLayoutNote:
      'Peer recommendations and collaborative feedback from Islamic University and client projects.',
  },
  contact: {
    closingStatement:
      'Let’s build something secure, innovative, and impactful together. Whether you need a web security audit, a full-stack AI web application, or want to collaborate on a research project, feel free to reach out!',
    availabilityStatus: 'Available for freelance projects, security audits & research collaboration',
    responseTime: 'Guaranteed response within 12 hours (Bangladesh Standard Time BST)',
    formFieldsGuide: [
      {
        field: 'Your Name',
        purpose: 'So I know who I am speaking with.',
        placeholder: 'e.g. MD Jayed',
      },
      {
        field: 'Email Address',
        purpose: 'Direct contact coordinate for my reply.',
        placeholder: 'e.g. jayed@example.com',
      },
      {
        field: 'Topic / Service Needed',
        purpose: 'Vulnerability Audit, Web Dev, AI Integration, Collaboration.',
        placeholder: 'Select inquiry category',
      },
      {
        field: 'Project Details & Goals',
        purpose: 'Share what you are looking to build or test.',
        placeholder: 'Tell me about your project, website security needs, or collaboration ideas...',
      },
    ],
    directEmail: 'jayedcyberfinix@gmail.com',
    uxLayoutNote:
      'Direct inquiry form and contact channels connecting directly to MD Jayed at jayedcyberfinix@gmail.com with Bangladesh location info.',
  },
  conversionStrategy: {
    targetPersona: 'Startup founders, web developers, Islamic University peers, security enthusiasts, and tech companies seeking verified talent.',
    primaryConversionGoal: 'Initiate a security consultation, freelance web project, or research collaboration.',
    uxDesignHighlights: [
      'Authentic profile emphasizing CSE at Islamic University, Bangladesh (IU).',
      'Offensive & defensive cybersecurity credentials and real ethical hacking project demonstrations.',
      'Direct email connection to jayedcyberfinix@gmail.com with verified response SLA.',
    ],
  },
};

export const presetProfiles: Record<string, { label: string; profile: UserProfileInput }> = {
  cybersec: {
    label: 'MD Jayed (Cybersecurity & Ethical Hacking)',
    profile: {
      name: 'MD Jayed',
      title: 'CSE Student at Islamic University (IU) • Cybersecurity & Ethical Hacker',
      experience: 'CSE Undergrad at Islamic University, Bangladesh (IU) | Active CTF Player & Security Researcher',
      skills: 'Ethical Hacking, OWASP Top 10, Nmap, Burp Suite, Python Security, Linux, Network Defense',
      projects: 'Developed AI-powered Web Vulnerability Scanner and Cryptographic Zero-Trust Auth Architecture.',
      targetAudience: 'Tech Companies, Security Teams, Academic Collaborators, Global Clients',
      tone: 'Confident, technically rigorous, ethical, and solution-driven',
    },
  },
  fullstackAi: {
    label: 'MD Jayed (Full Stack & AI Web Developer)',
    profile: {
      name: 'MD Jayed',
      title: 'Full Stack Web Developer & AI Solutions Engineer • Islamic University',
      experience: 'Building modern responsive web applications and generative AI web tooling',
      skills: 'React 19, TypeScript, Node.js, Express, Tailwind CSS, Gemini API, PostgreSQL, Docker',
      projects: 'Engineered IU Student Resource Portal and AI Log Analysis & Threat Advisory Hub.',
      targetAudience: 'Startups, Small Businesses, SaaS Teams, Academic Institutions',
      tone: 'Modern, professional, clean, and detail-oriented',
    },
  },
  academic: {
    label: 'MD Jayed (CSE Researcher & Open Source)',
    profile: {
      name: 'MD Jayed',
      title: 'Computer Science & Engineering Student • Islamic University (IU), Bangladesh',
      experience: 'Undergraduate CSE Student focusing on Algorithms, DevSecOps, and Software Architecture',
      skills: 'C/C++, Python, Data Structures, Algorithms, Git, Linux Administration, System Design',
      projects: 'Open-source security tools, academic course repositories, and peer collaboration hubs.',
      targetAudience: 'Professors, Research Labs, Tech Incubators, Fellow Developers',
      tone: 'Analytical, academic, articulate, and dedicated',
    },
  },
};
