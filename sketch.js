let num1, num2, userAnswer, score, startTime, gameOverFlag;
let input, button, message, newGameButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
  startTime = millis();
  gameOverFlag = false;
  generateQuestion();

  input = createInput();
  input.position(150, 80);

  button = createButton("שאל את גארי");
  button.position(150, 120);
  button.mousePressed(checkAnswer);

  message = createElement("h2", "");
  message.position(150, 150);

  newGameButton = createButton("משחק חדש");
  newGameButton.position(150, 200);
  newGameButton.hide();
  newGameButton.mousePressed(newGame);
}

function draw() {
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`${num1} * ${num2} = ?`, width / 2, height / 2 - 50);
  textSize(24);
  text(`ניקוד: ${score}`, width / 2, height / 2 + 50);

  // // הדפסת הזמן החולף ב-console
  // console.log(`זמן המשחק החולף: ${(millis() - startTime) / 1000} שניות`);

  // בדיקה אם זמן המשחק עבר את 90 שניות
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
    message.html("הצלחת יא גארי מלך!");
    score++;
   setTimeout(() => {
      message.html('');
      generateQuestion();
    }, 1000);
  } else {
    let correctAnswer = num1 * num2;
    message.html(`טעית! גארי יתפוס אותך \n${correctAnswer}`);
    score--;
    setTimeout(() => {
      message.html("");
      generateQuestion();
    }, 2000); // מחכה 2.5 שניות לפני שהודעת השגיאה נמחקת
  }
  input.value("");
}

function gameOver() {
  textAlign(CENTER, CENTER);
  noLoop(); // עצירת המשחק
  gameOverFlag = true;
  textSize(48);
  text("המשחק נגמר!", width / 2, height / 2);
  message.html(`הניקוד שלך: ${score}`);
  newGameButton.show();
}

function newGame() {
  score = 0;
  startTime = millis();
  gameOverFlag = false;
  generateQuestion();
  loop(); // התחלת המשחק מחדש
  newGameButton.hide();
}

function keyPressed() {
  if (keyCode === ENTER) {
    checkAnswer();
  }
}
