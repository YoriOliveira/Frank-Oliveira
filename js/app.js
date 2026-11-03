const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded", () => {
  bindData();
  initClock();
  initWeather();
  renderSkills();
  renderExperience();
  renderProjects();
  renderSideProjects();
  renderSocials();
  renderCertifications();
  renderTools();
  renderLanguages();
  renderMilestones();
  renderFrameworks();
  renderDatabases();
  renderHobbyProjects();
  renderMiniTestimonials();
  initThemeToggle();
  initNewsletter();
  initModal();
  initActions();
  setCurrentYear();
  animateCounters();
});

// --- Vincula dados ---
function bindData() {
  const p = DATA.profile;
  document.querySelectorAll("[data-bind='profile.name']").forEach(el => el.textContent = p.name);
  document.querySelectorAll("[data-bind='profile.role']").forEach(el => el.textContent = p.role);
  document.querySelectorAll("[data-bind='profile.location']").forEach(el => el.textContent = p.location);
  document.querySelectorAll("[data-bind='profile.city']").forEach(el => el.textContent = p.city);
  document.querySelectorAll("[data-bind='profile.startYear']").forEach(el => el.textContent = p.startYear);
  document.querySelectorAll("[data-bind='profile.years']").forEach(el => el.textContent = p.years);
  document.querySelectorAll("[data-bind='profile.about']").forEach(el => el.textContent = p.about);
  document.querySelectorAll("[data-bind='availability.text']").forEach(el => el.textContent = DATA.availability.text);
  const t = DATA.testimonial;
  document.querySelectorAll("[data-bind='testimonial.text']").forEach(el => el.textContent = t.text);
  document.querySelectorAll("[data-bind='testimonial.initials']").forEach(el => el.textContent = t.initials);
  document.querySelectorAll("[data-bind='testimonial.name']").forEach(el => el.textContent = t.name);
  document.querySelectorAll("[data-bind='testimonial.role']").forEach(el => el.textContent = t.role);
  document.querySelectorAll("[data-bind='latest.label']").forEach(el => el.textContent = DATA.latest.label);
}

// --- Relógio digital de São Paulo ---
function initClock() {
  const hoursElement = document.getElementById("digitalHours");
  const minutesElement = document.getElementById("digitalMinutes");
  const secondsElement = document.getElementById("digitalSeconds");
  const dateElement = document.getElementById("digitalDate");
  if (!hoursElement || !minutesElement || !secondsElement || !dateElement) return;

  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });
  const secondsFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    second: "2-digit"
  });
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    day: "2-digit",
    month: "short"
  });

  function setClock() {
    const now = new Date();
    const timeParts = timeFormatter.formatToParts(now);
    hoursElement.textContent = timeParts.find(part => part.type === "hour").value;
    minutesElement.textContent = timeParts.find(part => part.type === "minute").value;
    secondsElement.textContent = secondsFormatter.format(now);
    dateElement.textContent = dateFormatter.format(now).replace(/\./g, "").toUpperCase();
  }
  setClock();
  setInterval(setClock, 1000);
}

