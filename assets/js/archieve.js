document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LIKE / UNLIKE (UNLIKE = HAPUS CARD)
  =============================== */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-like");
    if (!btn) return;

    e.preventDefault(); // biar ga kepicu link

    const card = btn.closest(".archive-item"); // ✅ SESUAI HTML
    const icon = btn.querySelector("i");
    const countEl = btn.querySelector(".like-count");

    let liked = btn.dataset.liked === "true";
    let count = parseInt(countEl.textContent, 10);

    if (liked) {
      // UNLIKE → hapus card
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "scale(0.95)";

      setTimeout(() => {
        card.remove();
      }, 300);
    } else {
      // LIKE
      btn.dataset.liked = "true";
      icon.classList.remove("bi-heart");
      icon.classList.add("bi-heart-fill", "text-danger");
      countEl.textContent = count + 1;
      card.dataset.like = count + 1;
    }
  });

  /* ===============================
     SORT ARCHIVE
  =============================== */
  document
    .getElementById("sortArchive")
    .addEventListener("change", function () {
      const value = this.value;
      if (!value) return;

      const container = document.getElementById("archiveContainer");
      const items = Array.from(container.querySelectorAll(".archive-item"));

      items.sort((a, b) => {
        const aVal = parseInt(a.dataset[value] || 0, 10);
        const bVal = parseInt(b.dataset[value] || 0, 10);
        return bVal - aVal;
      });

      items.forEach(item => container.appendChild(item));
    });
});
