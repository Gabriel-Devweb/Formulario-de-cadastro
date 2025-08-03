const form = document.getElementById("form");
const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='password'], input[type='date']");
const genderRadios = document.querySelectorAll("input[name='gender']");
const submitButton = form.querySelector("button[type='submit']");

// Funções de validação individuais
function isNotEmpty(value) {
    return value.trim().length > 0;
}

function isValidName(name) {
    return /^[A-Za-zÀ-ÿ\s]+$/.test(name.trim()) && name.trim().length >= 2;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isStrongPassword(password) {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

function isGenderSelected() {
    return [...genderRadios].some(radio => radio.checked);
}

// Validação principal
function validateForm() {
    let isValid = true;

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("last_name").value;
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    if (!isValidName(name)) isValid = false;
    if (!isValidName(lastName)) isValid = false;
    if (!isNotEmpty(birthdate)) isValid = false;
    if (!isValidEmail(email)) isValid = false;
    if (!isStrongPassword(password)) isValid = false;
    if (password !== confirmPassword || !isNotEmpty(confirmPassword)) isValid = false;
    if (!isGenderSelected()) isValid = false;

    submitButton.disabled = !isValid;
}

// Evento de escuta em tempo real
inputs.forEach(input => {
    input.addEventListener("input", validateForm);
});
genderRadios.forEach(radio => {
    radio.addEventListener("change", validateForm);
});

// Previne envio com campos inválidos
form.addEventListener("submit", function(event) {
    validateForm(); // Revalida antes de enviar
    if (submitButton.disabled) {
        event.preventDefault(); // Impede envio se inválido
        alert("Por favor, preencha todos os campos corretamente.");
    }
});

// Mostrar/ocultar senha
const passwordIcons = document.querySelectorAll(".password-icon");

passwordIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });
});