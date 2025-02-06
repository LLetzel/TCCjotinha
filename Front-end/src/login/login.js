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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const submitBtn = loginForm.querySelector('.submit-btn');

        try {
            submitBtn.classList.add('loading');

            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro no login');
            }

            // Save token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on user type
            if (data.user.tipo_id === 1) {
                window.location.href = '/admin/dashboard.html';
            } else {
                window.location.href = '/perfil.html';
            }

        } catch (error) {
            alert(error.message);
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
});
;