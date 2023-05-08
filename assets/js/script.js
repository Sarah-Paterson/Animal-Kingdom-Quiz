




const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const inputButton = document.getElementById("input-btn");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

const minuteTimer = document.getElementById("timer");

const scoreBoardContainer = document.getElementById("score-board");
const scoreBoardElement = document.getElementById("score-board-scores");
const scoresElement = document.getElementById("score");

let shuffledQuestions,currentQuestionIndex;
let quizScore = 0;
let secondsLeft = 60;


startButton.addEventListener("click", startGame)

nextButton.addEventListener("click", () =>{
    currentQuestionIndex++
    setNextQuestion()
});

function setTime() {
  let timerInterval = setInterval(function() {
    secondsLeft--;
    minuteTimer.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      // scoreboard
    }

  }, 1000);
}

function startGame() {
    setTime();

    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() =>Math.random() -0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide")
    minuteTimer.classList.remove("hide")
    setNextQuestion()
    quizScore = 0
}


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) =>{
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}


function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}


function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);

    Array.from(answerButtonsElement.children).forEach((button)=>{
        setStatusClass(button,button.dataset.correct);
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        // startButton.innerText ="Imput Score";
        // startButton.classList.remove("hide");
        startButton.classList.add("hide");
        inputButton.classList.remove("hide");
    } 

    if(selectedButton.dataset = correct) {
        quizScore++;
    } else {
        secondsLeft--;
        secondsLeft--;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}


function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong")
}

function showScoreBoard() {
    scoreBoardContainer.classList.remove("hide")
}

const questions = [
    {
        question: "What was Animal Kingdom\'s opening day?",
        answers : [
            {text: "April 22, 1998", correct: true},
            {text: "July 7, 1997", correct: false},
            {text: "June 21, 1995", correct: false},
            {text: "May 1, 2000", correct: false},
        ],
    },
    {
        question: "Who was the Disney Imagineer that headed the Animal Kingdom project?",
        answers : [
            {text: "Joe Rohde", correct: true},
            {text: "Mary Blair", correct: false},
            {text: "Roger E. Broggie", correct: false},
            {text: "Lori Coltrin", correct: false},
        ],
    },
    {
        question: "How many miles did the team of Imageneers travel in search of the essential look of life in the wild?",
        answers : [
            {text: "500,000 miles", correct: true},
            {text: "350,000 miles", correct: false},
            {text: "100,000 miles", correct: false},
            {text: "250,000 miles", correct: false},
        ],
    },
    {
        question: "How long did it take the ten artists and three Imagineers to create the tree of life?",
        answers : [
            {text: "18 months", correct: true},
            {text: "9 months", correct: false},
            {text: "20 months", correct: false},
            {text: "4 months", correct: false},
        ],
    },
    {
        question: "How many animal carvings are on the tree of life?",
        answers : [
            {text: "337", correct: true},
            {text: "432", correct: false},
            {text: "128", correct: false},
            {text: "224", correct: false},
        ],
    },
    {
        question: "How many floating mountains are there in the Valley of Mo\'ara on Pandora?",
        answers : [
            {text: "22", correct: true},
            {text: "18", correct: false},
            {text: "8", correct: false},
            {text: "12", correct: false},
        ],
    },
    {
        question: "What animal was first born at Disney\'s Animal Kingdom?",
        answers : [
            {text: "A Kudu", correct: true},
            {text: "An Elephant", correct: false},
            {text: "An Okapi", correct: false},
            {text: "A Gorilla", correct: false},
        ],
    },
    {
        question: "Since the park opened, how much money has the Disney Conservation Fund raised to support nonprofit organizations working with communities to reverse the decline of wildlife?",
        answers : [
            {text: "$120 million", correct: true},
            {text: "$80 million", correct: false},
            {text: "$100 million", correct: false},
            {text: "$60 million", correct: false},
        ],
    },

]