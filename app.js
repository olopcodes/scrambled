let word;
let jumbleWord;
let numberOfTries;
let textIndex = 0;
let userInput = "";
let mistakes = 0;

const data = {
  word: "",
  jumbleWord: "",
  numberOfTries: "",
  userInput: "",
  tryCount: 0,
};

const words = [
  "break",
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
