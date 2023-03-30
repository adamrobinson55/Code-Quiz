//variables

function getRandy(x) {
    return Math.floor(Math.random()*x)
}

var questions = [
    {
        question: "What is the name of the Dwarf who survived the end of the world?",
        answer: "Gotrek",
        answerLoc: getRandy(4)
    },
    {
        question: "What is the name of the dwarf who joins the fellowship of the ring",
        answer: "Gimli",
        answerLoc: getRandy(4)
    },
    {
        question: "What is the name of the Dwarf who is supposedly destined to save the Votann?",
        answer: "Ultrek",
        answerLoc: getRandy(4)
    },
    {
        question: "What is the name of the Dwarf born of the house Lannister?",
        answer: "Tyrion",
        answerLoc: getRandy(4)
    },
    {
        question: "What is the name of the movie",
        answer: "The Hobbit: An Unexpected Journey",
        answerLoc: getRandy(4)
    },
    {
        question: "What is the name of the name of Gimli's Father",
        answer: "Gloin",
        answerLoc: getRandy(4)
    },
    {
        question: "Last Question",
        answer: "Ruri",
        answerLoc: getRandy(4)
    },

]

var wrongAnswers = [
    "Gormmli", "Rurpriri", "Gloninin", "Uthrekoni", "Typepperoin",
     "The Hobbnit: An Unexpected PogChamp", "Vultok!", "DoorRingy", "Rock Jones"
]

var answerDisplay = document.getElementById("theQuestion")
var questionNumber = 0
var score = 0
var questionList = document.getElementById("theAnswers")
var questionDisplay = document.getElementById(`ans0`)
var scoreDisplay = document.getElementById("score")
var highScoreDisplay = document.getElementById("high-scores")
var whatToDisplay = "menu"

function displayMenu() {
    answerDisplay.textContent = "Welcome to THE DWARF QUIZ!"
    questionDisplay.textContent = "Click Here to START THE QUIZ!!!"
}

function displayScore() {
    scoreDisplay.textContent = "score: " + score
}

function displayScoreBoard() {
    answerDisplay.textContent = "HIGH SCORES!!!"
    questionDisplay.textContent = "A high score would go here!!!"
}

function displayQuestion() {
    for(i=0; i<4; i++) {
        questionDisplay = document.getElementById("ans" + i)
        questionDisplay.textContent = wrongAnswers[getRandy(wrongAnswers.length)]
    }
    questionDisplay = document.getElementById(`ans${questions[questionNumber].answerLoc}`)
    answerDisplay.textContent = questions[questionNumber].question
    questionDisplay.innerHTML = questions[questionNumber].answer
}


questionList.addEventListener("click", function(e) {
    var clickedElement = e.target
    var clickedAnswer = clickedElement.innerHTML
    if (whatToDisplay === "questions") {
        if (clickedElement.matches("li")) {
            if (questionNumber > questions.length) {
                whatToDisplay = "highscores"
             if (clickedAnswer == questions[questionNumber].answer){
                   score++ 
               }
            }
        questionNumber++
        display()
      }
    } else if ( whatToDisplay === "menu") { 
        whatToDisplay = "questions"
        display()    
}
}
)

highScoreDisplay.addEventListener("click", function(){
    if (whatToDisplay != "highscores") {
        highScoreDisplay.innerHTML = "Menu"
        whatToDisplay = "highscores"
        display()
        return
    }
    if (whatToDisplay === "highscores") {
        highScoreDisplay.innerHTML = "Highscores"
        whatToDisplay = "menu"
        display()
        return
    }
})

function display() {
    if (whatToDisplay === "menu") {
        displayMenu()
        return
    } 
    if (whatToDisplay === "highscores") {
        displayScoreBoard()
        return
    }
    if (whatToDisplay === "questions") {
        displayQuestion()
        displayScore()
        return
    }        
    }


display()