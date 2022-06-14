const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const randomNum = (min, max) => Math.round(Math.random() * (max - min)) + min;

const $ENTRY_FORM = $(".entry__form");
const $TRIES_SECTION = $(".tries");
const $TEST_PGPH = $("#test-pgph");
const $ERROR_PGPH = $("#error-pgph");
const $TRY_TEMPLATE = $("#try-template").content;
const $FRAGMENT = document.createDocumentFragment();
const PASSWORD_DIGITS = [];

const TRACK = {};

for (let i = 0; i < 6; i++) {
  const NUMBER = randomNum(0, 9);
  PASSWORD_DIGITS.push(String(NUMBER));
  $TEST_PGPH.insertAdjacentText("beforeend", NUMBER);

  if (TRACK.hasOwnProperty(NUMBER)) TRACK[NUMBER]++;
  else TRACK[NUMBER] = 1;
}

$ENTRY_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const ENTRY = $ENTRY_FORM.combination.value;

  if (ENTRY.length !== 6) {
    $ERROR_PGPH.style.display = "block";
    setTimeout(() => {
      $ERROR_PGPH.style.display = "none";
    }, 3000);
    return;
  }

  $ENTRY_FORM.combination.value = "";
  newInsertTryLine(ENTRY);
});

// function insertTryLine(number) {
//   const $CLONE = $TRY_TEMPLATE.cloneNode(true);
//   const $TEMPLATE_BOXES = $CLONE.querySelectorAll(".digit");
//   const COLORS = [];

//   let splicedPasswordDigits = structuredClone(PASSWORD_DIGITS);

//   for (let i = 0; i < number.toString().length; i++) {
//     $TEMPLATE_BOXES[i].textContent = number[i];
//     if (PASSWORD_DIGITS[i] === number[i]) {
//       COLORS.unshift("green");
//     } else if (
//       PASSWORD_DIGITS[i] !== number[i] &&
//       splicedPasswordDigits.includes(number[i])
//     ) {
//       console.log(splicedPasswordDigits);
//       console.log(
//         "spliced" +
//           splicedPasswordDigits.splice(
//             splicedPasswordDigits.findIndex((num) => num === number[i]),
//             1
//           )
//       );
//       console.log(splicedPasswordDigits);
//       COLORS.push("red");
//     } else {
//       console.log("none");
//     }
//   }

//   const $POINTS = $CLONE.querySelectorAll(".point");
//   for (let i = 0; i < $POINTS.length; i++) {
//     $POINTS[i].style.backgroundColor = COLORS[i];
//   }

//   $TRIES_SECTION.appendChild($CLONE);
// }

function newInsertTryLine(number) {
  const $CLONE = $TRY_TEMPLATE.cloneNode(true);
  const $TEMPLATE_BOXES = $CLONE.querySelectorAll(".digit");
  const COLORS = [];

  let splicedPasswordDigits = structuredClone(PASSWORD_DIGITS);
  for (let i = 0; i < number.toString().length; i++) {
    $TEMPLATE_BOXES[i].textContent = number[i];
    if (PASSWORD_DIGITS[i] === number[i]) {
      TRACK[number[i]]--;
      COLORS.unshift("green");
    } else if (
      PASSWORD_DIGITS[i] !== number[i] &&
      splicedPasswordDigits.includes(number[i]) &&
      TRACK[number[i]] > 0
    ) {
console.log(TRACK);
          splicedPasswordDigits.splice(
            splicedPasswordDigits.findIndex((num) => num === number[i]),
            1
          )
      COLORS.push("red");
    } else {
      console.log("none");
    }
  }

  const $POINTS = $CLONE.querySelectorAll(".point");
  for (let i = 0; i < $POINTS.length; i++) {
    $POINTS[i].style.backgroundColor = COLORS[i];
  }

  $TRIES_SECTION.appendChild($CLONE);
}
