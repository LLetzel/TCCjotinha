document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.cadastro-form');

    document.getElementById('name').addEventListener('input', function (e) {
        this.value = this.value.replace(/[0-9]/g, ''); 
        
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            // Store form data in localStorage
            const formData = {
                nome: document.getElementById('name').value,
                nascimento: document.getElementById('nascimento').value,
                cpf: document.getElementById('cpf').value,
                sexo: document.getElementById('sexo').value
            };
            console.log(formData);
            localStorage.setItem('cadastroDadosPessoais', JSON.stringify(formData));

            // Redirect with animation
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                window.location.href = './cadastro2';
            }, 1000);
        }
    });
});


$(document).ready(function () {
    $('#nascimento').mask('00/00/0000', { placeholder: "DD/MM/AAAA" });
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

    // Validação adicional para o campo de nascimento
    const nascimento = document.getElementById('nascimento').value;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // Formato DD/MM/AAAA
    if (!dateRegex.test(nascimento)) {
        isValid = false;
        document.getElementById('nascimento').closest('.input-wrapper').classList.add('error');
    
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Por favor, insira uma data válida.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        });
    } else {
        // Validação de dias, meses e ano
        const [dia, mes, ano] = nascimento.split('/').map(Number);
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();

        // Verifica se o ano é válido
        if (ano > anoAtual) {
            isValid = false;
            document.getElementById('nascimento').closest('.input-wrapper').classList.add('error');
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "O ano não pode ser maior que o ano atual.",
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        } else {
            // Verifica se o mês e o dia são válidos
            const ultimoDiaMes = new Date(ano, mes, 0).getDate(); // Obtém o último dia do mês
            if (mes < 1 || mes > 12 || dia < 1 || dia > ultimoDiaMes) {
                isValid = false;
                document.getElementById('nascimento').closest('.input-wrapper').classList.add('error');
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Por favor, insira uma data válida com dias e meses corretos.",
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6",
                });
            } else {
                document.getElementById('nascimento').closest('.input-wrapper').classList.remove('error');
            }
        }
    }

    return isValid;
}
