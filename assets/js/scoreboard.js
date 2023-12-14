function scoreboardPage() {
    var scoreboard = JSON.parse(window.localStorage.getItem('scores')) || [];
   scoreboard.sort(function (low, high) {
   return high.score - low.score;
   });

   for (var i = 0; i < scoreboard.length; i+= 1) {
    // how do I set a limit of 10 scores? If I get rid of scoreboard.length and replace with 10 it doesn't work
    var list = document.createElement('li');
    list.textContent = scoreboard[i].score + " - set by " + scoreboard[i].name;
    var listScores = document.getElementById('scoreboard');
    listScores.appendChild(list);
    }
}


function clearScores() {
  localStorage.removeItem('scores');
  location.reload();
}

document.getElementById('clear-btn').addEventListener("click", clearScores);
scoreboardPage();