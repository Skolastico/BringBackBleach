const examples = {
  dialogo: {
    label: "EP008 · diálogo ao ar livre",
    before: "./assets/ep008-dialogo-fonte-576p.png",
    after: "./assets/ep008-dialogo-v7-2x.png",
    beforeAlt: "Fonte original 576p, cena de diálogo ao ar livre",
    afterAlt: "Saída do modelo v7 a 2×, no mesmo fotograma"
  },
  chuva: {
    label: "EP008 · chuva, luz e névoa",
    before: "./assets/ep008-chuva-fonte-576p.png",
    after: "./assets/ep008-chuva-v7-2x.png",
    beforeAlt: "Fonte original 576p, cena noturna com chuva e luzes",
    afterAlt: "Saída do modelo v7 a 2×, na mesma cena noturna"
  },
  acao: {
    label: "EP008 · ação com espada",
    before: "./assets/ep008-acao-fonte-576p.png",
    after: "./assets/ep008-acao-v7-2x.png",
    beforeAlt: "Fonte original 576p, cena de ação com espada",
    afterAlt: "Saída do modelo v7 a 2×, no mesmo fotograma de ação"
  }
};

const mainFrame = document.querySelector("#comparison-frame");
const modalFrame = document.querySelector("#modal-frame");
const comparisonFrames = [mainFrame, modalFrame];
const comparisonImages = [
  [document.querySelector("#before-image"), document.querySelector("#after-image")],
  [document.querySelector("#modal-before-image"), document.querySelector("#modal-after-image")]
];
const handles = Array.from(document.querySelectorAll(".wipe-handle"));
const sceneCaption = document.querySelector("#scene-caption");
const modalSceneCaption = document.querySelector("#modal-scene-caption");
const modal = document.querySelector("#comparison-modal");

function setWipe(value) {
  const position = Math.max(0, Math.min(100, Number(value)));
  comparisonFrames.forEach((frame) => frame.style.setProperty("--split", `${position}%`));
  handles.forEach((handle) => handle.setAttribute("aria-valuenow", String(Math.round(position))));
}

function setWipeFromPointer(event, frame) {
  const bounds = frame.getBoundingClientRect();
  setWipe(((event.clientX - bounds.left) / bounds.width) * 100);
}

function attachCurtain(frame, handle) {
  let activePointer = null;

  handle.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    activePointer = event.pointerId;
    handle.setPointerCapture(activePointer);
    setWipeFromPointer(event, frame);
  });

  handle.addEventListener("pointermove", (event) => {
    if (event.pointerId === activePointer) setWipeFromPointer(event, frame);
  });

  const finishDrag = (event) => {
    if (event.pointerId === activePointer) activePointer = null;
  };
  handle.addEventListener("pointerup", finishDrag);
  handle.addEventListener("pointercancel", finishDrag);
  handle.addEventListener("lostpointercapture", () => { activePointer = null; });
  handle.addEventListener("click", (event) => event.stopPropagation());

  handle.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 10 : 1;
    const current = Number(handle.getAttribute("aria-valuenow"));
    const changes = {
      ArrowLeft: -step,
      ArrowDown: -step,
      ArrowRight: step,
      ArrowUp: step,
      PageDown: -10,
      PageUp: 10
    };
    if (event.key === "Home") setWipe(0);
    else if (event.key === "End") setWipe(100);
    else if (Object.hasOwn(changes, event.key)) setWipe(current + changes[event.key]);
    else return;
    event.preventDefault();
  });
}

handles.forEach((handle, index) => attachCurtain(comparisonFrames[index], handle));
setWipe(50);

function selectScene(key) {
  const example = examples[key];
  if (!example) return;

  comparisonImages.forEach(([beforeImage, afterImage]) => {
    beforeImage.src = example.before;
    beforeImage.alt = example.beforeAlt;
    afterImage.src = example.after;
    afterImage.alt = example.afterAlt;
  });
  sceneCaption.textContent = example.label;
  modalSceneCaption.textContent = example.label;
  document.querySelectorAll("[data-scene]").forEach((button) => {
    const active = button.dataset.scene === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

document.querySelectorAll("[data-scene]").forEach((button) => {
  button.addEventListener("click", () => selectScene(button.dataset.scene));
});

mainFrame.addEventListener("click", (event) => {
  if (event.target.closest(".wipe-handle")) return;
  modal.showModal();
  document.querySelector("#modal-close").focus();
});

document.querySelector("#modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});
modal.addEventListener("close", () => handles[0].focus());

const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeIcon = document.querySelector(".theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function getSavedTheme() {
  try {
    const saved = localStorage.getItem("bringbackbleach-theme");
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme, save = false) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
  themeLabel.textContent = isDark ? "Modo claro" : "Modo escuro";
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeColor.content = isDark ? "#141615" : "#f3f1ec";
  if (save) {
    try { localStorage.setItem("bringbackbleach-theme", theme); } catch {}
  }
}

applyTheme(getSavedTheme() || (systemTheme.matches ? "dark" : "light"));
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});
systemTheme.addEventListener("change", (event) => {
  if (!getSavedTheme()) applyTheme(event.matches ? "dark" : "light");
});

function formatPercent(value) {
  return `${Number(value).toFixed(2).replace(".", ",")}%`;
}

async function loadLatestState() {
  try {
    const response = await fetch("./data.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    document.querySelector("#stage-index").textContent = String(data.stageNumber).padStart(2, "0");
    document.querySelector("#stage-total").textContent = String(data.stageTotal).padStart(2, "0");
    document.querySelector("#stage-title").textContent = data.stageTitle;
    document.querySelector("#stage-note").textContent = data.stageNote;
    document.querySelectorAll(".stage-segment").forEach((segment, index) => {
      const step = index + 1;
      segment.classList.toggle("is-complete", step < data.stageNumber);
      segment.classList.toggle("is-current", step === data.stageNumber);
      segment.hidden = step > data.stageTotal;
    });
    document.querySelector("#latest-summary").textContent = data.summary;
    document.querySelector("#next-step").textContent = data.nextStep;
    document.querySelector("#fine-value").textContent = formatPercent(data.metrics.fine);
    document.querySelector("#mid-value").textContent = formatPercent(data.metrics.intermediate);
    document.querySelector("#structure-value").textContent = formatPercent(data.metrics.structure);
    document.querySelector("#fine-bar").style.width = `${Math.min(100, Math.abs(data.metrics.fine))}%`;
    document.querySelector("#mid-bar").style.width = `${Math.min(100, Math.abs(data.metrics.intermediate))}%`;
    document.querySelector("#metric-note").textContent = data.metricNote;
  } catch {
    // The static copy remains readable if the status file is unavailable.
  }
}

loadLatestState();

