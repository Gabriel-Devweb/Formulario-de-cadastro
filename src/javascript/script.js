const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let allValid = true;

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

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const inputBox = input.closest('.input-box');
        const inputValue = input.value;

        const errorSpan = inputBox.querySelector('.error');
        errorSpan.innerHTML = '';

        inputBox.classList.remove('invalid');
        inputBox.classList.add('valid');

        const fieldValidator = field.validator(inputValue);

        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
            inputBox.classList.add('invalid');
            inputBox.classList.remove('valid');
            allValid = false;
        }
    });

    const genders = document.getElementsByName('gender');
    const radioContainer = document.querySelector('.radio-container');
    const genderErrorSpan = radioContainer.querySelector('.error');

    const selectedGender = [...genders].find(input => input.checked);
    radioContainer.classList.remove('valid');
    radioContainer.classList.add('invalid');
    genderErrorSpan.innerHTML = `${errorIcon} Selecione um gênero!`;

    if (selectedGender) {
        radioContainer.classList.add('valid');
        radioContainer.classList.remove('invalid');
        genderErrorSpan.innerHTML = '';
    } else {
        allValid = false;
    }

    if (allValid) {
        alert('Conta criada com sucesso!');
    } else {
        alert('Não foi possível criar a conta. Verifique os campos obrigatórios!');
    }
});