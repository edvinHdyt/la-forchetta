// Carousel autoplay and navbar profile tooltip sync - inna
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

const provMap = new Map(); 
const katMap  = new Map(); 

// ambil data makanan
async function loadData() {
  try {
    const res = await fetch("https://dummyjson.com/c/a9df-4a0d-4043-9ef8");
    const data = await res.json();
    allFoods = data.makanan || [];
      filteredFoods = allFoods;
      renderPage(); 
    } 
  catch (err) {
    console.error("Gagal Mengambil Data Makanan:", err); 
  } 
}

// filtering sijakk (TIDAK DIUBAH)
function applyFilter() {
  const provId = document.getElementById("provinsiSelect").value;
  const katId = document.getElementById("kategoriSelect").value;
    filteredFoods = allFoods.filter(food => {
      const matchProv = provId === "" || String(food.id_provinsi).trim() === String(provId).trim();
      const matchKat  = katId === ""  || String(food.id_kategori).trim() === String(katId).trim();
      return matchProv && matchKat; });
  renderPage();
}

 function renderPage() {
    const totalPages = Math.max(1, Math.ceil(filteredFoods.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageFoods = filteredFoods.slice(start, end);

    let wishlistData = null;
    wishlistData = localStorage.getItem(WISHLIST_KEY);
    wishlistData = wishlistData == null ? wishlistData : JSON.parse(wishlistData);
    
    if (userLogin != null && wishlistData != null){
      wishlistData = wishlistData.filter((data) => {
        return data["id_user"] == userLogin["id_user"];
      });
    }


    renderCards(pageFoods, wishlistData);
    renderPagination(totalPages); 
    initialDashboard();
  }

function renderCards(foods, wishlistData) {
  const container = document.getElementById("food-container");
  const template = document.getElementById("card-makanan-template");
    if (!container || !template) return;
    container.innerHTML = "";

  let likedCountData = localStorage.getItem(STORAGE_KEY_LIKED_FOODS);
  likedCountData = likedCountData == null ? likedCountData : JSON.parse(likedCountData);

  let dataComment = localStorage.getItem(commentKeyStorage);
  dataComment = dataComment == null ? dataComment : JSON.parse(dataComment);

  let dataRating = localStorage.getItem(STORAGE_KEY_RATING);
  dataRating = dataRating == null ? dataRating : JSON.parse(dataRating);

  const frag = document.createDocumentFragment();

    foods.forEach(food => {
      let newLikedCountData = likedCountData.filter((data) => {
        return data["id_makanan"] == food["id_makanan"];
      });

      let newCommentData = dataComment.filter((data) => {
        return data["id_makanan"] == food["id_makanan"];
      });

      let newDataRating = dataRating.filter((data) => {
          return data["id_makanan"] == food["id_makanan"]; 
      });

      const clone = template.content.cloneNode(true);
      clone.querySelector(".food-title").textContent = food.nama_makanan ?? "-";
      clone.querySelector(".food-desc").textContent = food.deskripsi_makanan ?? "";
      clone.querySelector(".like-count").textContent = newLikedCountData.length > 0 ? newLikedCountData[0].jumlah_like : 0;
      clone.querySelector(".bookmark-wrapper").setAttribute("onclick", `addToWishlist(${food.id_makanan})`);
      clone.querySelector(".btn-like").setAttribute("onClick", `toggleArchive(${food.id_makanan})`);
      clone.querySelector(".btn-like").setAttribute("data-value", food.id_makanan);
      clone.querySelector(".comment-count").textContent = newCommentData.length;

      syncLikeButtons(clone.querySelector(".bi-heart"), food.id_makanan);
      
      if (wishlistData != null){
        wishlistData.forEach(elm => {
          if(elm.id_makanan == food.id_makanan){
            clone.querySelector(".bookmark-wrapper").classList.add("active");
          }
        });
      }

      const img = clone.querySelector(".food-img");
        img.src = resolveFoodImage(food.foto_makanan);
        img.alt = food.nama_makanan || "Foto makanan";
        img.onerror = () => {
          img.onerror = null;
          img.src = "./assets/image/SVG/orangkrem.svg"; };

      const provId = String(food.id_provinsi ?? "").trim();
      const katId  = String(food.id_kategori ?? "").trim();
      const provName = provMap.get(provId) ?? `Prov ${provId || "-"}`;
      const katName  = katMap.get(katId)  ?? `Kat ${katId || "-"}`;
        clone.querySelector(".food-prov-name").textContent = provName;
        clone.querySelector(".food-kat-name").textContent  = katName;
      // const ratingVal = food.rating ?? food.rating_makanan ?? food.nilai_rating ?? "-";


      const ratingEl = clone.querySelector(".food-rating");
        if (ratingEl) ratingEl.textContent = newDataRating[0].total_rating;
      // detail-makanan
      clone.querySelectorAll(".food-link").forEach(a => {
        a.href = `detail-makanan.html?id=${encodeURIComponent(food.id_makanan ?? "")}`; 
      });

      frag.appendChild(clone);
    })


  container.appendChild(frag);
}

// pagination (TIDAK DIUBAH)
function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;
    pagination.innerHTML = "";
    pagination.appendChild(
      makePageItem("Previous", currentPage - 1, currentPage === 1));
  if (currentPage <= 3) {
    for (let p = 1; p <= Math.min(3, totalPages); p++) {
      pagination.appendChild(makePageItem(String(p), p, false, p === currentPage)); }} 
    else {
      pagination.appendChild(makePageItem("1", 1, false, currentPage === 1));
      pagination.appendChild(makeEllipsisItem());
        const windowSize = 2;
        const offset = currentPage - 4;
        const groupIndex = Math.floor(offset / windowSize);
        const start = 4 + groupIndex * windowSize;
        const end = Math.min(start + windowSize - 1, totalPages);
          for (let p = start; p <= end; p++) {
            pagination.appendChild(makePageItem(String(p), p, false, p === currentPage));
          }
    }
  pagination.appendChild(
    makePageItem("Next", currentPage + 1, currentPage === totalPages));
}

function makeEllipsisItem() {
  const li = document.createElement("li");
  li.className = "page-item disabled";
  const span = document.createElement("span");
  span.className = "page-link";
  span.textContent = "…";
  li.appendChild(span);
  return li;
}

function makePageItem(label, page, disabled = false, active = false) {
  // console.log(disabled);
  const li = document.createElement("li");
    li.className = `page-item${disabled ? " disabled d-none" : ""}${active ? " active" : ""}`;
  const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = label;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (disabled) return;
      currentPage = page;
      renderPage();
      document.getElementById("food-container")?.scrollIntoView({ behavior: "smooth", block: "start" }); });
  li.appendChild(a);
  return li;
}

