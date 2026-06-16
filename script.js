/* =========================
   CONFIG
========================= */

const SYMBOLS = ["seven", "cherry", "dollar"];
const PAYOUTS = {
  seven: 50,
  cherry: 20,
  dollar: 100,
};
const SPIN_COST = 2;

/* =========================
   STATE
========================= */

let coins = 100;

/* =========================
   DOM REFERENCES
========================= */

const coinDisplay = document.getElementById("coin-count");
const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const message = document.getElementById("message");
const machineFrame = document.querySelector(".machine-frame");
const spinButton = document.getElementById("spin-btn");

/* =========================
   HELPERS
========================= */

function getRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function renderSymbol(element, symbol) {
  element.className = `symbol ${symbol}`;
}

function updateCoins() {
  coinDisplay.textContent = coins;
}

/* =========================
   REEL ANIMATION
========================= */

function spinReel(reelElement, maxSpins) {
  let spins = 0;

  function animate() {
    renderSymbol(reelElement, getRandomSymbol());
    spins++;
    if (spins >= maxSpins) return;
    setTimeout(animate, 50 + spins * 5);
  }

  animate();
}

/* =========================
   WIN LOGIC
========================= */

function checkWin() {
  const first = slot1.classList[1];
  const second = slot2.classList[1];
  const third = slot3.classList[1];

  if (first === second && second === third) {
    const payout = PAYOUTS[first] ?? 0;
    coins += payout;
    updateCoins();
    showJackpot(payout);
  } else {
    message.textContent = "Try Again!";
  }
}

function showJackpot(payout) {
  message.textContent = `JACKPOT! +${payout} coins`;
  message.classList.add("message-jackpot");

  setTimeout(() => {
    message.classList.remove("message-jackpot");
  }, 2000);
}

/* =========================
   SPIN
========================= */

function spin() {
  message.classList.remove("message-jackpot");

  if (coins < SPIN_COST) {
    message.textContent = "Not enough coins!";
    return;
  }

  coins -= SPIN_COST;
  updateCoins();
  message.textContent = "Spinning...";
  spinButton.disabled = true;

  spinReel(slot1, 12);
  spinReel(slot2, 18);
  spinReel(slot3, 24);

  setTimeout(() => {
    checkWin();
    spinButton.disabled = false;
  }, 3000);
}

/* =========================
   INIT
========================= */

updateCoins();
spinButton.addEventListener("click", spin);
