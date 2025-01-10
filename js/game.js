const sentences = [
  { correct: "I am learning JavaScript.", scrambled: ["learning", "I", "am", "JavaScript."] },
  { correct: "She likes to read books.", scrambled: ["likes", "She", "to", "read", "books."] },
  { correct: "He is playing football.", scrambled: ["football.", "He", "is", "playing"] },
  { correct: "The cat is under the table.", scrambled: ["under", "is", "The", "cat", "the", "table."] },
  { correct: "We are going to the park.", scrambled: ["to", "the", "park.", "We", "are", "going"] },
  { correct: "Birds can fly in the sky.", scrambled: ["in", "fly", "the", "Birds", "sky.", "can"] },
  { correct: "My mother is cooking dinner.", scrambled: ["dinner.", "is", "cooking", "My", "mother"] },
  { correct: "They are watching a movie.", scrambled: ["a", "watching", "movie.", "are", "They"] },
  { correct: "It is a sunny day today.", scrambled: ["a", "sunny", "day", "It", "is", "today."] },
  { correct: "Do you like chocolate cake?", scrambled: ["like", "chocolate", "cake?", "Do", "you"] }
];

let currentSentence = {};
let selectedWords = [];
let studentName = "";
let questionIndex = 0;
let score = 0;

// Shuffle an array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load a new sentence
function loadSentence() {
  if (questionIndex === 10) {
    endGame();
    return;
  }

  selectedWords = [];
  document.getElementById("sentence").textContent = "";
  document.getElementById("sentence").className = ""; // Reset styles
  document.getElementById("feedback").textContent = ""; // Clear feedback

  currentSentence = sentences[questionIndex];
  const scrambledWords = shuffle([...currentSentence.scrambled]);
  const scrambledWordsContainer = document.querySelector(".scrambled-words");
  scrambledWordsContainer.innerHTML = "";

  scrambledWords.forEach(word => {
    const wordElement = document.createElement("span");
    wordElement.textContent = word;
    wordElement.addEventListener("click", () => selectWord(word, wordElement));
    scrambledWordsContainer.appendChild(wordElement);
  });

  document.getElementById("progress").textContent = `Question: ${questionIndex + 1}/10`;
}

// Add a word to the sentence
function selectWord(word, wordElement) {
  selectedWords.push(word);
  wordElement.style.display = "none";
  document.getElementById("sentence").textContent = selectedWords.join(" ");
}

// Undo the last word
document.getElementById("undo").addEventListener("click", () => {
  if (selectedWords.length > 0) {
    const lastWord = selectedWords.pop();
    document.getElementById("sentence").textContent = selectedWords.join(" ");
    document.querySelectorAll(".scrambled-words span").forEach(span => {
      if (span.textContent === lastWord) {
        span.style.display = "inline-block";
      }
    });
  }
});

// Check the answer
document.getElementById("check").addEventListener("click", () => {
  const userSentence = selectedWords.join(" ");
  const feedback = document.getElementById("feedback");
  const sentenceBox = document.getElementById("sentence");

  if (userSentence === currentSentence.correct) {
    feedback.textContent = "🎉 Correct! Great job!";
    feedback.className = "success";
    sentenceBox.className = "success";
    score++;
  } else {
    feedback.textContent = "❌ Oops! Try again.";
    feedback.className = "error";
    sentenceBox.className = "error";
  }

  questionIndex++;
  setTimeout(loadSentence, 1500);
});

// Skip to the next sentence
document.getElementById("skip").addEventListener("click", () => {
  questionIndex++;
  loadSentence();
});

// Start the game
document.getElementById("start-game").addEventListener("click", () => {
  const nameInput = document.getElementById("student-name").value.trim();

  if (nameInput) {
    studentName = nameInput;
    document.getElementById("greeting").textContent = `Hello, ${studentName}! Let's play!`;
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    questionIndex = 0;
    score = 0;
    loadSentence();
  } else {
    alert("Please enter your name to start the game.");
  }
});

// End the game
function endGame() {
  document.getElementById("game-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById("final-score").textContent = `${studentName}, you scored ${score} out of 10!`;
}

// Restart the game
document.getElementById("restart-game").addEventListener("click", () => {
  document.getElementById("score-container").style.display = "none";
  document.getElementById("welcome-container").style.display = "block";
});
