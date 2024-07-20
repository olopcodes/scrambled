const buttons = document.querySelectorAll("button");
const gameWordDisplay = document.querySelector(".game__word");
const gameTriesSpanText = document.querySelector(".game__stats__text span");
const gameTriesCircles = document.querySelector(".game__tries__circles");
const gameMistakesText = document.querySelector(".game__mistakes__display p");
const gameInputFieldsEl = document.querySelector(".game__text__fields div");
const gameAlert = document.querySelector(".game__alert");
const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal__box");
const modalDefinitionsList = document.querySelector(".modal__definitions");
const modalInfoContent = document.querySelector(".modal__info-content");

// display to the dom ===========================
function displayRandomWord() {
  gameWordDisplay.textContent = game.jumbleWord;
}

function displayTriesLeft() {
  gameTriesSpanText.textContent = `(${game.tryCount}/${game.numberOfTries})`;
}

function displayCircleOfTries() {
  for (let i = 0; i < game.numberOfTries; i++) {
    const div = document.createElement("div");
    div.classList.add("game__tries__circle");
    gameTriesCircles.append(div);
  }
}

function displayInputBoxes() {
  for (let i = 0; i < game.randomWord.length; i++) {
    const div = document.createElement("div");
    div.classList.add("game__text__field", "flex--center", "highlight");
    gameInputFieldsEl.append(div);
  }

  structureColumnForInputBoxes();

  removeClassHide(gameAlert);
}

function structureColumnForInputBoxes() {
  if (game.randomWord.length === 5) {
    gameInputFieldsEl.classList.add("five");
  } else {
    gameInputFieldsEl.classList.add("six");
  }
}

function displayUserInput() {
  const inputFields = clearInputFields();

  game.userInput.forEach((input, index) => {
    inputFields[index].textContent = input;
  });
}

function clearInputFields() {
  const inputFields = document.querySelectorAll(".game__text__field");
  inputFields.forEach((i) => (i.textContent = ""));

  return inputFields;
}

function displayUserMistakes() {
  let str = "";
  game.userMistakes.forEach((m) => (str += `${m}, `));
  gameMistakesText.textContent = str;
}

function gameDisplay() {
  displayRandomWord();
  displayTriesLeft();
  displayCircleOfTries();
  displayInputBoxes();
}

// keyboard functions ================================
function checkTypedLetter(key) {
  const onlyLetters = /^[A-Za-z]+$/;
  if (key.match(onlyLetters)) {
    return key;
  } else {
    return false;
  }
}

// remove/add classes ============================
function removeClassHide(el) {
  el.classList.remove("hide");
}

function addClassHide(el) {
  el.classList.add("hide");
}

function toggleHighlightOnCircles(action) {
  const circles = document.querySelectorAll(".game__tries__circle");

  for (let i = 0; i < game.tryCount; i++) {
    if (action === "add") {
      circles[i].classList.add("highlight");
    } else {
      circles[i].classList.remove("highlight");
    }
  }
}

function toggleClassOnUserWin(className) {
  const inputFields = document.querySelectorAll(".game__text__field");

  game.userCorrectIndexes.forEach((index) => {
    inputFields[index].classList.add(className);
    setTimeout(() => inputFields[index].classList.remove(className), 2400);
  });
}

function showModal() {
  modal.classList.add("show");
  modalBox.classList.add("show");
}

// event listeners ==================================
document.addEventListener("keydown", (e) => {
  if (game.tryCount !== game.numberOfTries) {
    const input = e.key;
    console.log(input);

    if (input === "Enter" && game.userInput.length !== game.jumbleWord.length) {
      console.log("Word must be same length as scrambled word");
      return;
    }

    if (input === "Enter" && game.userInput.length === game.jumbleWord.length) {
      const userWon = game.gameResult();

      // compare results
      if (userWon) {
        toggleClassOnUserWin("correct");
        toggleClassOnUserWin("winner");

        setTimeout(() => showModal(), 2500);
      } else {
        game.increaseTryCount();
        toggleHighlightOnCircles("add");
        displayTriesLeft();
        toggleCorrectClass();
        displayUserMistakes();
      }
    }

    if (input === "Backspace" && game.userInput.length > 0) {
      game.deleteUserInput();
      displayUserInput();
      console.log(game.userInput);
      return;
    }

    // check if input is another character
    const altCharacter = input.length > 1;

    if (
      (input !== "Enter" && !altCharacter && input !== "Backspace") ||
      e.key === "Delete"
    ) {
      const validInput = checkTypedLetter(input);
      const userInputMaxed = game.userInput.length === game.randomWord.length;

      if (validInput && !userInputMaxed) {
        game.addValidInput(input);
        displayUserInput();
      }
    }
  } else {
    console.log("game over");
  }
});

gameDisplay();