// --- Clima do dia (Open-Meteo, sem chave de API) ---
function initWeather() {
  const root = document.querySelector(".weather-widget");
  if (!root) return;

  // Coordenadas da cidade (São Paulo). Altere para mudar o local.
  const LAT = -23.5505, LON = -46.6333;

  const WEATHER_CODES = {
    0:  ["Céu limpo", "☀️", "🌙"],
    1:  ["Poucas nuvens", "🌤️", "🌙"],
    2:  ["Parcialmente nublado", "⛅", "☁️"],
    3:  ["Nublado", "☁️", "☁️"],
    45: ["Neblina", "🌫️", "🌫️"],
    48: ["Neblina gelada", "🌫️", "🌫️"],
    51: ["Garoa leve", "🌦️", "🌧️"],
    53: ["Garoa", "🌦️", "🌧️"],
    55: ["Garoa forte", "🌧️", "🌧️"],
    56: ["Garoa congelante leve", "🌧️", "🌧️"],
    57: ["Garoa congelante forte", "🌧️", "🌧️"],
    61: ["Chuva fraca", "🌦️", "🌧️"],
    63: ["Chuva", "🌧️", "🌧️"],
    65: ["Chuva forte", "🌧️", "🌧️"],
    66: ["Chuva congelante leve", "🌧️", "🌧️"],
    67: ["Chuva congelante forte", "🌧️", "🌧️"],
    71: ["Neve fraca", "🌨️", "🌨️"],
    73: ["Neve", "🌨️", "🌨️"],
    75: ["Neve forte", "❄️", "❄️"],
    77: ["Grãos de neve", "❄️", "❄️"],
    80: ["Pancadas leves", "🌦️", "🌧️"],
    81: ["Pancadas de chuva", "🌧️", "🌧️"],
    82: ["Pancadas fortes", "🌧️", "🌧️"],
    85: ["Pancadas de neve leves", "🌨️", "🌨️"],
    86: ["Pancadas de neve fortes", "❄️", "❄️"],
    95: ["Tempestade", "⛈️", "⛈️"],
    96: ["Tempestade com granizo", "⛈️", "⛈️"],
    99: ["Tempestade com granizo forte", "⛈️", "⛈️"]
  };

  const $id = id => document.getElementById(id);
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,uv_index,is_day` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset` +
    `&timezone=auto&forecast_days=1`;

  async function loadWeather() {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Falha na API");
      const data = await res.json();
      const c = data.current, d = data.daily;

      const info = WEATHER_CODES[c.weather_code] || ["Indisponível", "🌡️", "🌡️"];
      const code = c.weather_code;
      const image = !c.is_day && code <= 1 ? "night.svg"
        : [95, 96, 99].includes(code) ? "storm.svg"
        : [71, 73, 75, 77, 85, 86].includes(code) ? "snow.svg"
        : [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code) ? "rain.svg"
        : [0, 1].includes(code) ? "clear.svg"
        : "cloudy.svg";
      $id("weatherIcon").src = `assets/weather/${image}`;
      $id("weatherIcon").alt = info[0];
      $id("weatherTemp").textContent = `${Math.round(c.temperature_2m)}°`;
      $id("weatherDesc").textContent = info[0];
      $id("weatherRange").textContent =
        `${Math.round(d.temperature_2m_max[0])}° / ${Math.round(d.temperature_2m_min[0])}°`;
      $id("weatherHum").textContent = `${c.relative_humidity_2m}%`;
      $id("weatherWind").textContent = `${Math.round(c.wind_speed_10m)} km/h`;
      $id("weatherRain").textContent = `${d.precipitation_probability_max[0] ?? 0}%`;
      $id("weatherFeelsLike").textContent = `${Math.round(c.apparent_temperature)}°`;
      $id("weatherUv").textContent = c.uv_index.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
      $id("weatherSunrise").textContent = d.sunrise[0].slice(11, 16);
      $id("weatherSunset").textContent = d.sunset[0].slice(11, 16);
    } catch (err) {
      $id("weatherIcon").src = "assets/weather/cloudy.svg";
      $id("weatherIcon").alt = "Clima indisponível";
      $id("weatherDesc").textContent = "Clima indisponível";
    }
  }

  loadWeather();
  setInterval(loadWeather, 30 * 60 * 1000); // atualiza a cada 30 min
}

// --- Habilidades ---
function renderSkills() {
  const container = document.getElementById("skillTags");
  if (container) {
    container.innerHTML = DATA.skillTags.map(tag => `<span>${tag}</span>`).join("");
  }
}

// --- Experi�ncia ---
function renderExperience() {
  const container = document.getElementById("experienceList");
  if (!container) return;
  const all = [...DATA.experience, ...DATA.education, ...DATA.deliveredProjects];
  container.innerHTML = all.map(item => `
    <div class="timeline-item" role="button" tabindex="0" data-exp-item="${item.title}" style="cursor:pointer;">
      <div class="timeline-date">${item.date}</div>
      <div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-sub">${item.sub}</div>
      </div>
    </div>
  `).join("");
  
  // Adiciona evento de clique em cada item
  container.querySelectorAll("[data-exp-item]").forEach(item => {
    item.addEventListener("click", () => openExperienceModal(item.dataset.expItem));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openExperienceModal(item.dataset.expItem);
    });
  });
}

