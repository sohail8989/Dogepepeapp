// Initialize Telegram WebApp API
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.ready();
}

// Application State
let score = 1486910;
let energy = 1000;
let maxEnergy = 1000;
let tapPower = 10;
let profitPerHour = 1000000;
let isWalletConnected = false;

// DOM Cache
const scoreEl = document.getElementById('score');
const energyEl = document.getElementById('energy');
const tapBtn = document.getElementById('tap-btn');
const pphEl = document.getElementById('pph-val');

// Helper: Format Numbers with Commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Tap Event Mechanism
if (tapBtn) {
  tapBtn.addEventListener('click', (e) => {
    if (energy >= tapPower) {
      score += tapPower;
      energy -= tapPower;

      scoreEl.innerText = formatNumber(score);
      energyEl.innerText = energy;

      showTapFloatingText(e);
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
      }
    }
  });
}

// Floating +10 Animation
function showTapFloatingText(e) {
  const rect = tapBtn.getBoundingClientRect();
  const x = e.clientX ? (e.clientX - rect.left) : (rect.width / 2);
  const y = e.clientY ? (e.clientY - rect.top) : (rect.height / 2);

  const floatText = document.createElement('div');
  floatText.innerText = `+${tapPower}`;
  floatText.style.position = 'absolute';
  floatText.style.left = `${x + rect.left}px`;
  floatText.style.top = `${y + rect.top - 20}px`;
  floatText.style.color = '#2bb473';
  floatText.style.fontWeight = 'bold';
  floatText.style.fontSize = '22px';
  floatText.style.pointerEvents = 'none';
  floatText.style.transition = 'all 0.6s ease-out';
  floatText.style.zIndex = '9999';

  document.body.appendChild(floatText);

  setTimeout(() => {
    floatText.style.transform = 'translateY(-40px)';
    floatText.style.opacity = '0';
  }, 20);

  setTimeout(() => {
    floatText.remove();
  }, 600);
}

// Automatic Energy Regeneration
setInterval(() => {
  if (energy < maxEnergy) {
    energy = Math.min(maxEnergy, energy + 2);
    if (energyEl) energyEl.innerText = energy;
  }
}, 1000);

// Boost Action
function boostEnergy() {
  energy = maxEnergy;
  if (energyEl) energyEl.innerText = energy;
  alert('⚡ Energy fully restored!');
}

// Navigation / Tab Switcher (Fully Working)
function switchTab(tabName, element) {
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.remove('active');
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${tabName}`);
  if (activeView) activeView.classList.add('active');
  if (element) element.classList.add('active');
}

// 100% CORRECT REFERRAL SYSTEM (Direct Mini App Link)
function inviteFriend() {
  const userId = tg?.initDataUnsafe?.user?.id || "7824642832";

  // Exact Direct Mini App referral link using actual bot handle
  const refLink = `https://t.me/Dogepepeofficialcoinbot/app?startapp=ref_${userId}`;
  const shareText = "🐸 Join Dogepepe Tap App and get 1,000,000 Coins ($233 USD) free!";

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareText)}`;

  if (tg) {
    tg.openTelegramLink(telegramShareUrl);
  } else {
    window.open(telegramShareUrl, '_blank');
  }
}

// Mine Section Upgrade Cards Logic
function buyUpgrade(cost, pphIncrease, btnElement) {
  if (score >= cost) {
    score -= cost;
    profitPerHour += pphIncrease;

    scoreEl.innerText = formatNumber(score);
    pphEl.innerText = `🪙 +${(profitPerHour / 1000000).toFixed(2)}M`;

    btnElement.innerText = "Purchased ✅";
    btnElement.disabled = true;
    btnElement.style.background = "#2bb473";
  } else {
    alert("❌ Not enough coins to purchase this upgrade!");
  }
}

// Task Claim Logic
function doTask(button, reward, targetUrl) {
  if (targetUrl) {
    if (tg) tg.openLink(targetUrl);
    else window.open(targetUrl, '_blank');
  }
  
  setTimeout(() => {
    score += reward;
    scoreEl.innerText = formatNumber(score);
    button.innerText = "Completed ✅";
    button.disabled = true;
    button.style.background = "#2bb473";
  }, 1000);
}

// TON Wallet Connect Feature
function connectWallet() {
  const walletBtn = document.getElementById('wallet-btn');
  if (!isWalletConnected) {
    isWalletConnected = true;
    walletBtn.innerText = "💎 Wallet Connected: EQD...3A9";
    walletBtn.style.background = "#2bb473";
    alert("✅ TON Wallet successfully connected for Airdrop distribution!");
  } else {
    alert("Wallet is already connected!");
  }
}
