//slide interaktif header dashboard carousel 
document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#carouselExampleAutoplaying');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000, 
        ride: 'carousel',
        wrap: true      });
});


// // Buat interaktif like n save - elin
// function toggleHeart(el) {
//     el.classList.add("d-none2");
//     const target = el.nextElementSibling || el.previousElementSibling;
//     target.classList.remove("d-none2");
// }



//profil 
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
    saveBtn.disabled = name.length === 0;
}

document.addEventListener('click', function(){
    let strId = event.target.dataset["id"];
    
    switch (strId) {
        case "showDropdownMenu":
            showDropdownMenu();
            break;
    
        default:
            break;
    }
});


function showDropdownMenu(){
    let elm = document.getElementById('containerNavbarDropdown');
    

    if (elm.classList.contains("show")){
        elm.classList.remove('d-none');
        // elm.classList.add('d-block');
    } else {
        // elm.classList.remove('d-block');
        elm.classList.add('show');
    }
}
