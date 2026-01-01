document.addEventListener("DOMContentLoaded", () => {
    const archiveContainer = document.getElementById("archiveContainer");
    
    // Pastikan Key selalu sama di semua fungsi
    const ARCHIVE_KEY = "la-forchetta-archive"; 
    const API_MAKANAN = "- https://dummyjson.com/c/5953-8a63-40d9-8670";
    const USER_ID = 1;

    /* ================= 1. INIT DATA (AMBIL DARI API JIKA LOCAL KOSONG) ================= */
    async function initArchive() {
        if (localStorage.getItem(ARCHIVE_KEY) === null) {
            try {
                const res = await fetch(API_MAKANAN);
                const data = await res.json();
                // Sesuai catatanmu, properti API-nya adalah "archievest"
                const initialData = data.archievest || []; 
                localStorage.setItem(ARCHIVE_KEY, JSON.stringify(initialData));
                console.log("Data awal berhasil dimuat ke LocalStorage");
            } catch (error) {
                console.error("Gagal mengambil data API:", error);
            }
        }
    }

    /* ================= 2. FUNGSI RENDER (MENAMPILKAN KE HTML) ================= */
    function renderArchive() {
        const archives = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || [];
        
        if (!archiveContainer) return; // Mencegah error jika elemen tidak ada
        
        archiveContainer.innerHTML = "";

        if (archives.length === 0) {
            archiveContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h4 class="text-muted">Archive Masih Kosong</h4>
                    <a href="index.html" class="btn btn-primary mt-2">Cari Makanan</a>
                </div>`;
            return;
        }

        archives.forEach(food => {
            archiveContainer.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 archive-item" id="food-${food.id}">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${food.image || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${food.judul}" style="height:180px; object-fit:cover;">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${food.judul}</h5>
                            <p class="card-text text-muted small">${food.deskripsi || ''}</p>
                            <div class="d-flex align-items-center mt-auto pt-2">
                                <button class="p-0 border-0 bg-transparent btn-unlike" onclick="removeArchive('${food.id}')">
                                    <i class="bi bi-heart-fill text-danger fs-5""></i>
                                </button>

                                <div class="ms-auto d-flex align-items-center gap-3">
                                    <span class="btn-comment" style="cursor: pointer;">
                                        <i class="bi bi-chat-dots fs-5 text-muted"></i>
                                    </span>                                
                                    <a href="detail-makanan.html?id=${food.id}"</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    }

    /* ================= 3. FUNGSI HAPUS (UNLIKE) ================= */
    window.removeArchive = function(id) {
        let archives = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || [];
        
        // Animasi hapus (Opsional)
        const element = document.getElementById(`food-${id}`);
        if (element) {
            element.style.opacity = "0";
            element.style.transform = "scale(0.9)";
            element.style.transition = "0.3s";
        }

        setTimeout(() => {
            archives = archives.filter(item => item.id != id);
            localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archives));
            renderArchive();
        }, 300);
    };

    /* ================= 4. JALANKAN SEMUA ================= */
    (async () => {
        await initArchive();
        renderArchive();
    })();
});