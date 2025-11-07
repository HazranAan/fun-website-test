const themeBtn = document.getElementById("themeBtn");
const quoteBtn = document.getElementById("quoteBtn");
const quote = document.getElementById("quote");
const nameBtn = document.getElementById("nameBtn");
const title = document.getElementById("title");
const loadDataBtn = document.getElementById("loadDataBtn");
const dataContainer = document.getElementById("dataContainer");
const form = document.getElementById("phoneForm");
const result = document.getElementById("result");
const quotes = [
  "💨",
  " 💪",
  "🧃",
  " 🔥",
  "JS IS FUN",
  "HI!"
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
})

loadDataBtn.addEventListener("click", async () => {
  dataContainer.innerHTML = "<p>Loading data...</p>";

  try {
    const response = await fetch("https://api.restful-api.dev/objects");
    const data = await response.json();

    // kosongkan container dulu
    dataContainer.innerHTML = "";

    // ulang setiap item dalam data
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      let detailsHTML = "";

      // kalau item.data ada, papar semua key dan value
      if (item.data) {
        for (let key in item.data) {
          detailsHTML += `<li><strong>${key}:</strong> ${item.data[key]}</li>`;
        }
      } else {
        detailsHTML = "<li><em>No extra data</em></li>";
      }

      // buat card untuk setiap item
      const cardHTML = `
        <div class="card">
          <h3>${item.name}</h3>
          <ul>${detailsHTML}</ul>
        </div>
      `;

      // tambah ke dalam container
      dataContainer.innerHTML += cardHTML;
    }
  } catch (error) {
    dataContainer.innerHTML = "<p style='color:red;'>Gagal ambil data!</p>";
    console.error(error);
  }

  
});form.addEventListener("submit", async (e) => {
  e.preventDefault(); // elak reload page

  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;

  // data nak dihantar ke API
  const newData = {
    name: name,
    data: {
      brand: brand,
      price: price
    }
  };

  try {
    const response = await fetch("https://api.restful-api.dev/objects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
    });

    const resultData = await response.json();
    result.innerHTML = `<b>Berjaya!</b> Data baru disimpan dengan ID: ${resultData.id}`;
    result.style.color = "green";

    // kosongkan input selepas submit
    form.reset();

  } catch (error) {
    result.innerHTML = "❌ Gagal hantar data!";
    result.style.color = "red";
    console.error(error);
  }
});