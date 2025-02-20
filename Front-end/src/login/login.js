document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form'); // Seleciona o formulário
    const inputs = form.querySelectorAll('input');      // Seleciona os campos de entrada

    // Adiciona a validação ao sair do campo (blur)
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
    });

    // Evento de envio do formulário (submit)
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        if (validateForm()) { // Verifica se o formulário está válido
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.classList.add('loading'); // Ativa o spinner de carregamento

            // Coleta os dados do formulário
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                // Faz a requisição para a API de login do backend
                const response = await fetch('http://localhost:3006/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha }) // Envia os dados em JSON
                });

                const data = await response.json(); // Converte a resposta para JSON

                if (response.ok) {
                    alert('Login bem-sucedido!');
                    localStorage.setItem('token', data.token); // Salva o token no armazenamento local
                    window.location.href = '/Front-end/src/home/home.html'; // Redireciona após o login
                } else {
                    alert(data.error || 'Falha no login. Verifique suas credenciais.');
                }
            } catch (error) {
                console.error('Erro ao fazer login:', error);
                alert('Erro ao conectar com o servidor.');
            } finally {
                submitBtn.classList.remove('loading'); // Remove o carregamento, independente do resultado
            }
        }
    });
});

// Função para validar cada campo individualmente
function validateInput(input) {
    if (input.value.trim() === '') {
        input.style.borderColor = 'red'; // Destaca o campo vazio
        return false;
    } else {
        input.style.borderColor = ''; // Volta ao normal se estiver preenchido
        return true;
    }
}

// Função para validar o formulário inteiro
function validateForm() {
    const inputs = document.querySelectorAll('.login-form input');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false; // Se algum campo estiver inválido, bloqueia o envio
        }
    });

    return isValid;
}


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

