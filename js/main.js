/* =====================================================
   LINKA — script principal
   ===================================================== */

/* ---------- 1. LOGO (usa o ID do config.js) ---------- */
function resolverLogo(cfg) {
  const id = (cfg.LOGO_ID || "").trim();
  if (!id) return null;
  switch (cfg.LOGO_TIPO) {
    case "drive":   return `https://lh3.googleusercontent.com/d/${id}`;
    case "imgur":   return `https://i.imgur.com/${id}.png`;
    case "arquivo": return `img/${id}`;
    case "url":     return id;
    default:        return null;
  }
}

(function iniciarLogo() {
  const slot = document.getElementById("logo-slot");
  const src = resolverLogo(LINKA_CONFIG);
  if (!slot || !src) return; // sem ID: mantém a letra "L" provisória

  const img = new Image();
  img.alt = "Logo " + LINKA_CONFIG.NOME_SITE;
  img.onload = () => { slot.innerHTML = ""; slot.appendChild(img); };
  img.onerror = () => console.warn("[Linka] Não foi possível carregar a logo. Confira o LOGO_ID e o LOGO_TIPO em js/config.js.");
  img.src = src;
})();

/* ---------- 2. MENU MOBILE ---------- */
(function menuMobile() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", aberto);
  });
  menu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => { menu.classList.remove("open"); btn.setAttribute("aria-expanded", false); })
  );
})();

/* ---------- 3. ANIMAÇÃO AO ROLAR + LINK ATIVO ---------- */
(function animacoes() {
  const itens = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  itens.forEach(el => io.observe(el));

  const links = document.querySelectorAll(".menu a");
  const secoes = [...links].map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const ativo = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secoes.forEach(s => ativo.observe(s));
})();

/* ---------- 4. FUNDO DE PARTÍCULAS CONECTADAS ---------- */
(function particulas() {
  const canvas = document.getElementById("bg");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  let w, h, pts = [];
  const mouse = { x: -999, y: -999 };

  function ajustar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    w = innerWidth; h = innerHeight;
    const qtd = Math.min(90, Math.floor((w * h) / 17000));
    pts = Array.from({ length: qtd }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.6 + .6
    }));
  }

  function desenhar() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 229, 255, .8)";
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(124, 77, 255, ${(1 - d / 130) * .35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (dm < 160) {
        ctx.strokeStyle = `rgba(255, 47, 185, ${(1 - dm / 160) * .6})`;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    requestAnimationFrame(desenhar);
  }

  addEventListener("resize", ajustar);
  addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  addEventListener("mouseleave", () => { mouse.x = mouse.y = -999; });
  ajustar();
  desenhar();
})();
