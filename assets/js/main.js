/* ==========================================================================
   BuildMart — shared interactivity
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- header scroll state ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    backToTopBtn && backToTopBtn.classList.toggle("is-visible", window.scrollY > 500);
  };
  const backToTopBtn = document.querySelector(".back-to-top");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- mobile nav ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
      const icon = navToggle.querySelector("svg");
      navToggle.setAttribute(
        "aria-expanded",
        mobileMenu.classList.contains("is-open") ? "true" : "false"
      );
    });
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.getAttribute("data-count-to"));
      const decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals"), 10) : 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = val.toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => cio.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("is-open"));
      if (!wasOpen) item.classList.add("is-open");
    });
  });

  /* ---------- gallery / project filter tabs ---------- */
  const tabButtons = document.querySelectorAll(".gallery-tabs button");
  const galleryItems = document.querySelectorAll(".gallery-grid .gallery-item");
  if (tabButtons.length && galleryItems.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.getAttribute("data-filter");
        galleryItems.forEach((item) => {
          const cat = item.getAttribute("data-category");
          const show = filter === "all" || cat === filter;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- toast helper ---------- */
  function showToast(message) {
    let toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span class="toast-msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector(".toast-msg").textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3600);
  }
  window.BuildMartToast = showToast;

  /* ---------- project cost estimator (range sliders) ---------- */
  const estimator = document.querySelector("[data-estimator]");
  if (estimator) {
    const areaInput = estimator.querySelector("#rangeArea");
    const floorsInput = estimator.querySelector("#rangeFloors");
    const finishChips = estimator.querySelectorAll("[data-finish]");
    const typeChips = estimator.querySelectorAll("[data-type]");
    const areaVal = estimator.querySelector("#areaVal");
    const floorsVal = estimator.querySelector("#floorsVal");
    const totalOut = estimator.querySelector("#estimateTotal");
    const rangeOut = estimator.querySelector("#estimateRangeText");
    const lineArea = estimator.querySelector("#lineArea");
    const lineFinish = estimator.querySelector("#lineFinish");
    const lineType = estimator.querySelector("#lineType");
    const lineFloors = estimator.querySelector("#lineFloors");

    const finishRates = { standard: 1750, premium: 2400, luxury: 3400 };
    const typeMultiplier = { residential: 1, commercial: 1.18, industrial: 1.3 };

    let state = { finish: "premium", type: "residential" };

    function fmtINR(n) {
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }

    function recalc() {
      const area = parseInt(areaInput.value, 10);
      const floors = parseInt(floorsInput.value, 10);
      const rate = finishRates[state.finish];
      const mult = typeMultiplier[state.type];
      const base = area * rate * mult;
      const floorFactor = 1 + (floors - 1) * 0.06;
      const total = base * floorFactor;
      const low = total * 0.92;
      const high = total * 1.1;

      areaVal.textContent = area.toLocaleString("en-IN") + " sq.ft";
      floorsVal.textContent = floors + (floors === 1 ? " floor" : " floors");
      totalOut.innerHTML = fmtINR(total).replace(/^₹/, "₹<sup>&nbsp;</sup>");
      rangeOut.textContent = fmtINR(low) + " – " + fmtINR(high) + " estimated range";
      lineArea.textContent = area.toLocaleString("en-IN") + " sq.ft";
      lineFinish.textContent = state.finish[0].toUpperCase() + state.finish.slice(1) + " (₹" + rate + "/sqft)";
      lineType.textContent = state.type[0].toUpperCase() + state.type.slice(1);
      lineFloors.textContent = floors + " × G+" + (floors - 1);
    }

    areaInput.addEventListener("input", recalc);
    floorsInput.addEventListener("input", recalc);
    finishChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        finishChips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        state.finish = chip.getAttribute("data-finish");
        recalc();
      });
    });
    typeChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        typeChips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        state.type = chip.getAttribute("data-type");
        recalc();
      });
    });
    recalc();
  }

  /* ---------- auth page: tabs, password visibility, strength meter, validation ---------- */
  const authTabs = document.querySelectorAll(".auth-tabs button");
  const authPanels = document.querySelectorAll("[data-auth-panel]");
  if (authTabs.length) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        authTabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        const target = tab.getAttribute("data-target");
        authPanels.forEach((p) => (p.style.display = p.getAttribute("data-auth-panel") === target ? "block" : "none"));
      });
    });
  }

  document.querySelectorAll(".toggle-pass").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const input = toggle.previousElementSibling;
      if (!input) return;
      const isPass = input.getAttribute("type") === "password";
      input.setAttribute("type", isPass ? "text" : "password");
      toggle.innerHTML = isPass
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-3.22 4.53M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  });

  const pwInput = document.querySelector("#signupPassword");
  const strengthBars = document.querySelectorAll(".strength-meter i");
  if (pwInput && strengthBars.length) {
    pwInput.addEventListener("input", () => {
      const v = pwInput.value;
      let score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;
      const colors = ["#a3392b", "#a9803f", "#a9803f", "#33724a"];
      strengthBars.forEach((bar, i) => {
        bar.style.background = i < score ? colors[Math.max(score - 1, 0)] : "";
      });
    });
  }

  /* generic form guard: prevent real submission, show toast (front-end demo) */
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.getAttribute("data-success-message") || "Submitted successfully.";
      showToast(msg);
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Please wait…";
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 1200);
      }
    });
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
