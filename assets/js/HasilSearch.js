console.log("HasilSearch.js LOADED ✅ v1");

// ===== CONFIG =====
const API_MAKANAN = "https://dummyjson.com/c/5953-8a63-40d9-8670";
const API_WISHLIST = "https://dummyjson.com/c/c42d-933e-41ca-8c5e";

function pickArray(obj, candidates) {
  for (const k of candidates) {
    if (Array.isArray(obj?.[k])) return obj[k];
  }
  return [];
}

function debugApi(label, data) {
  console.log(`[${label}] keys:`, Object.keys(data || {}));
}

// "User" versi frontend (sementara)
const USER_ID = localStorage.getItem("current_user_id") || "1";
const STORAGE_KEY = `laforchetta_state_user_${USER_ID}`;

// ===== STORAGE HELPERS =====
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function getFoodState(state, id) {
  state.foods = state.foods || {};
  state.foods[id] = state.foods[id] || {
    saved: false,
    liked: false,
    likeCount: 0,
    comments: []
  };
  return state.foods[id];
}

// ===== URL SEARCH =====
function getKeyword() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("q") || "").trim().toLowerCase();
}

// ===== OPTIONAL: SYNC READ wishlist from API (NON-BLOCKING) =====
async function tryLoadWishlistIdsFromApi() {
  try {
    const res = await fetch(API_WISHLIST);
    if (!res.ok) throw new Error(`wishlist HTTP ${res.status}`);
    const data = await res.json();

    debugApi("WISHLIST", data);

    const list = pickArray(data, ["wishlists", "wishlist", "data", "items", "results"]);
    const ids = new Set(
      list
        .filter(w => String(w.id_user) === String(USER_ID))
        .map(w => String(w.id_makanan))
    );

    return ids;
  } catch (e) {
    console.warn("Wishlist API gagal, fallback storage:", e.message);
    return null;
  }
}

async function trySyncWishlistToApi(action, idMakanan) {
  try {
    const res = await fetch(API_WISHLIST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action, // "add" atau "remove"
        id_user: Number(USER_ID),
        id_makanan: Number(idMakanan)
      })
    });

    if (!res.ok) throw new Error(`sync HTTP ${res.status}`);
    const data = await res.json().catch(() => ({}));
    console.log("Sync wishlist OK:", data);
  } catch (e) {
    console.warn("Sync wishlist ke API gagal (gapapa):", e.message);
  }
}

function resolveImageSrc(foto) {
  const PLACEHOLDER = "./assets/image/foodImage/placeholder.jpg";

  if (!foto) return PLACEHOLDER;

  const s = String(foto).trim();

  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (s.startsWith("./") || s.startsWith("/")) return s;

  return `./assets/image/foodImage/${s}`;
}


