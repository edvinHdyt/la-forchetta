//profil 
"use strict";
let initialProfile = {};

const STORAGE_KEY = "la-forchetta-profile";
const defaultPhoto = "./assets/img/parkjisung.jpg";
const inputs = document.querySelectorAll("#name, #phone, #email, #bio");

const navProfilePhoto = document.getElementById("navProfilePhoto");

function loadProfile() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const profile = stored
    ? JSON.parse(stored) : {
        photo: defaultPhoto 
      };
  initialProfile = { ...profile };
  setPhoto(profile.photo || defaultPhoto);
}

function setPhoto(src) {
  if (navProfilePhoto) navProfilePhoto.src = src; 
}

loadProfile();

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
