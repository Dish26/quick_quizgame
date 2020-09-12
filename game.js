const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
      question: "what is Europe's most mountainous country?",
      choice1: "Switzerland",
      choice2: "France",
      choice3: "Italy",
      choice4: "England",
      answer: 1
    },
    {
        question: "what does the word 'karakore' mean in Japanese?",
        choice1: "Solo",
        choice2: "Singing",
        choice3: "Empty Orchestra",
        choice4: "Tipsy",
        answer: 3
      },
      {
        question: "Who wrote the line:' A thing of beauty is a joy forever'?",
        choice1: "John Keats",
        choice2: "P.B.Shelley",
        choice3: "Robert Browing",
        choice4: "William Wordsworth",
        answer: 1
      },
      {
        question: "Which west african country is famous for cocoa production ?",
        choice1: "Guinea",
        choice2: "Ghana",
        choice3: "Benin",
        choice4: "Ivory Coast",
        answer: 2
      },
      {
        question: "How many stars are there on flag on China",
        choice1: "one",
        choice2: "seven",
        choice3: "four",
        choice4: "five",
        answer: 4
      },
      {
        question: "Which celebrity was carried by their minders along the Great Wall of China?",
        choice1: "Lady Gaga",
        choice2: "Justin Bieber",
        choice3: "Harry Styles",
        choice4: "Daniel Radcliffe",
        answer: 2
      },
      {
        question: "Which country has more lakes than the rest of the world combined?",
        choice1: "Finland",
        choice2: "China",
        choice3: "Norway",
        choice4: "Canada",
        answer: 4
      },
      {
        question: "Which is the richest city of the world?",
        choice1 : "Tokyo",
        choice2 : "Paris",
        choice3 : "London",
        choice4 : "Chicago",
        answer: 1
      },
      {
        question: "Which country has the world's highest waterfall?",
        choice1 : "America",
        choice2 : "Japan",
        choice3 : "Venezuela",
        choice4 : "Uganda",
        answer: 3
    },
    {
        question: "Which country has the lowest crime rate?",
        choice1 : "Russia",
        choice2 : "Switzerland",
        choice3 : "Brazil",
        choice4 : "Japan",
        answer: 2
    }
    
];
    

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};
 
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("C:\\Users\\Intel\\Desktop\\Disha\\JS\\end.htm");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();