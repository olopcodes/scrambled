const game = {
  randomWord: "",
  jumbleWord: "",
  numberOfTries: 0,
  userInput: "",
  tryCount: 0,

  getRandomWord() {
    this.randomWord = words[Math.floor(Math.random() * words.length)];
  },

  getJumbleWord(randWord) {
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
    this.jumbleWord = slice1.concat(slice2).join("");
  },

  getNumberOfTries() {
    this.numberOfTries = this.randomWord.length - 1;
  },
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

// functions
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

(function () {
  game.getRandomWord();
  game.getJumbleWord(game.randomWord);
  game.getNumberOfTries();
  console.log(game);
})();
