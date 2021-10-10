var questionObject = {
    0: {
            "A ___ loop is a loop that executes a pre-defined number of times.": 
            ["while", "do while", "for", "more"]
        },
    1: {
            "question 2": 
            ["while", "do while", "for", "more"]
        },
    2: {
            "question 3": 
            ["while", "do while", "for", "more"]
        },
    3: {
            "question 4": 
            ["while", "do while", "for", "more"]
        }
} 
var correctAnswers = ["for", "more", "while", "do while"];
var askedQuestions = [];
var currentQuestionObject;
var questionNumber = 0;
var questionTextKey;
var currentKey;
var timeLeft;
var correctCount = 0;
var numQuestionsAnswered = 0;
var highScores = [];
var questionH2;
var myPtag;
var buttonA;
var buttonB;
var buttonC;
var buttonD;

// var answerA = document.querySelector("#a");
// var answerB = document.querySelector("#b");
// var answerC = document.querySelector("#c");
// var answerD = document.querySelector("#d");
// var showCorrect = document.querySelector("#instructions");

var chosenAnswer;

function countdown() {
    timeLeft = 60;

    var timer = setInterval(function () {
        var timerEl = document.querySelector("#timer");
       // console.log(timerText);
        timerEl.textContent = "Timer: " + timeLeft;
        //console.log("New timer text: " + timerText);
        // console.log(timeLeft);
        timeLeft--;
        if(timeLeft < 0) {
            clearInterval(timer);
            document.querySelector("h1").textContent = "Time is Up!"
            // console.log("Time is Up!")
            endTheGame();
        }
        else if(numQuestionsAnswered == 4) {
            clearInterval(timer);
        }
    }, 1000);
}

function pickQuestion() {
    // var rand = Math.floor(Math.random()*4)
    
    // var questionNumKey = Object.keys(questionObject)[rand];

    currentQuestionObject = questionObject[questionNumber];
    console.log(currentQuestionObject);
    console.log(currentQuestionObject[0])
    // questionObjectNum = Object.keys(questionObject)[rand];
    // // console.log(questionObjectNum)
    // questionTextKey = Object.keys(questionObject[rand]);
    // console.log(currentQuestionObject);
    // console.log(questionTextKey);

    // console.log("Question key #: " + Object.keys(questionObject)[rand]);
    // console.log(questionObject[rand].questionTextKey)


    currentKey = Object.keys(questionObject)[questionNumber];
    console.log("question # (starting from 0): " + currentKey)
    questionTextKey = Object.keys(questionObject[currentKey]);
    console.log("question text: " + questionTextKey);
    console.log("hi " + currentQuestionObject[questionTextKey]);
    return questionTextKey;
}

function showQuestion (a, b, c, d) {
    console.log("Number of questions amswered: " + numQuestionsAnswered)
    var questionEl = document.querySelector("#question");
    questionEl.textContent = pickQuestion();

    console.log(currentQuestionObject[questionTextKey]);
   
    a.textContent = "A) " + currentQuestionObject[questionTextKey][0];
    b.textContent = "B) " + currentQuestionObject[questionTextKey][1];
    c.textContent = "C) " + currentQuestionObject[questionTextKey][2];
    d.textContent = "D) " + currentQuestionObject[questionTextKey][3];
}

function checkAnswer(choice, correctOrNot) {
    var choiceText = choice.textContent;
    // console.log(typeof(choiceText));
    var stripText = choiceText.substring(3);
    // console.log(stripText);

    // console.log(questionObjectNum)
    // console.log("Correct answer: " + correctAnswers[0])
    // console.log("Strip text: " + stripText)
    // console.log("Strip text == correctAnswers[0]: " + (stripText==correctAnswers[0]))

  

    switch (currentKey) {
        case "0":
            if(stripText == correctAnswers[0]) {
                correctCount++;
                // console.log("correct answer");
                correctOrNot.textContent = "Correct";
            }
            else {
                correctOrNot.textContent = "Incorrect";
                timeLeft -= 10;
            }
            break;
        case "1":
            if(stripText == correctAnswers[1]) {
                correctCount++;
                // console.log("correct answer");
                correctOrNot.textContent = "Correct";
            }
            else {
                correctOrNot.textContent = "Incorrect";
                timeLeft -= 10;
            }
            break;
        case "2":
            if(stripText == correctAnswers[2]) {
                correctCount++;
                // console.log("correct answer");
                correctOrNot.textContent = "Correct";
            }
            else {
                correctOrNot.textContent = "Incorrect";
                timeLeft -= 10;
            }
            break;
        case "3":
            if(stripText == correctAnswers[3]) {
                correctCount++;
                // console.log("correct answer");
                correctOrNot.textContent = "Correct";
                timeLeft -= 10;
            }
            else {
                correctOrNot.textContent = "Incorrect";
                timeLeft -= 10;
            }
            break;
    }
}

