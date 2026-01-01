const ARCHIVE_KEY = "la-forchetta-archive";


// Carousel autoplay and navbar profile tooltip sync 
document.addEventListener("DOMContentLoaded", () => {
  const carouselEl = document.querySelector("#carouselExampleAutoplaying");
  let carousel;
  if (carouselEl && window.bootstrap?.Carousel) {
    carousel = new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      ride: "carousel",
      wrap: true, });
    // Pause on hover in header na syg jsg
    carouselEl.addEventListener("mouseenter", () => {
      if (carousel) carousel.pause(); });
    carouselEl.addEventListener("mouseleave", () => {
      if (carousel) carousel.cycle(); });
  }
});

// 1. Fungsi untuk Tambah/Hapus Archive
// Like button & Archive System - Updated
document.addEventListener('DOMContentLoaded', function () {
    // 1. Jalankan sinkronisasi saat halaman dimuat
    syncLikeButtons();

    // 2. Event Listener untuk tombol like
    // Kita gunakan onclick="toggleArchive(this)" di HTML, 
    // jadi kita hanya perlu mendefinisikan fungsinya di bawah ini:
});

function toggleArchive(btn) {
    const id = btn.getAttribute('data-id');
    const judul = btn.getAttribute('data-judul');
    const image = btn.getAttribute('data-image');
    const deskripsi = btn.getAttribute('data-deskripsi');
    
    const icon = btn.querySelector('i');
    const countSpan = btn.querySelector('.like-count');
    
    // Ambil data dari LocalStorage
    let archive = JSON.parse(localStorage.getItem('la-forchetta-archive')) || [];
    const index = archive.findIndex(item => item.id == id);

    if (index === -1) {
        // BELUM DISUKAI -> Tambah ke Archive
        archive.push({ id, judul, image, deskripsi });
        
        // Update UI
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        icon.classList.add('text-danger');
        countSpan.textContent = "1";
    } else {
        // SUDAH DISUKAI -> Hapus dari Archive
        archive.splice(index, 1);
        
        // Update UI
        icon.classList.replace('bi-heart-fill', 'bi-heart');
        icon.classList.remove('text-danger');
        countSpan.textContent = "0";
    }

    // Simpan kembali ke LocalStorage
    localStorage.setItem('la-forchetta-archive', JSON.stringify(archive));
}

// Fungsi agar saat halaman direfresh, tombol yang sudah dilike tetap berwarna merah
function syncLikeButtons() {
    const archive = JSON.parse(localStorage.getItem('la-forchetta-archive')) || [];
    document.querySelectorAll('.btn-like').forEach(btn => {
        const id = btn.getAttribute('data-id');
        const icon = btn.querySelector('i');
        const countSpan = btn.querySelector('.like-count');
        
        if (archive.some(item => item.id === id)) {
            icon.classList.replace('bi-heart', 'bi-heart-fill');
            icon.classList.add('text-danger');
            countSpan.textContent = "1";
        }
    });
}

// bookmark - inna
document.querySelectorAll('.bookmark-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function(e) {
        e.preventDefault(); // Mencegah link jika ada
        this.classList.toggle('active');
    });
});