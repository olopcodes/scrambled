const game = {
  randomWord: "",
  jumbleWord: "",
  numberOfTries: 0,
  userInput: [],
  tryCount: 0,
  userMistakes: [],
  userCorrect: [],
  definitions: [],

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
    // console.log(data);
    this.definitions.push(data[0].meanings[0].definitions[0].definition);
    if (data[0].meanings[0].length > 1) {
      this.definitions.push(data[0].meanings[0].definitions[1].definition);
    }
  },

  runGame() {
    game.getRandomWord();
    game.getJumbleWord(game.randomWord);
    game.getDefinition();
    game.getNumberOfTries();
    console.log(game);
  },
};

const words = [
  "baron",
  "count",
  "mount",
  "feudal",
  "region",
  "amaze",
  "tails",
  "python",
  "spring",
  "strong",
  "privy",
  "basket",
  "toilet",
  "flavor",
  "junior",
  "savior",
  "suave",
  "prison",
  "jaded",
  "cobra",
  "lawyer",
  "jumble",
  "phone",
  "abacas",
  "cabana",
  "dacoit",
  "gantry",
  "gander",
  "gamify",
  "haceks",
  "babble",
  "bursar",
  "busker",
  "buccal",
  "brevet",
  "candor",
  "carpus",
  "chutes",
  "echoic",
  "gimlet",
  "elicit",
  "eloped",
  "embalm",
  "embark",
  "famine",
  "fervor",
  "grovel",
  "heroic",
  "cable",
  "eager",
  "facet",
  "gaffe",
  "oasis",
  "rancid",
  "vague",
  "yolks",
  "wonky",
  "wrest",
  "umami",
  "twirl",
  "turbo",
  "surge",
  "rinse",
  "rigor",
  "reign",
  "remix",
  "quark",
  "sqwuak",
  "quant",
  "pouch",
  "prank",
  "nymph",
  "nylon",
  "myths",
  "oasis",
  "mural",
  "knead",
  "knife",
  "lychee",
  "cajole",
  "jowls",
  "hokum",
  "gulag",
  "fungi",
  "exert",
  "exile",
  "ethic",
  "evade",
  "froth",
  "cloth",
  "clock",
  "clump",
  "chime",
  "climb",
  "bison",
  "blame",
  "blare",
  "askew",
  "bribe",
  "cares",
  "scare",
  "movie",
  "video",
  "shower",
  "river",
  "brave",
  "phone",
  "glass",
  "timid",
  "court",
  "place",
  "sleigh",
];

(function () {
  game.runGame();
})();