function endTheGame() {
    setTimeout(function () {
        questionH2.textContent = "Quiz Over!"

        myPtag.remove();
        buttonA.remove();
        buttonB.remove();
        buttonC.remove();
        buttonD.remove();
        
        var score = document.createElement("p");
        score.textContent = "Your final score is: " + correctCount;

        var myForm = document.createElement("form");
        var formLabel = document.createElement("label");
        var formInput = document.createElement("input");
        var submitBtn = document.createElement("button");

        myForm.setAttribute("id", "submit-score");
        formInput.setAttribute("id", "initials");
        formLabel.setAttribute("id", "intials-label");
        formLabel.setAttribute("for", "intials");
        submitBtn.setAttribute("id", "submit");
        submitBtn.setAttribute("type", "submit");
        formLabel.textContent = "Enter your intitials: ";
        submitBtn.textContent = "Submit";


        document.querySelector("#content").append(score);
        document.querySelector("#content").append(myForm);
        document.querySelector("#submit-score").append(formLabel);
        document.querySelector("#intials-label").append(formInput);
        document.querySelector("#submit-score").append(submitBtn);


        document.addEventListener("click", function (event) {
            var initials;
            event.preventDefault();
            if(event.target.id == "submit") {
                console.log("Submitting Initials")
                initials =  formInput.value;
                console.log(initials);

                //this will need to be saved to local storage
                var latestScore = (initials + " - " + correctCount)
                highScores.push(latestScore);
                console.log("Adding high score: " + highScores);

                //how do I add to local storage and not overwrite? 
                localStorage.setItem("highScores", highScores);
                
                questionH2.textContent = "High Scores";
                
                score.remove();
                formLabel.remove();
                formInput.remove();
                submitBtn.remove();
                myForm.remove();

                var highScoreList = document.createElement("ol");
                highScoreList.setAttribute("id", "high-score-list");
                
                //probably should be called Previous high score list 
                var newListItem = document.createElement("li");

                var goBackBtn = document.createElement("button");
                goBackBtn.setAttribute("id", "go-back");

                var clearScoresBtn = document.createElement("button");
                clearScoresBtn.setAttribute("id", "clear");
                
                //how do I read from local storage? 
                newListItem.textContent = latestScore; 
                
               
                goBackBtn.textContent = "Go Back";
                clearScoresBtn.textContent = "Clear High Scores";


                document.querySelector("#content").append(highScoreList);
                document.querySelector("#high-score-list").append(newListItem);
                document.querySelector("#content").append(goBackBtn);
                document.querySelector("#content").append(clearScoresBtn);

                document.addEventListener("click", function(event) {
                    if(event.target.id == "clear") {
                        console.log("Clearing high scores");
                        highScores = [];
                        newListItem.remove();
                    }
                })

                document.addEventListener("click", function (event) {
                    if(event.target.id == "go-back") {
                        this.location.reload();
                    }
                })
            }
        })
    }, 2000);
}