// manggil image
function resolveFoodImage(filename) {
  if (!filename) return "./assets/image/SVG/orangkrem.svg";
  const f = String(filename).trim();
    if (!f) return "./assets/image/SVG/orangkrem.svg";
    if (/^https?:\/\//i.test(f)) return f;
    if (f.includes("/") || f.includes("\\")) return f;
  return `./assets/image/foodImage/${encodeURIComponent(f)}`;
}


const initialDashboard = () => {
  // Like button - elin
  document.querySelectorAll('.btn-like').forEach(function (btn) {
    btn.addEventListener('click', function () {

      const icon = this.querySelector('i');
      const count = this.querySelector('.like-count');

      let liked = false;

      if (icon.classList.contains("bi-heart-fill")){
        liked = true;
      }

      icon.classList.toggle('bi-heart');
      icon.classList.toggle('bi-heart-fill');
      icon.classList.toggle('text-danger');

      count.textContent = parseInt(count.textContent, 10) + (liked ? -1 : 1);
    });
  });

  
  // bookmark - inna
  document.querySelectorAll('.bookmark-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', function(e) {
          e.preventDefault(); // mencegah link jika ada
          this.classList.toggle('active'); 
        }); 
  });
}


// api dashboard - inna
let allFoods = [];
let filteredFoods = [];
let currentPage = 1;
const PAGE_SIZE = 6;

document.addEventListener("DOMContentLoaded", () => {
  const provinsiSelect = document.getElementById("provinsiSelect");
  const kategoriSelect = document.getElementById("kategoriSelect");

      // load Provinsi
  fetch("https://dummyjson.com/c/c6c4-7d86-4194-b36c")
    .then(res => res.json())
    .then(data => {
      (data.provinsi || []).forEach(p => {
        const id = String(p.id).trim();
        const nama = String(p.nama).trim();

        provMap.set(id, nama);        provMap.set(id, nama);

        const option = document.createElement("option");
        option.value = id;
        option.textContent = nama;
        provinsiSelect.appendChild(option); });
    })
    .catch(err => console.error("Gagal Mengambil Data Provinsi:", err));

  // load Kategori
  fetch("https://dummyjson.com/c/53e3-a999-43a5-8a70")
    .then(res => res.json())
    .then(data => {
      (data.categories || []).forEach(c => {
        const id = String(c.id).trim();
        const nama = String(c.category).trim();

        katMap.set(id, nama);

        const option = document.createElement("option");
        option.value = id;
        option.textContent = nama;
        kategoriSelect.appendChild(option); });
    })
    .catch(err => console.error("Gagal Mengambil Data Kategori:", err));

    loadData();

    //logic back
    provinsiSelect.addEventListener("change", () => {
      currentPage = 1;       // reset prov
      applyFilter(); });
    kategoriSelect.addEventListener("change", () => {
      currentPage = 1;       // reset kategori
      applyFilter();
    });

});
