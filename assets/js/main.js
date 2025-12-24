//profil 
"use strict";
let initialProfile = {};

const STORAGE_KEY = "la-forchetta-profile";
const defaultPhoto = "./assets/image/SVG/defaultProfile.svg";
const inputs = document.querySelectorAll("#name, #phone, #email, #bio");
let userLogin = localStorage.getItem("la-forchetta-user-login");

function loadProfileMain() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const profile = stored
    ? JSON.parse(stored) : {
        photo: defaultPhoto 
      };
  initialProfile = { ...profile };
  setPhotoMain(profile.photo || defaultPhoto);
}

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


function initial(){
    setNameUserLogin();

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
    })
}

const setNameUserLogin = () => {
    let userProfileMenu = document.getElementById("userProfileName");
    let loginMenu = document.getElementById("loginMenu");
    const loginIconMenu = document.getElementById("iconLoginMenu");

    if(userLogin != null){
        userProfileMenu.classList.remove("d-none");
        userProfileMenu.innerText = userLogin.nama;
        userProfileMenu.href = "profil.html";

        loginIconMenu.classList.remove("bi-box-arrow-in-right");
        loginIconMenu.classList.add("bi-box-arrow-in-left");
        loginMenu.innerText = "Keluar";
    }
}


initial();
loadProfileMain();