/* Trio Restaurant & Lounge — site behaviour (vanilla, no dependencies). */
(function () {
  "use strict";

  var d = document;
  var html = d.documentElement;
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = reduceMQ.matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = d.querySelector(".nav-toggle");
  var nav = d.getElementById("site-nav");

  function setNav(open) {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    html.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && html.classList.contains("nav-open")) {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (mq) {
      if (mq.matches) setNav(false);
    });
  }

  /* ---------- Header state ---------- */
  var header = d.querySelector(".site-header");
  function onHeaderScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onHeaderScroll();
  window.addEventListener("scroll", onHeaderScroll, { passive: true });

  /* ---------- Footer year ---------- */
  var yearEls = d.querySelectorAll("[data-year]");
  for (var y = 0; y < yearEls.length; y++) yearEls[y].textContent = String(new Date().getFullYear());

  /* ---------- Reveal on scroll ---------- */
  var reveals = d.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    for (var r = 0; r < reveals.length; r++) revealIO.observe(reveals[r]);
  } else {
    for (var r2 = 0; r2 < reveals.length; r2++) reveals[r2].classList.add("is-in");
  }

  /* ---------- Richmond time helpers ---------- */
  // Hours in minutes from midnight, index 0 = Sunday. Close > 1440 means after midnight.
  var HOURS = [
    [12 * 60, 17 * 60], // Sun 12-5 PM
    null,               // Mon closed
    [11 * 60, 21 * 60], // Tue 11 AM-9 PM
    [12 * 60, 21 * 60], // Wed 12-9 PM
    [12 * 60, 21 * 60], // Thu 12-9 PM
    [12 * 60, 25 * 60], // Fri 12 PM-1 AM
    [12 * 60, 25 * 60]  // Sat 12 PM-1 AM
  ];
  var DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function richmondNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23"
      }).formatToParts(new Date());
      var out = {};
      parts.forEach(function (p) { out[p.type] = p.value; });
      var day = DAY_SHORT.indexOf(out.weekday);
      var hour = parseInt(out.hour, 10) % 24;
      var minute = parseInt(out.minute, 10);
      if (day < 0 || isNaN(hour)) throw new Error("parse");
      return { day: day, minutes: hour * 60 + minute };
    } catch (err) {
      var n = new Date();
      return { day: n.getDay(), minutes: n.getHours() * 60 + n.getMinutes() };
    }
  }

  function fmtTime(mins) {
    mins = mins % 1440;
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    var suffix = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + (m ? ":" + (m < 10 ? "0" : "") + m : "") + " " + suffix;
  }

  function openStatus() {
    var now = richmondNow();
    var today = HOURS[now.day];
    var yesterday = HOURS[(now.day + 6) % 7];
    // Still open from last night's late close?
    if (yesterday && yesterday[1] > 1440 && now.minutes < yesterday[1] - 1440) {
      return { open: true, text: "Open now · until " + fmtTime(yesterday[1]) };
    }
    if (today && now.minutes >= today[0] && now.minutes < today[1]) {
      return { open: true, text: "Open now · until " + fmtTime(today[1]) };
    }
    if (today && now.minutes < today[0]) {
      return { open: false, text: "Closed now · opens today at " + fmtTime(today[0]) };
    }
    for (var i = 1; i <= 7; i++) {
      var idx = (now.day + i) % 7;
      if (HOURS[idx]) {
        var label = i === 1 ? "tomorrow" : DAY_NAMES[idx];
        return { open: false, text: "Closed now · opens " + label + " at " + fmtTime(HOURS[idx][0]) };
      }
    }
    return { open: false, text: "Closed now" };
  }

  var statusEls = d.querySelectorAll("[data-open-status]");
  if (statusEls.length) {
    var st = openStatus();
    for (var s = 0; s < statusEls.length; s++) {
      statusEls[s].textContent = st.text;
      statusEls[s].classList.add(st.open ? "is-open" : "is-closed");
      statusEls[s].hidden = false;
    }
  }

  var nowInfo = richmondNow();
  var hourRows = d.querySelectorAll("[data-hours-day]");
  for (var h = 0; h < hourRows.length; h++) {
    if (parseInt(hourRows[h].getAttribute("data-hours-day"), 10) === nowInfo.day) {
      hourRows[h].classList.add("is-today");
    }
  }

  /* ---------- Tonight at Trio ---------- */
  var weekList = d.querySelector("[data-week]");
  var feature = d.querySelector("[data-tonight-feature]");
  if (weekList && feature) {
    // Before 4 AM counts as the previous night.
    var nightDay = nowInfo.minutes < 240 ? (nowInfo.day + 6) % 7 : nowInfo.day;
    var item = weekList.querySelector('[data-day="' + nightDay + '"]');
    if (item) {
      item.classList.add("is-today");
      var body = item.querySelector(".wk-body");
      var slot = feature.querySelector("[data-tonight-slot]");
      var kicker = feature.querySelector("[data-tonight-kicker]");
      if (body && slot) {
        slot.innerHTML = "";
        var clone = body.cloneNode(true);
        var title = clone.querySelector(".wk-title");
        if (title) {
          // Promote the cloned heading so the outline stays tidy.
          var h3 = d.createElement("h3");
          h3.className = "wk-title";
          h3.innerHTML = title.innerHTML;
          title.parentNode.replaceChild(h3, title);
        }
        slot.appendChild(clone);
      }
      var closedDay = item.classList.contains("is-closed");
      if (kicker) {
        kicker.textContent = closedDay ? "Today · " + DAY_NAMES[nightDay] : (nightDay === 0 ? "Today · Sunday" : "Tonight · " + DAY_NAMES[nightDay]);
      }
      feature.setAttribute("data-day-short", DAY_SHORT[nightDay]);
      feature.hidden = false;
      var section = weekList.closest(".tonight");
      if (section) section.classList.add("is-live");
      var grid = weekList.closest(".tonight-grid");
      if (grid) grid.classList.remove("no-feature");
      var label = d.querySelector("[data-tonight-label]");
      if (label) label.textContent = closedDay ? "this week" : (nightDay === 0 ? "today" : "tonight");
    }
  }

  /* ---------- Vinyl: slow spin + scroll-driven rotation ---------- */
  var disc = d.querySelector("[data-vinyl]");
  if (disc && !reduced) {
    var angle = 0;
    var lastT = 0;
    var lastY = window.scrollY;
    var running = false;
    var rafId = 0;
    var frame = function (t) {
      if (!lastT) lastT = t;
      var dt = Math.min(t - lastT, 64);
      lastT = t;
      var yNow = window.scrollY;
      var dy = yNow - lastY;
      lastY = yNow;
      angle = (angle + dt * 0.006 + dy * 0.3) % 360; // ~6deg/s idle, scroll adds spin
      disc.style.transform = "rotate(" + angle.toFixed(2) + "deg)";
      if (running) rafId = requestAnimationFrame(frame);
    };
    var start = function () {
      if (running) return;
      running = true;
      lastT = 0;
      lastY = window.scrollY;
      rafId = requestAnimationFrame(frame);
    };
    var stop = function () {
      running = false;
      cancelAnimationFrame(rafId);
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }).observe(disc);
    } else {
      start();
    }
    d.addEventListener("visibilitychange", function () {
      if (d.hidden) stop();
    });
  }

  /* ---------- Weekly lineup: vertical scroll drives horizontal track ---------- */
  var lineup = d.querySelector("[data-lineup]");
  if (lineup) {
    var track = lineup.querySelector("[data-lineup-track]");
    var viewport = lineup.querySelector(".lineup-viewport");
    var bar = lineup.querySelector("[data-lineup-bar]");
    var desktopMQ = window.matchMedia("(min-width: 960px)");
    var pinned = false;
    var shift = 0;
    var ticking = false;

    var measure = function () {
      lineup.style.height = "";
      track.style.transform = "";
      shift = Math.max(0, track.scrollWidth - viewport.clientWidth);
      lineup.style.height = (window.innerHeight + shift) + "px";
      update();
    };
    var update = function () {
      ticking = false;
      if (!pinned) return;
      var rect = lineup.getBoundingClientRect();
      var total = lineup.offsetHeight - window.innerHeight;
      var p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      track.style.transform = "translate3d(" + (-p * shift).toFixed(1) + "px,0,0)";
      if (bar) bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
    };
    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    var enable = function () {
      if (pinned) return;
      pinned = true;
      lineup.classList.add("is-pinned");
      measure();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", measure);
    };
    var disable = function () {
      if (!pinned) return;
      pinned = false;
      lineup.classList.remove("is-pinned");
      lineup.style.height = "";
      track.style.transform = "";
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
    var decide = function () {
      if (desktopMQ.matches && !reduceMQ.matches && window.innerHeight >= 620) enable(); else disable();
    };
    decide();
    var resizeTimer = 0;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(decide, 150);
    });
    desktopMQ.addEventListener("change", decide);
    reduceMQ.addEventListener("change", decide);
    window.addEventListener("load", function () { if (pinned) measure(); });
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { if (pinned) measure(); });

    // Keyboard users: bring a focused card link into view while pinned.
    lineup.addEventListener("focusin", function (e) {
      if (!pinned) return;
      var card = e.target.closest(".lu-card");
      if (!card) return;
      var idx = Array.prototype.indexOf.call(track.children, card);
      var p = track.children.length > 1 ? idx / (track.children.length - 1) : 0;
      var total = lineup.offsetHeight - window.innerHeight;
      window.scrollTo(0, lineup.offsetTop + p * total);
    });
  }

  /* ---------- Menu: category nav highlights while scrolling ---------- */
  var menuNav = d.querySelector("[data-menu-nav]");
  if (menuNav && "IntersectionObserver" in window) {
    var links = menuNav.querySelectorAll("a[href^='#']");
    var byId = {};
    for (var l = 0; l < links.length; l++) byId[links[l].getAttribute("href").slice(1)] = links[l];
    var current = null;
    var setActive = function (id) {
      if (current === id || !byId[id]) return;
      current = id;
      for (var k = 0; k < links.length; k++) {
        links[k].classList.remove("is-active");
        links[k].removeAttribute("aria-current");
      }
      var link = byId[id];
      link.classList.add("is-active");
      link.setAttribute("aria-current", "true");
      var inner = menuNav.querySelector(".menu-nav-inner");
      if (inner) {
        var target = link.offsetLeft - (inner.clientWidth - link.offsetWidth) / 2;
        inner.scrollTo({ left: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
      }
    };
    var sectionsIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -60% 0px", threshold: 0 });
    var menuSections = d.querySelectorAll("[data-menu-section]");
    menuSections.forEach(function (sec) { sectionsIO.observe(sec); });
    var firstId = links[0] ? links[0].getAttribute("href").slice(1) : null;
    var resetIfAbove = function () {
      if (!firstId || !menuSections[0]) return;
      if (menuSections[0].getBoundingClientRect().top > window.innerHeight * 0.35) setActive(firstId);
    };
    window.addEventListener("scroll", resetIfAbove, { passive: true });
    if (firstId) setActive(firstId);
  }
})();
