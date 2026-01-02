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

// Like button - elin
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn-like').forEach(function (btn) {
    btn.addEventListener('click', function () {

      const icon = this.querySelector('i');
      const count = this.querySelector('.like-count');

      const liked = this.dataset.liked === 'true';
      this.dataset.liked = (!liked).toString();

      icon.classList.toggle('bi-heart');
      icon.classList.toggle('bi-heart-fill');
      icon.classList.toggle('text-danger');

      count.textContent = parseInt(count.textContent, 10) + (liked ? -1 : 1);
    });
  });
});

// bookmark - inna
document.querySelectorAll('.bookmark-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function(e) {
        e.preventDefault(); // mencegah link jika ada
        this.classList.toggle('active'); }); 
});

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
          const option = document.createElement("option");
          option.value = String(p.id).trim();
          option.textContent = p.nama;
          provinsiSelect.appendChild(option);
        });
      })
      .catch(err => console.error("Gagal Mengambil Data Provinsi:", err));

    // load Kategori
    fetch("https://dummyjson.com/c/53e3-a999-43a5-8a70")
      .then(res => res.json())
      .then(data => {
        (data.categories || []).forEach(c => {
          const option = document.createElement("option");
          option.value = String(c.id).trim();
          option.textContent = c.category;
          kategoriSelect.appendChild(option);
        });
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

// ambil data makanan
async function loadData() {
  try {
    const res = await fetch("https://dummyjson.com/c/5953-8a63-40d9-8670");
    const data = await res.json();
    allFoods = data.makanan || [];
      filteredFoods = allFoods;
      renderPage(); } 
  catch (err) {
    console.error("Gagal Mengambil Data Makanan:", err); } }

// filtering sijakk
function applyFilter() {
  const provId = document.getElementById("provinsiSelect").value;
  const katId = document.getElementById("kategoriSelect").value;
    filteredFoods = allFoods.filter(food => {
      const matchProv = provId === "" || String(food.id_provinsi).trim() === String(provId).trim();
      const matchKat  = katId === ""  || String(food.id_kategori).trim() === String(katId).trim();
      return matchProv && matchKat; });
  renderPage(); }

function renderPage() {
  const totalPages = Math.max(1, Math.ceil(filteredFoods.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageFoods = filteredFoods.slice(start, end);
    renderCards(pageFoods);
    renderPagination(totalPages); }

function renderCards(foods) {
  const container = document.getElementById("food-container");
  const template = document.getElementById("card-makanan-template");

    if (!container || !template) return;
    container.innerHTML = "";

  const frag = document.createDocumentFragment();

    foods.forEach(food => {
      const clone = template.content.cloneNode(true);
        clone.querySelector(".food-title").textContent = food.nama_makanan ?? "-";
        clone.querySelector(".food-desc").textContent = food.deskripsi_makanan ?? "";
        clone.querySelector(".like-count").textContent = food.jumlah_like ?? 0;
      const img = clone.querySelector(".food-img");
        img.src = resolveFoodImage(food.foto_makanan);
        img.alt = food.nama_makanan || "Foto makanan";
          img.onerror = () => {
          img.onerror = null;
          img.src = "./assets/image/SVG/orangkrem.svg"; };

    // link detail?
    clone.querySelectorAll(".food-link").forEach(a => {
      a.href = `detail-makanan.html?id=${encodeURIComponent(food.id_makanan ?? "")}`; 
    });

    frag.appendChild(clone);
  });

  container.appendChild(frag);
}

// pagination
function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  pagination.innerHTML = "";

  // previous
  pagination.appendChild(
    makePageItem("Previous", currentPage - 1, currentPage === 1)
  );

  // 1–3
  if (currentPage <= 3) {
    for (let p = 1; p <= Math.min(3, totalPages); p++) {
      pagination.appendChild(
        makePageItem(String(p), p, false, p === currentPage)); }
  } 
  else {
    pagination.appendChild(makePageItem("1", 1, false, currentPage === 1));
    pagination.appendChild(makeEllipsisItem());

      // 2 pagi active
      const windowSize = 2;
      // 4 pagi
      const offset = currentPage - 4;            
      const groupIndex = Math.floor(offset / windowSize);
      const start = 4 + groupIndex * windowSize;     // 4,6,8,...
      const end = Math.min(start + windowSize - 1, totalPages);

    for (let p = start; p <= end; p++) {
      pagination.appendChild(
        makePageItem(String(p), p, false, p === currentPage)); }
  }

  // next
  pagination.appendChild(
    makePageItem("Next", currentPage + 1, currentPage === totalPages)
  );
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
  const li = document.createElement("li");
    li.className = `page-item${disabled ? " disabled" : ""}${active ? " active" : ""}`;
  const a = document.createElement("a");
    a.className = "page-link";
    a.href = "#";
    a.textContent = label;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (disabled) return;
        currentPage = page;
        renderPage();
      document.getElementById("food-container")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

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

  return `./assets/image/foodimage/${encodeURIComponent(f)}`;
}

