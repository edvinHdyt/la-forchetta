
document.addEventListener("click", function(){
    const strId = event.target.dataset["id"];
    switch (strId) {
        case "closeAlertModal":
            closeAlertModals();
            break;
        case "loginProccess":
            loginProccess();
            break;
        case "register":
            registerProccess();
            break;
        default:
            break;
    }
});

const loginProccess = async() =>  {
    let emailInput = document.getElementById("loginEmail");
    let passInput = document.getElementById("loginPassword");
    emailInput = emailInput.value;
    passInput = passInput.value;


    if (emailInput == "" || passInput == ""){
        showAlertModals("Email dan password harus diisi!");
        return;
    }

    // get data users
    let dataUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
    dataUsers = dataUsers.filter((data) => {
        return (
        (data["email"].includes(emailInput)) &&
        (data["password"].includes(MD5(unescape(encodeURIComponent(passInput)))))
        );
    });

    if(dataUsers.length == 0){
        showAlertModals("Email atau password salah, silahkan coba lagi!");
        return;
    }

    let obj = {
        id : dataUsers[0].id,
        email : dataUsers[0].email,
        nama : dataUsers[0].nama,
        profile_pict: dataUsers[0].profile_pict
    };

    localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(obj));
    window.location.href = "index.html";
}


const registerProccess = async() =>  {
    let nameInput = document.getElementById("registerName");
    let phoneInput = document.getElementById("registerPhone");
    let emailInput = document.getElementById("registerEmail");
    let passInput = document.getElementById("registerPassword");
    nameInput = nameInput.value;
    phoneInput = phoneInput.value;
    emailInput = emailInput.value;
    passInput = passInput.value;

    if (emailInput == "" || passInput == "" || phoneInput == ""|| nameInput == ""){
        showAlertModals("Semua kolom harus diisi!");
        return;
    }

    let isIdused = [];
    let idUser = 0;
    let dataUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));

    let isEmailUsed = dataUsers.filter((data) => data["email"] == emailInput);

    console.log(isEmailUsed);
    if (isEmailUsed.length > 0){
        showAlertModals("Email sudah digunakan!");
        return;
    }

    do{
        idUser = Math.floor(9 + Math.random() * 100);
        isIdused = dataUsers.filter(data => data["id"] == idUser);
    }while(isIdused.length > 0);


    let obj = {
        id : idUser,
        email : emailInput,
        nama : nameInput,
        phone : phoneInput,
        password : MD5(unescape(encodeURIComponent(passInput))),
        profile_pict: undefined
    };

    dataUsers.push(obj);

    localStorage.setItem(STORAGE_KEY_USER_LOGIN, JSON.stringify(obj));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(dataUsers));
    window.location.href = "index.html";
}

const showAlertModals = (msg) => {
    const modal = document.getElementById("alertModal");
    const descModal = document.getElementById("alertDesc");
    descModal.innerText = msg;

    modal.classList.remove("d-none");
}

const closeAlertModals = () => {
    const modal = document.getElementById("alertModal");

    modal.classList.add("d-none");
}
// Show/hide password
document.addEventListener('DOMContentLoaded', function() {
    // Login page
    const loginPwdInput = document.getElementById('loginPassword');
    const loginToggleBtn = document.getElementById('toggleLoginPassword');
    const loginEyeIcon = document.getElementById('loginEyeIcon');
    if (loginPwdInput && loginToggleBtn && loginEyeIcon) {
        loginToggleBtn.addEventListener('click', function() {
            if (loginPwdInput.type === 'password') {
                loginPwdInput.type = 'text';
                loginEyeIcon.classList.remove('bi-eye');
                loginEyeIcon.classList.add('bi-eye-slash');
            } else {
                loginPwdInput.type = 'password';
                loginEyeIcon.classList.remove('bi-eye-slash');
                loginEyeIcon.classList.add('bi-eye');
            }
        });
    }

    // Register page
    const registerPwdInput = document.getElementById('registerPassword');
    const registerToggleBtn = document.getElementById('toggleRegisterPassword');
    const registerEyeIcon = document.getElementById('registerEyeIcon');
    if (registerPwdInput && registerToggleBtn && registerEyeIcon) {
        registerToggleBtn.addEventListener('click', function() {
            if (registerPwdInput.type === 'password') {
                registerPwdInput.type = 'text';
                registerEyeIcon.classList.remove('bi-eye');
                registerEyeIcon.classList.add('bi-eye-slash');
            } else {
                registerPwdInput.type = 'password';
                registerEyeIcon.classList.remove('bi-eye-slash');
                registerEyeIcon.classList.add('bi-eye');
            }
        });
    }
});
