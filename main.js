const $ = (selector) => document.querySelector(selector);
const randomNum = (min, max) => Math.round(Math.random() * (max - min)) + min;
const $ENTRY_FORM = $(".entry__form");
const $TRY_TEMPLATE = $("#try-template").content;
const $TRIES_SECTION = $(".tries");
const $FRAGMENT = document.createDocumentFragment();

$ENTRY_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const ENTRY = $ENTRY_FORM.combination.value;

  if (ENTRY.length !== 6) return console.log("insert max 6 digits");
  const $CLONE = $TRY_TEMPLATE.cloneNode(true);
  const $TEMPLATE_BOXES = $CLONE.querySelectorAll(".digit");
  for (let i = 0; i < ENTRY.toString().length; i++) {
    $TEMPLATE_BOXES[i].textContent = ENTRY[i];
  }

  $TRIES_SECTION.appendChild($CLONE);
});