function changeToQuestions() {
    questionH2 = document.querySelector("h2")
    questionH2.setAttribute("id", "question");
    // console.log(questionH2);

    var instructPtag = document.querySelector("#instructions");
    instructPtag.remove();

    myPtag = document.createElement("p");
    myPtag.setAttribute("id", "grade");
    myPtag.textContent = "";
    
    // console.log("correct or not p tag: " + myPtag)


    document.querySelector("#start-quiz").remove();
    
    buttonA = document.createElement("button")
    buttonA.setAttribute("id", "a")
    // console.log(buttonA);
    buttonB = document.createElement("button")
    buttonB.setAttribute("id", "b")
    buttonC = document.createElement("button")
    buttonC.setAttribute("id", "c")
    buttonD = document.createElement("button")
    buttonD.setAttribute("id", "d")
    
    document.querySelector("#content").append(buttonA)
    document.querySelector("#content").append(buttonB)
    document.querySelector("#content").append(buttonC)
    document.querySelector("#content").append(buttonD)

    document.querySelector("#content").append(myPtag)

    showQuestion(buttonA, buttonB, buttonC, buttonD);
    questionNumber++;

    countdown();

    if(numQuestionsAnswered > Object.keys(questionObject).length) {
        // submitInitials(); 

        questionH2.textContent = "Quiz Over!"
        
        myPtag.remove();
        buttonA.remove();
        buttonB.remove();
        buttonC.remove();
        buttonD.remove();
        
        var score = document.createElement("p");
        score.textContent = "Your final score is: " + correctCount;

        var myForm = document.createElement("form");
        var formLabel = document.createElement("label");
        var formInput = document.createElement("input");

        myForm.setAttribute("id", "submit-score");
        formInput.setAttribute("id", "initials");
        formLabel.setAttribute("id", "intials-label");
        formLabel.setAttribute("for", "intials");
        formLabel.textContent = "Enter your intitials: ";
        formInput.textContent = "Submit";


        document.querySelector("#content").append(score);
        document.querySelector("#content").append(myForm);
        document.querySelector("#submit-score").append(formLabel);
        document.querySelector("#intials-label").append(formInput);
    }

    document.addEventListener("click", function(event) {
        if(event.target.id == "a" || event.target.id == "b" || event.target.id == "c" || event.target.id == "d" 
        && numQuestionsAnswered < Object.keys(questionObject).length) {
            // console.log(event.target);
            console.log("a,b,c,d got clicked")
            // console.log(event.target.id)
            // console.log(event.target.textContent)
            chosenAnswer = event.target;
            // console.log(chosenAnswer);
            checkAnswer(event.target, myPtag);
            numQuestionsAnswered++;

            if(numQuestionsAnswered < Object.keys(questionObject).length) {
                console.log("this logic executes");
                setTimeout(function () {
                    myPtag.textContent = "";
                    showQuestion(buttonA, buttonB, buttonC, buttonD);
                    questionNumber++;
                }, 2000);
            } 
            else {
                endTheGame();
            }
        }       
    });
}

document.querySelector("#start-quiz").addEventListener("click", function () {
    console.log("Start got clicked")
    
    changeToQuestions();
})


// function playQuizGame() {
//     countdown();
//     showQuestion();
// }


// answerB.addEventListener("click", function(event) {
//     chosenAnswer = event.target;
//     console.log(chosenAnswer);
//     checkAnswer(event.target);
//     if(numQuestionsSeen < Object.keys(questionObject).length ) {
//         setTimeout(function () {
//             showQuestion();
//         }, 2000);
//     }
// });
// answerC.addEventListener("click", function(event) {
//     chosenAnswer = event.target;
//     console.log(chosenAnswer);
//     checkAnswer(event.target);
//     if(numQuestionsSeen < Object.keys(questionObject).length ) {
//         setTimeout(function () {
//             showQuestion();
//         }, 2000);
//     }
// });
// answerD.addEventListener("click", function(event) {
//     chosenAnswer = event.target;
//     console.log(chosenAnswer);
//     checkAnswer(event.target);
//     if(numQuestionsSeen < Object.keys(questionObject).length ) {
//         setTimeout(function () {
//             showQuestion();
//         }, 2000);
//     }
// });

// for(var i =0;  i < Object.keys(questionObject).length; i++) {
//     playQuizGame();
// }

//playQuizGame();





// console.log(questionObject);
// console.log(Object.keys(questionObject[0]));

// pickQuestion();
// pickQuestion();
// pickQuestion();
// pickQuestion();
// pickQuestion();

/*
if (numQuestionsSeen ==1) {
        askedQuestions.push(rand);
        numQuestionsSeen++;
    }
    else{
        var numbersToCheck = askedQuestions.length;

        // while(rand == askedQuestions[0] || rand == askedQuestions[1] || rand == askedQuestions[2] ||
        // rand == askedQuestions[3])
        for(var i = 0; i < askedQuestions.length; i++) {
            if(i=0) {
                while(rand == askedQuestions[i]) {
                    rand = Math.floor(Math.random()*4);
                }
            } else if(i > 0) {
                for(var j = i; i >= 0; i--) {
                    while(rand == askedQuestions[j]) {
                        rand = Math.floor(Math.random()*4;
                    }
                }
        }
                    
                }
            } 
        }

        
        askedQuestions.push(rand);
        numQuestionsSeen++;
    }
*/