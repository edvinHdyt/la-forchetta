//profil 
"use strict";
let initialProfile = {};

const STORAGE_KEY = "la-forchetta-profile";
const STORAGE_KEY_RATING = "la-forchetta-ratings";
const WISHLIST_KEY = "la-forchetta-wishlist";
const STORAGE_KEY_USER_LOGIN = "la-forchetta-user-login";
const commentKeyStorage = "la-forchetta-comment";
const ARCHIVE_KEY = "la-forchetta-archive"; 
const STORAGE_KEY_LIKED_FOODS = "la-forchetta-liked-foods"; 

const defaultPhoto = "./assets/image/SVG/defaultProfile.svg";
const inputs = document.querySelectorAll("#name, #phone, #email, #bio");
let userLogin = localStorage.getItem("la-forchetta-user-login");
userLogin = userLogin == null ? userLogin : JSON.parse(userLogin);

// function loadProfileMain() {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   const profile = stored
//     ? JSON.parse(stored) : {
//         photo: defaultPhoto 
//       };
//   initialProfile = { ...profile };
//   setPhotoMain(profile.photo || defaultPhoto);
// }

function setPhotoMain(src) {
    let navProfilePhoto;
    navProfilePhoto = document.getElementById("navProfilePhoto");
    if (navProfilePhoto) navProfilePhoto.src = src; 
}


document.addEventListener('click', function(){
    let strId = event.target.dataset["id"];
    
    switch (strId) {
        case "showDropdownMenu":
            showDropdownMenu();
            hideProfileDropdown();
            break;
        case "dropdownProfile":
            showDropdownProfile();
            hideNavbarDropdown();
            break;
        case "activatedMenu":
            setTimeout(() => {
                initial();
            }, 100);
            break;
        case "login":
            window.location.href="login-page.html";
            break;
        case "logout":
            localStorage.removeItem(STORAGE_KEY_USER_LOGIN);
            window.location.href="login-page.html";
            break;
        default:
            break;
    }
});

function hideNavbarDropdown(){
    let dropdownNav = document.getElementById("dropdownNavbar");
    let nav = document.getElementById("navbar");

    if (!dropdownNav.classList.contains("hide-dropdown-navbar")){
        dropdownNav.classList.remove('showing-dropdown-navbar');
        dropdownNav.classList.add('hiding-dropdown-navbar');
        dropdownNav.classList.add('hide-dropdown-navbar');

        nav.classList.remove("navbar-dropdown-active");
    }
}

function hideProfileDropdown(){
    let elm = document.getElementById('dropdownProfile');

    if (!elm.classList.contains("hide-dropdown-profile-container")){
        elm.classList.remove('show-dropdown-profile-container');
        elm.classList.add('hiding-dropdown-profile-container');
        elm.classList.add('hide-dropdown-profile-container');

    }
}


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

function showDropdownProfile(){
    let elm = document.getElementById('dropdownProfile');
    
    if (elm.classList.contains("hide-dropdown-profile-container")){
        elm.classList.remove("d-none")
        elm.classList.remove('hide-dropdown-profile-container');
        elm.classList.remove('hiding-dropdown-profile-container');
        elm.classList.add('show-dropdown-profile-container');

    } else {
        elm.classList.remove('show-dropdown-profile-container');
        elm.classList.add('hiding-dropdown-profile-container');
        elm.classList.add('hide-dropdown-profile-container');

        setTimeout(() => {
            elm.classList.add("d-none");
        }, 200);
    }
}


