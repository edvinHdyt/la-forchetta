"use strict";
// elemen input, save, konfirmasi
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const photoInput = document.getElementById("photoInput");
const profilePhoto = document.getElementById("profilePhoto");
const changePhotoBtn = document.getElementById("changePhotoBtn");
const profileForm = document.getElementById("profileForm");
const editBttnn = document.getElementById("editBttnn");
const saveBtn = document.getElementById("saveBtn");
const confirmCard = document.getElementById("confirmCard");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
const confirmText = document.getElementById("confirmText");
// navProfilePhoto = document.getElementById("navProfilePhoto");


let isEditMode = false;

// load form
function loadProfile() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const profile = stored
    ? JSON.parse(stored) : {
        name: nameInput?.defaultValue || "",
        phone: phoneInput?.defaultValue || "",
        email: emailInput?.defaultValue || "",
        photo: defaultPhoto 
      };
    nameInput.value = profile.name;
    phoneInput.value = profile.phone;
    emailInput.value = profile.email;
  setPhoto(profile.photo || defaultPhoto);
  setEditMode(false); 
}

//logic upload foto
changePhotoBtn?.addEventListener("click", () => photoInput.click());
photoInput?.addEventListener("change", e => {
  const file = e.target.files?.[0];
    if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    setPhoto(reader.result); 
  };
  reader.readAsDataURL(file); 
});

function setPhoto(src) {
  let navProfilePhoto;
  navProfilePhoto = document.getElementById("navProfilePhoto");
  profilePhoto.src = src;
  if (navProfilePhoto) navProfilePhoto.src = src; 
}

// logic edit
function setEditMode(state) {
  isEditMode = state;
    [nameInput, phoneInput, emailInput].forEach(i => {
      i.disabled = !state; });
      // bentar, asam lambung naik
  saveBtn.classList.toggle("d-none", !state); 
  editBttnn.classList.toggle("d-none", state);
  changePhotoBtn.classList.toggle("d-none", !state);
  if (!state) {
    profileForm.classList.remove("was-validated"); } 
  }

//logic button edit profil
editBttnn?.addEventListener("click", () => {
  setEditMode(true); });

//validasi
function hasChanges() {
  return (
    nameInput.value.trim() !== initialProfile.name ||
    phoneInput.value.trim() !== initialProfile.phone ||
    emailInput.value.trim() !== initialProfile.email ||
    profilePhoto.src !== initialProfile.photo ); }

//logic alur button konfirmasi
profileForm?.addEventListener("submit", e => {
  e.preventDefault();
    if (!profileForm.checkValidity()) {
      profileForm.classList.add("was-validated");
      return; }
    if (!hasChanges()) return;
  confirmCard.classList.remove("d-none"); });

confirmYes?.addEventListener("click", () => {
  const profile = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
    photo: profilePhoto.src || defaultPhoto };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  initialProfile = { ...profile };
    confirmCard.classList.add("d-none");
    setEditMode(false); }); // di sini dia balik lagi ke edit profile
    
confirmNo?.addEventListener("click", () => {
  confirmCard.classList.add("d-none");
  loadProfile(); });



const initialize = async() => {
   if(userLogin == null){
      let url = window.location.href;
      url = url.split("/");
      const currUrl = `${url[0]}//${url[2]}/`;
      window.location.href = currUrl + "login-page.html";

      return;
  }

  let users = await fetch("https://dummyjson.com/c/8c8f-0b56-48f0-8ed4");
  let dataUser = await users.json();

  Array.from(dataUser["users"]).forEach(user => {
    if (user["id"] == 1){
      dataUser = user;
    }
  });

  const obj = {
    id: dataUser["id"],
    name: dataUser["nama"],
    phone: dataUser["phone"],
    email: dataUser["email"],
    photo: dataUser["profile_pict"] == null ? defaultPhoto : dataUser["profile_pict"]
  };

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored == null){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }
  loadProfile();
}

initialize();