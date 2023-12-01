type="text/javascript">
    jQuery(function($){
        $("#tel").mask("+38(099) 999-9999");
    });

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const form = document.getElementById('signup-form');
const tbody = document.querySelector('#registrants tbody');

const validationConfig = {
    'first_name': {
        minChars: 3,
        errorElement: 'name-error',
        errorMessage: 'Name must be at least 3 characters and shouldn`n contain numbers',
        validate: (value) => /^[A-Za-z]+$/.test(value),
    },
    'last_name': {
        minChars: 3,
        errorElement: 'surname-error',
        errorMessage: 'surname must be at least 3 characters and shouldn`n contain numbers',
        validate: (value) => /^[A-Za-z]+$/.test(value),
    },
    'middle_name': {
        minChars: 3,
        errorElement: 'middle-name-error',
        errorMessage: 'Middle name must be at least 3 characters and shouldn`n contain numbers',
        validate: (value) => /^[A-Za-z]+$/.test(value),
    },
    'gender': {
        errorElement: 'gender-error',
        errorMessage: 'Gender is required',
        validate: () => {
            const genderRadios = document.querySelectorAll('input[name="gender"]');
            return Array.from(genderRadios).some((radio) => radio.checked);
        },
    },
    'tel': {
        minChars: 9,
        errorElement: 'number-error',
        errorMessage: 'Phone number is required',
    },
    'email': {
        pattern: emailPattern,
        errorElement: 'email-error',
        errorMessage: 'Invalid email address',
    },
    'password': {
        pattern: passwordPattern,
        errorElement: 'password-error',
        errorMessage: 'Password must contain an uppercase letter, a digit, and a special character',
    },
    'birthdate': {
        errorElement: 'date-error',
        errorMessage: 'Please enter your birthdate',
        validate: (value) => value !== '',
    },
};

function validateInput(input, config) {
    const inputValue = input.value;
    const errorElement = document.getElementById(config.errorElement);

    if (config.validate) {
        if (!config.validate(inputValue)) {
            errorElement.textContent = config.errorMessage;
            return false;
        }
    } else if (config.pattern) {
        if (!config.pattern.test(inputValue)) {
            errorElement.textContent = config.errorMessage;
            return false;
        }
    } else {
        if (inputValue.length < config.minChars) {
            errorElement.textContent = config.errorMessage;
            return false;
        }
    }
    errorElement.textContent = '';
    return true;
}

for (const field in validationConfig) {
    const inputElement = document.querySelector(`[name="${field}"]`);
    inputElement.addEventListener('input', () => {
        validateInput(inputElement, validationConfig[field]);
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let valid = true;
    for (const inputName in validationConfig) {
        const input = form.elements[inputName];
        const config = validationConfig[inputName];
        if (!validateInput(input, config) && inputName !== 'gender') {
            valid = false;
        }
    }
    if (valid) {
        const dataTable = document.getElementById('registrants').getElementsByTagName('tbody')[0];
        const newRow = dataTable.insertRow(-1);

        // Add a checkbox cell
        const checkboxCell = newRow.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkboxCell.appendChild(checkbox);

        const dataOrder = ['first_name', 'last_name', 'gender', 'tel', 'email', 'password', 'birthdate', 'genres[]', 'file'];

        for (const inputName of dataOrder) {
            const input = form.elements[inputName];
            const cell = newRow.insertCell();

            if (inputName === 'file') {
                const fileInput = input;
                if (fileInput.files.length > 0) {
                    const image = document.createElement('img');
                    image.src = URL.createObjectURL(fileInput.files[0]);
                    image.width = 100;
                    cell.appendChild(image);
                } else {
                    cell.textContent = 'No file selected';
                }
            } else if (inputName === 'genres[]') {
                cell.textContent = input.options[input.selectedIndex].text;
            } else if (inputName === 'gender') {
                const genderInput = form.querySelector('input[name="gender"]:checked');
                cell.textContent = genderInput ? genderInput.value : 'N/A';
            } else {
                cell.textContent = input.value;
            }
        }
        form.reset();
    }
});

function deleteR() {
    let table = document.getElementById("registrants");
    let checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        let row = checkbox.closest("tr");
        row.parentNode.removeChild(row);
    });
}

function cloneR() {
    let table = document.getElementById("registrants");
    let checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function (checkbox) {
        let row = checkbox.closest("tr");
        let newRow = row.cloneNode(true);
        table.querySelector('tbody').appendChild(newRow);
    });
}




