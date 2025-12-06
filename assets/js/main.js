//slide interaktif header dashboard carousel bangsat
document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#carouselExampleAutoplaying');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 1000, 
        ride: 'carousel',
        wrap: true      });
});
