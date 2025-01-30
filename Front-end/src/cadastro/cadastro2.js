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
            }
        });

        if (!valid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
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

    // ...existing code for CEP API and password toggle...
});