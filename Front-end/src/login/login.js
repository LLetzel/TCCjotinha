const User = require('../models/user');
const session = require('express-session');

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
            localStorage.setItem('userId', data.user.id);
            console.log(data.user.id);

            // const userRole = Number(localStorage.getItem('userRole'));

            let userId = localStorage.getItem('userId');

            fetch(`http://localhost:3000/usuario/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    
                    if (data) {
                        console.log(data);
                        
                        if (data.response.tipo_id === 1) {
                            localStorage.setItem('userRole',1);
                            window.location.href = '/Front-end/src/admin/dashboard/dashboard.html';
                            return;
                        } else {
                            window.location.href = '/Front-end/src/home/home.html';
                            return;
                        }
                        // if (data.response.tipo_id === 2) {
                        //     window.location.href = '/Front-end/src/home/home.html';
                        //     return;
                        // }
        
                    } 
                    return console.log('Erro ao verificar o usuário');
                })
                .catch((err) => {
                    console.log('erro de conexão com o servidor', err);
                    alert('Erro de conexão com o servidor');
                });
            

        } else {
            alert(data.response || 'Erro ao fazer login');
        }
    })
        .catch((err) => {
            
            console.log('erro de conexão com o servidor', err);
            alert('Erro de conexão com o servidor');
        });

    emailInput.value = '';
    senhaInput.value = '';
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    
}

