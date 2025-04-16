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

    submitButton.classList.add('loading');
    submitButton.disabled = true;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include', // Isso permite enviar e receber cookies!
        body: JSON.stringify({ email, senha })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Usuário ou senha inválidos');
        }
        return res.json();
    })
    .then(data => {
        // Agora o token está no cookie, então só usa os dados do user que vieram no response
        const userId = data.user.id;
        const userRole = data.user.role;

        // // Você ainda pode guardar o ID e a role se quiser (não é tão sensível)
        // localStorage.setItem('userId', userId);
        // localStorage.setItem('userRole', userRole);

        // Redirecionamento baseado no papel
        if (userRole === 1) {
            window.location.href = '/dashboardAdm';
        } else {
            window.location.href = '/home';
        }
    })
    .catch((err) => {
        console.error('Erro:', err.message);
        alert(err.message || 'Erro de conexão com o servidor');
    })
    .finally(() => {
        emailInput.value = '';
        senhaInput.value = '';
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword');
    const senhaInput = document.querySelector('#senha');

    if (!togglePassword || !senhaInput) {
        console.error('Elemento de senha ou ícone de toggle não encontrado.');
        return;
    }

    togglePassword.addEventListener('click', () => {
        // Alterna o tipo do input entre 'password' e 'text'
        const isPassword = senhaInput.getAttribute('type') === 'password';
        senhaInput.setAttribute('type', isPassword ? 'text' : 'password');

        // Alterna os ícones
        if (isPassword) {
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });
});
    

