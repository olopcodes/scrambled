const buttons = document.querySelectorAll("button");
const gameWordDisplay = document.querySelector(".game__word");
const gameTriesSpanText = document.querySelector(".game__stats__text span");
const gameTriesCircles = document.querySelector(".game__tries__circles");
const gameMistakesText = document.querySelector(".game__mistakes__display p");
const gameFieldsTextEl = document.querySelector(".game__text__fields");
const gameAlert = document.querySelector(".game__alert");
const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal__box");
const modalDefinitionsList = document.querySelector(".modal__definitions");
const modalInfoContent = document.querySelector(".modal__info-content");

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

function toggleHiglightClass(gameObj) {
  const circles = document.querySelectorAll(".game__tries__circle");

  for (let i = 0; i < gameObj.tryCount; i++) {
    circles[i].classList.toggle("highlight");
    console.log("try", i);
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

function displayUserInput(gameObj) {
  const inputFields = clearInputFields();

  gameObj.userInput.forEach((letter, index) => {
    inputFields[index].textContent = letter;
  });
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
  const onlyLetters = /^[A-Za-z]+$/;
  if (key.match(onlyLetters)) {
    return key;
  } else {
    return false;
  }
}

function handleEnterTyped(gameObj) {
  if (gameObj.randomWord.length !== gameObj.userInput.length) {
    alert("Your guess must match the length of scrambled word.");
    return;
  } else if (gameObj.randomWord.length === gameObj.userInput.length) {
    compareWords(gameObj);
    return;
  }
}

function handleTypedToomuch(gameObj) {
  if (gameObj.randomWord.length === gameObj.userInput.length) return;
}

function deleteLetter(gameObj) {
  gameObj.userInput.pop();
}

function addLetterToUserInput(gameObj, letter) {
  if (gameObj.userInput.length !== gameObj.randomWord.length) {
    gameObj.userInput.push(letter);
  }
}

function clearInputFields() {
  const inputFields = document.querySelectorAll(".game__text__field");
  inputFields.forEach((sq) => (sq.textContent = ""));

  return inputFields;
}

function compareWords(gameObj) {
  if (gameObj.randomWord === gameObj.userInput.join("")) {
    console.log("you win!");
    handleCorrect(gameObj);
    displayCorrect(gameObj.userCorrect);
    displayAlertMessage(gameObj, 1);
    toggleWinnerClass();
  } else {
    gameObj.tryCount += 1;
    let randomWordArr = gameObj.randomWord.split("");
    gameObj.userMistakes = gameObj.userInput.filter((letter, index) => {
      return letter !== randomWordArr[index];
    });

    displayTries(gameObj);

    toggleHiglightClass(gameObj);

    handleCorrect(gameObj);

    displayMistakes(gameObj);

    displayCorrect(gameObj.userCorrect);
  }
}

function displayMistakes(gameObj) {
  let str = "";
  gameObj.userMistakes.forEach((letter, index) => {
    str += `${letter}${index === gameObj.userMistakes.length ? ". " : ", "}`;
  });
  gameMistakesText.textContent = str;
}

function handleCorrect(obj) {
  obj.userCorrect = [];
  obj.userInput.forEach((letter, index) => {
    if (letter === obj.randomWord.split("")[index]) obj.userCorrect.push(index);
  });

  console.log(obj, "handle correct");
}

function displayCorrect(correctArr) {
  const inputFields = document.querySelectorAll(".game__text__field");
  correctArr.forEach((item) => inputFields[item].classList.add("correct"));

  setTimeout(
    () =>
      correctArr.forEach((item) =>
        inputFields[item].classList.remove("correct")
      ),
    1500
  );
}

function toggleWinnerClass() {
  const inputFields = document.querySelectorAll(".game__text__field");
  inputFields.forEach((i) => i.classList.add("winner"));
}

function toggleShowModal() {
  modal.classList.toggle("show");
  modalBox.classList.toggle("show");
}

function displayAlertMessage(gameObj, num) {
  setTimeout(() => toggleShowModal(), 1000);

  html = `
     <p class="modal__main-message">You win!!</p>
    <p class="modal__text">You Guessed: <span class="modal--text-highlight modal__random-word">${
      gameObj.randomWord
    }</span> ${num === 1 ? "correct." : "wrong"}.</p>
  `;

  modalInfoContent.innerHTML = html;

  addDefinitions(gameObj);
}

function addDefinitions(gameObj) {
  gameObj.definitions.forEach((def) => {
    const li = document.createElement("li");
    li.textContent = def;
    li.classList.add("modal__definition");
    modalDefinitionsList.append(li);
  });
}

function updateGameTries(gameObj) {}

document.addEventListener("keydown", (e) => {
  if (game.tryCount === game.numberOfTries) {
    console.log("gameover");
  }

  if (e.key === "Enter") {
    handleEnterTyped(game);
    return;
  }

  if (e.key === "Delete" || e.key === "Backspace") {
    deleteLetter(game);
    displayUserInput(game);
    return;
  }

  handleTypedToomuch(game);

  if (game.tryCount < game.numberOfTries) {
    if (checkTypedLetter(e.key)) {
      addLetterToUserInput(game, e.key);
      displayUserInput(game);
    }
  }
});

(function () {
  displayRandomWord(game);
  displayTries(game);
  displayTryCircles(game);
  displayNumberOfSquares(game);
})();
