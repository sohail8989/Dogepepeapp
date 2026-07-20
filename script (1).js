// Initialize Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
}

// App State
let score = 1486910;
let energy = 1000;
let maxEnergy = 1000;
const tapPower = 10;

// DOM Elements
const scoreEl = document.getElementById('score');
const energyEl = document.getElementById('energy');
const tapBtn = document.getElementById('tap-btn');

// Format Numbers with Commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Tap Event
tapBtn.addEventListener('click', (e) => {
  if (energy >= tapPower) {
    score += tapPower;
    energy -= tapPower;
    
    scoreEl.innerText = formatNumber(score);
    energyEl.innerText = energy;

    // Floating +10 Text Effect
    showTapFloatingText(e);
  }
});

// Floating Text Animation
function showTapFloatingText(e) {
  const rect = tapBtn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const floatText = document.createElement('div');
  floatText.innerText = `+${tapPower}`;
  floatText.style.position = 'absolute';
  floatText.style.left = `${x + rect.left}px`;
  floatText.style.top = `${y + rect.top - 20}px`;
  floatText.style.color = '#2bb473';
  floatText.style.fontWeight = 'bold';
  floatText.style.fontSize = '20px';
  floatText.style.pointerEvents = 'none';
  floatText.style.transition = 'all 0.6s ease-out';

  document.body.appendChild(floatText);

  setTimeout(() => {
    floatText.style.transform = 'translateY(-40px)';
    floatText.style.opacity = '0';
  }, 20);

  setTimeout(() => {
    floatText.remove();
  }, 600);
}

// Energy Regeneration Interval
setInterval(() => {
  if (energy < maxEnergy) {
    energy = Math.min(maxEnergy, energy + 1);
    energyEl.innerText = energy;
  }
}, 1000);

// Boost Button
function boostEnergy() {
  energy = maxEnergy;
  energyEl.innerText = energy;
  alert('⚡ Energy Fully Restored!');
}

// Tab Switching Navigation Logic
function switchTab(tabName, element) {
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.remove('active');
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  document.getElementById(`view-${tabName}`).classList.add('active');
  element.classList.add('active');
}

// 100% WORKING REFERRAL LINK (Uses @Dogepepeofficialcoinbot)
function inviteFriend() {
  const userId = tg?.initDataUnsafe?.user?.id || "7824642832";
  
  // Exact Bot Handle & Deep Link Parameter
  const refLink = `https://t.me/Dogepepeofficialcoinbot?start=ref_${userId}`;
  const shareText = "🐸 Join Dogepepe Tap App and get 1,000,000 Coins ($233 USD) free!";

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareText)}`;
  
  if (tg) {
    tg.openTelegramLink(telegramShareUrl);
  } else {
    window.open(telegramShareUrl, '_blank');
  }
}

// Earn Task Logic
function doTask(button, reward) {
  score += reward;
  scoreEl.innerText = formatNumber(score);
  button.innerText = "Completed ✅";
  button.disabled = true;
  button.style.background = "#2bb473";
}
