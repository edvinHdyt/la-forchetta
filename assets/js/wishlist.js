let DUMMY_DATA = [
  {
    id: 1,
    nama: "Nasi Goreng Spesial",
    deskripsi: "Nasi goreng dengan bumbu rahasia dan topping melimpah.",
    foto: "./assets/img/Nasigoreng.jpg",
  },
  {
    id: 2,
    nama: "Sate Ayam Madura",
    deskripsi: "Daging ayam empuk dengan bumbu kacang kental khas Madura.",
    foto: "./assets/img/sateayam.jpg",
  },
];

const wishlistContainer = document.getElementById("wishlist-data-container");

function fetchWishlist() {
  wishlistContainer.innerHTML = `<p class="col-12 text-center fst-italic text-muted">Memuat Wishlist...</p>`;

  setTimeout(() => renderWishlist(DUMMY_DATA), 500);
}

function renderWishlist(items) {
  wishlistContainer.innerHTML = "";

  if (items.length === 0) {
    wishlistContainer.innerHTML = `<p class="col-12 text-center fst-italic text-muted">Wishlist kosong.</p>`;
    return;
  }

  items.forEach((item) => {
    wishlistContainer.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
      <a href="detail-makanan.html">
        <div class="card food-card h-100 shadow-sm">
          <img src="${item.foto}" class="food-img" alt="${item.nama}" />

          <div class="card-body">
            <h5 class="card-title">${item.nama}</h5>
            <p class="card-text text-muted">${item.deskripsi}</p>

            <button class="btn-hapus remove-btn mt-3 w-100" data-id="${item.id}">
              <i class="bi bi-trash"></i> Hapus
            </button>
          </div>
        </div>
        </a>
      </div>`;
  });

  attachDeleteListeners();
}

function attachDeleteListeners() {
  wishlistContainer.onclick = (e) => {
    let btn = e.target.closest(".remove-btn");
    if (!btn) return;

    let id = parseInt(btn.dataset.id);
    simulateDelete(id);
  };
}

function simulateDelete(id) {
  if (!confirm("Yakin hapus item ini?")) return;

  DUMMY_DATA = DUMMY_DATA.filter((item) => item.id !== id);
  fetchWishlist();
}

document.addEventListener("DOMContentLoaded", fetchWishlist);
