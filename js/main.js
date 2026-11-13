/* ════════════════════════════════════════════════════════════════
   main.js — comportamiento del catálogo
   Lee los datos de productos.js y arma la página de inicio
   (index.html) o la de detalle (producto.html?p=<slug>).
   ════════════════════════════════════════════════════════════════ */
(function () {
  const C = window.CATALOGO;
  const N = C.negocio;
  const P = C.productos;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const SPA = !!window.CATALOGO_SPA; // versión de una sola página (vista previa en línea)
  const linkTo = (slug) => (SPA ? `#${slug}` : `producto.html?p=${slug}`);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const fmtPrecio = (p) =>
    p == null ? "Cotizar" : new Intl.NumberFormat("es-MX", { style: "currency", currency: N.moneda, maximumFractionDigits: 0 }).format(p);

  const ctaHref = (texto) => {
    if (N.whatsapp) return `https://wa.me/${N.whatsapp}?text=${encodeURIComponent(texto)}`;
    if (N.correo) return `mailto:${N.correo}?subject=${encodeURIComponent("Cotización")}&body=${encodeURIComponent(texto)}`;
    if (N.instagram) return `https://instagram.com/${N.instagram}`;
    return "#contacto";
  };

  /* ── Comunes a todas las páginas ───────────────────────────── */
  $$("[data-negocio]").forEach((el) => (el.textContent = N[el.dataset.negocio] || ""));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-contacto]").forEach((el) => {
    const parts = [];
    if (N.whatsapp) parts.push(`<a href="https://wa.me/${esc(N.whatsapp)}" target="_blank" rel="noopener">WhatsApp ${esc(N.telefono || "")}</a>`);
    if (N.instagram) parts.push(`<a href="https://instagram.com/${esc(N.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
    if (N.correo) parts.push(`<a href="mailto:${esc(N.correo)}">${esc(N.correo)}</a>`);
    el.innerHTML = parts.length ? parts.join(" · ") : esc(N.ciudad);
  });
  // Número de WhatsApp visible debajo de cada botón de cotizar
  const addPhone = () => N.telefono && $$("[data-cta]").forEach((el) => {
    if (el.closest(".footer-cta")) return; // el bloque final ya abre WhatsApp, sin texto extra
    if (el.nextElementSibling && el.nextElementSibling.classList.contains("cta-phone")) return;
    el.insertAdjacentHTML("afterend", `<span class="cta-phone">WhatsApp <a href="https://wa.me/${esc(N.whatsapp)}" target="_blank" rel="noopener">${esc(N.telefono)}</a></span>`);
  });
  // addPhone(); // desactivado: los botones de cotizar ya abren WhatsApp
  const noPhoto = `<div class="no-photo"><span>Fotos próximamente</span></div>`;

  // Menú pantalla completa
  const menu = $("#menu");
  const toggle = $(".menu-toggle");
  $("[data-menu-list]").innerHTML =
    `<li><a href="${SPA ? "#inicio" : "index.html"}"><small>00</small>Inicio</a></li>` +
    P.map((p, i) => `<li><a href="${linkTo(p.slug)}"><small>${pad(i + 1)}</small>${esc(p.nombre)}</a></li>`).join("");
  const setMenu = (open) => {
    if (open) menu.hidden = false;
    requestAnimationFrame(() => menu.classList.toggle("is-open", open));
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(true));
  $(".menu-close").addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // Transición de cortina entre páginas
  window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin && location.protocol !== "file:") return;
    if (url.protocol !== location.protocol) return;
    if (url.pathname === location.pathname && url.search === location.search) return; // ancla en la misma página
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => (location.href = a.href), 480);
  });

  // Aparición al hacer scroll
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("is-in"), io.unobserve(en.target))),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  const observeReveals = () => $$(".reveal:not(.is-in)").forEach((el) => io.observe(el));

  /* ── Página de inicio ──────────────────────────────────────── */
  function initHome() {
    $$("[data-total]").forEach((el) => (el.textContent = P.length));
    $$("[data-total-text]").forEach((el) => (el.textContent = P.length));
    $$("[data-cta]").forEach((el) => {
      el.href = ctaHref(`Hola, me interesa rentar piezas para mi evento.`);
      if (N.whatsapp) { el.target = "_blank"; el.rel = "noopener"; } // abre WhatsApp en otra pestaña
    });

    // Marquee
    const evs = C.eventos.map((e) => `<span>${esc(e)}</span>`).join("");
    $("[data-marquee]").innerHTML = evs + evs + evs + evs;

    // Filtros por categoría con conteo
    const cats = [...new Set(P.map((p) => p.categoria))];
    const filters = $("[data-filters]");
    filters.innerHTML =
      `<button class="is-active" data-cat="*">Todo<sup>${P.length}</sup></button>` +
      cats.map((c) => `<button data-cat="${esc(c)}">${esc(c)}<sup>${P.filter((p) => p.categoria === c).length}</sup></button>`).join("");

    // Tarjetas
    const works = $("[data-works]");
    works.innerHTML = P.map((p, i) => {
      if (!p.imagenes.length) return `<li class="work reveal" data-cat="${esc(p.categoria)}">
        <a href="${linkTo(p.slug)}">
          <div class="work-media"><span class="tag">${esc(p.unidad)}</span>${noPhoto}</div>
          <div class="work-meta">
            <span class="work-num">${pad(i + 1)}</span>
            <h3 class="work-title">${esc(p.nombre)} <span class="cat">— ${esc(p.categoria)}</span></h3>
            <span class="work-price">Cotizar</span>
            <span class="work-arrow" aria-hidden="true">→</span>
          </div>
        </a>
      </li>`;
      const img2 = p.imagenes[1] ? `<img src="${p.imagenes[1]}" alt="" loading="lazy">` : "";
      return `<li class="work reveal" data-cat="${esc(p.categoria)}">
        <a href="${linkTo(p.slug)}" data-preview="${p.imagenes[0]}">
          <div class="work-media">
            <span class="tag">${esc(p.unidad)}</span>
            <img src="${p.imagenes[0]}" alt="${esc(p.nombre)}" loading="lazy">${img2}
          </div>
          <div class="work-meta">
            <span class="work-num">${pad(i + 1)}</span>
            <h3 class="work-title">${esc(p.nombre)} <span class="cat">— ${esc(p.categoria)}</span></h3>
            <span class="work-price">Cotizar</span>
            <span class="work-arrow" aria-hidden="true">→</span>
          </div>
        </a>
      </li>`;
    }).join("");

    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      $$("button", filters).forEach((x) => x.classList.toggle("is-active", x === b));
      $$(".work", works).forEach((w) => w.classList.toggle("is-hidden", b.dataset.cat !== "*" && w.dataset.cat !== b.dataset.cat));
    });

    // Cuadrícula / lista
    $$("[data-view]").forEach((b) =>
      b.addEventListener("click", () => {
        $$("[data-view]").forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b); });
        works.classList.toggle("is-grid", b.dataset.view === "grid");
        works.classList.toggle("is-list", b.dataset.view === "list");
      })
    );

    // Imagen flotante en vista lista
    const prev = $(".hover-preview");
    const prevImg = $("img", prev);
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      prev.style.left = cx + "px"; prev.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    works.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
    works.addEventListener("mouseover", (e) => {
      const a = e.target.closest("a[data-preview]");
      if (!a || !works.classList.contains("is-list")) return;
      prevImg.src = a.dataset.preview;
      if (!prev.classList.contains("is-visible")) { cx = x; cy = y; cancelAnimationFrame(raf); loop(); }
      prev.classList.add("is-visible");
    });
    works.addEventListener("mouseleave", () => { prev.classList.remove("is-visible"); cancelAnimationFrame(raf); });
  }

  /* ── Página de producto ────────────────────────────────────── */
  function initProduct(slugArg) {
    const slug = slugArg || new URLSearchParams(location.search).get("p");
    let i = P.findIndex((p) => p.slug === slug);
    if (i < 0) i = 0;
    const p = P[i];
    document.title = `${p.nombre} · ${N.nombre}`;

    const pending = (v) => (!v || /por definir/i.test(v) ? `<span class="pending">Por definir</span>` : esc(v));
    const set = (k, html) => $$(`[data-p="${k}"]`).forEach((el) => (el.innerHTML = html));
    set("index", `${pad(i + 1)} / ${pad(P.length)}`);
    set("categoria", esc(p.categoria));
    set("nombre", esc(p.nombre));
    set("resumen", esc(p.resumen));
    set("descripcion", esc(p.descripcion));
    set("precio", fmtPrecio(p.precio));
    set("unidad", p.precio == null ? "Precio según fecha y cantidad" : esc(p.unidad));
    set("medidas", pending(p.medidas));
    set("material", pending(p.material));
    set("cantidad", pending(p.cantidad));
    set("eventos", esc(p.eventos.join(", ")));
    $("[data-incluye-row]").hidden = !p.incluye.length;
    $("[data-opciones-row]").hidden = !(p.opciones && p.opciones.length);
    if (p.opciones && p.opciones.length) set("opciones", p.opciones.map(esc).join("<br>"));
    if (p.incluye.length) set("incluye", p.incluye.map(esc).join("<br>"));
    $$("[data-cta]").forEach((el) => {
      el.href = ctaHref(`Hola, me interesa rentar: ${p.nombre}. ¿Me pasas disponibilidad y precio?`);
      if (N.whatsapp) { el.target = "_blank"; el.rel = "noopener"; } // abre WhatsApp en otra pestaña
    });

    // Galería
    const main = $("[data-gallery-main]");
    const thumbs = $("[data-gallery-thumbs]");
    const gm = main.parentElement;
    $$(".no-photo", gm).forEach((x) => x.remove());
    main.hidden = !p.imagenes.length;
    if (!p.imagenes.length) gm.insertAdjacentHTML("beforeend", noPhoto);
    else main.src = p.imagenes[0];
    main.alt = p.nombre;
    thumbs.innerHTML = "";
    main.classList.remove("is-swapping");
    if (p.imagenes.length > 1) {
      thumbs.innerHTML = p.imagenes
        .map((src, k) => `<button class="${k ? "" : "is-active"}" aria-label="Foto ${k + 1}"><img src="${src}" alt=""></button>`)
        .join("");
      $$("button", thumbs).forEach((b, k) =>
        b.addEventListener("click", () => {
          $$("button", thumbs).forEach((x) => x.classList.toggle("is-active", x === b));
          main.classList.add("is-swapping");
          setTimeout(() => { main.src = p.imagenes[k]; main.onload = () => main.classList.remove("is-swapping"); }, 250);
        })
      );
    }

    // Anterior / siguiente
    const pv = P[(i - 1 + P.length) % P.length];
    const nx = P[(i + 1) % P.length];
    const prevA = $("[data-prev]"), nextA = $("[data-next]");
    prevA.href = linkTo(pv.slug); $("span", prevA).textContent = pv.nombre;
    nextA.href = linkTo(nx.slug); $("span", nextA).textContent = nx.nombre;
  }

  if (SPA) {
    // Una sola página: #<slug> muestra la ficha, cualquier otro hash muestra el inicio
    initHome();
    const home = $("[data-home]"), prod = $("[data-product]");
    const route = () => {
      const slug = location.hash.slice(1);
      const isProd = P.some((p) => p.slug === slug);
      setMenu(false);
      home.hidden = isProd; prod.hidden = !isProd;
      if (isProd) { initProduct(slug); window.scrollTo(0, 0); }
      else { document.title = N.nombre; if (!slug || slug === "inicio") window.scrollTo(0, 0); else { const t = document.getElementById(slug); t && t.scrollIntoView(); } }
      observeReveals();
    };
    window.addEventListener("hashchange", route);
    route();
  } else {
    if (document.body.classList.contains("page-home")) initHome();
    if (document.body.classList.contains("page-product")) initProduct();
  }
  observeReveals();
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("is-ready")));
})();
