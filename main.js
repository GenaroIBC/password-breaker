const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const randomNum = (min, max) => Math.round(Math.random() * (max - min)) + min;
const $ENTRY_FORM = $(".entry__form");
const $TRY_TEMPLATE = $("#try-template").content;
const $TRIES_SECTION = $(".tries");
const $FRAGMENT = document.createDocumentFragment();
const $TEST_PGPH = $("#test-pgph");
const $PASSWORD_DIGITS = $$(".password__digit");

$PASSWORD_DIGITS.forEach((digit) => {
  digit.textContent = randomNum(0, 9);
  $TEST_PGPH.insertAdjacentText("beforeend", digit.textContent);
});

$ENTRY_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const ENTRY = $ENTRY_FORM.combination.value;

  if (ENTRY.length !== 6) return console.log("insert max 6 digits");
  $ENTRY_FORM.combination.value = "";
  insertTryLine(ENTRY);
});

function insertTryLine(number) {
  const $CLONE = $TRY_TEMPLATE.cloneNode(true);
  const $TEMPLATE_BOXES = $CLONE.querySelectorAll(".digit");
  const PASSWORD_DIGITS = Array.from($PASSWORD_DIGITS).map(
    (el) => el.textContent
  );

  const COMBINATIONS = [];
  let splicedPasswordDigits = structuredClone(PASSWORD_DIGITS);
  let greenPoints = 0;
  console.log({ COMBINATIONS });
  for (let i = 0; i < number.toString().length; i++) {
    $TEMPLATE_BOXES[i].textContent = number[i];
    if (PASSWORD_DIGITS[i] === number[i]) {
      console.log("PASSWORD_DIGITS[i] === number[i]");
      greenPoints++;
      COMBINATIONS.unshift("green");
    } else if (
      PASSWORD_DIGITS[i] !== number[i] &&
      splicedPasswordDigits.includes(number[i])
    ) {
      console.log(
        "PASSWORD_DIGITS[i] !== number[i] && splicedPasswordDigits.includes(number[i])"
      );
      console.log(splicedPasswordDigits);
      console.log("spliced" + splicedPasswordDigits.splice(
        splicedPasswordDigits.find((num) => num === number[i]),
        1
      ));
      console.log(splicedPasswordDigits);
      COMBINATIONS.push("red");
    } else {
      console.log("none");
      COMBINATIONS.black++;
    }
  }

  const $POINTS = $CLONE.querySelectorAll(".point");
  // console.log($POINTS);
  for (let i = 0; i < $POINTS.length; i++) {
    $POINTS[i].style.backgroundColor = COMBINATIONS[i];
    // console.log(COMBINATIONS[i]);
    // console.log($POINTS[i]);
  }

  $TRIES_SECTION.appendChild($CLONE);
}

// function checkPointsTable() {
//   $PASSWORD_DIGITS.forEach(digit => {
//     if(digit)
//   })
// }
