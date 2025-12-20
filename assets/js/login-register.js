// Show/hide password for login page
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
