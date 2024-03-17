// Setting up questions + answers
const questions = [
  {
      question: 'How do you create a new variable in JavaScript?',
      answers: [
          { text: 'var newVariable;', correct: true },
          { text: 'create.variable.newVariable;', correct: false },
          { text: 'new = variable;', correct: false },
          { text: 'newVariable.create;', correct: false }
      ]
  },
  {
      question: 'Inside which HTML element do you link the JavaScript?',
      answers: [
          { text: '<script>', correct: true },
          { text: '<javascript>', correct: false },
          { text: '<js>', correct: false },
          { text: '<scripting>', correct: false }
      ]
  },
  {
      question: 'Which is correct way to log "Hello" in JavaScript?',
      answers: [
          { text: 'print("Hello World")', correct: false },
          { text: 'say("Hello World")', correct: false },
          { text: 'console.log("Hello World")', correct: true },
          { text: 'log.text("Hello World")', correct: false }
      ]
  },
  {
      question: 'How do you create a function in JavaScript?',
      answers: [
          { text: 'function = aFunction()', correct: false },
          { text: 'function aFunction()', correct: true },
          { text: 'function: aFunction()', correct: false },
          { text: 'create aFunction()', correct: false }
      ]
  },
  {
      question: 'How to write an IF statement in JavaScript?',
      answers: [
          { text: 'if i == 5 then', correct: false },
          { text: 'if i = 5', correct: false },
          { text: 'if (i == 5)', correct: true },
          { text: 'if i = 5 then', correct: false }
      ]
  }
];

let currentQuestionIndex = 0;
// Determining time is questions length x 15
let timeLeft = questions.length * 15; 
let timerInterval;

// Function to start the quiz.
function startQuiz() {
  // Hides the intro on the main page so questions can be shown
  document.getElementById('intro').classList.add('hidden');
  // Shows question when quiz starts
  showQuestion();
  // Reset time left each time quiz is started
  timeLeft = questions.length * 15; 
  document.getElementById('remainingTime').textContent = timeLeft;

  // Setting up timer 
  timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById('remainingTime').textContent = timeLeft;
      //When time left is less than or equal to 0 it will stop timer and go to showCompletion function
      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          showCompletion();
      }
  }, 1000);
}

// Function for showing the questions
function showQuestion() {
  // Removes hidden so quiz can be displayed
  document.getElementById('quiz').classList.remove('hidden');
  let quizQuestion = questions[currentQuestionIndex];
  let choicesEl = document.getElementById('choices');
  document.getElementById('questionTitle').textContent = quizQuestion.question;
  //Clear previous choices
  choicesEl.innerHTML = ''; 

  quizQuestion.answers.forEach(function(choice, index) {
      let button = document.createElement('button');
      button.textContent = choice.text;
      button.addEventListener('click', function() { selectAnswer(index); });
      choicesEl.appendChild(button);
  });
}


// Function to process the selected answer.
function selectAnswer(index) {
  let quizQuestion = questions[currentQuestionIndex];
  
  // Deduct time for an incorrect answer, ensuring the score does not go negative.
  if (!quizQuestion.answers[index].correct) {
      // Math.max ensure's that if the time left is below 0, it will become zero.
      timeLeft -= 15;
      timeLeft = Math.max(0, timeLeft); 
      document.getElementById('remainingTime').textContent = timeLeft;
  }

  // Will continue to next question
  if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
  } else {
      // Stops quiz and stops timer
      clearInterval(timerInterval); 
      showCompletion();
  }
}

// Function to display the quiz completion screen.
function showCompletion() {
  clearInterval(timerInterval);
  timeLeft = Math.max(0, timeLeft);
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('quizCompletion').classList.remove('hidden');
  document.getElementById('finalScore').textContent = timeLeft;
}

// Event listener for start
document.getElementById('beginQuiz').addEventListener('click', startQuiz);
// Event listener for submitting score
document.getElementById('scoreSubmit').addEventListener('click', function() {
  let initials = document.getElementById('userInitials').value.toUpperCase();
  if (initials) {
      let highscores = JSON.parse(localStorage.getItem('highscores') || '[]');
      let newScore = { score: timeLeft, initials };
      highscores.push(newScore);
      localStorage.setItem('highscores', JSON.stringify(highscores));
      window.location.href = 'highscores.html';
  }
});
