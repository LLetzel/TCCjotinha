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
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Preencha todos os campos",
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
            return;
        }

        // Ativar loading
        submitButton.disabled = true;
        btnText.style.visibility = 'hidden';
        spinner.style.display = 'inline-block';

        fetch('http://jotinhadb.mysql.database.azure.com:3000/login', {
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

                fetch(`http://jotinhadb.mysql.database.azure.com:3000/usuario/${data.user.id}`, {
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
                            const secretKey = 'letzellindo';

                            const encryptedRole = CryptoJS.AES.encrypt(tipoId.toString(), secretKey).toString();
                            localStorage.setItem('userRole', encryptedRole);
                            localStorage.setItem('userId', data.response.id);
                            const { tipo_id, ...userSemTipoId } = data.response;
                            localStorage.setItem('user', JSON.stringify(userSemTipoId));

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Login realizado com sucesso!",
                                showConfirmButton: false,
                                timer: 2000,
                                background: "rgba(0, 0, 0, 1)",
                                color: "#F6F6F6",
                            }).then(() => {
                                if (tipoId === 1) {
                                    window.location.href = '/dashboardAdm';
                                } else {
                                    window.location.href = '/home';
                                }
                            });

                        } catch (cryptoError) {
                            console.error('Erro ao criptografar userRole:', cryptoError);
                            localStorage.setItem('userRole', data.response.tipo_id);

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Login realizado com sucesso!",
                                showConfirmButton: false,
                                timer: 2000,
                                background: "rgba(0, 0, 0, 1)",
                                color: "#F6F6F6",
                            }).then(() => {
                                if (data.response.tipo_id === 1) {
                                    window.location.href = '/dashboardAdm';
                                } else {
                                    window.location.href = '/home';
                                }
                            });
                        }
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Erro ao verificar o usuário",
                            showConfirmButton: false,
                            timer: 2000,
                            background: "rgba(0, 0, 0, 1)",
                            color: "#F6F6F6",
                        });
                    }
                })
                .catch(err => {
                    console.error('Erro de conexão com o servidor na segunda requisição:', err);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Erro ao carregar dados do usuário",
                        showConfirmButton: false,
                        timer: 2000,
                        background: "rgba(0, 0, 0, 1)",
                        color: "#F6F6F6",
                    });
                });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: data.response || "Erro ao fazer login",
                    showConfirmButton: false,
                    timer: 2000,
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6",
                });
            }
        })
        .catch(err => {
            console.error('Erro de conexão com o servidor na primeira requisição:', err);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Erro ao conectar com o servidor",
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        })
        .finally(() => {
            // Restaurar botão
            spinner.style.display = 'none';
            btnText.style.visibility = 'visible';
            submitButton.disabled = false;
        });
    } catch (generalError) {
        console.error('Erro geral na função entrar:', generalError);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Erro inesperado ao processar o login",
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        });
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
