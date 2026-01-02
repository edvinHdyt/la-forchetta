"use strict";

/* ===== CONFIG & STORAGE ===== */

const USER_ID = 1;
const API_MAKANAN = "https://dummyjson.com/c/5953-8a63-40d9-8670";

function getAllWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function saveWishlist(data) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
}

/* ===== API DATA ===== */
async function getFoods() {
  try {
    const res = await fetch(API_MAKANAN);
    const data = await res.json();
    return data.products || data.makanan || data;
  } catch (error) {
    console.error("Gagal mengambil data API:", error);
    return [];
  }
}

/* ===== FUNGSI NOTIFIKASI CUSTOM (VERSI HIJAU) ===== */
function showNotification(message, type = "success") {
  const toastElement = document.getElementById("liveToast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toastElement || !toastMessage) return;

  // Set Warna (Success = Hijau bg-success, Danger = Merah bg-danger)
  toastElement.classList.remove("bg-success", "bg-danger");
  toastElement.classList.add(type === "success" ? "bg-success" : "bg-danger");

  // Set Pesan
  toastMessage.innerText = message;

  // Jalankan Toast Bootstrap
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

/* ===== 1. CREATE (Tambah ke Wishlist) ===== */
function addToWishlist(id_makanan) {
  if (userLogin == null){
    window.location.href="login-page.html";
  }


  let data = getAllWishlist();

  const exists = data.find(
    (w) => w.id_makanan == id_makanan && w.id_user == USER_ID
  );

  if (exists) {
    // showNotification("Makanan sudah ada di wishlist ❤️", "danger");
    idMakananYangAkanDihapus = id_makanan;
    confirmDelete();
    showNotification("Item berhasil dihapus!", "success");
    return;
  }

  data.push({
    id_user: USER_ID,
    id_makanan: id_makanan,
  });

  saveWishlist(data);
  showNotification("Berhasil masuk wishlist!", "success");

  if (document.getElementById("wishlist-data-container")) {
    renderWishlist();
  }
}

/* ===== 2. READ (Tampilkan Wishlist) ===== */
async function renderWishlist() {
  const container = document.getElementById("wishlist-data-container");
  if (!container) return;

  container.innerHTML = `<p class="col-12 text-center text-muted">Memuat Wishlist...</p>`;

  const wishlists = getAllWishlist().filter((w) => w.id_user == USER_ID);
  const foods = await getFoods();

  if (wishlists.length === 0) {
    container.innerHTML = `<p class="col-12 text-center text-muted fst-italic py-5">Wishlist masih kosong</p>`;
    return;
  }

  container.innerHTML = "";

  wishlists.forEach((w) => {
    const food = foods.find((f) => f.id_makanan == w.id_makanan);

    if (food) {
      // Tentukan lokasi folder tempat Anda menyimpan gambar tadi
      const pathFolder = "assets/img/";

      container.innerHTML += `
  <div class="col">
    <div class="card shadow-sm border-0">
      <a href="detail-makanan.html?id=${food.id_makanan}" class="card-clickable-link">
        
        <img src="${pathFolder}${food.foto_makanan}" class="card-img-top" alt="${food.nama_makanan}">
        
        <div class="card-body">
          <h5 class="card-title">${food.nama_makanan}</h5>
          <p class="card-text text-muted">${food.deskripsi_makanan}</p>
        </div>
      </a>
      
      <div class="btn-hapus-container" style="padding: 0 15px 15px 15px;">
        <button onclick="showDeleteModal(${food.id_makanan})" class="btn-hapus">
          <i class="bi bi-trash"></i> Hapus dari Wishlist
        </button>
      </div>
    </div>
  </div>`;
    }
  });
}

/* ===== 3. DELETE (Hapus dengan Modal) ===== */
let idMakananYangAkanDihapus = null;

function showDeleteModal(id) {
  idMakananYangAkanDihapus = id;
  const modal = document.getElementById("deleteModal");
  if (modal) {
    modal.style.display = "block";
    modal.classList.add("show");
  }
}

function closeDeleteModal() {
  const modal = document.getElementById("deleteModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("show");
  }
  idMakananYangAkanDihapus = null;
}

function confirmDelete() {
  if (idMakananYangAkanDihapus !== null) {
    const currentWishlist = getAllWishlist();
    const updatedWishlist = currentWishlist.filter(
      (w) => !(w.id_makanan == idMakananYangAkanDihapus && w.id_user == USER_ID)
    );

    saveWishlist(updatedWishlist);
    renderWishlist();
    closeDeleteModal();
    showNotification("Item berhasil dihapus!", "success");
  }
}

/* ===== INITIALIZE ===== */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("wishlist-data-container")) {
    renderWishlist();
  }

  document
    .getElementById("confirmDelete")
    ?.addEventListener("click", confirmDelete);
  document
    .getElementById("cancelDelete")
    ?.addEventListener("click", closeDeleteModal);

  window.addEventListener("click", (event) => {
    const modal = document.getElementById("deleteModal");
    if (event.target == modal) closeDeleteModal();
  });
});
