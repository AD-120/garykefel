let num1, num2, userAnswer, score, startTime, gameOverFlag;
let input, button, message, newGameButton;
let bestScore = localStorage.getItem('bestScore') || 0; // Initialize best score from localStorage
let gameCount = localStorage.getItem('gameCount') || 0; // Initialize game count from localStorage

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
  startTime = millis();
  gameOverFlag = false;
  generateQuestion();

  input = createInput();
  input.position(width / 2 - 90, 80); // Centering the input box


  button = createButton("שאל את גארי");
  button.position(width / 2 - 40, 120);
  button.mousePressed(checkAnswer);
  button.style("text-align", "center"); // Aligning text inside the button to center

  message = createElement("h2", "");
  message.position(width / 2 - 90, 30); // Set the position of the message element
  message.style("text-align", "center"); // Aligning text in the message to center

  newGameButton = createButton("משחק חדש");
  newGameButton.position(width / 2 - 50, 250);
  newGameButton.hide();
  newGameButton.mousePressed(newGame);
  newGameButton.style("text-align", "center"); // Aligning text inside the button to center
}

function draw() {
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);

  if (!gameOverFlag) {
    rectMode(CENTER);
    rect(width / 2, height / 2 - 80, 180, 100);
    text(`${num1} * ${num2} = ?`, width / 2, height / 2 - 80);
  }

  textSize(24);
  text(`ניקוד: ${score}`, width / 2, height / 2 + 50);
  text(`התוצאה הכי טובה: ${bestScore}`, width / 6, height - 100); // Display best score
  text(`מספר המשחקים ששיחקת: ${gameCount}`, width / 6, height - 130); // Display game count

  // Check if game time exceeds 90 seconds
  if (!gameOverFlag && millis() - startTime > 90000) {
    gameOver();
  }
}

function generateQuestion() {
  num1 = int(random(2, 11));
  num2 = int(random(2, 11));
}

function checkAnswer() {
  textAlign(CENTER, CENTER);
  userAnswer = int(input.value());
  if (userAnswer === num1 * num2) {
    message.html("הצלחת יא גארי! מלך");
    setTimeout(() => {
      message.html('');
      generateQuestion();
    }, 1000);
  } else {
    let correctAnswer = num1 * num2;
    message.html(`טעית! גארי יתפוס אותך <br> התשובה היא ${correctAnswer}`);
    setTimeout(() => {
      message.html("");
      generateQuestion();
    }, 2000); // Wait 2 seconds before clearing the error message
  }
  input.value("");
}

function gameOver() {
  textAlign(CENTER, CENTER);
  noLoop(); // Stop the game
  gameOverFlag = true;
  textSize(48);
  text("המשחק נגמר!", width / 2, height / 2);
  message.html(`הניקוד שלך: ${score}`);

  // Update and save best score if current score is higher
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
  }
  
  // Increment game count and save to localStorage
  gameCount++;
  localStorage.setItem('gameCount', gameCount);

  input.hide();
  button.hide();
  newGameButton.show();
}

function newGame() {
  score = 0;
  startTime = millis();
  gameOverFlag = false;
  generateQuestion();
  loop(); // Restart the game
  input.show();
  button.show();
  newGameButton.hide();
}

function keyPressed() {
  if (keyCode === ENTER) {
    checkAnswer();
  }
}
