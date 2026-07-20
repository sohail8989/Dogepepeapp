// Telegram WebApp Expand
if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.expand();
}

let score = 0;
const scoreDisplay = document.getElementById('score');
const tapBtn = document.getElementById('tap-btn');

tapBtn.addEventListener('click', () => {
    score++;
    scoreDisplay.innerText = score;
});
