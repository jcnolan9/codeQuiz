
//This is an object with my questions and their multiple choice answers 
var questionObject = {
    0: {
            "A ___ loop is a loop that executes a pre-defined number of times.": 
            ["while", "do while", "for", "more"]
        },
    1: {
            "A ___ tag is used to create an unordered list element in HTML": 
            ["<p>", "<ol>", "<li>", "<ul>"]
        },
    2: {
            "In CSS the term ___ is used for indicating how to grab an element(s) from the HTML document": 
            ["selector", "indicator", "identifier", "finder"]
        },
    3: {
            "In Javascript you can listen for clicks on the page by adding a(n) ___": 
            ["click whisperer", "event listener", "click detector", "event ear"]
        }
} 

//All global variables
var correctAnswers = ["for", "<ul>", "selector", "event listener"];
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
var chosenAnswer;

//the countdown function will end the game if it reaches zero. The timer clears if all the questions are answered before it hits zero
function countdown() {
    timeLeft = 60;

    var timer = setInterval(function () {
        var timerEl = document.querySelector("#timer");
       
        timerEl.textContent = "Timer: " + timeLeft;
        
        timeLeft--;
        if(timeLeft < 0) {
            clearInterval(timer);
            document.querySelector("h1").textContent = "Time is Up!"
            
            endTheGame();
        }
        else if(numQuestionsAnswered == 4) {
            clearInterval(timer);
        }
    }, 1000);
}

//selects the next question from the questionObject and returns the question text 
function pickQuestion() {
    currentQuestionObject = questionObject[questionNumber];
    console.log(currentQuestionObject);
    console.log(currentQuestionObject[0])
    


    currentKey = Object.keys(questionObject)[questionNumber];
    console.log("question # (starting from 0): " + currentKey)
    questionTextKey = Object.keys(questionObject[currentKey]);
    console.log("question text: " + questionTextKey);
    console.log("hi " + currentQuestionObject[questionTextKey]);
    return questionTextKey;
}

//this function is responsible for updating the page to show the next question and update the buttons with the correct answer choices
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

//this function checks to see if the answer the user selected is correct. Whether correct or incorrect text is shown on the screen showing the
//user if they were right or not. If they are wrong 10 seconds get deducted from the clock 
function checkAnswer(choice, correctOrNot) {
    var choiceText = choice.textContent;
    
    var stripText = choiceText.substring(3);
    switch (currentKey) {
        case "0":
            if(stripText == correctAnswers[0]) {
                correctCount++;
                
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

//if the game has ended due to clock running out or user answering all questions then the app transitions to the user submiting initials and then 
//goes to the high score screen 
function endTheGame() {
    setTimeout(function () {
        questionH2.textContent = "Quiz Over!"

        //remove buttom elements and <p> for showing correct/incorrect
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

        //when the user clicks the submit button remove the uneeded HTML elements, create new ones, and update the high scores array from 
        //local storage 
        document.addEventListener("click", function (event) {
            var initials;
            event.preventDefault();
            if(event.target.id == "submit") {
                console.log("Submitting Initials")
                initials =  formInput.value;
                console.log(initials);

                
                var latestScore = (initials + " - " + correctCount)
                
                
                var highScoresLocal = JSON.parse(localStorage.getItem("highScores"));
                console.log(highScoresLocal);

                if(highScoresLocal == null) {
                    highScores = [];
                    highScores.push(latestScore);
                }
                else {
                    highScores = highScoresLocal;
                    highScores.push(latestScore);
                }
                localStorage.setItem("highScores", JSON.stringify(highScores));
                console.log("high scores array: " + highScores);

               
                
                questionH2.textContent = "High Scores";
                
                score.remove();
                formLabel.remove();
                formInput.remove();
                submitBtn.remove();
                myForm.remove();

                var highScoreList = document.createElement("ul");
                highScoreList.setAttribute("id", "high-score-list");
            

                var goBackBtn = document.createElement("button");
                goBackBtn.setAttribute("id", "go-back");

                var clearScoresBtn = document.createElement("button");
                clearScoresBtn.setAttribute("id", "clear");
                
            

                goBackBtn.textContent = "Go Back";
                clearScoresBtn.textContent = "Clear High Scores";


                document.querySelector("#content").append(highScoreList);
               
                for(var i = 0; i < highScores.length; i++) {
                    var newListItem = document.createElement("li");
                    newListItem.textContent = highScores[i];
                    document.querySelector("#high-score-list").append(newListItem);
                }

                document.querySelector("#content").append(goBackBtn);
                document.querySelector("#content").append(clearScoresBtn);


                //delete the local storage if user selects this option
                document.addEventListener("click", function(event) {
                    if(event.target.id == "clear") {
                        console.log("Clearing high scores");
                        highScoreList.remove();
                       
                        highScores = [];
                        localStorage.setItem("highScores", JSON.stringify(highScores));
                    }
                })

                //refresh the screen to go back to the original start page 
                document.addEventListener("click", function (event) {
                    if(event.target.id == "go-back") {
                        this.location.reload();
                    }
                })
            }
        })
    }, 2000);
}

//this function changes from the start page to the showing the questions and their answers on the buttons. 
function changeToQuestions() {
    questionH2 = document.querySelector("h2")
    questionH2.setAttribute("id", "question");
  

    var instructPtag = document.querySelector("#instructions");
    instructPtag.remove();

    myPtag = document.createElement("p");
    myPtag.setAttribute("id", "grade");
    myPtag.textContent = "";
    
    


    document.querySelector("#start-quiz").remove();
    
    buttonA = document.createElement("button")
    buttonA.setAttribute("id", "a")
    
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

    //adding event listeners to the answer choices. Some code we only want to execute while the user has not run out of questions to answer 
    document.addEventListener("click", function(event) {
        if(event.target.id == "a" || event.target.id == "b" || event.target.id == "c" || event.target.id == "d" 
        && numQuestionsAnswered < Object.keys(questionObject).length) {
           
            console.log("a,b,c,d got clicked")
            
            chosenAnswer = event.target;
            
            checkAnswer(event.target, myPtag);
            numQuestionsAnswered++;

            //determine whether or not to show more questions of end the game 
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
