document.addEventListener("DOMContentLoaded", () => {
    const archiveContainer = document.getElementById("archiveContainer");
    
    // Pastikan Key selalu sama di semua fungsi
    const USER_ID = 1;

    /* ================= 2. FUNGSI RENDER (MENAMPILKAN KE HTML) ================= */
    async function renderArchive() {
        let archives = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || [];
        
        if (!archiveContainer) return; // Mencegah error jika elemen tidak ada
        
        archiveContainer.innerHTML = "";

        archives = archives.filter((data) => {
            return data["id_user"] == userLogin["id_user"];
        });

        if (archives.length === 0) {
            archiveContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h4 class="text-muted">Archive Masih Kosong</h4>
                    <a href="index.html" class="btn btn-primary mt-2">Cari Makanan</a>
                </div>`;
            return;
        }


        let res = await fetch("https://dummyjson.com/c/a9df-4a0d-4043-9ef8");
        let dataMakanan = await res.json();
        dataMakanan = dataMakanan["makanan"];

        res = await fetch("https://dummyjson.com/c/c6c4-7d86-4194-b36c");
        let dataProvinsi = await res.json();
        dataProvinsi = dataProvinsi["provinsi"];

        res = await fetch("https://dummyjson.com/c/53e3-a999-43a5-8a70");
        let dataCategory = await res.json();
        dataCategory = dataCategory["categories"];
        
        let dataComment = localStorage.getItem(commentKeyStorage);
        dataComment = dataComment == null ? dataComment : JSON.parse(dataComment);

        let dataWishlist = localStorage.getItem(WISHLIST_KEY);
        dataWishlist = dataWishlist == null ? dataWishlist : JSON.parse(dataWishlist);

        let likedCountData = localStorage.getItem(STORAGE_KEY_LIKED_FOODS);
        likedCountData = likedCountData == null ? likedCountData : JSON.parse(likedCountData);

        let dataRating = localStorage.getItem(STORAGE_KEY_RATING);
        dataRating = dataRating == null ? dataRating : JSON.parse(dataRating);

        archives.forEach(food => {
            let newDataWishlist = dataWishlist.filter((data) => {
                return data["id_makanan"] == food["id_makanan"];
            });

            let newDataMakanan = dataMakanan.filter((data) => {
                return data["id_makanan"] == food["id_makanan"]; 
            });
            

            let newDataCommets = dataComment.filter((data) => {
                return data["id_makanan"] == food["id_makanan"]; 
            });
            
            let newDataRating = dataRating.filter((data) => {
                return data["id_makanan"] == food["id_makanan"]; 
            });


            let newLikedCountData = likedCountData.filter((data) => {
                return data["id_makanan"] == food["id_makanan"]; 
            });

            let newDataCategory = dataCategory.filter((data) => {
                return data["id"] == newDataMakanan[0].id_kategori;
            });

            let newDataProvinsi = dataProvinsi.filter((data) => {
                return data["id"] == newDataMakanan[0].id_provinsi;
            });


            archiveContainer.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4 archive-item" id="food-${newDataMakanan[0].id_makanan}">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="./assets/image/foodimage/${newDataMakanan[0].foto_makanan}" class="card-img-top" alt="${newDataMakanan[0].nama_makanan}" style="height:180px; object-fit:cover;">
                         <!-- memanggil rating -->
                        <div class="rating-overlay">
                            <i class="bi bi-star-fill"></i>
                            <p class="mb-0 food-rating">${newDataRating[0].total_rating}</p>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <h5 class="card-title fw-bold">${newDataMakanan[0].nama_makanan}</h5>
                                <div class="bookmark-wrapper ${newDataWishlist.length > 0 ? "active" : "" }" onClick="addToWishlist(${newDataMakanan[0].id_makanan})">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-heart icon-outline" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bookmark-heart-fill icon-fill" viewBox="0 0 16 16">
                                        <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                    </svg>
                                </div>
                                </div>
                                <div class="col-md-12 d-flex flex-wrap align-items-center">   
                                    <!-- memanggil id_kategori -->
                                    <div class="food-labelss">
                                        <i class="bi bi-tags-fill"></i>
                                        <p class="mb-0 food-kat-name">${newDataCategory[0].category}</p>
                                    </div>
                                </div>
                                <!-- deskripsi -->
                                <div class="card-desc">
                                    <p class="card-text text-truncate-multiline food-desc">${newDataMakanan[0].deskripsi_makanan}</p>
                                    <div class="col-md-12 d-flex flex-wrap align-items-center">   
                                        <!-- memanggil id_provinsi -->
                                        <div class="d-flex prov-label">
                                            <i class="bi bi-geo-alt-fill"></i>
                                            <p class="mb-0 food-prov-name">${newDataProvinsi[0].nama}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr>  
                            </div>
                            <div class="d-flex align-items-center mt-auto ps-3 pe-3 pb-2">
                                <span class="btn-like p-0 border-0 bg-transparent btn-unlike" onclick="removeArchive('${newDataMakanan[0].id_makanan}')">
                                    <i class="bi bi-heart-fill text-danger"></i>
                                    <span class="like-count">${newLikedCountData[0].jumlah_like}</span>
                                </span>

                                <div class="ms-auto d-flex align-items-center">
                                    <span class="btn-comment" style="cursor: pointer;">
                                        <i class="bi bi-chat-dots"></i>
                                        <span class="comment-count">${newDataCommets.length}</span>
                                    </span>                                
                                    <a href="detail-makanan.html?id=${newDataMakanan[0].id_makanan}"</a>
                                </div>
                            </div>
                        </div>
                </div>`;
        });
    }

    /* ================= 3. FUNGSI HAPUS (UNLIKE) ================= */
    window.removeArchive = function(id) {
        let archives = JSON.parse(localStorage.getItem(ARCHIVE_KEY));
         
        // Animasi hapus (Opsional)
        const element = document.getElementById(`food-${id}`);
        if (element) {
            element.style.opacity = "0";
            element.style.transform = "scale(0.9)";
            element.style.transition = "0.3s";
        }
        
        let likedCountData = localStorage.getItem(STORAGE_KEY_LIKED_FOODS);
        likedCountData = likedCountData == null ? likedCountData : JSON.parse(likedCountData);

        let newLikedCountData = likedCountData.filter((data) => {
            return data["id_makanan"] == id;
        });
        newLikedCountData[0].jumlah_like--;
        let indexLike = likedCountData.map(e => e.id_makanan).indexOf(newLikedCountData[0].id_makanan);
        likedCountData[indexLike] = newLikedCountData[0];
        localStorage.setItem(STORAGE_KEY_LIKED_FOODS, JSON.stringify(likedCountData));

        setTimeout(() => {
            archives = archives.filter(item => item.id_makanan != id);
            localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archives));
            renderArchive();

            
        }, 300);
        showNotification("Makanan berhasil dihapus dari archieve", "success");
    };

    /* ================= 4. JALANKAN SEMUA ================= */
    (async () => {
        await renderArchive();
        document.querySelectorAll('.bookmark-wrapper').forEach(wrapper => {
        wrapper.addEventListener('click', function(e) {
            e.preventDefault(); // mencegah link jika ada
            this.classList.toggle('active'); 
            }); 
        });
    })();

 
});

