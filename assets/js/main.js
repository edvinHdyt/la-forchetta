//slide interaktif header dashboard carousel bangsat
document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#carouselExampleAutoplaying');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000, 
        ride: 'carousel',
        wrap: true      });
});

//profil dah jir
const inputs = document.querySelectorAll("#name, #phone, #email, #bio");
inputs.forEach(input => {
    input.addEventListener("input", () => {
        const counter = input.parentElement.querySelector(".char-counter");
        counter.textContent = `${input.value.length}/${input.maxLength}`;
        validateForm();});
});
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const saveBtn = document.getElementById("saveBtn");
    saveBtn.disabled = name.length === 0;}
