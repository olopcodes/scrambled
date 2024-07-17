let word;
let jumbleWord;
let numberOfTries;
let textIndex = 0;
let userInput = "";
let mistakes = 0;

const words = [
  "flower",
  "hijack",
  "squawk",
  "quirky",
  "frenzy",
  "object",
  "bistro",
  "circle",
  "eskimo",
  "hyrax",
  "numbat",
  "reign",
  "region",
  "edible",
  "chazan",
  "schnoz",
  "defuse",
  "claque",
  "judice",
  "knubby",
  "quince",
  "subfix",
  "whacky",
  "zenith",
  "cajole",
  "enzym",
  "bijou",
  "squab",
  "vizor",
  "quips",
  "maize",
  "pygmy",
  "amuck",
  "axiom",
  "hokum",
  "smock",
  "skimp",
  "balmy",
  "bokeh",
];
const buttons = document.querySelectorAll(".game__buttons button");
const gameWordDisplay = document.querySelector(".game__word");
const gameTriesSpanText = document.querySelector(".game__stats__text span");
const gameTriesCircles = document.querySelector(".game__tries__circles");
const gameMistakesText = document.querySelector(".game__mistakes__display p");
const gameFieldsTextEl = document.querySelector(".game__text__fields");
const gameAlert = document.querySelector(".game__alert");

// get random word
function getRandomWord() {
  const word = words[Math.floor(Math.random() * words.length)];
  return word;
}

function getJumbleWord(randWord) {
  // reverse the string and convert to array
  const wordArr = randWord.split("");

  // slice the array it two and reverse again
  // making the slice of the words be more random
  let slice1;
  let slice2;

  if (Math.random() > 0.5) {
    slice1 = wordArr.slice(0, 2).reverse();
    slice2 = wordArr.slice(2).reverse();
  } else {
    slice1 = wordArr.slice(0, 3).reverse();
    slice2 = wordArr.slice(3).reverse();
  }

  // join the arrays together and turn to string
  return slice1.concat(slice2).join("");
}

// make sure next word is not if dupilcate
function checkWordChosen(newWord) {
  if (newWord === word) getRandomWord();
}

// display word to user
function displayJumbledWord(newJumbledWord) {
  gameWordDisplay.textContent = newJumbledWord;
}

// display number of tries
function displayNumberOfTries(randWord) {
  gameTriesSpanText.textContent = `(0/${randWord.length - 1})`;
}

// create circles based on the length of word, add it to the dom
function displayNumberOfTriesCircles(randWord) {
  for (let i = 0; i < randWord.length - 1; i++) {
    const div = document.createElement("div");
    div.classList.add("game__tries__circle");
    gameTriesCircles.append(div);
  }
}

// show empty square boxes based on word
function displayBasedOnWord(randWord) {
  for (let i = 0; i < randWord.length; i++) {
    const div = document.createElement("div");
    div.classList.add("game__text__field", "flex--center", "highlight");
    gameFieldsTextEl.insertBefore(div, gameAlert);
  }

  toggleGameAlert();
}

function updateNumberOfColumnsForText(randWord) {
  if (
    (randWord === 6 && gameFieldsTextEl.classList.contains("six")) ||
    (randWord === 5 && gameFieldsTextEl.classList.contains("five"))
  )
    return;

  if (randWord.length === 6) {
    gameFieldsTextEl.classList.remove("five");
    gameFieldsTextEl.classList.add("six");
  } else {
    gameFieldsTextEl.classList.add("five");
    gameFieldsTextEl.classList.remove("six");
  }
}

function toggleGameAlert() {
  gameAlert.classList.toggle("hide");
}

function displayUserInput(key) {
  const textFields = document.querySelectorAll(".game__text__field");
  if (textIndex < textFields.length) {
    textFields[textIndex].textContent = key;
    userInput += key;
    textIndex += 1;
  }

  console.log(userInput);
}

// validate user typed a string
function checkIfUserTypedLetter(key) {
  const onlyLetters = /^[A-Za-z]+$/;
  if (key.match(onlyLetters)) {
    return key;
  } else {
    return false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Delete" || e.key === "Backspace") {
    // delete letter from word
    userInput = userInput.split("");
    userInput.pop();
    userInput = userInput.join("");

    // show new word in the dom
  }

  if (word.length === userInput.length) return;

  if (e.key === "Enter" && word.length !== userInput.length) {
    alert("Your guess must match the length of scrambled word.");
    return;
  } else if (e.key === "Enter" && word.length === userInput.length) {
    console.log("comparing");
  }

  const isLetter = checkIfUserTypedLetter(e.key);

  if (isLetter) displayUserInput(isLetter);
});

(function () {
  word = getRandomWord();
  jumbleWord = getJumbleWord(word);
  displayJumbledWord(jumbleWord);
  displayNumberOfTries(word);
  displayNumberOfTriesCircles(word);
  displayBasedOnWord(word);
  updateNumberOfColumnsForText(word);
})();
