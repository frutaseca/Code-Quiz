var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#start_button");
var introPage =document.querySelector("#intro_page");
var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");
var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");
var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial =document.querySelector("#initial");
var submitBtn =document.querySelector("#submit_btn");
var highScorePage =document.querySelector("#highscore_page");
var scoreRecord =document.querySelector("#score_record");
var scoreCheck =document.querySelector("#score_check");
var finish =document.querySelector("#finish");
var backBtn =document.querySelector("#back_btn");
var clearBtn=document.querySelector("#clear_btn");

var questionList = [
    {
        question: "Questions 1 : In order to  work on a github repository offline you need ________.",
        choices: ["a. a link to the repository", "b. permission for the owner of the repository", "c. a ssh key", "d. there is no way to work on a repo offline"],
        answer: "c"
    },
    {
        question: "Questions 2 : HTML is a ______ language.",
        choices: ["a. programming", "b. startup", "c. basic", "d. markup"],
        answer: "d"
    },
    {
        question: "Questions 3 : How does one identify an id element is css?",
        choices: ["a. with a #", "b. with a .", "c. by typing id before the element name", "d. by putting (id) before the element name"],
        answer: "a"
    },
    {
        question: "Questions 4 : How do you call a function named FirstFunction?",
        choices: ["a. call FirstFunction()", "b. call function FirstFunction()", "c. FirstFunction()", "d. call FirstFunction"],
        answer: "c"
    },
    {
        question: "Questions 5 : What is CSS used for?",
        choices: ["a. to build websites", "b. to style websites", "c. used to allow developers to easily create fast user interfaces", "d. to lanch websites"],
        answer: "b"
    },
    {
        question: "Questions 6 : The first index of an array is ____.",
        choices: ["a. 1", "b. 0", "c. 2", "d. any"],
        answer: "b"
    },
    {
        question: "Questions 7 : Which of the following is not a JavaScript statement?",
        choices: ["a. for", "b. do while", "c. const", "d. while"],
        answer: "c"
    },
];

var timeLeft = document.getElementById("timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

function countdown() {
        var timerInterval = setInterval(function () {
          secondsLeft--;
          timeLeft.textContent = "Time left: " + secondsLeft + " s";
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time is up!"; 
                finish.textContent = "Time is up!";
                gameOver();
            } else  if(questionCount >= questionList.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

function startQuiz () {
        introPage.style.display = "none";
        questionPage.style.display = "block";
        questionNumber = 0
        countdown();
        showQuestion(questionNumber);
}

function showQuestion (n) {
        askQuestion.textContent = questionList[n].question;
        answerBtn1.textContent = questionList[n].choices[0];
        answerBtn2.textContent = questionList[n].choices[1];
        answerBtn3.textContent = questionList[n].choices[2];
        answerBtn4.textContent = questionList[n].choices[3];
        questionNumber = n;
    }

function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    if (questionList[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;
    } else {
        secondsLeft = secondsLeft - 10;
        checkLine.textContent = "Wrong! The correct answer is " + questionList[questionNumber].answer + " .";
    }
    if (questionNumber < questionList.length -1 ) {
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}

function gameOver() {
        questionPage.style.display = "none";
        scoreBoard.style.display = "block";
        console.log(scoreBoard);
        finalScore.textContent = "Your final score is :" + totalScore ; 
        timeLeft.style.display = "none"; 
};

function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
    var topTen = highScores.slice(0,10);
    for (var i = 0; i < topTen.length; i++) {
        var item = topTen[i];
    var li = document.createElement("li");
    li.textContent = item.user + " = " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

startBtn.addEventListener("click", startQuiz);

reactButtons.forEach(function(click){
    click.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

backBtn.addEventListener("click",function(event){
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});