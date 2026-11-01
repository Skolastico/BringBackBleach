const archiveScenes = {
  dialogue: {
    label: "Episode 8 · outdoor dialogue",
    before: "./assets/ep008-dialogo-fonte-576p.png",
    after: "./assets/ep008-dialogo-v7-2x.png",
    beforeAlt: "Original Episode 8 frame showing a conversation outdoors",
    afterAlt: "The same frame enlarged by an earlier experimental version"
  },
  rain: {
    label: "Episode 8 · rain, light and haze",
    before: "./assets/ep008-chuva-fonte-576p.png",
    after: "./assets/ep008-chuva-v7-2x.png",
    beforeAlt: "Original Episode 8 night scene with rain and lights",
    afterAlt: "The same night scene enlarged by an earlier experimental version"
  },
  action: {
    label: "Episode 8 · action with a sword",
    before: "./assets/ep008-acao-fonte-576p.png",
    after: "./assets/ep008-acao-v7-2x.png",
    beforeAlt: "Original Episode 8 action scene with a sword",
    afterAlt: "The same action frame enlarged by an earlier experimental version"
  }
};

const pageFrames = [
  document.querySelector("#comparison-frame"),
  document.querySelector("#current-frame"),
  document.querySelector("#modal-frame")
];
const archiveImages = [
  document.querySelector("#before-image"),
  document.querySelector("#after-image")
];
const currentImages = [
  document.querySelector("#current-before-image"),
  document.querySelector("#current-after-image")
];
const modalImages = [
  document.querySelector("#modal-before-image"),
  document.querySelector("#modal-after-image")
];
const curtainHandles = Array.from(document.querySelectorAll(".wipe-handle"));
const modal = document.querySelector("#comparison-modal");
const modalCaption = document.querySelector("#modal-scene-caption");
let currentImageRecord = null;
let modalOpener = null;

function setWipe(value) {
  const position = Math.max(0, Math.min(100, Number(value)));
  pageFrames.forEach((frame) => frame.style.setProperty("--split", position + "%"));
  curtainHandles.forEach((handle) => handle.setAttribute("aria-valuenow", String(Math.round(position))));
}

function setWipeFromPointer(event, frame) {
  const bounds = frame.getBoundingClientRect();
  setWipe(((event.clientX - bounds.left) / bounds.width) * 100);
}

function attachCurtain(handle) {
  const frame = handle.closest(".comparison-frame");
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

curtainHandles.forEach(attachCurtain);
setWipe(50);

function setModalImages(record, caption) {
  modalImages[0].src = record.before;
  modalImages[0].alt = record.beforeAlt;
  modalImages[1].src = record.after;
  modalImages[1].alt = record.afterAlt;
  modalCaption.textContent = caption;
  const labels = modal.querySelectorAll(".image-label");
  labels[0].textContent = record.beforeLabel;
  labels[1].textContent = record.afterLabel;
  setWipe(50);
}

function openModal(record, caption, opener = document.querySelector("#comparison-frame")) {
  modalOpener = opener;
  setModalImages(record, caption);
  modal.showModal();
  document.querySelector("#modal-close").focus();
}

function selectArchiveScene(key) {
  const record = archiveScenes[key];
  if (!record) return;
  archiveImages[0].src = record.before;
  archiveImages[0].alt = record.beforeAlt;
  archiveImages[1].src = record.after;
  archiveImages[1].alt = record.afterAlt;
  document.querySelector("#scene-caption").textContent = record.label;
  document.querySelector("#comparison-frame").dataset.preview = key;
  document.querySelectorAll("[data-scene]").forEach((button) => {
    const active = button.dataset.scene === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

document.querySelectorAll("[data-scene]").forEach((button) => {
  button.addEventListener("click", () => selectArchiveScene(button.dataset.scene));
});

document.querySelector("#comparison-frame").addEventListener("click", (event) => {
  if (event.target.closest(".wipe-handle")) return;
  const key = document.querySelector("#comparison-frame").dataset.preview;
  const scene = archiveScenes[key];
  openModal({
    ...scene,
    beforeLabel: "Original frame",
    afterLabel: "Earlier test"
  }, scene.label, document.querySelector("#comparison-frame"));
});

document.querySelector("#comparison-frame").addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.id === "comparison-frame") {
    event.preventDefault();
    document.querySelector("#comparison-frame").click();
  }
});

document.querySelector("#current-frame").addEventListener("click", (event) => {
  if (event.target.closest(".wipe-handle") || !currentImageRecord) return;
  openModal(currentImageRecord, currentImageRecord.caption, event.currentTarget);
});

document.querySelector("#current-frame").addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.id === "current-frame" && currentImageRecord) {
    event.preventDefault();
    document.querySelector("#current-frame").click();
  }
});

document.querySelector("#modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});
modal.addEventListener("close", () => {
  modalOpener?.focus();
  modalOpener = null;
});

const themeToggle = document.querySelector("#theme-toggle");
const themeLabel = document.querySelector("#theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
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
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeLabel.textContent = isDark ? "Light" : "Dark";
  themeColor.content = isDark ? "#0b0d0e" : "#f5f2ec";
  if (save) {
    try { localStorage.setItem("bringbackbleach-theme", theme); } catch {}
  }
}

applyTheme(getSavedTheme() || "dark");
themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});

function setText(selector, value) {
  if (typeof value === "string") document.querySelector(selector).textContent = value;
}

