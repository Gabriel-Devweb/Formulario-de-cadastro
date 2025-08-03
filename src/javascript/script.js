const form = document.getElementById("form");
const inputs = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameInput = document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const dateInput = document.getElementById("date");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const genderInputs = document.querySelectorAll('input[name="gender"]');

function showError(index) {
  inputs[index].style.border = "2px solid #e63636";
  spans[index].style.display = "block";
}

function hideError(index) {
  inputs[index].style.border = "";
  spans[index].style.display = "none";
}

function validateName() {
  if (nameInput.value.trim() === "") {
    showError(0);
    return false;
  } else {
    hideError(0);
    return true;
  }
}

function validateLastName() {
  if (lastnameInput.value.trim() === "") {
    showError(1);
    return false;
  } else {
    hideError(1);
    return true;
  }
}

function validateDate() {
  if (dateInput.value === "") {
    showError(2);
    return false;
  } else {
    hideError(2);
    return true;
  }
}

function validateEmail() {
  if (!emailRegex.test(emailInput.value)) {
    showError(3);
    return false;
  } else {
    hideError(3);
    return true;
  }
}

function showPasswordInstructions() {
  spans[4].style.display = "block";
}

function validatePassword() {
  const value = passwordInput.value;
  const isValid = value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);
  if (!isValid) {
    showError(4);
    return false;
  } else {
    hideError(4);
    return true;
  }
}

function validateConfirmPassword() {
  if (passwordInput.value !== confirmPasswordInput.value || confirmPasswordInput.value === "") {
    showError(5);
    return false;
  } else {
    hideError(5);
    return true;
  }
}

function validateGender() {
  const selected = Array.from(genderInputs).some(input => input.checked);
  if (!selected) {
    document.querySelector(".gender .span-required").style.display = "block";
    return false;
  } else {
    document.querySelector(".gender .span-required").style.display = "none";
    return true;
  }
}

// Exibe instrução da senha ao começar a digitar
passwordInput.addEventListener("input", showPasswordInstructions);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValidName = validateName();
  const isValidLastName = validateLastName();
  const isValidDate = validateDate();
  const isValidEmail = validateEmail();
  const isValidPassword = validatePassword();
  const isValidConfirm = validateConfirmPassword();
  const isValidGender = validateGender();

  if (
    isValidName &&
    isValidLastName &&
    isValidDate &&
    isValidEmail &&
    isValidPassword &&
    isValidConfirm &&
    isValidGender
  ) {
    alert("✅ Conta criada com sucesso!");
    form.reset();
    spans.forEach(span => span.style.display = "none");
    inputs.forEach(input => input.style.border = "");
  } else {
    alert("❌ Preencha todos os campos corretamente antes de enviar.");
  }
});