const game = {
  randomWord: "",
  jumbleWord: "",
  numberOfTries: 0,
  userInput: [],
  tryCount: 0,
  userMistakes: [],
  userCorrect: [],
  definition: "",
  definition2: "",

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

  async getDefinition() {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${this.randomWord}`
    );
    const data = await res.json();
    console.log(data);
    console.log(data[0].meanings[0].definitions[0].definition);
    if (data[0].meanings[0].length > 1) {
      console.log(data[0].meanings[0].definitions[1].definition);
    }
  },
};

const words = [
  // "region",
  // "amaze",
  // "tails",
  // "python",
  // "spring",
  // "strong",
  // "privy",
  // "basket",
  // "toilet",
  // "flavor",
  // "junior",
  // "savior",
  // "suave",
  // "prison",
  // "jaded",
  // "cobra",
  // "lawyer",
  // "jumble",
  // "phone",
  // "abacas",
  // "cabana",
  // "dacoit",
  // "gantry",
  // "gander",
  // "gamify",
  "haceks",
  // "gimlet",
];

(function () {
  game.getRandomWord();
  game.getJumbleWord(game.randomWord);
  game.getDefinition();
  game.getNumberOfTries();
  console.log(game);
})();
