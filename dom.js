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
  gameTriesCircles.innerHTML = "";

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
    gameInputFieldsEl.classList.remove("six");
    gameInputFieldsEl.classList.add("five");
  } else {
    gameInputFieldsEl.classList.remove("five");
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

function clearDisplay() {
  gameTriesCircles.innerHTML = "";
  gameInputFieldsEl.innerHTML = "";
  gameTriesSpanText.textContent = "";
  displayTriesLeft();
}

function gameReset() {
  game.userInput = [];
  game.tryCount = 0;
  clearInputFields();
  gameMistakesText.textContent = "";
  displayTriesLeft();
  displayCircleOfTries();
}

function gameDisplay() {
  displayRandomWord();
  displayTriesLeft();
  removeHighlightClass();
  displayCircleOfTries();
  displayInputBoxes();
}

function handleGameResult() {
  result = game.tryCount === game.numberOfTries ? "lost" : "won";
  html = `
       <p class="modal__main-message">You ${result}!!</p>
      <p class="modal__text">You Guessed: <span class="modal--text-highlight modal__random-word">${
        game.randomWord
      }</span> ${result === "lost" ? "wrong" : "correct"}!</p>
    `;

  modalInfoContent.innerHTML = html;
}

function addDefinitions() {
  game.definitions.forEach((def) => {
    const li = document.createElement("li");
    li.textContent = def;
    li.classList.add("modal__definition");
    modalDefinitionsList.append(li);
  });
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

function toggleHide(el) {
  el.classList.toggle("hide");
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

function removeHighlightClass() {
  const circles = document.querySelectorAll(".game__tries__circle");
  // circles.forEach((c) => c.classList.remove("highlight"));
  console.log(circles);
}

function toggleClassOnUserWin(className) {
  const inputFields = document.querySelectorAll(".game__text__field");

  game.userCorrectIndexes.forEach((index) => {
    inputFields[index].classList.add(className);
    setTimeout(() => inputFields[index].classList.remove(className), 2400);
  });
}

function toggleModal() {
  modal.classList.toggle("show");
  modalBox.classList.toggle("show");
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
        handleGameResult();
        addDefinitions();
        // clearDisplay();
        clearInputFields();

        setTimeout(() => toggleModal(), 2500);
      } else {
        game.increaseTryCount();
        toggleHighlightOnCircles("add");
        displayTriesLeft();
        // toggleCorrectClass();
        toggleClassOnUserWin("correct");
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
    toggleModal();
    handleGameResult();
    clearDisplay();
    clearInputFields();
  }
});

buttons.forEach((b) =>
  b.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-random")) {
      console.log("random");
      clearDisplay();
      game.runGame();
      gameDisplay();
      structureColumnForInputBoxes();

      // console.log(game);
    } else if (e.target.classList.contains("btn-reset")) {
      console.log("rest");
      gameReset();
    } else if (e.target.classList.contains("btn-definition")) {
      console.log("def");
      addDefinitions();
      toggleHide(modalDefinitionsList);
    } else if (e.target.classList.contains("btn-close")) {
      console.log("close");
      toggleModal();
    }
  })
);

gameDisplay();
