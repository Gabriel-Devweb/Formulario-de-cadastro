document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const fields = [
            {
                id: 'name',
                label: 'Nome',
                validator: nameIsValid
            },
            {
                id: 'last_name',
                label: 'Sobrenome',
                validator: nameIsValid
            },
            {
                id: 'birthdate',
                label: 'Nascimento',
                validator: dateIsValid
            },
            {
                id: 'email',
                label: 'E-mail',
                validator: emailIsValid
            },
            {
                id: 'password',
                label: 'Senha',
                validator: passwordIsSecure
            },
            {
                id: 'confirm_password',
                label: 'Confirmar senha',
                validator: passwordMatch
            }
        ];

        const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';
        let isFormValid = true;

        fields.forEach(function (field) {
            const input = document.getElementById(field.id);
            if (!input) return;

            const inputBox = input.closest('.input-box');
            const errorSpan = inputBox?.querySelector('.error');
            const inputValue = input.value;

            if (!inputBox || !errorSpan) return;

            // Reset
            errorSpan.innerHTML = '';
            inputBox.classList.remove('invalid', 'valid');

            const result = field.validator(inputValue);

            if (!result.isValid) {
                errorSpan.innerHTML = `${errorIcon} ${result.errorMessage}`;
                inputBox.classList.add('invalid');
                isFormValid = false;
            } else {
                inputBox.classList.add('valid');
            }
        });

        // Validação do gênero
        const genders = document.getElementsByName('gender');
        const radioContainer = document.querySelector('.radio-container');
        const genderErrorSpan = radioContainer?.querySelector('.error');

        if (radioContainer && genderErrorSpan) {
            const selectedGender = [...genders].find(input => input.checked);

            genderErrorSpan.innerHTML = '';
            radioContainer.classList.remove('invalid', 'valid');

            if (!selectedGender) {
                genderErrorSpan.innerHTML = `${errorIcon} Selecione um gênero!`;
                radioContainer.classList.add('invalid');
                isFormValid = false;
            } else {
                radioContainer.classList.add('valid');
            }
        }

        if (isFormValid) {
            alert("Formulário válido e pronto para envio!");
            // Aqui você pode prosseguir com o envio real dos dados (fetch/AJAX etc)
        }
    });

    // Funções auxiliares

    function isEmpty(value) {
        return value.trim() === '';
    }

    function nameIsValid(value) {
        const validator = { isValid: true, errorMessage: null };

        if (isEmpty(value)) {
            return { isValid: false, errorMessage: 'O campo é obrigatório!' };
        }

        if (value.length < 3) {
            return { isValid: false, errorMessage: 'O nome deve ter no mínimo 3 caracteres!' };
        }

        const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
        if (!regex.test(value)) {
            return { isValid: false, errorMessage: 'O campo deve conter apenas letras!' };
        }

        return validator;
    }

    function dateIsValid(value) {
        const validator = { isValid: true, errorMessage: null };

        if (isEmpty(value)) {
            return { isValid: false, errorMessage: 'O nascimento é obrigatório!' };
        }

        const year = new Date(value).getFullYear();
        const currentYear = new Date().getFullYear();

        if (year < 1920 || year > currentYear) {
            return { isValid: false, errorMessage: 'Data inválida!' };
        }

        return validator;
    }

    function emailIsValid(value) {
        const validator = { isValid: true, errorMessage: null };

        if (isEmpty(value)) {
            return { isValid: false, errorMessage: 'O e-mail é obrigatório!' };
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(value)) {
            return { isValid: false, errorMessage: 'O e-mail precisa ser válido!' };
        }

        return validator;
    }

    function passwordIsSecure(value) {
        const validator = { isValid: true, errorMessage: null };

        if (isEmpty(value)) {
            return { isValid: false, errorMessage: 'A senha é obrigatória!' };
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

        if (!regex.test(value)) {
            return {
                isValid: false,
                errorMessage: `
                    Sua senha deve conter ao menos: <br/>
                    • 8 dígitos <br/>
                    • 1 letra minúscula <br/>
                    • 1 letra maiúscula  <br/>
                    • 1 número <br/>
                    • 1 caractere especial!
                `
            };
        }

        return validator;
    }

    function passwordMatch(value) {
        const passwordValue = document.getElementById('password')?.value || '';

        if (isEmpty(value) || value !== passwordValue) {
            return { isValid: false, errorMessage: 'Senhas não coincidem!' };
        }

        return { isValid: true, errorMessage: null };
    }

    // Toggle de visibilidade da senha
    const passwordIcons = document.querySelectorAll('.password-icon');

    passwordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.parentElement.querySelector('.form-control');
            if (!input) return;

            input.type = input.type === 'password' ? 'text' : 'password';
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
});