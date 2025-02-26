// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.querySelector('.login-form');
//     const emailInput = document.getElementById('email');
//     const passwordInput = document.getElementById('senha');
//     const submitButton = document.querySelector('.submit-btn');
//     const togglePassword = document.getElementById('togglePassword');

//     // Toggle password visibility
//     togglePassword.addEventListener('click', () => {
//         const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//         passwordInput.setAttribute('type', type);
//         togglePassword.classList.toggle('fa-eye');
//         togglePassword.classList.toggle('fa-eye-slash');
//     });

//     loginForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         // Show loading state
//         submitButton.classList.add('loading');
//         submitButton.disabled = true;

//         try {
//             const response = await fetch('http://localhost:3006/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: emailInput.value,
//                     senha: passwordInput.value
//                 }),
//                 credentials: 'include'
//             });

//             const data = await response.json();

//             if (data.success) {
//                 // Store user info
//                 sessionStorage.setItem('userId', data.user.id);
//                 sessionStorage.setItem('userRole', data.user.tipo_id);

//                 // Redirect based on role
//                 if (data.user.tipo_id === 1) {
//                     window.location.href = '/Front-end/src/admin/dashboard/dashboard.html';
//                 } else {
//                     window.location.href = '/Front-end/src/home/home.html';
//                 }
//             } else {
//                 showError(data.response || 'Erro ao fazer login');
//             }
//         } catch (error) {
//             showError('Erro de conexão com o servidor');
//         } finally {
//             submitButton.classList.remove('loading');
//             submitButton.disabled = false;
//         }
//     });

//     function showError(message) {
//         const existingError = document.querySelector('.error-message');
//         if (existingError) existingError.remove();

//         const errorDiv = document.createElement('div');
//         errorDiv.className = 'error-message';
//         errorDiv.textContent = message;
//         submitButton.parentNode.insertBefore(errorDiv, submitButton);

//         setTimeout(() => errorDiv.remove(), 5000);
//     }
// });

function entrar() {
    const emailInput = document.querySelector('#email');
    const senhaInput = document.querySelector('#senha');
    const email = emailInput.value;
    const senha = senhaInput.value;
    const submitButton = document.querySelector('.submit-btn');

    if (!email || !senha) {
        alert('Preencha todos os campos');
        return;
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha }),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('userId', data.user.id);
                sessionStorage.setItem('userRole', data.user.tipo_id);

                if (data.user.tipo_id === 1) {
                    window.location.href = '/Front-end/src/admin/dashboard/dashboard.html';
                } else {
                    window.location.href = '/Front-end/src/home/home.html';
                }
            } else {
                alert(data.response || 'Erro ao fazer login');
            }
        })
        .catch(() => {
            
                  console.log('erro de conexão com o servidor', err);
            alert('Erro de conexão com o servidor');
        });

    emailInput.value = '';
    senhaInput.value = '';
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const submitButton = document.querySelector('.submit-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        entrar();
    }
    );
});