function toggleArchive(idMakanan) {
    if (userLogin == null){
        window.location.href="index.html";
        return;
    }
    // Ambil data dari LocalStorage
    let archive = JSON.parse(localStorage.getItem(ARCHIVE_KEY)) || [];
    const index = archive.findIndex(item => item.id_makanan == idMakanan);
    let likedCountData = localStorage.getItem(STORAGE_KEY_LIKED_FOODS);
    likedCountData = likedCountData == null ? likedCountData : JSON.parse(likedCountData);

    let newLikedCountData = likedCountData.filter((data) => {
        return data["id_makanan"] == idMakanan;
    });


    if (index === -1) {
        // BELUM DISUKAI -> Tambah ke Archive
        // archive.push({ id, judul, image, deskripsi });
        
        // // Update UI
        // icon.classList.replace('bi-heart', 'bi-heart-fill');
        // icon.classList.add('text-danger');
        // countSpan.textContent = "1";
        

        let obj = {
            id_user : userLogin.id_user,
            id_makanan : idMakanan
        };

        archive.push(obj);
        showNotification("Makanan berhasil dimasukan ke archieve", "success");

        newLikedCountData[0].jumlah_like++;
    } else {
        // SUDAH DISUKAI -> Hapus dari Archive
        archive.splice(index, 1);
        showNotification("Makanan berhasil dihapus dari archieve", "success");
        
        // // Update UI
        // icon.classList.replace('bi-heart-fill', 'bi-heart');
        // icon.classList.remove('text-danger');
        // countSpan.textContent = "0";
        newLikedCountData[0].jumlah_like--;
    }

    let indexLike = likedCountData.map(e => e.id_makanan).indexOf(newLikedCountData[0].id_makanan);
    likedCountData[indexLike] = newLikedCountData[0];

    // Simpan kembali ke LocalStorage
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive));
    localStorage.setItem(STORAGE_KEY_LIKED_FOODS, JSON.stringify(likedCountData));
}


    /* ===== FUNGSI NOTIFIKASI CUSTOM (VERSI HIJAU) ===== */
function showNotification(message, type) {
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
