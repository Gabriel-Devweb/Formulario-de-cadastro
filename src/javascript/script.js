const form = document.getElementById("form");
const submitButton = form.querySelector("button[type='submit']");
const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='password'], input[type='date']");
const genderRadios = document.querySelectorAll("input[name='gender']");

// Função para mostrar erro
function showError(input, message) {
  const inputBox = input.closest('.input-box, .radio-container');
  const errorElement = inputBox.querySelector('.error-message');
  errorElement.textContent = message;
  inputBox.classList.add('invalid');
  inputBox.classList.remove('valid');
}

// Função para limpar erro
function clearError(input) {
  const inputBox = input.closest('.input-box, .radio-container');
  const errorElement = inputBox.querySelector('.error-message');
  errorElement.textContent = '';
  inputBox.classList.remove('invalid');
  inputBox.classList.add('valid');
}

// Validações individuais
function isValidName(name) {
  if (!name.trim()) return "Campo obrigatório";
  if (name.trim().length < 2) return "Mínimo 2 caracteres";
  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(name.trim())) return "Somente letras e espaços";
  return "";
}

function isValidBirthdate(date) {
  if (!date) return "Campo obrigatório";
  const year = new Date(date).getFullYear();
  const currentYear = new Date().getFullYear();
  if (year < 1920 || year > currentYear) return "Data inválida";
  return "";
}

function isValidEmail(email) {
  if (!email.trim()) return "Campo obrigatório";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return "Email inválido";
  return "";
}

function isValidPassword(password) {
  if (!password) return "Campo obrigatório";
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regex.test(password)) return "Senha deve ter 8+ chars, letras maiúsculas/minúsculas, números e símbolos";
  return "";
}

function passwordsMatch(password, confirmPassword) {
  if (!confirmPassword) return "Confirme a senha";
  if (password !== confirmPassword) return "Senhas não coincidem";
  return "";
}

function isGenderSelected() {
  return [...genderRadios].some(radio => radio.checked);
}

// Função geral de validação
function validateForm() {
  let formIsValid = true;

  // Nome
  const nameInput = document.getElementById("name");
  let error = isValidName(nameInput.value);
  if (error) {
    showError(nameInput, error);
    formIsValid = false;
  } else {
    clearError(nameInput);
  }

  // Sobrenome
  const lastNameInput = document.getElementById("last_name");
  error = isValidName(lastNameInput.value);
  if (error) {
    showError(lastNameInput, error);
    formIsValid = false;
  } else {
    clearError(lastNameInput);
  }

  // Nascimento
  const birthdateInput = document.getElementById("birthdate");
  error = isValidBirthdate(birthdateInput.value);
  if (error) {
    showError(birthdateInput, error);
    formIsValid = false;
  } else {
    clearError(birthdateInput);
  }

  // Email
  const emailInput = document.getElementById("email");
  error = isValidEmail(emailInput.value);
  if (error) {
    showError(emailInput, error);
    formIsValid = false;
  } else {
    clearError(emailInput);
  }

  // Senha
  const passwordInput = document.getElementById("password");
  error = isValidPassword(passwordInput.value);
  if (error) {
    showError(passwordInput, error);
    formIsValid = false;
  } else {
    clearError(passwordInput);
  }

  // Confirmar senha
  const confirmPasswordInput = document.getElementById("confirm_password");
  error = passwordsMatch(passwordInput.value, confirmPasswordInput.value);
  if (error) {
    showError(confirmPasswordInput, error);
    formIsValid = false;
  } else {
    clearError(confirmPasswordInput);
  }

  // Gênero
  const genderContainer = document.querySelector(".radio-container");
  const genderError = genderContainer.querySelector('.error-message');
  if (!isGenderSelected()) {
    genderError.textContent = "Selecione um gênero";
    genderContainer.classList.add('invalid');
    genderContainer.classList.remove('valid');
    formIsValid = false;
  } else {
    genderError.textContent = "";
    genderContainer.classList.remove('invalid');
    genderContainer.classList.add('valid');
  }

  // Ativa ou desativa botão submit
  submitButton.disabled = !formIsValid;

  return formIsValid;
}

// Eventos para validar em tempo real
inputs.forEach(input => {
  input.addEventListener('input', validateForm);
});
genderRadios.forEach(radio => {
  radio.addEventListener('change', validateForm);
});

// Interação do botão mostrar/ocultar senha
const passwordIcons = document.querySelectorAll(".password-icon");
passwordIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    const input = icon.parentElement.querySelector("input");
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

// Prevenir envio se inválido ou confirmar sucesso
form.addEventListener("submit", e => {
  e.preventDefault();
  if (validateForm()) {
    alert("Conta criada com sucesso!");
    form.reset();
    submitButton.disabled = true;
    document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
  } else {
    alert("Por favor, corrija os erros antes de enviar.");
  }
});

// Executar validação ao carregar a página para controlar botão
window.addEventListener("load", validateForm);