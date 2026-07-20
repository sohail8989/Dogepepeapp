// Init Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.ready();
}

// Global App States
let score = 1486910;
let energy = 1000;
let maxEnergy = 1000;
let tapPower = 10;
let profitPerHour = 1000000;
let walletConnected = false;

// DOM Elements
const scoreEl = document.getElementById('score');
const energyEl = document.getElementById('energy');
const tapBtn = document.getElementById('tap-btn');
const pphEl = document.getElementById('pph-val');

// Helper: Format numbers with commas
function formatNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Tab Switching Navigation Logic (Guaranteed Fix)
function openTab(tabId, btn) {
  // Hide all tab views
  const views = document.querySelectorAll('.tab-view');
  views.forEach(v => v.classList.remove('active-view'));

  // Reset active buttons state
  const navBtns = document.querySelectorAll('.nav-item');
  navBtns.forEach(b => b.classList.remove('active-nav'));

  // Show target tab
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.classList.add('active-view');
  }

  // Highlight active button
  if (btn) {
    btn.classList.add('active-nav');
  }
}

// Coin Tap Mechanics
if (tapBtn) {
  tapBtn.addEventListener('click', (e) => {
    if (energy >= tapPower) {
      score += tapPower;
      energy -= tapPower;

      if (scoreEl) scoreEl.innerText = formatNum(score);
      if (energyEl) energyEl.innerText = energy;

      showTapEffect(e);

      if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
      }
    }
  });
}

// Floating +10 Text Animation
function showTapEffect(e) {
  const rect = tapBtn.getBoundingClientRect();
  const x = e.clientX ? (e.clientX - rect.left) : (rect.width / 2);
  const y = e.clientY ? (e.clientY - rect.top) : (rect.height / 2);

  const floatText = document.createElement('div');
  floatText.innerText = `+${tapPower}`;
  floatText.style.position = 'absolute';
  floatText.style.left = `${x + rect.left}px`;
  floatText.style.top = `${y + rect.top - 10}px`;
  floatText.style.color = '#2bb473';
  floatText.style.fontWeight = 'bold';
  floatText.style.fontSize = '22px';
  floatText.style.pointerEvents = 'none';
  floatText.style.transition = 'all 0.5s ease-out';
  floatText.style.zIndex = '99999';

  document.body.appendChild(floatText);

  setTimeout(() => {
    floatText.style.transform = 'translateY(-35px)';
    floatText.style.opacity = '0';
  }, 20);

  setTimeout(() => { floatText.remove(); }, 500);
}

// Automatic Energy Auto-refill
setInterval(() => {
  if (energy < maxEnergy) {
    energy = Math.min(maxEnergy, energy + 2);
    if (energyEl) energyEl.innerText = energy;
  }
}, 1000);

// Boost Energy
function boostEnergy() {
  energy = maxEnergy;
  if (energyEl) energyEl.innerText = energy;
  alert('⚡ Energy fully restored!');
}

// Invite Friend Referral Function (100% Correct Bot Direct URL)
function inviteFriend() {
  const userId = tg?.initDataUnsafe?.user?.id || "7824642832";
  
  // Direct Mini App URL pattern required by Telegram
  const refLink = `https://t.me/Dogepepeofficialcoinbot/app?startapp=ref_${userId}`;
  const shareMessage = "🐸 Join Dogepepe Tap App & get 1,000,000 Free Coins!";

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(shareMessage)}`;

  if (tg) {
    tg.openTelegramLink(telegramShareUrl);
  } else {
    window.open(telegramShareUrl, '_blank');
  }
}

// Mine Card Purchases
function buyUpgrade(cost, pphAdd, btn) {
  if (score >= cost) {
    score -= cost;
    profitPerHour += pphAdd;

    if (scoreEl) scoreEl.innerText = formatNum(score);
    if (pphEl) pphEl.innerText = `🪙 +${(profitPerHour / 1000000).toFixed(2)}M`;

    btn.innerText = "Purchased ✅";
    btn.disabled = true;
    btn.style.background = "#2bb473";
  } else {
    alert("❌ Not enough coins!");
  }
}

// Task Claim Function
function doTask(btn, reward, link) {
  if (link) {
    if (tg) tg.openLink(link);
    else window.open(link, '_blank');
  }

  setTimeout(() => {
    score += reward;
    if (scoreEl) scoreEl.innerText = formatNum(score);
    btn.innerText = "Claimed ✅";
    btn.disabled = true;
    btn.style.background = "#2bb473";
  }, 1000);
}

// Wallet Connect
function connectWallet() {
  const walletBtn = document.getElementById('wallet-btn');
  if (!walletConnected) {
    walletConnected = true;
    if (walletBtn) {
      walletBtn.innerText = "💎 Connected: EQD...3A9";
      walletBtn.style.background = "#2bb473";
    }
    alert("✅ TON Wallet connected!");
  } else {
    alert("Wallet is already connected.");
  }
}
// Updated Share Link Function
function shareInviteLink() {
  // Yahan exact username set kar diya hy
  const botUsername = "DogepepeBot"; 
  
  const userId = tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : "7824642832";
  
  const shareText = encodeURIComponent("🐸 Join Dogepepe Tap App and get 1,000,000 Coins ($233 USD) free!");
  const inviteUrl = `https://t.me/share/url?url=https://t.me/${botUsername}?start=ref_${userId}&text=${shareText}`;
  
  if (tg) {
    tg.openTelegramLink(inviteUrl);
  } else {
    window.open(inviteUrl, '_blank');
  }
}
