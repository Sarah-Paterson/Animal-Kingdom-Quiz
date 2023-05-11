const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const saveButton = document.getElementById("input-btn");
const tryAgainButton = document.getElementById("try-again-btn");
const viewScoresButton = document.getElementById("view-scores-btn");
const completeButton = document.getElementById("complete-btn");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

const inputNameContainer = document.getElementById("input-name");
const loadingPageContainer = document.getElementById("loading-page");

const minuteTimer = document.getElementById("timer");

const scoreBoardContainer = document.getElementById("score-board");
const scoreBoardElement = document.getElementById("score-board-scores");
let scoresElement = document.getElementById("score");
const scoreBoardNumber = 5;

let shuffledQuestions,currentQuestionIndex;
let quizScore = 0;
let secondsLeft = 60;
let inputName = document.getElementById("myText");
let totalScore = JSON.parse(localStorage.getItem("results")) || [];


// TODO: list all scores
// shuffle answers yourself (unless you can find a function)

// if there's time...

// figure out a way to shuffle the answers in a function
// figure out a way to use the DAK video as the backdrop to the webpage on loop
// add DAK logo and text on the front page 

// remove next button? have the answers just move to next question?
// remove color change and add "correct" or "wrong"?


startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () =>{
    currentQuestionIndex++
    setNextQuestion()
});
saveButton.addEventListener("click", inputNameFunction);
viewScoresButton.addEventListener("click", showScoreBoard);
completeButton.addEventListener("click", loadingPage);
tryAgainButton.addEventListener("click", reload);


function setTime() {
  let timerInterval = setInterval(function() {
    secondsLeft--;
    minuteTimer.textContent = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      inputNameFunction();
    }

  }, 1000);
}


function startQuiz() {
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
        startButton.classList.add("hide");
        saveButton.classList.remove("hide");
    } 

    if(selectedButton.dataset = correct) {
        quizScore++;
    } else {
        secondsLeft -= 5;
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

if(secondsLeft == 0) {
    inputNameFunction();
}

function inputNameFunction() {
    minuteTimer.classList.add("hide");
    // secondsLeft = 0;
    completeButton.classList.remove("hide");
    inputNameContainer.classList.remove("hide");
    questionContainer.classList.add("hide");
    saveButton.classList.add("hide");

    // let playerInitials = inputName.value;
    // setScore(playerInitials);

}

function loadingPage() {
    getScore();
    completeButton.classList.add("hide");
    viewScoresButton.classList.remove("hide");
    inputNameContainer.classList.add("hide");
    loadingPageContainer.classList.remove("hide");
    tryAgainButton.classList.remove("hide");

}


function showScoreBoard() {
    loadingPageContainer.classList.add("hide");
    viewScoresButton.classList.add("hide");
    scoreBoardContainer.classList.remove("hide");
    tryAgainButton.classList.remove("hide");
    completeButton.classList.add("hide");
    nextButton.classList.add("hide");
    
    let playerInitials = inputName.value;
    setScore(playerInitials);

    for (let i = 0; i < totalScore.length; i++) {
        let scoreCard = document.createElement("li");

        scoreCard.className = "score";

        scoreCard.textContent = totalScore[i].inputName + " - " + totalScore[i].quizScore;

        scoreBoardContainer.appendChild(scoreCard);
    }

}


function setScore(playerInitials) {
    let results = {
        inputName: playerInitials,
        quizScore: quizScore + "/8"
    }
    
    totalScore.push(results);
    console.log('total score', totalScore);
    localStorage.setItem("results", JSON.stringify(totalScore));
 
}


function getScore() {
    for (let i = 0; i < totalScore.length; i++) {
        const element = totalScore[i];

        let playerName = element.inputName;
        let playerFinalScore = element.quizScore;
        
    }
}

function reload() {
    location.reload();
}





const questions = [
    {
        question: "What was Animal Kingdom\'s opening day?",
        answers : [
            {text: "July 7, 1997", correct: false},
            {text: "June 21, 1995", correct: false},
            {text: "April 22, 1998", correct: true},
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
            {text: "350,000 miles", correct: false},
            {text: "100,000 miles", correct: false},
            {text: "250,000 miles", correct: false},
            {text: "500,000 miles", correct: true},
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
            {text: "432", correct: false},
            {text: "337", correct: true},
            {text: "128", correct: false},
            {text: "224", correct: false},
        ],
    },
    {
        question: "How many floating mountains are there in the Valley of Mo\'ara on Pandora?",
        answers : [
            {text: "18", correct: false},
            {text: "8", correct: false},
            {text: "22", correct: true},
            {text: "12", correct: false},
        ],
    },
    {
        question: "What animal was first born at Disney\'s Animal Kingdom?",
        answers : [
            {text: "An Elephant", correct: false},
            {text: "An Okapi", correct: false},
            {text: "A Gorilla", correct: false},
            {text: "A Kudu", correct: true},
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