// ===== RENDER =====
function renderCards(makananList, state) {
  const foodList = document.getElementById("food-list");
  if (!foodList) return;

  if (!makananList.length) {
    foodList.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mb-0">Tidak ada hasil yang cocok.</div>
      </div>
    `;
    return;
  }

  let html = "";
  makananList.forEach(item => {
    const id = String(item.id_makanan);
    const fs = getFoodState(state, id);

    // ✅ INI YANG LU LUPA: define imgSrc dulu
    const imgSrc = resolveImageSrc(item.foto_makanan);

    // ✅ DEBUG YANG BENER (sekarang gak bakal error)
    console.log("IMG DEBUG:", item.nama_makanan, item.foto_makanan, "=>", imgSrc);

    html += `
<div class="col-12 col-sm-6 col-md-4 col-lg-3">
  <div class="card h-100">
    <a href="detail-makanan.html?id=${id}">
      <img
        src="${imgSrc}"
        class="card-img-top"
        alt="${item.nama_makanan || "Food"}"
        onerror="this.onerror=null; this.src='./assets/image/foodImage/placeholder.jpg';"
      />
    </a>

    <div class="card-body d-flex flex-column">

      <!-- TITLE + BOOKMARK -->
      <div class="d-flex justify-content-between align-items-start mb-2">
        <a href="detail-makanan.html?id=${id}" class="text-decoration-none text-dark">
          <h5 class="card-title mb-0">${item.nama_makanan || ""}</h5>
        </a>

        <div class="bookmark-wrapper ${fs.saved ? "active" : ""}"
             role="button"
             data-action="save"
             data-id="${id}">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="16" height="16"
               fill="currentColor"
               class="bi bi-bookmark-heart icon-outline"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
              d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
            <path
              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg"
               width="16" height="16"
               fill="currentColor"
               class="bi bi-bookmark-heart-fill icon-fill"
               viewBox="0 0 16 16">
            <path
              d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
          </svg>
        </div>
      </div>

      <!-- DESCRIPTION -->
      <p class="card-text text-truncate-multiline">
        ${item.deskripsi_makanan || ""}
      </p>

      <!-- ACTIONS (DORONG KE BAWAH) -->
      <div class="d-flex justify-content-between align-items-center mt-auto">
        <button type="button"
          class="btn btn-like p-0 border-0 bg-transparent d-inline-flex align-items-center gap-1"
          data-action="like"
          data-id="${id}">
          <i class="bi ${fs.liked ? "bi-heart-fill" : "bi-heart"}"></i>
          <span class="like-count">${fs.likeCount}</span>
        </button>

        <button type="button"
          class="btn btn-comment p-0 border-0 bg-transparent d-inline-flex align-items-center gap-1 text-muted"
          data-action="comment"
          data-id="${id}">
          <i class="bi bi-chat-dots"></i>
          <span class="comment-count">${(fs.comments || []).length}</span>
        </button>
      </div>

    </div>
  </div>
</div>
`;
  });
  foodList.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  const searchTitle = document.getElementById("search-title");
  const foodList = document.getElementById("food-list");
  const keyword = getKeyword();

  // ⬇️ INI DIA TEMPATNYA
  document
    .querySelectorAll('input[type="search"][name="q"]')
    .forEach(input => {
      input.value = keyword;
    });

  if (searchTitle) {
    searchTitle.textContent = keyword
      ? `Hasil Pencarian: "${keyword}"`
      : "Hasil Pencarian";
  }

  // lanjut kode fetch & render...


  // load state dulu (biar gak kosong)
  let state = loadState();
  try {
    const res = await fetch(API_MAKANAN);
    if (!res.ok) throw new Error(`makanan HTTP ${res.status}`);
    const data = await res.json();

    debugApi("MAKANAN", data);

    // ini penting: jangan ngotot data.makanan
    const makanan = pickArray(data, ["makanan", "foods", "data", "items", "results"]);


    if (!keyword) {
      searchTitle.textContent = "Masukkan kata kunci pencarian";
      renderCards([], state);
      return;
    }

    const hasil = makanan.filter(item => {
      const nama = (item.nama_makanan || "").toLowerCase();
      return nama.includes(keyword);
    });

    renderCards(hasil, state);

    // ===== CLICK HANDLERS =====
    foodList.addEventListener("click", async (e) => {
      const el = e.target.closest("[data-action]");
      if (!el) return;

      const action = el.dataset.action;
      const id = String(el.dataset.id);
      state = loadState();
      const fs = getFoodState(state, id);

      if (action === "save") {
        fs.saved = !fs.saved;
        saveState(state);
        el.classList.toggle("active", fs.saved);

        // best-effort sync ke API (kalau bisa)
        await trySyncWishlistToApi(fs.saved ? "add" : "remove", id);
        return;
      }

      if (action === "like") {
        fs.liked = !fs.liked;
        fs.likeCount = Math.max(0, (fs.likeCount || 0) + (fs.liked ? 1 : -1));
        saveState(state);

        const icon = el.querySelector("i");
        const count = el.querySelector(".like-count");
        if (icon) {
          icon.classList.toggle("bi-heart-fill", fs.liked);
          icon.classList.toggle("bi-heart", !fs.liked);
        }
        if (count) count.textContent = String(fs.likeCount);
        return;
      }

      if (action === "comment") {
        const text = prompt("Tulis komentar:");
        if (!text) return;

        fs.comments = fs.comments || [];
        fs.comments.push(text.trim());
        saveState(state);

        const count = el.querySelector(".comment-count");
        if (count) count.textContent = String(fs.comments.length);
        return;
      }
    });

  } catch (err) {
    console.error(err);
    if (foodList) {
      foodList.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger mb-0">Gagal ambil data makanan dari API.</div>
        </div>
      `;
    }
  }
});
