var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbutton");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("highscoredata");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var TheQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    A: "script",
    B: "js",
    C: "javascript",
    D: "scripting",
    RightAnswer: "a"},
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    A: "onchange",
    B: "onclick",
    C: "onmouseclick",
    D: "onmouseover",
    RightAnswer: "b"},
   {
    question: "How do you find the number with the highest value of x and y?",
    A: "Math.max(x, y)",
    B: "Math.ceil(x, y)",
    C: "top(x, y)",
    D: "ceil(x, y)",
    RightAnswer: "a"},
    {
    question: "How do you round the number 7.25, to the nearest integer?",
    A: "round(7.25)",
    B: "rnd(7.25)",
    C: "Math.rnd(7.25)",
    D: "Math.round(7.25)",
    RightAnswer: "d"},
    {
    question: "How does a FOR loop start?",
    A: "for (i = 0; i <= 5)",
    B: "for (i = 0; i <= 5; i++)",
    C: "for i = 1 to 5",
    D: "for (i <= 5; i++)",
    RightAnswer: "b"},  
    {
    question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    A: "if i =! 5 then",
    B: "if i <> 5",
    C: "if (i != 5)",
    D: "if (i <> 5)",
    RightAnswer: "c"},
    {
    question: "How do you write 'Hello World' in an alert box?",
    A: "msg('Hello World');",
    B: "msgBox('Hello World');",
    C: "alert('Hello World');",
    D: "alertBox('Hello World');",
    RightAnswer: "c"},
        
    
    ];
var finalQuestionIndex = TheQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = TheQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.A;
    buttonB.innerHTML = currentQuestion.B;
    buttonC.innerHTML = currentQuestion.C;
    buttonD.innerHTML = currentQuestion.D;
};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + TheQuestions.length + " correct!";
}
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = TheQuestions[currentQuestionIndex].RightAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        timeLeft -= 5;
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click",startQuiz);
