document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     LIKE BUTTON
  =============================== */
  document.querySelectorAll(".btn-like").forEach(button => {
    button.addEventListener("click", () => {

      const icon = button.querySelector("i");
      const countEl = button.querySelector(".like-count");

      let liked = button.dataset.liked === "true";
      let count = parseInt(countEl.textContent, 10);

      if (!liked) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");

        count++;
        button.dataset.liked = "true";
        button.classList.add("liked");
      } else {
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");

        count--;
        button.dataset.liked = "false";
        button.classList.remove("liked");
      }

      countEl.textContent = count;

      // update data-like buat sorting
      const card = button.closest(".archive-item");
      if (card) {
        card.dataset.like = count;
      }
    });
  });

  /* ===============================
     SORT ARCHIVE
  =============================== */
document
  .getElementById("sortArchive")
  .addEventListener("change", function () {
    const value = this.value;
    const container = document.getElementById("archiveContainer");
    const items = Array.from(container.querySelectorAll(".archive-item"));

    // kalau belum pilih apa-apa, stop
    if (!value) return;

    items.sort((a, b) => {
      const aVal = parseInt(a.dataset[value] || 0, 10);
      const bVal = parseInt(b.dataset[value] || 0, 10);
      return bVal - aVal;
    });

    items.forEach(item => container.appendChild(item));
  });
});

countEl.classList.add("pop");
setTimeout(() => countEl.classList.remove("pop"), 400);
