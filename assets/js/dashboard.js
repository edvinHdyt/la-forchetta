// Carousel autoplay and navbar profile tooltip sync
document.addEventListener("DOMContentLoaded", () => {
  const carouselEl = document.querySelector("#carouselExampleAutoplaying");
  let carousel;
  if (carouselEl && window.bootstrap?.Carousel) {
    carousel = new bootstrap.Carousel(carouselEl, {
      interval: 5000,
      ride: "carousel",
      wrap: true, });
    // Pause on hover in header
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


document.querySelectorAll('.bookmark-icon').forEach(icon => {
  const id = icon.dataset.id;

  if (localStorage.getItem(id) === 'true') {
    icon.classList.add('active');
  }

  icon.addEventListener('click', () => {
    icon.classList.toggle('active');
    localStorage.setItem(id, icon.classList.contains('active'));
  });
});
