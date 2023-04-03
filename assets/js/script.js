//Declare Variables with good names
// elements
var questionDisplay = document.getElementById("theQuestion")
var answerListParent = document.getElementById("theAnswers")
var questionAlert = document.getElementById("question-alert")
var highScoreListParent = document.getElementById("high-score-display")
var scoreDisplay = document.getElementById("score")
var transitionLink = document.getElementById("menu-transition")
var userInput = document.getElementById("user-input")
var userInputButton = document.getElementById("save-button")
var startButton = document.getElementById("start-button")
var timerEl = document.getElementById("timer")
//questions
var questionList = [
    {
        question: "1 + 1",
        answer: "2",
        potentialAnswers: ["11", "16", "2", "1"]
    },
    {
        question: "2 + 2",
        answer: "4",
        potentialAnswers: ["22", "16", "4", "1"]
    },
    {
        question: "3+3",
        answer: "6",
        potentialAnswers: ["6", "16", "21", "1000"]
    },
    {
        question: "4+4",
        answer: "8",
        potentialAnswers: ["3", "16", "21", "8"]
    },
    {
        question: "5+5",
        answer: "10",
        potentialAnswers: ["3", "10", "21", "1"]
    },
    {
        question: "What can you put in a bucket to make it lighter?",
        answer: "A Hole",
        potentialAnswers: ["helium", "nothing", "a hole", "a screwdriver"]
    },
    {
        question: "What will grow bigger the more you take away from it?",
        answer: "A hole",
        potentialAnswers: ["Empty space", "A hole", "wasted time", "silence"]
    },

]
// simple variables (numbers?)
var score
var timer
var timerCount
var currentQuestion
var scoreArray = []
var menuBool = true

//timer stuff
function startTimer() {

    timer = setInterval(function() {
        timerCount--
        timerEl.textContent = timerCount

        if (timerCount >= 0) {
            // if the quiz is over we stop the timer
            if (currentQuestion >= questionList.length-1) {
                clearInterval(timer)
        }}
        if (timerCount === 0) {
            while(answerListParent.firstChild) {
                answerListParent.removeChild(answerListParent.firstChild)
            }
            clearInterval(timer)
            getUserName()
        }
    }, 1000)
}

// display initial menu

function displayMenu() {
    score = 0
    currentQuestion = 0
    timerCount = 100
    questionDisplay.innerHTML = "Press the Button to Continue to the Quiz or Press HighScores to View HighScores!"
    startButton.setAttribute("style", "display: inline-block")
}

// display questions
//      make a for loop that appends the parent to create the questions
function displayQuestion() {
    // first remove all previous children
    while(answerListParent.firstChild) {
        answerListParent.removeChild(answerListParent.firstChild)
    }
    // create 4 possible choices using wrong answers?
    if (currentQuestion>=questionList.length){
        getUserName()
        return
    }
    questionDisplay.innerHTML = questionList[currentQuestion].question
    for (i=0; i<4; i++) {
        var li = document.createElement("li")
        li.textContent = questionList[currentQuestion].potentialAnswers[i]
        answerListParent.appendChild(li)
    }
}


// display form submission screen
function getUserName() {
    questionDisplay.innerHTML = "Your Score was " + score + "! Please enter your name"
    userInput.setAttribute("style", "display: inline-block")
    userInputButton.setAttribute("style", "display: inline-block")
}

// display the high scores
function displayHighScores() {
    //hide some stuff and change some text
    startButton.setAttribute("style", "display: none")
    questionDisplay.innerHTML = "HIGH SCORES!"
    //clear list before displaying everthing
    while(highScoreListParent.firstChild) {
        highScoreListParent.removeChild(highScoreListParent.firstChild)
    }

    userInput.setAttribute("style", "display: none")
    userInputButton.setAttribute("style", "display: none")
    highScoreListParent.setAttribute("style", "display: inline-block")

    // get list from local storage
    var highScores = JSON.parse(localStorage.getItem("high-scores"))
    //display list
    for(i=0; i<highScores.length; i++) {
        var li = document.createElement("li")
        li.innerHTML = "Name: " + highScores[i].name + "    Score : " + highScores[i].userScore
        highScoreListParent.appendChild(li)
    }
    transitionLink.innerText = "Menu"
    menuBool = false
    timer = false
}

//Event listener for questions
answerListParent.addEventListener("click", function(e) {
    if(e.target.matches("li")) {
    if(currentQuestion<questionList.length){
        if(e.target.innerHTML == questionList[currentQuestion].answer){
        score++
        scoreDisplay.innerHTML = "score: " + score
        questionAlert.innerHTML = "Correct!"
        setTimeout(function(){
            questionAlert.innerHTML = ""
        }, 1000)
        }
        //when you get an answer wrong reduce the timer by one shrug
        if(e.target.innerHTML !== questionList[currentQuestion].answer){
            timerCount = timerCount - 15
            questionAlert.innerHTML = "Sorry, Wrong Answer"
            setTimeout(function(){
                questionAlert.innerHTML = ""
            }, 1000)

        }
    currentQuestion++
    displayQuestion()
    }
}
})
//Event Listener for menu transitions between main menu and highscores, disable while timer is running?

transitionLink.addEventListener("click", function() {

    if(timer) {
        return
    }

    if (menuBool) {
        displayHighScores()
        return
    } 
    if (!menuBool) {
        //just gonna reload the page to get back to main menu, since there's a lot of things that get reset
        location.reload()
    }



})

//Event listener for form submission and add highscores to local storage

userInputButton.addEventListener("click", function(event) {
    event.preventDefault()
    var userData = document.getElementById("user-input").value
    var userObj = {
        name: userData,
        userScore: score
    }
    console.log(userObj.name)
    scoreArray = JSON.parse(localStorage.getItem("high-scores"))
    scoreArray.push(userObj)
    localStorage.setItem("high-scores", JSON.stringify(scoreArray))

    displayHighScores()
})

startButton.addEventListener("click", function(event) {
    event.preventDefault()
    startTimer()
    displayQuestion()
    this.setAttribute("style", "display: none")
})

displayMenu()