/*Section for Questions -> need to write questions and answers*/
var questions = [
    {
      question: 'Which one of these examples create a new variable:',
      answers: ['var variableName', 'new variableName', 'set variableName', 'create variableName'],
      correctAnswer: 'var variableName',
    },
    {
      question: 'Which function is written correctly:',
      answers: ['runFunction startQuiz {}', 'function startQuiz() {}', 'function startQuiz {}', 'startQuiz function() {}'],
      correctAnswer: 'function startQuiz() {}',
    },
    {
      question: 'What does "console.log()" do in JavaScript',
      answers: ['Displays as a notification', 'Loops through an array', 'Finds element by ID', 'Prints the output into the console'],
      correctAnswer: 'Prints the output into the console',
    },
    {
      question: 'How do you find an element by Id in JavaScript',
      answers: ['searchElementId()', 'sourceElementById()', 'getElementById()', 'findElementById()'],
      correctAnswer: 'getElementById()',
    },
    {
      question: 'Which one of these will loop through an array in JavaScript',
      answers: ['for () {}', 'run () {}', 'if () {}', 'else () {}'],
      correctAnswer: 'for () {}',
    },
  ];

/*Section for Timer*/
var time = 75;
var theClock;
var timeCount = document.getElementById('time');

function timer() {
    time--;
    timeCount.textContent = time;

    if (time <= 0) {
        endQuiz();
    }
}

/* getElementById('time'), subtract time length by 15 on wrong question, end game at 0*/
var questionIndex = 0
var startEl = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var questionEl = document.getElementById('new-question');
var answersEl = document.getElementById('answers');
console.log('Script loaded');

/* Start button / Quiz Starts / Timer starts count down / Question shown*/
document.getElementById('start-btn').addEventListener("click", startQuiz);
function startQuiz() {
  startEl.setAttribute('class', 'hidden');
  questionsEl.removeAttribute('class', 'hidden');

  theClock = setInterval(timer, 1000);

  timeCount.textContent = time;

    console.log('Quiz');
  runQuestion();
}

/* Answered question, next question shown, time either counts down and/or subtracts if wrong answer */
// bring up new question
function runQuestion() {
var newQuestion = questions[questionIndex];
questionEl.textContent = newQuestion.question;
console.log('loaded question');

answersEl.textContent = "";

for (var i = 0; i < newQuestion.answers.length; i++) {
    var answer = newQuestion.answers[i];
    var answerBtn = document.createElement('button');
    answerBtn.setAttribute('value', answer);
    answerBtn.setAttribute('class', 'answerStyle');
    answerBtn.textContent = answer;

    answersEl.appendChild(answerBtn);
  }
}

//run function for answer if right/wrong etc and impacts time
answersEl.addEventListener("click", runAnswer);
function runAnswer(event) {
console.log('answered');
var myAnswer = event.target;


if (myAnswer.value !== questions[questionIndex].correctAnswer) {
    time -= 15;

    // for later, when timer = 0, final score wont be negative and game will end when it's at 0, especially if last question is wrong
      if (time < 0) {
          time = 0;
    }
    console.log('wrong answer');
}

// will need to add in timer
if (!myAnswer.matches('.answerStyle')) {
    console.log('no answer');
 return;

} else {
  console.log('CORREEECCTT!!!');
}

questionIndex++;

if (time <= 0 || questionIndex === questions.length) {
    endQuiz();
} else {
    runQuestion();
}
console.log('testtest');
} 

/*End Quiz if time runs out/answers all questions -> prompt screen*/

function endQuiz() {
  clearInterval(theClock);
}
/* Save your high score and go to page or go back to main page, already have buttons*/

function saveNewScore() {

}


/*Section for Highscores page, store highscores and clear scores*/
