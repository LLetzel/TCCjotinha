document.addEventListener('DOMContentLoaded', () => {
    // Tab Management
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
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
    })

    // Modal Management
    const modals = {
        editPersonal: document.getElementById('editPersonalModal'),
        changePassword: document.getElementById('changePasswordModal'),
        changeAvatar: document.getElementById('changeAvatarModal')
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
    document.querySelector('.edit-avatar').addEventListener('click', () => openModal('changeAvatar'));
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

    async function fetchUserData() {
        try { 
            const response = await fetch(`http://localhost:3000/usuario/${userId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const Dados = await response.json();
            const userData = Dados.response;
            console.log(userData);
            

    
            document.getElementById('userName').textContent = userData.nome;
            document.getElementById('userName2').textContent = userData.nome;
            document.getElementById('userCpf').textContent = userData.cpf;
            document.getElementById('userNascimento').textContent = userData.nascimento;
            document.getElementById('userEmail').textContent = userData.email;
            document.getElementById('userPhone').textContent = userData.telefone;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

        console.log('userRole real:', decryptedRole);

        if (decryptedRole == '1') {
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = '/login';
        }
    }   
    
    if (!userId || userId == 'undefined' || userId == null) {
        alert('Você não tem acesso a essa página');
        window.location.href = '/login';
    } else {
        fetchUserData();
    }
});

async function mudarSenha(event) {
    event.preventDefault();

    const senhaAtual = document.getElementById('currentPassword').value;
    const novaSenha = document.getElementById('newPassword').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        alert('Preencha todos os campos!');
        return;
    }

    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    if (senhaAtual === novaSenha) {
        alert('A nova senha deve ser diferente da senha atual!');
        return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Usuário não autenticado.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/atualizarSenha/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senhaAtual: senhaAtual,
                senha: novaSenha
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.response || 'Erro ao alterar senha');
        }

        alert('Senha alterada com sucesso!');
        console.log('Resposta:', data);
        document.getElementById('changePasswordForm').reset();
    } catch (error) {
        alert(`Erro: ${error.message}`);
        console.error('Erro ao alterar senha:', error);
    }
}
