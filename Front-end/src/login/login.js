document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            // Simulate API call
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                // Handle login success
            }, 2000);
        }
    });
});

function validateInput(input) {
    const wrapper = input.closest('.input-wrapper');
    const errorMessage = wrapper.querySelector('.error-message');
    
    if (input.type === 'email') {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        updateValidation(wrapper, valid, 'Email inválido');
    }
    
    if (input.type === 'password') {
        const valid = input.value.length >= 6;
        updateValidation(wrapper, valid, 'Senha deve ter no mínimo 6 caracteres');
    }
}

function updateValidation(wrapper, valid, message) {
    wrapper.classList.remove('error', 'success');
    wrapper.classList.add(valid ? 'success' : 'error');
    const errorMessage = wrapper.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.toggle('visible', !valid);
    }
}

function validateForm() {
    let valid = true;
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        validateInput(input);
        if (input.closest('.input-wrapper').classList.contains('error')) {
            valid = false;
        }
    });
    return valid;
}

const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#senha');

    togglePassword.addEventListener('click', function() {
        // Toggle password visibility
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
;