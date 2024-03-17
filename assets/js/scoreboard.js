const list = document.getElementById('highScoresList');

function displayHighScores() {
    // Gets highscores from localStorage or empty array if highscores is empty
    const scores = JSON.parse(localStorage.getItem('highscores') || '[]');
    // sets list empty before adding the ordered scores back in
    list.innerHTML = '';
    // Sorts the score from highest to lowest
    scores.sort((a, b) => b.score - a.score).forEach(score => {
        // creates list element for each score
        let item = document.createElement('li');
        // displays the intials: score
        item.textContent = `${score.initials}: ${score.score}`;
        list.appendChild(item);
    });
}

document.getElementById('resetScores').addEventListener('click', function() {
    localStorage.removeItem('highscores');
    // Displaying the reset scoreboard
    displayHighScores(); 
});

displayHighScores();
