import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const STORAGE_KEY = "logic-apps-workshop-theme";
const COPYRIGHT_TEXT = "Created by Walid Amro (CSA at Microsoft).";

const TOPICS = [
  { key: "overview", label: "Overview", href: "topics/overview.html", dot: "dot-blue" },
  { key: "logic-apps-structure", label: "Logic Apps Structure", href: "topics/logic-apps-structure.html", dot: "dot-blue" },
  { key: "runtime-lifecycle", label: "Runtime Lifecycle", href: "topics/runtime-lifecycle.html", dot: "dot-red" },
  { key: "core-concepts", label: "Core Concepts", href: "topics/core-concepts.html", dot: "dot-green" },
  { key: "advanced-patterns", label: "Advanced Patterns", href: "topics/advanced-patterns.html", dot: "dot-orange" },
  { key: "hosting-plans", label: "Hosting Plans", href: "topics/hosting-plans.html", dot: "dot-blue",
    children: [
      { key: "consumption-plans", label: "Consumption (Multi-tenant)", href: "topics/consumption-plans.html", dot: "dot-green" },
      { key: "standard-plans", label: "Standard Overview", href: "topics/standard-plans.html", dot: "dot-orange" },
      { key: "workflow-service-plan", label: "Workflow Service Plan", href: "topics/workflow-service-plan.html", dot: "dot-orange" },
      { key: "app-service-environment-v3", label: "App Service Environment v3", href: "topics/app-service-environment-v3.html", dot: "dot-blue" },
      { key: "hybrid-plans", label: "Hybrid", href: "topics/hybrid-plans.html", dot: "dot-purple" },
      { key: "logic-apps-automation", label: "Logic Apps Automation", href: "topics/logic-apps-automation.html", dot: "dot-green" }
    ]
  },
  { key: "design-best-practices", label: "Design Guidance", href: "topics/design-best-practices.html", dot: "dot-green" },
  { key: "connectors-and-integration-accounts", label: "Connectors and Integration Accounts", href: "topics/connectors-and-integration-accounts.html", dot: "dot-blue" },
  { key: "security-governance", label: "Security & Limits", href: "topics/security-governance.html", dot: "dot-red" },
  { key: "monitoring-troubleshooting", label: "Monitoring", href: "topics/monitoring-troubleshooting.html", dot: "dot-orange" },
  { key: "workflow-testing", label: "Workflow Testing", href: "topics/workflow-testing.html", dot: "dot-orange" },
  { key: "use-cases", label: "Use Cases", href: "topics/use-cases.html", dot: "dot-purple" },
  { key: "agentic-workflows", label: "Agentic Workflows", href: "topics/agentic-workflows.html", dot: "dot-blue" },
  { key: "build-and-manage", label: "Build & Manage", href: "topics/build-and-manage.html", dot: "dot-blue",
    children: [
      { key: "portal-menus", label: "Portal Menus", href: "topics/portal-menus.html", dot: "dot-green" }
    ]
  }
];

const LABS = [
  { key: "labs", label: "Labs Overview", href: "labs/index.html", dot: "dot-blue" },
  { key: "lab01-http-product-api", label: "Lab 01: HTTP Product API", href: "labs/lab01-http-product-api-portal.html", dot: "dot-blue" },
  { key: "lab02-timer-daily-report", label: "Lab 02: Timer Daily Report", href: "labs/lab02-timer-daily-report-portal.html", dot: "dot-green" },
  { key: "lab03-order-fulfillment", label: "Lab 03: Order Fulfillment", href: "labs/lab03-order-fulfillment-vscode.html", dot: "dot-orange" },
  { key: "lab04-event-grid-blob", label: "Lab 04: Event Grid Blob Processor", href: "labs/lab04-event-grid-blob-processor-portal.html", dot: "dot-purple" },
  { key: "lab05-workflow-testing", label: "Lab 05: Logic App Testing", href: "labs/lab05-logic-app-testing-portal.html", dot: "dot-red" },
  { key: "lab06-inline-dotnet", label: "Lab 06: Inline .NET Code", href: "labs/lab06-inline-dotnet-code-vscode.html", dot: "dot-blue" }
];

