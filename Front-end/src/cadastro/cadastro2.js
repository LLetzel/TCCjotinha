// document.addEventListener("DOMContentLoaded", function () {
//     let dadosPessoais = JSON.parse(localStorage.getItem("cadastroDadosPessoais"));

//     if (!dadosPessoais) {
//         alert("Erro ao carregar os dados do cadastro. Retornando à primeira página.");
//         window.location.href = "./cadastro.html";
//         return;
//     }

//     document.querySelector('.cadastro-form').addEventListener("submit", function (event) {
//         event.preventDefault();

//         let telefone = document.querySelector("#telefone").value;
//         let email = document.querySelector("#email").value;
//         let senha = document.querySelector("#senha").value;
//         let confirmPassword = document.querySelector("#confirmar_senha").value;

//         if (!telefone || !email || !senha || !confirmPassword) {
//             alert("Preencha todos os campos.");
//             return;
//         }

//         if (senha !== confirmPassword) {
//             alert("As senhas não coincidem.");
//             return;
//         }

//         let dadosCompletos = {
//             ...dadosPessoais, // Recupera os dados armazenados na tela 1
//             telefone,
//             email,
//             senha,
//             confirmPassword
//         };

//         fetch("http://localhost:3000/cadastro", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(dadosCompletos),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.success) {
//                     alert("Cadastro realizado com sucesso!");
//                     localStorage.removeItem("cadastroDadosPessoais"); // Limpa os dados após o cadastro
//                     window.location.href = "/Front-end/src/login/login.html";
//                 } else {
//                     alert(data.response);
//                 }
//             })
//             .catch((err) => {
//                 console.error("Erro na requisição:", err);
//                 alert("Erro ao conectar-se com o servidor.");
//             });
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.cadastro-form');

    // Recuperar os dados do cadastro 1 do localStorage
    let dadosPessoais = JSON.parse(localStorage.getItem('cadastroDadosPessoais')) || {};

    form.addEventListener('submit', async (e) => {
        e.preventDefault();


        if (validateForm()) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Capturar novos dados do cadastro 2
            const novosDados = {
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                senha: document.getElementById('senha').value,
                confirmPassword: document.getElementById('confirmar-senha').value
            };

            console.log('Novos Dados:', novosDados);

            if (novosDados.senha !== novosDados.confirmPassword) {
                alert('As senhas não coincidem.');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                return;
            } else{
                console.log('Senhas iguais');
            }

            // console.log('Dados Pessoais:', dadosPessoais);

            // Juntar todos os dados (cadastro1 + cadastro2)
            const dadosCompletos = { ...dadosPessoais, ...novosDados };

            try {
                const response = await fetch('http://localhost:3000/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosCompletos)
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Cadastro realizado com sucesso!');
                    localStorage.removeItem('cadastroDadosPessoais'); // Limpa os dados locais
                    window.location.href = '../login/login.html'; // Redireciona para página de sucesso
                } else {
                    alert(`Erro: ${result.message}`);
                }
            } catch (error) {
                alert('Erro ao enviar os dados. Tente novamente mais tarde.');
                console.error('Erro:', error);
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
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

