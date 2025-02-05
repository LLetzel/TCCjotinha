document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const addressForm = document.getElementById('addressForm');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');
    const progressSteps = document.querySelectorAll('.progress-step');

    // Form Navigation
    nextBtn.addEventListener('click', () => {
        if (validateContactForm()) {
            contactForm.classList.remove('active');
            addressForm.classList.add('active');
            progressSteps[1].classList.add('active');
        }
    });

    backBtn.addEventListener('click', () => {
        addressForm.classList.remove('active');
        contactForm.classList.add('active');
        progressSteps[1].classList.remove('active');
    });

    // Form Validation
    function validateContactForm() {
        const required = contactForm.querySelectorAll('[required]');
        let valid = true;

        required.forEach(field => {
            if (!field.value) {
                valid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
                if (field.id === 'adminCode' && field.value !== 'ADMIN123') {
                    valid = false;
                    field.classList.add('error');
                    alert('Código de administrador inválido');
                }
            }
        });

        if (!valid) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
        }

        return valid;
    }

    // Password Toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            // Toggle type
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Admin code field toggle
    const userType = document.getElementById('userType');
    const adminCodeGroup = document.getElementById('adminCodeGroup');
    const adminCode = document.getElementById('adminCode');

    userType.addEventListener('change', function() {
        if (this.value === 'administrador') {
            adminCodeGroup.style.display = 'block';
            adminCode.required = true;
        } else {
            adminCodeGroup.style.display = 'none';
            adminCode.required = false;
            adminCode.value = '';
        }
    });

    // ...existing code for CEP API and password toggle...
});