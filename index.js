const themeBtn = document.getElementById("themeBtn");
const quoteBtn = document.getElementById("quoteBtn");
const quote = document.getElementById("quote");
const nameBtn = document.getElementById("nameBtn");
const title = document.getElementById("title");
const quotes = [
  "💨",
  " 💪",
  "🧃",
  " 🔥",
  "test2",
  "test1"
];

let darkMode = false;

// Tukar Tema
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkMode = !darkMode;
  themeBtn.textContent = darkMode ? "Tukar Tema 🌞" : "Tukar Tema 🌗";
});

// Tukar Mood / Mesej
quoteBtn.addEventListener("click", () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quote.textContent = randomQuote;
  quote.style.opacity = 0;
  setTimeout(() => {
    quote.style.opacity = 1;
  }, 200);
});

nameBtn.addEventListener("click", () => {
 const newName = prompt("Masukkan name: ");
 if (newName && newName.trim() !== ""){
    title.textContent = "Hai " + newName.trim()+" 👋";
 }
 else
 alert("MANA BOLEH KOSONG!!");
});
