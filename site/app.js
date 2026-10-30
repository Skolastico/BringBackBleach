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

const frame = document.querySelector("#comparison-frame");
const beforeImage = document.querySelector("#before-image");
const afterImage = document.querySelector("#after-image");
const sceneCaption = document.querySelector("#scene-caption");
const wipeRange = document.querySelector("#wipe-range");
const wipeValue = document.querySelector("#wipe-value");

function setWipe(value) {
  frame.style.setProperty("--split", `${value}%`);
  wipeValue.value = `${value}%`;
  wipeValue.textContent = `${value}%`;
}

wipeRange.addEventListener("input", () => setWipe(wipeRange.value));

document.querySelectorAll("[data-scene]").forEach((button) => {
  button.addEventListener("click", () => {
    const example = examples[button.dataset.scene];
    if (!example) return;
    beforeImage.src = example.before;
    beforeImage.alt = example.beforeAlt;
    afterImage.src = example.after;
    afterImage.alt = example.afterAlt;
    sceneCaption.textContent = example.label;
    document.querySelectorAll("[data-scene]").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
  });
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
    // The static copy in the HTML remains readable if the status file is unavailable.
  }
}

loadLatestState();