const MOON_SUN = `
  <span class="theme-icon theme-icon-moon" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="img"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 1 0 10.5 10.5z"></path><path d="M16.5 5.2v2.1"></path><path d="M15.45 6.25h2.1"></path></svg>
  </span>
  <span class="theme-icon theme-icon-sun" aria-hidden="true">
    <svg viewBox="0 0 24 24" role="img"><circle cx="12" cy="12" r="4"></circle><path d="M12 2.8v2.1"></path><path d="M12 19.1v2.1"></path><path d="M2.8 12h2.1"></path><path d="M19.1 12h2.1"></path><path d="M5.5 5.5l1.5 1.5"></path><path d="M17 17l1.5 1.5"></path><path d="M17 7l1.5-1.5"></path><path d="M5.5 18.5L7 17"></path></svg>
  </span>`;

function rootPrefix() {
  const root = document.body.getAttribute("data-root") || ".";
  return root.replace(/\/+$/, "");
}

function url(href) {
  return `${rootPrefix()}/${href}`;
}

function flattenTopics(items) {
  return items.flatMap((item) => (item.children ? [item, ...item.children] : [item]));
}

function menuMarkup(items, active) {
  return items
    .map((item) => {
      const childActive = item.children && item.children.some((child) => child.key === active);
      const activeClass = item.key === active || childActive ? "is-active" : "";
      let html = `<a class="${activeClass}" href="${url(item.href)}"><span class="nav-dot ${item.dot}"></span>${item.label}</a>`;

      if (item.children && item.children.length) {
        const children = item.children
          .map((child) => `<a class="nav-subitem${child.key === active ? " is-active" : ""}" href="${url(child.href)}"><span class="nav-dot ${child.dot}"></span>${child.label}</a>`)
          .join("");
        html += `<div class="nav-submenu${childActive ? " is-active" : ""}">${children}</div>`;
      }

      return html;
    })
    .join("");
}

