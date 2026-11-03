/* =========================================================
   EDITE ESTE ARQUIVO PARA PERSONALIZAR TODO O PORTFÓLIO.
   Não é necessário mexer no HTML para alterar seus dados.
   ========================================================= */
const PORTFOLIO = {
  profile: {
    name: "Frank Oliveira",
    role: "Software Engineer",
    city: "São Paulo",
    location: "São Paulo, Brasil",
    startYear: 2020,
    years: 6,
    about: "Sou um desenvolvedor de software apaixonado por criar produtos digitais, interfaces modernas e experiências web de alto nível. Trabalho unindo engenharia, design, performance e atenção aos detalhes para transformar ideias em produtos reais."
  },

  availability: {
    text: "Disponivel para projetos."
  },

  skills: ["HTML5", "CSS3", "JavaScript", "Java", "UI/UX", "SQL"],

  experience: [
    { date:"2025 — Agora", title:"Software Engineer", sub:"Desenvolvimento de aplicações web e sistemas." },
    { date:"2023 — 2025", title:"Web Developer", sub:"Interfaces responsivas e experiências digitais." },
    { date:"2021 — 2023", title:"Freelance Developer", sub:"Projetos para empresas e profissionais." },
    { date:"2020 — 2021", title:"Estudos & Projetos", sub:"Fundamentos de programação e desenvolvimento." },
    { date:"2019 — 2020", title:"Formação", sub:"Transição profissional para tecnologia." }
  ],

  projects: [
    { title:"Portfolio OS", description:"Dashboard pessoal modular inspirado em interfaces premium.", tags:["HTML","CSS","JS"], link:"#" },
    { title:"A4 Design", description:"Landing page de alta conversão para agência digital.", tags:["UI/UX","GSAP"], link:"#" },
    { title:"Sales Intelligence", description:"Painel de vendas com filtros por região, estado e cidade.", tags:["JavaScript","Charts"], link:"#" }
  ],

  socials: [
    { label:"GH", title:"GitHub", url:"https://github.com/" },
    { label:"in", title:"LinkedIn", url:"https://www.linkedin.com/" },
    { label:"◎", title:"Instagram", url:"https://www.instagram.com/" },
    { label:"✉", title:"E-mail", url:"mailto:contato@exemplo.com" }
  ],

  latest: { label:"FO" },

  sideProjects: [
    { date:"2026", title:"A4 Design", sub:"Creative web studio" },
    { date:"2025", title:"Portfolio OS", sub:"Personal dashboard" },
    { date:"2024", title:"UI Lab", sub:"Interface experiments" },
    { date:"2023", title:"Web Components", sub:"Reusable front-end system" }
  ],

  testimonial: {
    text:"O projeto uniu uma experiência visual marcante com uma implementação técnica muito bem estruturada.",
    name:"Cliente / Parceiro",
    role:"Product & Design",
    initials:"CP"
  },

  cv: {
    viewUrl:"#",
    downloadUrl:"assets/curriculo.pdf"
  }
};

