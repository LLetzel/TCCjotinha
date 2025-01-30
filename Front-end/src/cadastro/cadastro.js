/* filepath: /c:/jotinhaveiculos/src/cadastro/cadastro.js */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.cadastro-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Store form data in sessionStorage
            const formData = {
                nome: document.getElementById('name').value,
                nascimento: document.getElementById('nascimento').value,
                cpf: document.getElementById('cpf').value,
                sexo: document.getElementById('sexo').value
            };
            sessionStorage.setItem('cadastroDadosPessoais', JSON.stringify(formData));
            
            // Redirect with animation
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                window.location.href = './cadastro2.html';
            }, 1000);
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