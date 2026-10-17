const HANGMAN_SETS = [
  {
    topic: "School",
    words: ["student", "notebook", "classroom", "pencil"]
  },
  {
    topic: "Sports",
    words: ["football", "basketball", "swimming", "chess", "pingpong"]
  },
  {
    topic: "Countries",
    words: ["morocco", "france", "russia", "japan", "canada"]
  },
  {
    topic: "Food",
    words: ["tajine", "sushi", "tacos", "pasta", "couscous"]
  },
  {
    topic: "Technology",
    words: ["keyboard", "laptop", "network", "browser", "server"]
  },
  {
    topic: "Nature",
    words: ["forest", "thunder", "desert", "volcano", "river"]
  }
];

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildRound(wordSet) {
  const set = randomFrom(wordSet);
  const word = randomFrom(set.words).toLowerCase();

  return {
    topic: set.topic,
    answer: word,
    attemptsLeft: Math.max(6, Math.ceil(word.length * 0.8)),
    guessed: new Set(),
    solvedIndexes: new Set(),
    usedLetters: new Set(),
    completed: false,
    won: false
  };
}

function getDisplayWord(round) {
  return round.answer
    .split("")
    .map((letter, index) => (round.solvedIndexes.has(index) ? letter : "_"));
}

function letterExists(round, letter) {
  return round.answer.includes(letter);
}

function updateRoundWithGuess(round, letter) {
  if (round.completed || round.usedLetters.has(letter)) {
    return { hit: false, repeated: true };
  }

  round.usedLetters.add(letter);

  if (!letterExists(round, letter)) {
    round.attemptsLeft -= 1;
    if (round.attemptsLeft <= 0) {
      round.attemptsLeft = 0;
      round.completed = true;
      round.won = false;
    }
    return { hit: false, repeated: false };
  }

  round.answer.split("").forEach((value, index) => {
    if (value === letter) {
      round.solvedIndexes.add(index);
    }
  });

  if (round.solvedIndexes.size === round.answer.length) {
    round.completed = true;
    round.won = true;
  }

  return { hit: true, repeated: false };
}