// ==========================================
// DADOS DO PORTFÓLIO — Frank Oliveira
// ==========================================
const DATA = {
  profile: {
    name: "Frank Oliveira",
    role: "Software Engineer",
    location: "São Paulo, Brasil",
    city: "São Paulo",
    startYear: 2006,
    years: 20,
    about: "Desenvolvedor full-stack apaixonado por criar experiências digitais rápidas, acessíveis e visualmente marcantes. Trabalho com Graphic Design, Web Design, HTML, CSS, Java, JavaScript, React e Node.js.",
  },

  availability: {
    text: "Disponível para projetos de desenvolvimento web, software e experiências digitais.",
    status: "available",
    nextStart: "Novembro 2026"
  },

  skills: [
    { name: "JavaScript / TypeScript", level: 92 },
    { name: "HTML / CSS", level: 95 },
    { name: "React / Vue", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 72 },
    { name: "SQL / NoSQL", level: 78 }
  ],

  skillTags: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "Git", "Figma", "TypeScript"],

  experience: [
    { date: "2023–Atual", title: "Senior Frontend Developer", sub: "TechCorp — Interface de sistemas SaaS" },
    { date: "2021–2023", title: "Full Stack Developer", sub: "StartupX — Plataforma e-commerce" },
    { date: "2020–2021", title: "Junior Developer", sub: "Agência Digital — Sites e landing pages" },
    { date: "2018–2020", title: "Estagiário de TI", sub: "Universidade — Manutenção e sistemas internos" }
  ],

  education: [
    { date: "2018–2022", title: "Bacharelado em Ciência da Computação", sub: "Universidade de São Paulo (USP)" },
    { date: "2023", title: "Certificação AWS Cloud Practitioner", sub: "Amazon Web Services" }
  ],

  deliveredProjects: [
    { date: "2026", title: "Plataforma de Agendamento", sub: "Sistema online para reservas e gestão de horários." },
    { date: "2026", title: "Dashboard de Vendas", sub: "Painel interativo para análise de indicadores comerciais." },
    { date: "2025", title: "Loja Virtual", sub: "Experiência de e-commerce responsiva com catálogo de produtos." },
    { date: "2025", title: "Gestão Financeira", sub: "Aplicação para organizar despesas, receitas e relatórios." },
    { date: "2025", title: "Landing Page de Serviços", sub: "Página de apresentação com foco em conversão." },
    { date: "2024", title: "Controle de Estoque", sub: "Sistema para acompanhar produtos e movimentações." },
    { date: "2024", title: "Portal de Atendimento", sub: "Interface para abertura e acompanhamento de solicitações." },
    { date: "2023", title: "Gerenciador de Tarefas", sub: "Aplicação web para organizar atividades e prazos." },
    { date: "2023", title: "API de Integração", sub: "Serviço para conectar aplicações e sincronizar dados." },
    { date: "2022", title: "Site Institucional", sub: "Website responsivo para apresentação de uma empresa." }
  ],

  projects: [
    { id: 1, title: "E-commerce Moderno", desc: "React + Node + MongoDB", tags: ["React", "Node.js", "MongoDB"], link: "#", icon: "shopping-bag" },
    { id: 2, title: "Dashboard Analytics", desc: "Visualização de dados em tempo real", tags: ["Vue", "D3.js", "API"], link: "#", icon: "analytics" },
    { id: 3, title: "App de Gestão", desc: "Sistema interno para pequenas empresas", tags: ["Next.js", "Prisma"], link: "#", icon: "management" },
    { id: 4, title: "Portfólio Modular", desc: "Este site — design system em widgets", tags: ["HTML", "CSS", "JS"], link: "#", icon: "portfolio" },
    { id: 5, title: "Agenda Fácil", desc: "Agendamento online para profissionais", tags: ["React", "Node.js"], link: "#" },
    { id: 6, title: "Finanças Pessoais", desc: "Controle de gastos e planejamento mensal", tags: ["JavaScript", "Charts"], link: "#" },
    { id: 7, title: "Delivery Express", desc: "Pedidos e acompanhamento de entregas", tags: ["Next.js", "API"], link: "#" },
    { id: 8, title: "EducaPlay", desc: "Plataforma interativa de aprendizado", tags: ["Vue", "Firebase"], link: "#" },
    { id: 9, title: "FitTrack", desc: "Rotinas de treino e acompanhamento físico", tags: ["React Native", "Node.js"], link: "#" },
    { id: 10, title: "TaskFlow", desc: "Organização de tarefas para equipes", tags: ["React", "Prisma"], link: "#" },
    { id: 11, title: "ReservaJá", desc: "Reservas online para restaurantes", tags: ["Next.js", "PostgreSQL"], link: "#" },
    { id: 12, title: "HelpDesk Pro", desc: "Central de suporte e gestão de chamados", tags: ["Vue", "Node.js"], link: "#" },
    { id: 13, title: "PetCare", desc: "Gestão de consultas e saúde para pets", tags: ["React", "MongoDB"], link: "#" },
    { id: 14, title: "StockWise", desc: "Controle de estoque e movimentações", tags: ["Java", "SQL"], link: "#" },
    { id: 15, title: "Clima Agora", desc: "Previsão do tempo com dados em tempo real", tags: ["JavaScript", "Weather API"], link: "#" },
    { id: 16, title: "Connect CRM", desc: "Relacionamento e acompanhamento de clientes", tags: ["React", "Node.js"], link: "#" },
    { id: 17, title: "TravelMap", desc: "Planejamento de viagens e roteiros", tags: ["Maps API", "JavaScript"], link: "#" },
    { id: 18, title: "Receita em Casa", desc: "Busca e organização de receitas culinárias", tags: ["Vue", "Firebase"], link: "#" },
    { id: 19, title: "EventHub", desc: "Divulgação e gestão de eventos", tags: ["Next.js", "Prisma"], link: "#" },
    { id: 20, title: "BookShelf", desc: "Catálogo pessoal de livros e leituras", tags: ["React", "TypeScript"], link: "#" },
    { id: 21, title: "SmartHome", desc: "Painel de controle para automação residencial", tags: ["IoT", "Node.js"], link: "#" },
    { id: 22, title: "PhotoVault", desc: "Galeria digital com álbuns organizados", tags: ["React", "Cloud Storage"], link: "#" },
    { id: 23, title: "InvoiceGo", desc: "Criação e acompanhamento de faturas", tags: ["Java", "Spring"], link: "#" },
    { id: 24, title: "Support Chat", desc: "Chat em tempo real para atendimento online", tags: ["WebSocket", "Node.js"], link: "#" }
  ],
	
   projects2: [
    { id: 1, title: "E-commerce Moderno", desc: "React + Node + MongoDB", tags: ["React", "Node.js", "MongoDB"], link: "#" },
    { id: 2, title: "Dashboard Analytics", desc: "Visualização de dados em tempo real", tags: ["Vue", "D3.js", "API"], link: "#" },
    { id: 3, title: "App de Gestão", desc: "Sistema interno para pequenas empresas", tags: ["Next.js", "Prisma"], link: "#" },
    { id: 4, title: "Portfólio Modular", desc: "Este site — design system em widgets", tags: ["HTML", "CSS", "JS"], link: "#" }
  ],
	
  sideProjects: [
    { date: "2026", title: "Terminal Portfolio", sub: "Site com visual de terminal interativo" },
    { date: "2025", title: "CLI Task Manager", sub: "Gerenciador de tarefas por linha de comando" },
    { date: "2025", title: "Weather CLI", sub: "Consulta de clima via API" },
    { date: "2024", title: "Jogo da Velha Web", sub: "PWA com IA simples" }
  ],

  socials: [
    { icon: "in", label: "LinkedIn", url: "https://linkedin.com" },
    { icon: "gh", label: "GitHub", url: "https://github.com" },
    { icon: "tw", label: "Twitter", url: "https://twitter.com" },
    { icon: "em", label: "E-mail", url: "mailto:frank@email.com" }
  ],

  latest: {
    label: "FO",
    title: "Nova Plataforma",
    desc: "Sistema de assinaturas com painel administrativo"
  },

  testimonial: {
    text: "Entregou com qualidade superior.",
    initials: "AM",
    name: "Ana Martins",
    role: "CEO — TechCorp"
  },

  codingStats: {
    lines: "127K+",
    commits: "1.8K+",
    repos: 42,
    prs: 89
  },

  languages: [
    { name: "Português", flag: "🇧🇷", level: "Nativo" },
    { name: "English", flag: "🇺🇸", level: "Fluente" },
    { name: "Español", flag: "🇪🇸", level: "Intermediário" },
    { name: "Français", flag: "🇫🇷", level: "Básico" }
  ],

  certifications: [
    "AWS Certified Cloud Practitioner",
    "Google UX Design Professional Certificate",
    "Meta Front-End Developer",
    "Oracle Java Foundations"
  ],

  tools: ["VS Code", "Git", "Figma", "Docker", "Postman", "Notion", "Terminal", "Linux"],

  interests: ["🎨 Design", "📚 Leitura", "🎮 Jogos", "🏃 Corrida", "✈️ Viagens", "🎵 Música"],

  workflow: ["Descoberta", "Design", "Desenvolvimento", "Deploy", "Ajustes"],

  clients: ["TechCorp", "StartupX", "AgênciaPro", "Freelance"],

  milestones: [
    { number: "50+", label: "Projetos Entregues" },
    { number: "30+", label: "Clientes Satisfeitos" },
    { number: "8", label: "Premiações e Menções" }
  ],

  codeQuality: [
    "✅ HTML Semântico e Acessível",
    "✅ Responsivo — Mobile-First",
    "✅ Código Limpo e Documentado",
    "✅ Performance Otimizada"
  ],

  frameworks: ["Next.js", "Vue", "Tailwind CSS", "Express", "NestJS", "Svelte"],

  databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],

  hobbyProjects: [
    "Portfólio Estilo Terminal",
    "Gerenciador de Tarefas CLI",
    "Painel de Clima",
    "Jogo da Velha com IA"
  ],

  reading: {
    book: "Código Limpo",
    author: "Robert C. Martin",
    progress: 68
  },

  contact: {
    email: "frank@email.com",
    location: "São Paulo — Brasil",
    timezone: "UTC-3"
  },

  github: {
    contributions: "2.4K+",
    repos: 156,
    followers: "890+"
  },

  miniTestimonials: [
    { text: "Rápido e preciso!", author: "Cliente A" },
    { text: "Código excelente.", author: "Cliente B" },
    { text: "Entregou antes do prazo.", author: "Cliente C" },
    { text: "O Frank entendeu exatamente o que precisávamos e entregou um ótimo resultado, com muita atenção aos detalhes.", author: "Cliente D" }
  ],

  brandColors: [
    { name: "Principal", hex: "#00b39f" },
    { name: "Fundo", hex: "#1c1c1e" },
    { name: "Texto", hex: "#ffffff" },
    { name: "Suave", hex: "#98989f" }
  ]
};
