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
                            localStorage.setItem('userRole', data.response.tipo_id);
                            window.location.href = '/dashboardAdm';
                            return;
                        } else {
                            localStorage.setItem('userRole', data.response.tipo_id);
                            window.location.href = '/home';
                            return;
                        }
        
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

    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    
}

document.addEventListener('DOMContentLoaded', () => {
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
