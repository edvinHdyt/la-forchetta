//slide interaktif header dashboard carousel 
document.addEventListener("DOMContentLoaded", function () {
    const myCarousel = document.querySelector('#carouselExampleAutoplaying');
    const carousel = new bootstrap.Carousel(myCarousel, {
        interval: 3000, 
        ride: 'carousel',
        wrap: true      });
});

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
    let elm = document.getElementById('dropdownNavbar');
    let nav = document.getElementById("navbar");
    

    if (elm.classList.contains("hide-dropdown-navbar")){
        elm.classList.remove('hide-dropdown-navbar');
        elm.classList.remove('hiding-dropdown-navbar');
        elm.classList.add('showing-dropdown-navbar');

        nav.classList.add("navbar-dropdown-active");
    } else {
        elm.classList.remove('showing-dropdown-navbar');
        elm.classList.add('hiding-dropdown-navbar');
        elm.classList.add('hide-dropdown-navbar');

        nav.classList.remove("navbar-dropdown-active");
    }
}
