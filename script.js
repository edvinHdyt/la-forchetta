// Data Dummy diperbanyak + Tambahan imageUrl
let DUMMY_DATA = [
  {
    id: 1,
    nama: "Nasi Goreng Spesial",
    deskripsi:
      "Nasi goreng dengan bumbu rahasia dan topping melimpah, cocok untuk makan malam.",
    rating: 4.5,
    imageUrl:
      "https://unsplash.com/photos/a-plate-of-rice-with-shrimp-and-vegetables-o6Oq7rBMqVc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
  },
  {
    id: 2,
    nama: "Sate Ayam Madura",
    deskripsi:
      "Daging ayam empuk dengan bumbu kacang kental khas Madura. Favorit sepanjang masa!",
    rating: 4.8,
    imageUrl: "https://source.unsplash.com/400x300/?sateayam",
  },
  {
    id: 3,
    nama: "Mie Ayam Bakso",
    deskripsi:
      "Mie kenyal dengan potongan ayam dan bakso urat super. Harus coba pedas!",
    rating: 4.2,
    imageUrl: "https://source.unsplash.com/400x300/?mieayambakso",
  },
  {
    id: 4,
    nama: "Gado-Gado Lontong",
    deskripsi:
      "Sayuran segar dengan bumbu kacang pedas yang nikmat. Pilihan sehat.",
    rating: 4.0,
    imageUrl: "https://source.unsplash.com/400x300/?gadogado",
  },
  {
    id: 5,
    nama: "Rendang Sapi Asli Padang",
    deskripsi:
      "Daging sapi dimasak dengan santan dan rempah berjam-jam hingga empuk sempurna.",
    rating: 4.9,
    imageUrl: "https://source.unsplash.com/400x300/?rendang",
  },
  {
    id: 6,
    nama: "Soto Betawi Kuah Susu",
    deskripsi:
      "Soto daging sapi dengan kuah santan/susu yang gurih dan kental.",
    rating: 4.3,
    imageUrl: "https://source.unsplash.com/400x300/?sotobetawi",
  },
  {
    id: 7,
    nama: "Martabak Manis Keju Cokelat",
    deskripsi:
      "Camilan malam dengan taburan keju dan cokelat lezat di atas adonan tebal.",
    rating: 4.7,
    imageUrl: "https://source.unsplash.com/400x300/?martabak",
  },
  {
    id: 8,
    nama: "Bebek Goreng Sambal Ijo",
    deskripsi:
      "Bebek yang digoreng garing, disajikan dengan sambal hijau yang pedas segar.",
    rating: 4.6,
    imageUrl: "https://source.unsplash.com/400x300/?bebekgoreng",
  },
  {
    id: 9,
    nama: "Pempek Kapal Selam",
    deskripsi:
      "Adonan ikan tenggiri berisi telur, disiram cuko asam manis pedas.",
    rating: 4.5,
    imageUrl: "https://source.unsplash.com/400x300/?pempek",
  },
  {
    id: 10,
    nama: "Rawon Daging Khas Jawa Timur",
    deskripsi:
      "Sup daging sapi berkuah hitam karena kluwek, disajikan dengan tauge dan sambal.",
    rating: 4.4,
    imageUrl: "https://source.unsplash.com/400x300/?rawon",
  },
  {
    id: 11,
    nama: "Nasi Uduk Komplit",
    deskripsi:
      "Nasi yang dimasak dengan santan dan rempah, disajikan dengan lauk pauk komplit.",
    rating: 4.1,
    imageUrl: "https://source.unsplash.com/400x300/?nasiuduk",
  },
  {
    id: 12,
    nama: "Tongseng Kambing Pedas",
    deskripsi:
      "Daging kambing dimasak dengan bumbu khas, kol, dan tomat, kuahnya pedas gurih.",
    rating: 4.6,
    imageUrl: "https://source.unsplash.com/400x300/?tongseng",
  },
];

const wishlistContainer = document.getElementById("wishlist-data-container");

/**
 * 1. SIMULASI API: Mengambil data wishlist.
 */
function fetchWishlist() {
  wishlistContainer.innerHTML =
    '<p class="loading-text">Memuat Wishlist...</p>';

  setTimeout(() => {
    renderWishlist(DUMMY_DATA);
  }, 1000);
}

/**
 * 2. MERENDER: Menampilkan data ke HTML dalam bentuk Card.
 */
function renderWishlist(items) {
  wishlistContainer.innerHTML = "";

  if (items.length === 0) {
    wishlistContainer.innerHTML =
      '<p class="loading-text">Wishlist Anda kosong. Tambahkan item baru!</p>';
    return;
  }

  items.forEach((item) => {
    const cardHtml = `
            <div class="food-card" data-id="${item.id}">
                <div class="card-image-container">
                    <img src="${item.imageUrl}" alt="${item.nama}" class="card-image">
                </div>
                <div class="card-content">
                    <h2 class="card-title">${item.nama}</h2>
                    <p class="card-description">${item.deskripsi}</p>
                    <button class="remove-btn" data-id="${item.id}">Hapus dari Wishlist</button>
                </div>
            </div>
        `;
    wishlistContainer.innerHTML += cardHtml;
  });

  attachDeleteListeners();
}

/**
 * 3. LOGIKA DELETE: Menangani klik tombol Hapus (menggunakan Event Delegation).
 */
function attachDeleteListeners() {
  wishlistContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const foodId = parseInt(event.target.getAttribute("data-id"));
      await simulateDelete(foodId);
    }
  });
}

/**
 * 4. SIMULASI API: Menghapus data dari array lokal dan memuat ulang tampilan.
 */
async function simulateDelete(id) {
  if (!confirm(`Yakin ingin menghapus item ID ${id} dari wishlist?`)) {
    return;
  }

  const initialLength = DUMMY_DATA.length;
  DUMMY_DATA = DUMMY_DATA.filter((item) => item.id !== id);

  if (DUMMY_DATA.length < initialLength) {
    console.log(`Item ID ${id} berhasil dihapus.`);
  }

  fetchWishlist();
}

document.addEventListener("DOMContentLoaded", fetchWishlist);