function buildNav() {
  const active = document.body.getAttribute("data-active") || "";
  const topicsActive = flattenTopics(TOPICS).some((topic) => topic.key === active);
  const labsActive = LABS.some((lab) => lab.key === active);

  const nav = document.createElement("header");
  nav.className = "site-nav";
  nav.innerHTML = `
    <a class="brand" href="${url("index.html")}">
      <span class="brand-mark" aria-hidden="true">
        <img src="${url("images/azure/02631-icon-service-Logic-Apps.svg")}" alt="" loading="eager" decoding="async" />
      </span>
      <span class="brand-text"><strong>Azure Logic Apps</strong><small>Developer Workshop</small></span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="${url("index.html")}" class="${active === "home" ? "is-active" : ""}">Home</a>
      <details class="nav-dropdown ${topicsActive ? "is-active" : ""}">
        <summary>Topics</summary>
        <div class="nav-menu">${menuMarkup(TOPICS, active)}</div>
      </details>
      <details class="nav-dropdown ${labsActive ? "is-active" : ""}">
        <summary>Labs</summary>
        <div class="nav-menu">${menuMarkup(LABS, active)}</div>
      </details>
      <a href="${url("trainer/index.html")}" class="${active === "trainer" ? "is-active" : ""}">Trainer</a>
      <button id="theme-toggle" class="nav-toggle" type="button" aria-pressed="false" aria-label="Switch theme" title="Switch theme">
        ${MOON_SUN}
        <span id="theme-toggle-text" class="sr-only">Switch theme</span>
      </button>
    </nav>`;
  document.body.insertBefore(nav, document.body.firstChild);

  document.addEventListener("click", (event) => {
    nav.querySelectorAll("details.nav-dropdown[open]").forEach((detail) => {
      if (!detail.contains(event.target)) detail.removeAttribute("open");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") nav.querySelectorAll("details.nav-dropdown[open]").forEach((detail) => detail.removeAttribute("open"));
  });
}

function buildFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <span>&copy; <span id="footer-year"></span> ${COPYRIGHT_TEXT}</span>
      <span class="footer-links">
        <a href="${url("index.html")}">Home</a>
        <a href="${url("topics/overview.html")}">Overview</a>
        <a href="${url("topics/hosting-plans.html")}">Hosting Plans</a>
        <a href="${url("trainer/index.html")}">Trainer Hub</a>
        <a href="https://learn.microsoft.com/azure/logic-apps/" target="_blank" rel="noopener">Microsoft Learn &#8599;</a>
      </span>
    </div>`;
  document.body.appendChild(footer);
  const year = footer.querySelector("#footer-year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme, persist) {
  const isDark = theme === "dark";
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  if (persist) localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");

  const toggle = document.getElementById("theme-toggle");
  const toggleText = document.getElementById("theme-toggle-text");
  const next = isDark ? "Switch to light mode" : "Switch to dark mode";
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", next);
    toggle.setAttribute("title", next);
  }
  if (toggleText) toggleText.textContent = next;
}

function wireToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  applyTheme(getPreferredTheme(), false);
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark", true);
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(event.matches ? "dark" : "light", false);
  });
}

function enhanceTocWithPageTitle() {
  const toc = document.querySelector(".toc");
  const pageTitle = document.querySelector("h1");
  if (!toc || !pageTitle) return;

  const pageIndicator = document.createElement("div");
  pageIndicator.className = "toc-page-title";
  pageIndicator.innerHTML = `<p class="toc-page-label"><strong>${pageTitle.textContent.trim()}</strong></p>`;

  const tocHeading = toc.querySelector("h3");
  if (tocHeading) {
    toc.insertBefore(pageIndicator, tocHeading);
  } else {
    toc.insertBefore(pageIndicator, toc.firstChild);
  }
}

function enhanceCodeBlocks() {
  const blocks = document.querySelectorAll("pre.code");
  blocks.forEach((pre) => {
    if (pre.closest(".code-block")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.className = "code-copy-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Copy code to clipboard");
    button.textContent = "Copy";

    button.addEventListener("click", async () => {
      const code = pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied";
        button.classList.add("copied");
      } catch {
        button.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        button.textContent = "Copy";
        button.classList.remove("copied");
      }, 1500);
    });

    wrapper.appendChild(button);
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    document.head.appendChild(script);
  });
}

function loadStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function normalizeCodeIndent(raw) {
  const lines = raw.replace(/\r\n?/g, "\n").split("\n");
  if (lines.length < 2) return raw;

  const firstIndent = (lines[0].match(/^[\t ]*/) || [""])[0].length;
  const candidateLines = lines.slice(1).filter((line) => line.trim().length > 0);
  if (!candidateLines.length) return raw;

  const minIndent = Math.min(
    ...candidateLines.map((line) => (line.match(/^[\t ]*/) || [""])[0].length)
  );

  if (firstIndent === 0 && minIndent > 0) {
    const normalized = [lines[0], ...lines.slice(1).map((line) => line.slice(Math.min(minIndent, line.length)))];
    return normalized.join("\n");
  }

  return raw;
}

async function initPrismHighlighting() {
  const blocks = Array.from(document.querySelectorAll("pre.code[data-lang]"));
  if (!blocks.length) return;

  const codes = [];
  blocks.forEach((pre) => {
    const lang = (pre.getAttribute("data-lang") || "").trim().toLowerCase();
    if (!lang) return;

    let code = pre.querySelector("code");
    if (!code) {
      code = document.createElement("code");
      code.textContent = normalizeCodeIndent(pre.textContent);
      pre.textContent = "";
      pre.appendChild(code);
    } else {
      code.textContent = normalizeCodeIndent(code.textContent);
    }

    pre.classList.add(`language-${lang}`);
    code.classList.add(`language-${lang}`);
    codes.push(code);
  });

  if (!codes.length) return;

  window.Prism = window.Prism || {};
  window.Prism.manual = true;

  loadStyle("https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css");

  try {
    await loadScript("https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-clike.min.js");
    await Promise.all([
      loadScript("https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-csharp.min.js"),
      loadScript("https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-bash.min.js"),
      loadScript("https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-json.min.js")
    ]);

    if (window.Prism && typeof window.Prism.highlightElement === "function") {
      codes.forEach((code) => window.Prism.highlightElement(code));
    }
  } catch {
    // Keep plain code blocks if syntax-highlighting assets fail to load.
  }
}

function initMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      primaryColor: "#e6f2fb",
      primaryTextColor: "#0f1722",
      primaryBorderColor: "#0078d4",
      lineColor: "#0078d4",
      secondaryColor: "#fff3e3",
      tertiaryColor: "#e7f5e7",
      actorBorder: "#0078d4",
      actorBkg: "#e6f2fb",
      actorTextColor: "#0f1722",
      signalColor: "#0078d4",
      signalTextColor: "#0f1722",
      noteBkgColor: "#fff3e3",
      noteTextColor: "#4a2a0a",
      noteBorderColor: "#ff8c00"
    },
    flowchart: {
      curve: "basis",
      fontSize: 12,
      htmlLabels: true
    }
  });
  const nodes = document.querySelectorAll("pre.mermaid, .mermaid");
  if (nodes.length) mermaid.run({ nodes });
}

function boot() {
  buildNav();
  buildFooter();
  wireToggle();
  enhanceTocWithPageTitle();
  enhanceCodeBlocks();
  initPrismHighlighting();
  initMermaid();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}