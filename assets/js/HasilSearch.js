// Ambil parameter search
const params = new URLSearchParams(window.location.search);
const keyword = params.get("q");

// Elemen DOM
const foodList = document.getElementById("food-list");
const searchTitle = document.getElementById("search-title");

// DATA MAKANAN
const foods = [
  {
    name: "Gado-gado",
    image: "./assets/img/Gadogado.jpg",
    desc: "Salad khas Indonesia dengan saus kacang"
  },
  {
    name: "Rendang",
    image: "./assets/img/Rendang.jpg",
    desc: "Masakan Minangkabau berbahan daging sapi"
  },
  {
    name: "Tongseng",
    image: "./assets/img/Tongseng.jpg",
    desc: "Masakan berkuah khas Jawa Tengah"
  },
  {
    name: "Nasi Uduk",
    image: "./assets/img/NasiUduk.jpg",
    desc: "Nasi santan dengan lauk pauk"
  },
  {
    name: "Ayam Betutu",
    image: "./assets/img/AyamBetutu.jpg",
    desc: "Masakan khas Bali berbumbu rempah"
  },
  {
    name: "Ayam Geprek",
    image: "./assets/img/AyamGeprek.jpg",
    desc: "Ayam goreng geprek sambal pedas"
  }
];

// 🚫 BELUM SEARCH
if (!keyword || keyword.trim() === "") {
  searchTitle.innerText = "Silakan masukkan kata kunci pencarian.";
  foodList.innerHTML = "";
} 
// ✅ SUDAH SEARCH
else {
  const keywordLower = keyword.toLowerCase();
  searchTitle.innerText = `Hasil pencarian untuk: "${keyword}"`;

  const results = foods.filter(food =>
    food.name.toLowerCase().includes(keywordLower)
  );

  foodList.innerHTML = results.map(food => `
  <div class="col-6 col-md-4 col-lg-4 col-xl-3">
    <div class="card">

      <!-- Gambar -->
      <a href="detail-makanan.html">
        <img src="${food.image}"
             class="card-img-top"
             alt="${food.name}">
      </a>

      <div class="card-body">

        <div class="d-flex justify-content-between align-items-start">
          <a href="detail-makanan.html"
             class="text-decoration-none text-dark">
            <h5 class="card-title">${food.name}</h5>
          </a>

          <!-- Bookmark -->
          <svg xmlns="http://www.w3.org/2000/svg"
               width="18"
               height="18"
               fill="currentColor"
               class="bi bi-bookmark-heart bookmark-icon"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
          </svg>
        </div>

        <p class="card-text text-truncate-multiline">
          ${food.desc}
        </p>

        <div class="d-flex justify-content-between align-items-center mt-1">

          <!-- Like -->
          <button type="button"
            class="btn btn-like p-0 border-0 bg-transparent d-inline-flex align-items-center gap-1"
            data-liked="false">
            <i class="bi bi-heart"></i>
            <span class="like-count">0</span>
          </button>

          <!-- Comment -->
          <div class="btn-comment d-inline-flex align-items-center gap-1 text-muted">
            <i class="bi bi-chat-dots"></i>
            <span class="comment-count">0</span>
          </div>

        </div>
      </div>
    </div>
  </div>
`).join("");

if (results.length === 0) {
  foodList.innerHTML = `
    <p class="text-muted">
      Tidak ditemukan makanan dengan kata kunci "${keyword}"
    </p>
  `;
}

}
