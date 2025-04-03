document.addEventListener('DOMContentLoaded', () => {
    // Tab Management
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(targetId) {
        // Hide all tabs first
        tabContents.forEach(tab => {
            tab.style.display = 'none';
            tab.style.opacity = '0';
            tab.classList.remove('active');
        });


        // Remove active class from all buttons
        navBtns.forEach(btn => btn.classList.remove('active'));

        // Show selected tab
        const activeTab = document.getElementById(targetId);
        const activeBtn = document.querySelector(`[data-tab="${targetId}"]`);
        
        if (activeTab && activeBtn) {
            activeTab.style.display = 'block';
            activeBtn.classList.add('active');
            
            // Force reflow
            void activeTab.offsetWidth;
            
            // Add active class and fade in
            activeTab.classList.add('active');
            activeTab.style.opacity = '1';
        }
    }

    // Tab click handlers
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            switchTab(targetId);
        });
    });

    // Modal Management
    const modals = {
        editPersonal: document.getElementById('editPersonalModal'),
        changePassword: document.getElementById('changePasswordModal'),
    };

    function openModal(modalId) {
        modals[modalId].style.display = 'block';
        setTimeout(() => modals[modalId].classList.add('show'), 10);
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }

    // Modal triggers
    document.querySelector('.edit-btn').addEventListener('click', () => openModal('editPersonal'));
    document.querySelector('.settings-btn').addEventListener('click', () => openModal('changePassword'));

    // Close buttons
    document.querySelectorAll('.close, .cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Set initial active tab
    switchTab('personal');

    // Add this to the existing DOMContentLoaded event listener
    document.getElementById('editPersonalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPhone = document.getElementById('editPhone').value;
        
        // Update only phone number in profile
        document.querySelector('.info-item:nth-child(4) p').textContent = newPhone;
        
        // Close modal
        closeModal(document.getElementById('editPersonalModal'));
    });

    // Add phone mask
    document.getElementById('editPhone').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        // Format: (XX) XXXXX-XXXX
        if (value.length > 6) {
            value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0,2)}) ${value.slice(2)}`;
        }
        
        e.target.value = value;
    });

    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            // Toggle input type
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const nomeElement = document.getElementById('nome');
    const emailElement = document.getElementById('email');
    const cpfElement = document.getElementById('cpf');
    const nascimentoElement = document.getElementById('nascimento');
    const telefoneElement = document.getElementById('telefone');
  
    const userId = localStorage.getItem('userId');
  
    if (userId) {
      fetch(`http://localhost:3000/infoPerfil/${userId}`)
        .then(response => {
          console.log("Status da resposta:", response.status);
          if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("Dados recebidos:", data);
          if (data && data.nome) {
            nomeElement.textContent = data.nome;
            emailElement.textContent = data.email;
            cpfElement.textContent = data.cpf;
            nascimentoElement.textContent = data.nascimento;
            telefoneElement.textContent = data.telefone;
          } else {
            console.error("Dados inválidos ou vazios:", data);
          }
        })
        .catch(error => {
          console.error('Erro ao buscar perfil:', error);
          // Verifique se:
          // 1. O servidor back-end está rodando e acessível.
          // 2. O endpoint http://localhost:3000/infoPerfil/:userId retorna JSON corretamente.
          // 3. Não há problemas relacionados ao CORS.
        });
    } else {
      console.error('ID de usuário não localizado');
    }
  });