function loadDailyImage(imageDetail, postDate) {
  const section = document.querySelector("#current-image-section");
  section.hidden = true;
  document.querySelector(".image-reading").hidden = true;
  if (!imageDetail || imageDetail.available !== true || imageDetail.date !== postDate) return;

  const safeImagePath = (path) => typeof path === "string" && path.startsWith("./assets/diario/") && !path.includes("..");
  if (!safeImagePath(imageDetail.before) || !safeImagePath(imageDetail.after)) return;

  currentImageRecord = {
    before: imageDetail.before,
    after: imageDetail.after,
    beforeAlt: imageDetail.beforeAlt || "Before image crop from the reviewed frame",
    afterAlt: imageDetail.afterAlt || "After image crop from the same reviewed frame",
    beforeLabel: imageDetail.beforeLabel || "Before · source",
    afterLabel: imageDetail.afterLabel || "After · output",
    caption: imageDetail.caption || imageDetail.title || "Latest reviewed image detail"
  };
  currentImages[0].src = currentImageRecord.before;
  currentImages[0].alt = currentImageRecord.beforeAlt;
  currentImages[1].src = currentImageRecord.after;
  currentImages[1].alt = currentImageRecord.afterAlt;
  document.querySelector("#current-image-detail").textContent = imageDetail.detail || "";
  document.querySelector("#current-image-caption").textContent = currentImageRecord.caption;
  document.querySelector("#current-before-label").textContent = currentImageRecord.beforeLabel;
  document.querySelector("#current-after-label").textContent = currentImageRecord.afterLabel;
  section.hidden = false;
  document.querySelector(".image-reading").hidden = false;
}

function loadImageHistory(entries) {
  const container = document.querySelector("#journal-history");
  if (!Array.isArray(entries)) return;
  const safePath = (path) => typeof path === "string" && path.startsWith("./assets/diario/") && !path.includes("..");
  container.replaceChildren();
  const unique = new Map();
  entries.filter((entry) => safePath(entry.before) && safePath(entry.after) && /^\d{4}-\d{2}-\d{2}$/.test(entry.date))
    .forEach((entry) => unique.set(entry.before + "|" + entry.after, entry));
  [...unique.values()].sort((a, b) => b.date.localeCompare(a.date)).forEach((entry) => {
    const row = document.createElement("article");
    row.className = "history-row";
    const date = document.createElement("time");
    date.className = "history-date";
    date.dateTime = entry.date;
    date.textContent = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(entry.date + "T12:00:00Z"));
    const marker = document.createElement("span");
    marker.className = "history-marker";
    marker.setAttribute("aria-hidden", "true");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "history-entry";
    const tag = document.createElement("span");
    tag.className = "history-tag";
    tag.textContent = entry.featured ? "Featured comparison" : "Earlier comparison";
    const title = document.createElement("strong");
    title.textContent = entry.title || "Reviewed image comparison";
    const summary = document.createElement("span");
    summary.className = "history-summary";
    summary.textContent = entry.summary || "Open the same-frame comparison.";
    const before = document.createElement("img");
    before.src = entry.before;
    before.alt = entry.beforeAlt || "Earlier version of a reviewed frame";
    before.loading = "lazy";
    const after = document.createElement("img");
    after.src = entry.after;
    after.alt = entry.afterAlt || "Newer version of the same reviewed frame";
    after.loading = "lazy";
    const images = document.createElement("span");
    images.className = "history-images";
    images.append(before, after);
    const hint = document.createElement("span");
    hint.className = "history-hint";
    hint.textContent = "Open before and after ↗";
    button.append(tag, title, summary, images, hint);
    button.addEventListener("click", () => openModal({
      before: entry.before, after: entry.after,
      beforeAlt: before.alt, afterAlt: after.alt,
      beforeLabel: entry.beforeLabel || "Previous version",
      afterLabel: entry.afterLabel || "New test"
    }, entry.caption || entry.title || "Reviewed comparison", button));
    row.append(date, marker, button);
    container.append(row);
  });
}

async function loadLatestState() {
  try {
    const response = await fetch("./data.json", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();

    setText("#dispatch-title", data.title);
    setText("#dispatch-summary", data.summary);
    setText("#dispatch-problem", data.problem);
    setText("#dispatch-response", data.response);
    setText("#before-detail", data.beforeDetail);
    setText("#after-detail", data.afterDetail);
    setText("#image-note", data.imageNote);
    setText("#dispatch-label", data.dispatchLabel);
    setText("#cycle-title", data.stageTitle);
    setText("#stage-note", data.stageNote);

    if (data.date && /^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
      const date = new Date(data.date + "T12:00:00");
      document.querySelector("#dispatch-date").dateTime = data.date;
      document.querySelector("#dispatch-date").textContent = new Intl.DateTimeFormat("en-GB", {
        day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
      }).format(date);
      document.querySelector("#register-date").textContent =
        new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(date).replaceAll("/", " · ");
    }

    document.querySelector("#stage-index").textContent = String(data.stageNumber).padStart(2, "0");
    document.querySelector("#stage-total").textContent = String(data.stageTotal).padStart(2, "0");
    const progress = document.querySelector("#stage-progress");
    progress.setAttribute("aria-valuemax", String(data.stageTotal));
    progress.setAttribute("aria-valuenow", String(data.stageNumber));
    document.querySelectorAll(".stage-segment").forEach((segment, index) => {
      const step = index + 1;
      segment.classList.toggle("is-complete", step < data.stageNumber);
      segment.classList.toggle("is-current", step === data.stageNumber);
      segment.hidden = step > data.stageTotal;
    });

    loadDailyImage(data.imageDetail, data.date);
    const history = Array.isArray(data.imageHistory) ? [...data.imageHistory] : [];
    if (data.imageDetail?.available === true) history.push({
      ...data.imageDetail,
      title: data.imageDetail.title || data.title,
      summary: data.imageDetail.summary || data.summary,
      featured: true
    });
    loadImageHistory(history);
  } catch {
    // Keep the complete static article readable if the status data is unavailable.
  }
}

loadLatestState();


