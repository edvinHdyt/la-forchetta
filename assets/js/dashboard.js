// Carousel autoplay and navbar profile tooltip sync
document.addEventListener("DOMContentLoaded", () => {
  const carouselEl = document.querySelector("#carouselExampleAutoplaying");
  if (carouselEl && window.bootstrap?.Carousel) {
    new bootstrap.Carousel(carouselEl, {
      interval: 4000,
      ride: "carousel",
      wrap: true,
    });
  }

  const STORAGE_KEY = "la-forchetta-profile";
  const defaultName = "Park Jisung";
  const defaultPhoto = "./assets/img/park jisung.jpg";
  const navProfilePhoto = document.getElementById("navProfilePhoto");
  const navProfileGreet = document.querySelector(".nav-profile-greet");

  function loadProfile() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const profile = stored
      ? JSON.parse(stored)
      : { name: defaultName, photo: defaultPhoto };

    if (navProfilePhoto) navProfilePhoto.src = profile.photo || defaultPhoto;
    if (navProfileGreet) {
      const name = profile.name?.trim() || defaultName;
      navProfileGreet.textContent = `Hi ${name}!`;
    }
  }

  loadProfile();
});