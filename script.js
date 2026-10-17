const categoryOutput = document.querySelector(".category");
const triesOutput = document.querySelector(".tries");
const usedLettersOutput = document.querySelector(".used-letters");
const questionOutput = document.querySelector(".question");
const slotsOutput = document.querySelector(".answer-slots");
const messageOutput = document.querySelector(".message");
const keyboardOutput = document.querySelector(".keyboard");
const restartButton = document.querySelector(".restart");
const newRoundButton = document.querySelector(".new-round");

const overlay = document.querySelector(".overlay");
const overlayImage = document.querySelector(".overlay-image");
const overlayTitle = document.querySelector(".overlay-title");
const overlayText = document.querySelector(".overlay-text");
const overlayActionButton = document.querySelector(".overlay-action");

let currentRound = buildRound(HANGMAN_SETS);

function renderKeyboard() {
  keyboardOutput.innerHTML = "";

  ALPHABET.split("").forEach((letter) => {
    const button = document.createElement("button");
    button.className = "key";
    button.type = "button";
    button.textContent = letter;
    button.dataset.letter = letter;

    if (currentRound.usedLetters.has(letter)) {
      button.disabled = true;
      button.classList.add("is-used");
    }

    keyboardOutput.appendChild(button);
  });
}

function renderAnswer() {
  slotsOutput.innerHTML = "";

  getDisplayWord(currentRound).forEach((value) => {
    const slot = document.createElement("span");
    slot.className = "slot";
    slot.textContent = value;
    slotsOutput.appendChild(slot);
  });
}

function renderStatus() {
  categoryOutput.textContent = currentRound.topic;
  triesOutput.textContent = String(currentRound.attemptsLeft);

  const used = [...currentRound.usedLetters].sort();
  usedLettersOutput.textContent = used.length ? used.join(" • ") : "None yet";

  questionOutput.textContent = `Topic: ${currentRound.topic}`;
}

function setMessage(text, tone = "default") {
  messageOutput.textContent = text;
  messageOutput.dataset.tone = tone;
}

function renderRound() {
  renderStatus();
  renderAnswer();
  renderKeyboard();
}


function openOverlay() {
  overlay.classList.remove("hidden");

  if (currentRound.won) {
    overlayImage.src = "jackpot.svg";
    overlayImage.alt = "Jackpot celebration";
    overlayTitle.textContent = "You won!";
    overlayText.textContent = "Great work. Start a new round to keep your streak going.";
  } else {
    overlayImage.src = "losingImage.jpeg";
    overlayImage.alt = "Hangman style illustration";
    overlayTitle.textContent = "You lost this round";
    overlayText.textContent = `The word was \"${currentRound.answer}\". Try another one.`;
  }
}

function closeOverlay() {
  overlay.classList.add("hidden");
}

function startRound(type) {
  closeOverlay();

  if (type === "restart") {
    currentRound = {
      ...currentRound,
      attemptsLeft: Math.max(6, Math.ceil(currentRound.answer.length * 0.8)),
      solvedIndexes: new Set(),
      usedLetters: new Set(),
      completed: false,
      won: false
    };
  } else {
    currentRound = buildRound(HANGMAN_SETS);
  }

  setMessage("Choose a letter to start.");
  renderRound();
}

function processGuess(letter) {
  const result = updateRoundWithGuess(currentRound, letter);
  renderRound();

  if (result.repeated) {
    setMessage("You already used this letter.", "warning");
    return;
  }

  if (result.hit) {
    setMessage("Nice guess!", "success");
  } else {
    setMessage("No match. Keep trying.", "danger");
  }

  if (currentRound.completed) {
    openOverlay();
  }
}

keyboardOutput.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  if (!target.dataset.letter) {
    return;
  }

  processGuess(target.dataset.letter);
});

restartButton.addEventListener("click", () => startRound("restart"));
newRoundButton.addEventListener("click", () => startRound("new"));
overlayActionButton.addEventListener("click", () => startRound("new"));

startRound("new");