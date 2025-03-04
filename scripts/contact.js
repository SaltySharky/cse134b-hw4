document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const messageInfo = document.querySelector('.info-message');

    // RegEx for validation
    const namePattern = /^[A-Za-z\s\-']+$/; // Allows letters, spaces, hyphens, and apostrophes
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const messagePattern = /^[A-Za-z0-9\s.,!?\-']+$/; // Allows alphanumeric, spaces, and basic punctuation

    // Array to store form errors
    let form_errors = [];

    // Function to flash the input field and show error message
    function showError(field, errorElement, message) {
        field.classList.add('flash-error'); // flash the field by adding a CSS class
        errorElement.textContent = message; // display the error message

        // remove the flash effect and error message after 2 seconds
        setTimeout(() => {
            field.classList.remove('flash-error');
            errorElement.textContent = '';
        }, 2000);

        // log error
        form_errors.push({
            field: field.name,
            message: message,
            timestamp: new Date().toISOString(),
        });
    }

    // Function to update character count for the textarea
    function updateCharCount() {
        // display info according to the remaining char count
        const remaining = messageInput.maxLength - messageInput.value.length;
        messageInfo.textContent = `${remaining} characters remaining`;

        // change the style based on the remaining char
        if (remaining <= 0) {
            messageInfo.style.color = 'var(--warning-red)';
        } else if (remaining <= 20) {
            messageInfo.style.color = 'var(--warning-yellow)';
        } else {
            messageInfo.style.color = 'var(--text-color)'; // reset to default
        }
    }

    // Event listener for name input
    nameInput.addEventListener('input', function (e) {
        if (!namePattern.test(e.target.value)) {
            showError(nameInput, nameError, 'Only letters, spaces, hyphens, and apostrophes are allowed.');
            e.target.value = e.target.value.replace(/[^A-Za-z\s\-']/g, ''); // remove disallowed characters
        }
    });

    // Event listener for email input
    emailInput.addEventListener('input', function (e) {
        if (!emailPattern.test(e.target.value)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
        }
    });

    // Event listener for message textarea
    messageInput.addEventListener('input', function (e) {
        if (!messagePattern.test(e.target.value)) {
            showError(messageInput, messageError, 'Only letters, numbers, spaces, and basic punctuation are allowed.');
            e.target.value = e.target.value.replace(/[^A-Za-z0-9\s.,!?\-']/g, ''); // remove disallowed characters
        }
        updateCharCount();
    });

    // Submit the form with form_errors
    form.addEventListener('submit', function (e) {
        // Add form_errors to the form as a hidden input
        if (form_errors.length > 0) {
            const formErrorsInput = document.createElement('input');
            formErrorsInput.type = 'hidden';
            formErrorsInput.name = 'form-errors';
            formErrorsInput.value = JSON.stringify(form_errors);
            form.appendChild(formErrorsInput);
        }
    });
});