// --- Modal de Experi�ncia ---
function openExperienceModal(title) {
  const expData = {
    "Senior Frontend Developer": {
      desc: "Lideran�a no desenvolvimento de interfaces para sistemas SaaS, focando em performance, acessibilidade e experi�ncia do usu�rio.",
      tags: ["React", "TypeScript", "UI/UX", "SaaS"],
      link: "infografico-orbital.html"
    },
    "Full Stack Developer": {
      desc: "Constru��o de plataforma e-commerce completa com sistema de pagamentos, gest�o de pedidos e painel administrativo.",
      tags: ["Node.js", "React", "MongoDB", "API"],
      link: "infografico-pilulas.html"
    },
    "Junior Developer": {
      desc: "Cria��o de sites, landing pages e interfaces responsivas para clientes de diversos segmentos.",
      tags: ["HTML", "CSS", "JavaScript", "Figma"],
      link: "003.html"
    },
    "Estagi�rio de TI": {
      desc: "Manuten��o de sistemas internos, suporte e desenvolvimento de ferramentas para a universidade.",
      tags: ["JavaScript", "SQL", "Suporte"],
      link: "004.html"
    },
    "Bacharelado em Ci�ncia da Computa��o": {
      desc: "Forma��o completa em fundamentos de computa��o, algoritmos, estruturas de dados, engenharia de software e intelig�ncia artificial.",
      tags: ["USP", "Algoritmos", "Engenharia de Software"],
      link: "005.html"
    },
    "Certifica��o AWS Cloud Practitioner": {
      desc: "Compreens�o dos servi�os de nuvem AWS, arquitetura, seguran�a e pr�ticas de nuvem para solu��es escal�veis.",
      tags: ["AWS", "Cloud", "Certifica��o"],
      link: "006.html"
    }
  };

  const exp = expData[title] || { desc: "Detalhes em breve.", tags: [], link: "#" };
  const modal = document.getElementById("modal");
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalText").textContent = exp.desc;
  document.getElementById("modalTags").innerHTML = exp.tags.map(t => `<span>${t}</span>`).join("");
  document.getElementById("modalLink").href = exp.link;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// --- Projetos ---
const PROJECT_ICONS = {
  "shopping-bag": '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 17h28l-2 23H12L10 17Z"/><path d="M18 19v-5a6 6 0 0 1 12 0v5"/></svg>',
  analytics: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 39V25h8v14M20 39V12h8v27M31 39V19h8v20M7 39h34"/></svg>',
  management: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="6"/><path d="m17 24 5 5 10-11"/></svg>',
  portfolio: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="11" width="32" height="26" rx="4"/><path d="M8 19h32M15 15h1M20 15h1M17 25h8v7h-8zM29 25h5M29 30h5"/></svg>',
  default: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="6"/><path d="M17 18h14M17 24h14M17 30h8"/></svg>'
};

function renderProjects() {
  const container = document.getElementById("projectList");
  if (!container) return;
  container.innerHTML = DATA.projects.map(p => `
    <div class="project-item" data-project-id="${p.id}" aria-label="Abrir ${p.title}">
      <div class="thumb">${PROJECT_ICONS[p.icon] || PROJECT_ICONS.default}</div>
      <div class="project-details">
        <div>
          <strong>${p.title}</strong>
          <small>${p.desc}</small>
        </div>
        <span class="arrow">?</span>
      </div>
    </div>
  `).join("");
  container.querySelectorAll(".project-item").forEach(item => {
    item.addEventListener("click", () => {
      const id = parseInt(item.dataset.projectId);
      const project = DATA.projects.find(p => p.id === id);
      if (project) openModal(project);
    });
  });
}

// --- Projetos paralelos / Futuros ---
function renderSideProjects() {
  const container = document.getElementById("sideList");
  if (!container) return;
  container.innerHTML = DATA.sideProjects.map(p => `
    <div class="timeline-item" role="button" tabindex="0" data-side-item="${p.title}" style="cursor:pointer;">
      <div class="timeline-date">${p.date}</div>
      <div>
        <div class="timeline-title">${p.title}</div>
        <div class="timeline-sub">${p.sub}</div>
      </div>
    </div>
  `).join("");
  
  // Clique em cada item
  container.querySelectorAll("[data-side-item]").forEach(item => {
    item.addEventListener("click", () => openSideProjectModal(item.dataset.sideItem));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openSideProjectModal(item.dataset.sideItem);
    });
  });
}

