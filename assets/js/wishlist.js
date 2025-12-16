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

let selectedDeleteId = null;
let wishlistContainer = null;

document.addEventListener("DOMContentLoaded", () => {
  wishlistContainer = document.getElementById("wishlist-data-container");

  const modal = document.getElementById("deleteModal");
  const cancelBtn = document.getElementById("cancelDelete");
  const confirmBtn = document.getElementById("confirmDelete");

  cancelBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    selectedDeleteId = null;
  });

  confirmBtn.addEventListener("click", () => {
    DUMMY_DATA = DUMMY_DATA.filter((item) => item.id !== selectedDeleteId);
    modal.classList.remove("show");
    fetchWishlist();
  });

  fetchWishlist();
});

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
        <div class="card food-card h-100 shadow-sm wishlist-card"
        data-id="${item.id}">

          <img src="${item.foto}" class="food-img" alt="${item.nama}">

          <div class="card-body">
            <h5 class="card-title">${item.nama}</h5>
            <p class="card-text text-muted">${item.deskripsi}</p>

            <button class="btn-hapus remove-btn mt-3 w-100" data-id="${item.id}">
              <i class="bi bi-trash"></i> Hapus
            </button>
          </div>
        </div>
      </div>`;
  });

  wishlistContainer.addEventListener("mousedown", (e) => {
    // klik tombol hapus
    const deleteBtn = e.target.closest(".remove-btn");
    if (deleteBtn) {
      e.stopPropagation();
      selectedDeleteId = parseInt(deleteBtn.dataset.id);
      document.getElementById("deleteModal").classList.add("show");
      return;
    }

    // klik card ke detail
    const card = e.target.closest(".wishlist-card");
    if (card) {
      const id = card.dataset.id;
      window.location.href = `detail-makanan.html?id=${id}`;
    }
  });
}
