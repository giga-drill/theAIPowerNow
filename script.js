const form = document.querySelector("form");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");

const fieldNames = [
  "role_type",
  "computer_use",
  "materials[]",
  "ai_experience",
  "ai_concerns",
  "pain_points[]",
  "use_case",
];

function hasValue(name) {
  const fields = Array.from(form.elements).filter((field) => field.name === name);
  if (!fields.length) return false;

  const first = fields[0];
  if (first.type === "checkbox" || first.type === "radio") {
    return fields.some((field) => field.checked);
  }

  return first.value.trim().length > 0;
}

function updateProgress() {
  const completed = fieldNames.filter(hasValue).length;
  const percentage = Math.round((completed / fieldNames.length) * 100);
  progressText.textContent = `已完成 ${percentage}%`;
  progressBar.style.width = `${percentage}%`;
}

if (form) {
  form.addEventListener("input", updateProgress);
  form.addEventListener("change", updateProgress);
  if (location.hostname.endsWith("github.io")) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      window.location.href = "./thank-you.html";
    });
  }
  updateProgress();
}
