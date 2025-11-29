const TOTAL_IMAGES = 100;
let current = 1;
let score = 0;
let selected = false;
let hearts = 2;

// عناصر DOM
const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const nextBtn = document.getElementById('nextBtn');
const heart1 = document.getElementById('heart1');
const heart2 = document.getElementById('heart2');
const soundCorrect = document.getElementById('sound-correct');
const soundWrong = document.getElementById('sound-wrong');
const highScoreDisplay = document.getElementById('highScoreDisplay');

// بارگذاری و نمایش High Score در صفحه Start
function updateHighScoreDisplay() {
  const highScore = localStorage.getItem('highScore') || 0;
  highScoreDisplay.textContent = `High Score: ${highScore}`;
}
updateHighScoreDisplay();

// شروع بازی
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'flex';
  resetGame();
});

function setImage(imgElement, fileNumber) {
  imgElement.src = `images/${fileNumber}.png`;
  imgElement.dataset.correct = (fileNumber % 2 === 0) ? "true" : "false";
}

function showPair() {
  if (current > TOTAL_IMAGES) {
    feedback.textContent = "🎉 Finished!";
    img1.style.display = img2.style.display = "none";
    nextBtn.style.display = "none";
    saveHighScore();
    return;
  }
  img1.classList.remove("correct-click","wrong-click");
  img2.classList.remove("correct-click","wrong-click");
  let pair = [current, current+1];
  if (Math.random()<0.5) pair.reverse();
  setImage(img1,pair[0]);
  setImage(img2,pair[1]);
  feedback.textContent="";
  selected=false;
}

function select(choice) {
  if(selected) return;
  selected=true;
  const isCorrect = choice.dataset.correct==="true";
  if(isCorrect){
    feedback.textContent="✔️";
    soundCorrect.currentTime=0;
    soundCorrect.play();
    score++;
    scoreDisplay.textContent=`Score: ${score}`;
    choice.classList.add("correct-click");
  }else{
    feedback.textContent="❌";
    soundWrong.currentTime=0;
    soundWrong.play();
    choice.classList.add("wrong-click");
    hearts--;
    if(hearts===1) heart2.textContent='🤍';
    if(hearts===0){
      heart1.textContent='🤍';
      setTimeout(playerLost,1000);
    }
  }
}

nextBtn.addEventListener('click', ()=>{
  if(!selected) return;
  current+=2;
  showPair();
});

img1.addEventListener('click',()=>select(img1));
img2.addEventListener('click',()=>select(img2));

function saveHighScore(){
  const highScore = localStorage.getItem('highScore') || 0;
  if(score>highScore){
    localStorage.setItem('highScore',score);
  }
}

function playerLost(){
  saveHighScore();
  updateHighScoreDisplay();
  gameScreen.style.display='none';
  startScreen.style.display='flex';
}

function resetGame(){
  current=1;
  score=0;
  hearts=2;
  scoreDisplay.textContent=`Score: ${score}`;
  heart1.textContent='❤️';
  heart2.textContent='❤️';
  feedback.textContent='';
  img1.style.display=img2.style.display='inline';
  nextBtn.style.display='inline';
  showPair();
}
