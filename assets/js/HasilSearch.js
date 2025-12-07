// === 1. Data makanan ===
const foodData = [
    { name: "Nasi Goreng", img: "img/nasigoreng.jpg" },
    { name: "Ayam Geprek", img: "img/geprek.jpg" },
    { name: "Burger", img: "img/burger.jpg" },
    { name: "Kopi Susu", img: "img/kopi.jpg" },
    { name: "Mie Ayam", img: "img/mieayam.jpg" }
];

// === 2. Ambil elemen list untuk menampilkan hasil ===
const listContainer = document.getElementById("food-list");

// === 3. Ambil keyword dari input navbar ===
// Kita ambil dengan querySelector karena inputnya TIDAK punya ID
const searchInput = document.querySelector(".search-bar input");

// === 4. Ketika tombol search ditekan ===
document.querySelector(".form-input").addEventListener("submit", function (e) {
    e.preventDefault(); // cegah refresh

    const keyword = searchInput.value.toLowerCase();

    const filtered = foodData.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );

    showResults(filtered);
});

// === 5. Fungsi untuk menampilkan hasil ===
function showResults(data) {
    listContainer.innerHTML = "";

    if (data.length === 0) {
        listContainer.innerHTML = `
            <p class="text-center">Tidak ada makanan yang cocok.</p>
        `;
        return;
    }

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";

        card.innerHTML = `
            <div class="card">
                <img src="${item.img}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                </div>
            </div>
        `;

        listContainer.appendChild(card);
    });
}
