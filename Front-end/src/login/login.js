function entrar(event) {
    event.preventDefault(); // evita o reload da página
    
    try {
        const emailInput = document.querySelector('#email');
        const senhaInput = document.querySelector('#senha');
        const email = emailInput.value;
        const senha = senhaInput.value;
        const submitButton = document.querySelector('.submit-btn');
        const spinner = submitButton.querySelector('.loading-spinner');
        const btnText = submitButton.querySelector('.btn-text');

        if (!email || !senha) {
            alert('Preencha todos os campos');
            return;
        }

        // Ativar loading
        submitButton.disabled = true;
        btnText.style.visibility = 'hidden';
        spinner.style.display = 'inline-block';

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
                localStorage.setItem('userId', data.user.id);

                fetch(`http://localhost:3000/usuario/${data.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        try {

                            const tipoId = data.response.tipo_id;
                            const secretKey = 'letzellindo'; // guarde com segurança

                            // Criptografar o tipoId (userRole)
                            const encryptedRole = CryptoJS.AES.encrypt(tipoId.toString(), secretKey).toString();
                            localStorage.setItem('userRole', encryptedRole);
                            localStorage.setItem('userId', data.response.id);
                            const { tipo_id, ...userSemTipoId } = data.response;
                            localStorage.setItem('user', JSON.stringify(userSemTipoId));


                            // Redirecionar
                            if (tipoId === 1) {
                                window.location.href = '/dashboardAdm';
                            } else {
                                window.location.href = '/home';
                            }

                        } catch (cryptoError) {
                            console.error('Erro ao criptografar userRole:', cryptoError);
                            localStorage.setItem('userRole', data.response.tipo_id);

                            if (data.response.tipo_id === 1) {
                                window.location.href = '/dashboardAdm';
                            } else {
                                window.location.href = '/home';
                            }
                        }
                    } else {
                        console.log('Erro ao verificar o usuário');
                    }
                })
                .catch(err => {
                    console.error('Erro de conexão com o servidor na segunda requisição:', err);
                    alert('Erro de conexão com o servidor na segunda requisição');
                });
            } else {
                alert(data.response || 'Erro ao fazer login');
            }
        })
        .catch(err => {
            console.error('Erro de conexão com o servidor na primeira requisição:', err);
            alert('Erro de conexão com o servidor na primeira requisição');
        })
        .finally(() => {
            // Restaurar botão
            spinner.style.display = 'none';
            btnText.style.visibility = 'visible';
            submitButton.disabled = false;
        });
    } catch (generalError) {
        console.error('Erro geral na função entrar:', generalError);
        alert('Ocorreu um erro ao processar o login');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('user');

    const togglePassword = document.querySelector('#togglePassword');
    const senhaInput = document.querySelector('#senha');

    if (!togglePassword || !senhaInput) {
        console.error('Elemento de senha ou ícone de toggle não encontrado.');
        return;
    }

    togglePassword.addEventListener('click', () => {
        const isPassword = senhaInput.getAttribute('type') === 'password';
        senhaInput.setAttribute('type', isPassword ? 'text' : 'password');

        if (isPassword) {
            togglePassword.classList.remove('fa-eye');
            togglePassword.classList.add('fa-eye-slash');
        } else {
            togglePassword.classList.remove('fa-eye-slash');
            togglePassword.classList.add('fa-eye');
        }
    });
});