// --- Modal de Projetos Futuros ---
function openSideProjectModal(title) {
  const sideData = {
    "Terminal Portfolio": {
      desc: "Portf�lio com interface inspirada em terminal de comando, totalmente interativa e com navega��o por comandos. Design minimalista e de alto impacto visual.",
      tags: ["HTML", "CSS", "JavaScript", "Anima��es"],
      link: "#"
    },
    "CLI Task Manager": {
      desc: "Gerenciador de tarefas via linha de comando com armazenamento local, categorias e marca��o de conclus�o. Projeto focado em l�gica de programa��o e usabilidade.",
      tags: ["Node.js", "CLI", "FS", "Interatividade"],
      link: "#"
    },
    "Weather CLI": {
      desc: "Aplica��o que consulta clima em tempo real via API, exibindo dados de temperatura, umidade e previs�o diretamente no terminal.",
      tags: ["JavaScript", "API", "Async/Await"],
      link: "#"
    },
    "Jogo da Velha Web": {
      desc: "Jogo da velha com interface moderna e intelig�ncia artificial simples, com diferentes n�veis de dificuldade. Dispon�vel como PWA.",
      tags: ["React", "IA", "PWA", "Jogos"],
      link: "#"
    }
  };

  const project = sideData[title] || { desc: "Detalhes em breve.", tags: [], link: "#" };
  const modal = document.getElementById("modal");
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalText").textContent = project.desc;
  document.getElementById("modalTags").innerHTML = project.tags.map(t => `<span>${t}</span>`).join("");
  document.getElementById("modalLink").href = project.link;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// --- Redes sociais ---
function renderSocials() {
  const container = document.getElementById("socialList");
  if (!container) return;
  const icons = { in: "In", gh: "Git", tw: "X", em: "E -" };
  container.innerHTML = DATA.socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener" class="social" aria-label="${s.label}">
      ${icons[s.icon] || "�"}
    </a>
  `).join("");
}

// --- Certifica��es ---
function renderCertifications() {
  const container = document.querySelector(".cert-list");
  if (!container) return;
  container.innerHTML = DATA.certifications.map(c => `<div class="cert-item">${c}</div>`).join("");
}

// --- Ferramentas ---
function renderTools() {
  const container = document.querySelector(".tools-grid");
  if (!container) return;
  container.innerHTML = DATA.tools.map(t => `<span class="tool-tag">${t}</span>`).join("");
}

// --- Idiomas ---
function renderLanguages() {
  const container = document.querySelector(".lang-list");
  if (!container) return;
  container.innerHTML = DATA.languages.map(l => `
    <div class="lang-item">
      <span>${l.flag} ${l.name}</span>
      <span class="level">${l.level}</span>
    </div>
  `).join("");
}

// --- Marcos ---
function renderMilestones() {
  const container = document.querySelector(".milestone-list");
  if (!container) return;
  container.innerHTML = DATA.milestones.map(m => `
    <div class="milestone">
      <strong>${m.number}</strong>
      <span>${m.label}</span>
    </div>
  `).join("");
}

// --- Frameworks ---
function renderFrameworks() {
  const container = document.querySelector(".fw-grid");
  if (!container) return;
  container.innerHTML = DATA.frameworks.map(fw => `<span class="fw">${fw}</span>`).join("");
}

// --- Bancos de dados ---
function renderDatabases() {
  const container = document.querySelector(".db-list");
  if (!container) return;
  container.innerHTML = DATA.databases.map(db => `<div class="db-item">${db}</div>`).join("");
}

// --- Hobby Projects ---
function renderHobbyProjects() {
  const container = document.querySelector(".hobby-list");
  if (!container) return;
  container.innerHTML = DATA.hobbyProjects.map(h => `<div class="hobby-item">${h}</div>`).join("");
}

// --- Mini Depoimentos ---
function renderMiniTestimonials() {
  const container = document.querySelector(".mini-quotes");
  if (!container) return;
  container.innerHTML = DATA.miniTestimonials.map(t => `
    <div class="mini-quote">"${t.text}" � <em>${t.author}</em></div>
  `).join("");
}

// --- Tema claro/escuro ---
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light") document.body.classList.add("light");
  btn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark");
  });
}

// --- Newsletter ---
function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const msg = document.getElementById("newsletterMessage");
  if (!form || !msg) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    msg.textContent = "? Inscri��o recebida! Obrigado.";
    msg.style.color = "var(--accent)";
    form.reset();
    setTimeout(() => { msg.textContent = ""; }, 4000);
  });
}

// --- Modal ---
function initModal() {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("modalClose");
  if (!modal || !closeBtn) return;
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

function openModal(project) {
  const modal = document.getElementById("modal");
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalText").textContent = project.desc;
  document.getElementById("modalTags").innerHTML = project.tags.map(t => `<span>${t}</span>`).join("");
  document.getElementById("modalLink").href = project.link;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

// --- A��es extras ---
function initActions() {
  $$("[data-action='contact']").forEach(b => b.addEventListener("click", () => {
    location.href = "mailto:frank@email.com";
  }));
  $$("[data-action='latest']").forEach(b => b.addEventListener("click", () => {
    if (DATA.projects.length > 0) openModal(DATA.projects[0]);
  }));
  $("[data-action='cv-view']")?.addEventListener("click", () => {
    window.open("#", "_blank");
  });
  $("[data-action='cv-download']")?.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = "assets/curriculo.pdf";
    a.download = "curriculo.pdf";
    a.click();
  });
}

// --- Ano atual ---
function setCurrentYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// --- Contadores ---
function animateCounters() {
  const els = {
    loc: document.getElementById("loc"),
    commits: document.getElementById("commits"),
    repos: document.getElementById("repos"),
    prs: document.getElementById("prs")
  };
  if (els.loc) els.loc.textContent = DATA.codingStats.lines;
  if (els.commits) els.commits.textContent = DATA.codingStats.commits;
  if (els.repos) els.repos.textContent = DATA.codingStats.repos;
  if (els.prs) els.prs.textContent = DATA.codingStats.prs;

  const gh = document.querySelectorAll(".gh-stat");
  if (gh.length >= 3) {
    gh[0].querySelector("strong").textContent = DATA.github.contributions;
    gh[1].querySelector("strong").textContent = DATA.github.repos;
    gh[2].querySelector("strong").textContent = DATA.github.followers;
  }
}
// --- GR�FICO CIRCULAR ANIMADO ---
document.addEventListener("DOMContentLoaded", initDbChart);

function initDbChart() {
  const segments = document.querySelectorAll(".dbchart-segment");
  const legendContainer = document.getElementById("dbchartLegend");
  const circumference = 2 * Math.PI * 85; // ~534

  const chartData = [];
  segments.forEach(seg => {
    const value = parseFloat(seg.dataset.value);
    const color = seg.dataset.color;
    const label = seg.dataset.label;
    chartData.push({ value, color, label, el: seg });
  });

  // Renderiza legenda
  if (legendContainer) {
    legendContainer.innerHTML = chartData.map(d => `
      <div class="dbchart-legend-item" data-label="${d.label}">
        <span class="dbchart-dot" style="background:${d.color}"></span>
        <span class="dbchart-label">${d.label}</span>
        <span class="dbchart-value">${d.value}%</span>
      </div>
    `).join("");
  }

  // Anima��o com atraso escalonado
  let cumulative = 0;
  chartData.forEach((d, i) => {
    const dash = (d.value / 100) * circumference;
    const gap = 2; // espa�amento entre segmentos
    const offset = circumference - dash - cumulative;
    cumulative += dash + gap;

    setTimeout(() => {
      d.el.style.stroke = d.color;
      d.el.style.strokeDashoffset = offset;
    }, 200 + i * 250);
  });

  // Calcula m�dia
  const avg = Math.round(chartData.reduce((s, d) => s + d.value, 0) / chartData.length);
  const mainEl = document.getElementById("dbchart-main");
  if (mainEl) animateCounter(mainEl, avg, "%");
}

function animateCounter(el, target, suffix = "") {
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, 30);
}

// --- Radar interativo de competências técnicas ---
document.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("radarChart");
  if (!svg) return;

  const categories = [
    { label: "Frontend", value: 92, detail: "Interfaces modernas, responsivas e acessíveis." },
    { label: "Backend", value: 82, detail: "Serviços e regras de negócio para aplicações web." },
    { label: "Arquitetura", value: 78, detail: "Estruturação de soluções claras e sustentáveis." },
    { label: "APIs", value: 86, detail: "Integração entre sistemas e comunicação de dados." },
    { label: "Dados", value: 78, detail: "Modelagem e persistência de dados para produtos." },
    { label: "UX / UI", value: 88, detail: "Experiências intuitivas com atenção ao design." },
    { label: "Performance", value: 84, detail: "Interfaces rápidas e aplicações eficientes." },
    { label: "Qualidade", value: 80, detail: "Código consistente, manutenção e boas práticas." }
  ];
  const cx = 210, cy = 210, maxR = 126, levels = 5;
  const n = categories.length;
  const angleStep = (2 * Math.PI) / n;
  const offset = -Math.PI / 2;
  const namespace = "http://www.w3.org/2000/svg";
  const average = Math.round(categories.reduce((sum, item) => sum + item.value, 0) / n);
  let selectedIndex = null;
  let hoveredIndex = null;
  let focusedIndex = null;

  const createSvgElement = (name, attrs = {}) => {
    const element = document.createElementNS(namespace, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };
  const polarPoint = (index, radius) => {
    const angle = offset + index * angleStep;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };
  const pointsForRadius = radius => categories.map((_, index) => {
    const point = polarPoint(index, radius);
    return `${point.x},${point.y}`;
  }).join(" ");

  const defs = createSvgElement("defs");
  const gradient = createSvgElement("linearGradient", { id: "radarFill", x1: "0", y1: "0", x2: "1", y2: "1" });
  gradient.append(
    createSvgElement("stop", { offset: "0%", "stop-color": "var(--accent)", "stop-opacity": "0.48" }),
    createSvgElement("stop", { offset: "100%", "stop-color": "#4be8cf", "stop-opacity": "0.08" })
  );
  const glow = createSvgElement("filter", { id: "radarGlow", x: "-50%", y: "-50%", width: "200%", height: "200%" });
  glow.appendChild(createSvgElement("feGaussianBlur", { stdDeviation: "4", result: "blur" }));
  const glowMerge = createSvgElement("feMerge");
  glowMerge.append(createSvgElement("feMergeNode", { in: "blur" }), createSvgElement("feMergeNode", { in: "SourceGraphic" }));
  glow.appendChild(glowMerge);
  defs.append(gradient, glow);
  svg.appendChild(defs);

  for (let l = 1; l <= levels; l++) {
    const r = (maxR / levels) * l;
    svg.appendChild(createSvgElement("polygon", {
      points: pointsForRadius(r),
      class: "radar-ring",
      "data-level": String(l * 20)
    }));
  }

  categories.forEach((category, index) => {
    const point = polarPoint(index, maxR);
    svg.appendChild(createSvgElement("line", {
      x1: cx, y1: cy, x2: point.x, y2: point.y, class: "radar-axis"
    }));
    const labelPoint = polarPoint(index, maxR + 25);
    const label = createSvgElement("text", {
      x: labelPoint.x,
      y: labelPoint.y,
      dy: labelPoint.y < cy - 15 ? "-0.2em" : "0.35em",
      class: "radar-label",
      "text-anchor": labelPoint.x < cx - 8 ? "end" : labelPoint.x > cx + 8 ? "start" : "middle"
    });
    label.textContent = category.label;
    svg.appendChild(label);
  });

  const area = createSvgElement("polygon", { points: pointsForRadius(0), class: "radar-area", filter: "url(#radarGlow)" });
  svg.appendChild(area);
  const center = createSvgElement("circle", { cx, cy, r: "31", class: "radar-center" });
  const centerValue = createSvgElement("text", { x: cx, y: cy - 1, class: "radar-center-value", id: "radarCenterValue" });
  centerValue.textContent = `${average}%`;
  const centerCaption = createSvgElement("text", { x: cx, y: cy + 14, class: "radar-center-caption", id: "radarCenterCaption" });
  centerCaption.textContent = "MÉDIA";
  svg.append(center, centerValue, centerCaption);

  const pointsGroup = createSvgElement("g", { class: "radar-points" });
  const pointElements = categories.map((category, index) => {
    const position = polarPoint(index, (category.value / 100) * maxR);
    const point = createSvgElement("circle", {
      cx: position.x,
      cy: position.y,
      r: "5",
      class: "radar-point",
      tabindex: "0",
      role: "button",
      "aria-label": `${category.label}: ${category.value}%. ${category.detail}`,
      "data-index": index
    });
    point.addEventListener("pointerenter", () => {
      hoveredIndex = index;
      showInsight(focusedIndex ?? hoveredIndex ?? selectedIndex);
    });
    point.addEventListener("pointerleave", () => {
      hoveredIndex = null;
      showInsight(focusedIndex ?? selectedIndex);
    });
    point.addEventListener("focus", () => {
      focusedIndex = index;
      showInsight(index);
    });
    point.addEventListener("blur", () => {
      focusedIndex = null;
      showInsight(hoveredIndex ?? selectedIndex);
    });
    point.addEventListener("click", () => {
      selectedIndex = selectedIndex === index ? null : index;
      showInsight(focusedIndex ?? hoveredIndex ?? selectedIndex);
    });
    point.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        point.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    });
    pointsGroup.appendChild(point);
    return point;
  });
  svg.appendChild(pointsGroup);

  const insight = document.getElementById("radarInsight");
  const insightTitle = document.getElementById("radarInsightTitle");
  const insightText = document.getElementById("radarInsightText");
  const showInsight = index => {
    pointElements.forEach((point, pointIndex) => point.classList.toggle("is-active", pointIndex === index));
    if (index === null || index === undefined) {
      insight.classList.remove("has-selection");
      insightTitle.textContent = "Perfil equilibrado";
      insightText.textContent = "Passe o cursor ou selecione um eixo para explorar as competências.";
      centerValue.textContent = `${average}%`;
      centerCaption.textContent = "MÉDIA";
      return;
    }
    const category = categories[index];
    insight.classList.add("has-selection");
    insightTitle.textContent = `${category.label} · ${category.value}%`;
    insightText.textContent = category.detail;
    centerValue.textContent = `${category.value}%`;
    centerCaption.textContent = category.label.toLocaleUpperCase("pt-BR");
  };

  const targetPoints = categories.map((category, index) => {
    const point = polarPoint(index, (category.value / 100) * maxR);
    return `${point.x},${point.y}`;
  }).join(" ");
  requestAnimationFrame(() => area.setAttribute("points", targetPoints));
});

/* =====================================================
   PLAYER DE M�DIA PREMIUM � L�gica de Funcionamento
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('mainPlayer');
  const bigPlayBtn = document.getElementById('bigPlayBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const videoWrapper = document.getElementById('videoWrapper');
  const progressFill = document.getElementById('progressFill');
  const progressSlider = document.getElementById('progressSlider');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const volumeSlider = document.getElementById('volumeSlider');
  const muteBtn = document.getElementById('muteBtn');
  const rewindBtn = document.getElementById('rewindBtn');
  const forwardBtn = document.getElementById('forwardBtn');
  const speedBtn = document.getElementById('speedBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const mediaTabs = document.querySelectorAll('.media-tab');
  const mediaTypeLabel = document.getElementById('media-type-label');
  const audioCover = document.getElementById('audioCover');
  const mediaWidget = document.querySelector('.media-widget');

  let isMuted = false;
  let previousVolume = 80;
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  let speedIndex = 2;

  const playerIcons = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    volumeHigh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7m3-10a9 9 0 0 1 0 13"/></svg>',
    volumeLow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>',
    volumeOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6m0-6-5 6"/></svg>'
  };

  function setButtonIcon(button, icon, label) {
    button.innerHTML = playerIcons[icon];
    button.title = label;
    button.setAttribute('aria-label', label);
  }

  function updatePlaybackIcon() {
    const playing = !player.paused;
    setButtonIcon(playPauseBtn, playing ? 'pause' : 'play', playing ? 'Pausar' : 'Reproduzir');
    videoWrapper.classList.toggle('playing', playing);
  }

  function updateVolumeIcon() {
    const icon = player.volume === 0 ? 'volumeOff' : player.volume > 0.5 ? 'volumeHigh' : 'volumeLow';
    const label = player.volume === 0 ? 'Ativar som' : 'Silenciar';
    setButtonIcon(muteBtn, icon, label);
  }

  // Formatar tempo
  function formatTime(segundos) {
    if (!segundos || isNaN(segundos)) return '0:00';
    const m = Math.floor(segundos / 60);
    const s = Math.floor(segundos % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Alternar Play/Pause
  function togglePlay() {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  // Atualizar barra de progresso
  function updateProgress() {
    const pct = (player.currentTime / player.duration) * 100 || 0;
    progressFill.style.width = `${pct}%`;
    progressSlider.value = pct;
    currentTimeEl.textContent = formatTime(player.currentTime);
  }

  // Definir tempo via clique na barra
  function setProgress(e) {
    const rect = progressSlider.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    player.currentTime = pct * player.duration;
  }

  // Alternar Mudo
  function toggleMute() {
    if (isMuted || player.volume === 0) {
      const restoreVolume = previousVolume > 0 ? previousVolume : 80;
      player.volume = restoreVolume / 100;
      volumeSlider.value = restoreVolume;
      isMuted = false;
    } else {
      previousVolume = volumeSlider.value;
      player.volume = 0;
      volumeSlider.value = 0;
      isMuted = true;
    }
    updateVolumeIcon();
  }

  // Alterar velocidade
  function changeSpeed() {
    speedIndex = (speedIndex + 1) % speeds.length;
    player.playbackRate = speeds[speedIndex];
    speedBtn.textContent = `${speeds[speedIndex]}x`;
  }

  // Tela cheia
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      mediaWidget.requestFullscreen?.() || mediaWidget.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  }

  // Carregar dura��o
  player.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(player.duration);
  });

  // Eventos
  bigPlayBtn.addEventListener('click', togglePlay);
  playPauseBtn.addEventListener('click', togglePlay);
  player.addEventListener('play', updatePlaybackIcon);
  player.addEventListener('pause', updatePlaybackIcon);
  player.addEventListener('timeupdate', updateProgress);
  player.addEventListener('ended', updatePlaybackIcon);
  progressSlider.addEventListener('input', (e) => {
    player.currentTime = (e.target.value / 100) * player.duration;
  });
  progressFill.parentElement.addEventListener('click', setProgress);

  volumeSlider.addEventListener('input', (e) => {
    player.volume = e.target.value / 100;
    if (player.volume > 0) {
      previousVolume = e.target.value;
      isMuted = false;
    } else {
      isMuted = true;
    }
    updateVolumeIcon();
  });

  muteBtn.addEventListener('click', toggleMute);
  rewindBtn.addEventListener('click', () => { player.currentTime -= 10; });
  forwardBtn.addEventListener('click', () => { player.currentTime += 10; });
  speedBtn.addEventListener('click', changeSpeed);
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Alternar V�deo / �udio
  mediaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mediaTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.dataset.mode;
      mediaTypeLabel.textContent = mode === 'video' ? 'V�deo' : '�udio';

      if (mode === 'video') {
        videoWrapper.style.display = '';
        audioCover.style.display = 'none';
        player.src = './media/demo-video.mp4';
        mediaWidget.style.gridRow = 'span 2';
      } else {
        videoWrapper.style.display = 'none';
        audioCover.style.display = 'flex';
        player.src = './media/demo-audio.mp3';
        mediaWidget.style.gridRow = 'auto';
      }
      player.load();
      progressFill.style.width = '0%';
      currentTimeEl.textContent = '0:00';
      durationEl.textContent = '0:00';
      updatePlaybackIcon();
    });
  });

  // Inicializar volume
  player.volume = 0.8;
  updatePlaybackIcon();
  updateVolumeIcon();
});