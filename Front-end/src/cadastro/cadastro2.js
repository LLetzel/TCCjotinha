document.addEventListener("DOMContentLoaded", function () {
    let dadosPessoais = JSON.parse(localStorage.getItem("cadastroDadosPessoais"));

    if (!dadosPessoais) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Erro ao carregar os dados do cadastro. Retornando à primeira página.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        }).then(() => {
            window.location.href = "/cadastro";
        });
        return;
    }

    document.querySelector('.cadastro-form').addEventListener("submit", function (event) {
        event.preventDefault();

        let telefone = document.querySelector("#telefone").value;
        let email = document.querySelector("#email").value;
        let senha = document.querySelector("#senha").value;
        let confirmPassword = document.querySelector("#confirmar-senha").value;

        if (!telefone || !email || !senha || !confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Atenção",
                text: "Preencha todos os campos.",
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
            return;
        }

        if (senha !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "As senhas não coincidem.",
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
            return;
        }

        let dadosCompletos = {
            ...dadosPessoais,
            telefone,
            email,
            senha,
            confirmPassword
        };


    });
});

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.cadastro-form');
    let dadosPessoais = JSON.parse(localStorage.getItem('cadastroDadosPessoais')) || {};

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            const novosDados = {
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                senha: document.getElementById('senha').value,
                confirmPassword: document.getElementById('confirmar-senha').value
            };

            if (novosDados.senha !== novosDados.confirmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "As senhas não coincidem.",
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6",
                });
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                return;
            }

            const dadosCompletos = { ...dadosPessoais, ...novosDados };
            const API_BASE_URL = window.location.hostname === "localhost"
                ? "http://localhost:3000"
                : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
            try {
                const response = await fetch(`${API_BASE_URL}/cadastro`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosCompletos)
                });

                const result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: result.response,
                        showConfirmButton: false,
                        timer: 2000,
                        background: "rgba(0, 0, 0, 1)",
                        color: "#F6F6F6",
                    }).then(() => {
                        localStorage.removeItem('cadastroDadosPessoais');
                        window.location.href = '/login';
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: result.response,
                        background: "rgba(0, 0, 0, 1)",
                        color: "#F6F6F6",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: result.response,
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6",
                });
                console.error('Erro:', error);
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    });

    const toggleIcons = document.querySelectorAll('.toggle-password');
    toggleIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            const input = icon.closest('.input-wrapper').querySelector('input');
            if (!input) return;

            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');

            icon.classList.toggle('fa-eye', !isPassword);
            icon.classList.toggle('fa-eye-slash', isPassword);
        });
    });
});

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.closest('.input-wrapper').classList.add('error');
        } else {
            input.closest('.input-wrapper').classList.remove('error');
        }
    });
    return isValid;
}
