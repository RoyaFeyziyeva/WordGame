const data = [
  { word: "volcano", hint: "A mountain that erupts lava." },
  { word: "penguin", hint: "A flightless bird found in Antarctica." },
  { word: "rainbow", hint: "A multicolored arc in the sky after rain." },
  { word: "jungle", hint: "A dense forest in tropical regions." },
  { word: "airplane", hint: "A vehicle used for flying in the sky." },
  { word: "chocolate", hint: "A sweet treat made from cacao." },
  {
    word: "pyramid",
    hint: "A triangular structure built by ancient Egyptians.",
  },
  { word: "galaxy", hint: "A system of millions or billions of stars." },
  { word: "panda", hint: "A black-and-white bear from China." },
  { word: "cactus", hint: "A plant that thrives in deserts." },
  { word: "robotics", hint: "The science of designing and building robots." },
  { word: "book", hint: "A collection of written or printed pages." },
  { word: "star", hint: "A bright object in the night sky." },
  { word: "tree", hint: "A tall plant with leaves and branches." },
  { word: "moon", hint: "Earth's natural satellite." },
  { word: "milk", hint: "A white liquid produced by mammals." },
  { word: "fish", hint: "An aquatic animal with gills." },
  { word: "sun", hint: "The star at the center of the solar system." },
  { word: "rain", hint: "Water droplets falling from the sky." },
  { word: "tornado", hint: "A rapidly rotating column of air." },
  {
    word: "kangaroo",
    hint: "An Australian animal that hops on its hind legs.",
  },
  {
    word: "castle",
    hint: "A large, fortified building from the medieval period.",
  },
  { word: "butterfly", hint: "An insect with colorful wings." },
  { word: "microscope", hint: "An instrument used to see tiny objects." },
  { word: "bicycle", hint: "A two-wheeled vehicle powered by pedaling." },
  { word: "fireworks", hint: "Explosives used for celebrations." },
  {
    word: "squirrel",
    hint: "A small animal with a bushy tail, known for climbing trees.",
  },
  { word: "library", hint: "A place where books are kept." },
  { word: "waterfall", hint: "A cascade of water falling from a height." },
  {
    word: "avocado",
    hint: "A green fruit with a creamy texture, often used in guacamole.",
  },
  { word: "balloon", hint: "An inflatable object made of rubber." },
  { word: "camel", hint: "A desert animal with a hump on its back." },
  { word: "island", hint: "A piece of land surrounded by water." },
  { word: "giraffe", hint: "The tallest land animal, with a long neck." },
  { word: "iceberg", hint: "A large piece of ice floating in the sea." },
  { word: "vampire", hint: "A mythical creature that drinks blood." },
  { word: "painting", hint: "An artwork made using paint." },
  {
    word: "rocket",
    hint: "A spacecraft used to travel beyond Earth's atmosphere.",
  },
];

const startBtn = document.querySelector(".start-btn");
const alphabetButtons = document.querySelectorAll(".alphabet-container button");
const timeElement = document.querySelector(".time");
const timeContainer = document.querySelector(".time");
const scoreElement = document.querySelector(".score span");
const inputField = document.querySelector(".inputs");
const Hint = document.querySelector(".hint");
const nextWordBtn = document.querySelector(".next-word");
const gameOverModal = document.querySelector(".game-over-modal");
const retryBtn = document.querySelector("#retry-btn");

let currentWord = "";
let score = 0;
let timer;
let gameStarted = false;
let incorrectLetters = [];
let correctLetters = [];

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    incorrectLetters = [];
    correctLetters = [];
    startBtn.disabled = true;
    nextWordBtn.disabled = false;
    startTimer(30);
    timeContainer.style.backgroundColor = "green";
    applyGlossyEffect();
    chooseRandomWord();
    score = 0;
    updateScore();
  }
}

function startTimer(seconds) {
  let time = seconds;
  timer = setInterval(() => {
    timeElement.textContent = "Time: " + time;
    time--;
    if (time < 0) {
      endGame();
    }
  }, 1000);
}

function applyGlossyEffect() {
  alphabetButtons.forEach((button) => {
    button.style.boxShadow =
      "0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.2)";
  });
}

function updateScore() {
  scoreElement.textContent = "Score: " + score;
}

function chooseRandomWord() {
  if (gameStarted) {
    if (data.length === 0) {
      endGame();
      return;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    currentWord = data[randomIndex].word;
    const wordLength = currentWord.length;
    Hint.textContent = "Hint: " + data[randomIndex].hint;
    data.splice(randomIndex, 1);
    let html = "";
    inputField.innerHTML = html;
    for (let i = 0; i < wordLength; i++) {
      html += '<input type="text" class="user-input-game-time">';
    }
    inputField.innerHTML = html;
  }
}

function endGame() {
  clearInterval(timer);
  document.querySelector("#final-score").textContent = score;
  gameOverModal.style.display = "flex";

  score = 0;
  incorrectLetters = [];
  correctLetters = [];
  currentWord = "";
  scoreElement.textContent = "Score: 0";
  timeElement.textContent = "Time: 0";

  const inputFields = document.querySelectorAll(".user-input-game-time");
  inputFields.forEach((input) => (input.value = ""));

  alphabetButtons.forEach((button) => {
    button.style.boxShadow = "none";
  });

  nextWordBtn.disabled = true;
  Hint.textContent = "";
}

function resetGame() {
  score = 0;
  scoreElement.textContent = "Score: 0";
  timeElement.textContent = "Time: 30";
  currentWord = "";
  incorrectLetters = [];
  correctLetters = [];

  chooseRandomWord();

  const inputFields = document.querySelectorAll(".user-input-game-time");
  inputFields.forEach((input) => (input.value = ""));

  startTimer(30);
  gameStarted = true;
  startBtn.disabled = true;
  nextWordBtn.disabled = false;
  applyGlossyEffect();
  timeContainer.style.backgroundColor = "green";
}

retryBtn.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  resetGame();
});

startBtn.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  startGame();
});

function handleinputField(letter) {
  if (gameStarted) {
    if (currentWord.includes(letter)) {
      for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
          correctLetters.push(letter);
          inputField.querySelectorAll(".user-input-game-time")[i].value =
            letter;
        }
      }
    } else {
      incorrectLetters.push(letter);
    }
    if (correctLetters.length === currentWord.length) {
      score++;
      updateScore();
      correctLetters = [];
      chooseRandomWord();
      resetInputs();
    }
  }
}

function resetInputs() {
  const inputFields = document.querySelectorAll(".user-input-game-time");
  inputFields.forEach((input) => (input.value = ""));
}

alphabetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleinputField(button.innerText);
  });
});

nextWordBtn.addEventListener("click", () => {
  correctLetters = [];
  chooseRandomWord();
  resetInputs();
});
