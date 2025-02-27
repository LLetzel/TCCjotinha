// document.addEventListener('DOMContentLoaded', () => {
//     const contactForm = document.getElementById('contactForm');
//     const addressForm = document.getElementById('addressForm');
//     const nextBtn = document.querySelector('.next-btn');
//     const backBtn = document.querySelector('.back-btn');
//     const progressSteps = document.querySelectorAll('.progress-step');
//     const cadastroForm = document.querySelector('.cadastro-form');

//     // Recuperar dados do localStorage
//     const dadosPessoais = JSON.parse(localStorage.getItem('cadastroDadosPessoais'));

//     if (dadosPessoais) {
//         console.log('Dados Pessoais Recuperados:', dadosPessoais);
//     } else {
//         alert('Dados da primeira etapa não encontrados. Retornando ao início.');
//         window.location.href = './cadastro.html';
//         return;
//     }

//     // Form Navigation
//     nextBtn.addEventListener('click', () => {
//         if (validateContactForm()) {
//             contactForm.classList.remove('active');
//             addressForm.classList.add('active');
//             progressSteps[1].classList.add('active');
//         }
//     });

//     backBtn.addEventListener('click', () => {
//         addressForm.classList.remove('active');
//         contactForm.classList.add('active');
//         progressSteps[1].classList.remove('active');
//     });

//     // Form Validation
//     function validateContactForm() {
//         const required = contactForm.querySelectorAll('[required]');
//         let valid = true;

//         required.forEach(field => {
//             if (!field.value) {
//                 valid = false;
//                 field.classList.add('error');
//             } else {
//                 field.classList.remove('error');
//                 if (field.id === 'adminCode' && field.value !== 'ADMIN123') {
//                     valid = false;
//                     field.classList.add('error');
//                     alert('Código de administrador inválido');
//                 }
//             }
//         });

//         if (!valid) {
//             alert('Por favor, preencha todos os campos obrigatórios corretamente.');
//         }

//         return valid;
//     }

//     // Password Toggle
//     const toggleButtons = document.querySelectorAll('.toggle-password');
//     toggleButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const input = this.previousElementSibling;
//             input.type = input.type === 'password' ? 'text' : 'password';
//             this.classList.toggle('fa-eye');
//             this.classList.toggle('fa-eye-slash');
//         });
//     });

//     // Admin code field toggle
//     const userType = document.getElementById('userType');
//     const adminCodeGroup = document.getElementById('adminCodeGroup');
//     const adminCode = document.getElementById('adminCode');

//     userType.addEventListener('change', function () {
//         if (this.value === 'administrador') {
//             adminCodeGroup.style.display = 'block';
//             adminCode.required = true;
//         } else {
//             adminCodeGroup.style.display = 'none';
//             adminCode.required = false;
//             adminCode.value = '';
//         }
//     });

//     // Form Submission
//     cadastroForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const formData = {
//             nome: dadosPessoais.nome,
//             nascimento: dadosPessoais.nascimento,
//             cpf: dadosPessoais.cpf,
//             sexo: dadosPessoais.sexo,
//             email: document.getElementById('email').value,
//             senha: document.getElementById('senha').value,
//             telefone: document.getElementById('telefone').value,
//             tipo_id: userType.value === 'administrador' ? 1 : 2
//         };

//         const submitBtn = cadastroForm.querySelector('.submit-btn');

//         try {
//             submitBtn.classList.add('loading');

//             if (formData.tipo_id === 1) {
//                 const adminCode = document.getElementById('adminCode').value;
//                 if (adminCode !== 'ADMIN123') {
//                     throw new Error('Código de administrador inválido');
//                 }
//             }

//             const response = await fetch('http://localhost:3000/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Erro no cadastro');
//             }

//             // Limpar localStorage após o cadastro
//             localStorage.removeItem('cadastroDadosPessoais');

//             alert('Cadastro realizado com sucesso!');
//             window.location.href = '/login.html';
//         } catch (error) {
//             alert(error.message);
//         } finally {
//             submitBtn.classList.remove('loading');
//         }
//     });
// });
