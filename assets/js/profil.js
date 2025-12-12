const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const photoInput = document.getElementById("photoInput");
const profilePhoto = document.getElementById("profilePhoto");
const navProfilePhoto = document.getElementById("navProfilePhoto");
const changePhotoBtn = document.getElementById("changePhotoBtn");
const profileForm = document.getElementById("profileForm");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const STORAGE_KEY = "la-forchetta-profile";
const defaultPhoto = "./assets/img/park jisung.jpg";

function loadProfile() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const profile = stored ? JSON.parse(stored) : {
    name: nameInput?.defaultValue || "",
    phone: phoneInput?.defaultValue || "",
    email: emailInput?.defaultValue || "",
    photo: defaultPhoto };
  if (nameInput) nameInput.value = profile.name || "";
  if (phoneInput) phoneInput.value = profile.phone || "";
  if (emailInput) emailInput.value = profile.email || "";
  setPhoto(profile.photo || defaultPhoto);
  toggleSave(profile.name || ""); }

function setPhoto(src) {
  if (profilePhoto) profilePhoto.src = src;
  if (navProfilePhoto) navProfilePhoto.src = src; }

function saveProfile() {
  const profile = {
    name: nameInput?.value.trim() || "",
    phone: phoneInput?.value.trim() || "",
    email: emailInput?.value.trim() || "",
    photo: profilePhoto?.src || defaultPhoto };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile; }

function toggleSave(nameValue) {
  if (!saveBtn) return;
  saveBtn.disabled = nameValue.trim().length === 0; }

function resetForm() {
  loadProfile(); }

function handlePhotoChange(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    const result = event.target?.result;
    if (typeof result === "string") {
      setPhoto(result);
      saveProfile(); } };
  reader.readAsDataURL(file); }

if (changePhotoBtn && photoInput) {
  changePhotoBtn.addEventListener("click", () => photoInput.click());
  photoInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    handlePhotoChange(file); }); }

[nameInput, phoneInput, emailInput].forEach((input) => {
  if (!input) return;
  input.addEventListener("input", () => toggleSave(nameInput.value)); });

if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveProfile();
    alert("Profile updated!"); }); }

if (cancelBtn) {
  cancelBtn.addEventListener("click", resetForm); }

loadProfile();

