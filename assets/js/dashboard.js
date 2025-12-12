// inna 
document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#carouselExampleAutoplaying');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 7000, 
        ride: 'carousel',
        wrap: true      });
});