/* ================= 1. INIT DATA (AMBIL DARI API JIKA LOCAL KOSONG) ================= */
async function initArchive() {
    if (localStorage.getItem(ARCHIVE_KEY) === null && userLogin != null) {
        try {
            const res = await fetch("https://dummyjson.com/c/8454-9a1a-4c50-a20c");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.archievest;
            
            initialData = initialData.filter((data) => {
                return data["id_user"] == userLogin.id_user;
            });

            localStorage.setItem(ARCHIVE_KEY, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

async function initWishlist() {
    if (localStorage.getItem(WISHLIST_KEY) === null  && userLogin != null) {
        try {
            const res = await fetch("https://dummyjson.com/c/c42d-933e-41ca-8c5e");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.wishlists;
            
            initialData = initialData.filter((data) => {
                return data["id_user"] == userLogin.id_user;
            });

            localStorage.setItem(WISHLIST_KEY, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

async function initFoodLiked() {
    if (localStorage.getItem(STORAGE_KEY_LIKED_FOODS) === null) {
        try {
            const res = await fetch("https://dummyjson.com/c/b77d-8bba-4ac5-b729");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.liked_foods;

            localStorage.setItem(STORAGE_KEY_LIKED_FOODS, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

async function initDataRating() {
    if (localStorage.getItem(STORAGE_KEY_RATING) === null) {
        try {
            const res = await fetch("https://dummyjson.com/c/7b89-7430-43b3-a03f");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.ratings;

            localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

async function initDataComment() {
    if (localStorage.getItem(commentKeyStorage) === null) {
        try {
            const res = await fetch("https://dummyjson.com/c/fd5d-2881-4a4c-bc72");
            const data = await res.json();
            // Sesuai catatanmu, properti API-nya adalah "archievest"
            let initialData = data.comments;

            localStorage.setItem(commentKeyStorage, JSON.stringify(initialData));
            // console.log("Data awal berhasil dimuat ke LocalStorage");
        } catch (error) {
            console.error("Gagal mengambil data API:", error);
        }
    }
}

function initial(){
    setUserLogin();
    setTotalRatingMakananByComments();
    initArchive();
    initWishlist();
    initFoodLiked(); 
    initDataRating();
    initDataComment();

    let currentUrl = window.location.href;
    currentUrl = currentUrl.split("/");
    currentUrl = currentUrl[currentUrl.length - 1];
    
    currentUrl = currentUrl.includes("#contactUs") ? "#contactUs" : currentUrl;
    
    const navlink = document.getElementsByClassName("nav-link");

    Array.from(navlink).forEach(elm => {
        if (elm.getAttribute("href") == currentUrl){
            elm.classList.add("active");
        }else if(elm.getAttribute("href") == "index.html" && currentUrl == ""){
            elm.classList.add("active");
        } else {
            elm.classList.remove("active");
        }
    });
}

const setUserLogin = () => {
    let userProfileMenu = document.getElementById("userProfileName");
    let loginMenu = document.getElementById("loginMenu");
    const loginIconMenu = document.getElementById("iconLoginMenu");
    setPhotoMain(defaultPhoto);

    if(userLogin != null){
        if(userLogin.profile_pict == undefined){
            setPhotoMain(defaultPhoto);
        }else {
            setPhotoMain(userLogin.profile_pict);
        }
        userProfileMenu.classList.remove("d-none");
        userProfileMenu.innerHTML = `<i class="bi bi-person-fill"></i> ${userLogin.nama}`;
        userProfileMenu.href = "profil.html";

        loginIconMenu.classList.remove("bi-box-arrow-in-right");
        loginIconMenu.classList.add("bi-box-arrow-in-left");
        loginMenu.innerHTML = `<i class="bi bi-box-arrow-in-right" id="iconLoginMenu"></i> keluar`;
        loginMenu.setAttribute("data-id", "logout");
    }
}

const setTotalRatingMakananByComments = async () => {
    const ratingStorage = localStorage.getItem(STORAGE_KEY_RATING);

    if (ratingStorage == null){
        const dataRating = await fetch("https://dummyjson.com/c/7b89-7430-43b3-a03f");
    
        let rating = await dataRating.json();

        localStorage.setItem(STORAGE_KEY_RATING, JSON.stringify(rating["ratings"]));
    }
}



// Fungsi agar saat halaman direfresh, tombol yang sudah dilike tetap berwarna merah
function syncLikeButtons(icon, idMakanan) {
    let archieve = localStorage.getItem(ARCHIVE_KEY);
    archieve = archieve == null ? archieve : JSON.parse(archieve);

    archieve = archieve.filter((data) => {
        return data["id_makanan"] == idMakanan;
    });

    archieve.forEach(elm => {
        icon.classList.replace('bi-heart', 'bi-heart-fill');
        icon.classList.add('text-danger');
    })
    
}

// loadProfileMain();
initial();