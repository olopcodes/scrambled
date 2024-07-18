const buttons = document.querySelectorAll(".game__buttons button");
const gameWordDisplay = document.querySelector(".game__word");
const gameTriesSpanText = document.querySelector(".game__stats__text span");
const gameTriesCircles = document.querySelector(".game__tries__circles");
const gameMistakesText = document.querySelector(".game__mistakes__display p");
const gameFieldsTextEl = document.querySelector(".game__text__fields");
const gameAlert = document.querySelector(".game__alert");

function displayRandomWord(gameObj) {
  gameWordDisplay.textContent = game.jumbleWord;
}

function displayTries(gameObj) {
  gameTriesSpanText.textContent = `(${gameObj.tryCount}/${gameObj.numberOfTries})`;
}

function displayTryCircles(gameObj) {
  for (let i = 0; i < gameObj.numberOfTries; i++) {
    const div = document.createElement("div");
    div.classList.add("game__tries__circle");
    gameTriesCircles.append(div);
  }
}

function displayNumberOfSquares(gameObj) {
  for (let i = 0; i < gameObj.randomWord.length; i++) {
    const div = document.createElement("div");
    div.classList.add("game__text__field", "flex--center", "highlight");
    gameFieldsTextEl.insertBefore(div, gameAlert);
  }

  updateNumberOfColumnsForTextField(gameObj);

  toggleGameAlert();
}

function updateNumberOfTries(gameObj) {
  gameObj.tryCount += 1;
  const circles = document.querySelectorAll(".game__tries__circle");

  for (let i = 0; i < gameObj.tryCount; i++) {
    circles[i].classList.add("highlight");
  }
}

function toggleGameAlert() {
  gameAlert.classList.toggle("hide");
}

function updateNumberOfColumnsForTextField(gameObj) {
  if (
    (gameObj.randomWord === 6 && gameFieldsTextEl.classList.contains("six")) ||
    (gameObj.randomWord === 5 && gameFieldsTextEl.classList.contains("five"))
  )
    return;

  if (gameObj.randomWord.length === 6) {
    gameFieldsTextEl.classList.remove("five");
    gameFieldsTextEl.classList.add("six");
  } else {
    gameFieldsTextEl.classList.add("five");
    gameFieldsTextEl.classList.remove("six");
  }
}

// validate user typed a string
function checkTypedLetter(key) {
  if (key === "Delete" || key === "Backspace") return;

  const onlyLetters = /^[A-Za-z]+$/;
  if (key.match(onlyLetters)) {
    return key;
  } else {
    return false;
  }
}

function handleEnterTyped(key, gameObj) {
  if (key === "Enter" && gameObj.length !== gameObj.userInput.length) {
    alert("Your guess must match the length of scrambled word.");
    return;
  } else if (key === "Enter" && gameObj.length === userInput.length) {
    console.log("comparing");
  }
}

function handleTypedToomuch(gameObj) {
  if (gameObj.randomWord.length === gameObj.userInput.length) return;
}

document.addEventListener("keydown", (e) => {
  handleEnterTyped(e.key, game);

  handleTypedToomuch(game);
});

(function () {
  displayRandomWord(game);
  displayTries(game);
  displayTryCircles(game);
  displayNumberOfSquares(game);
})();
