document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const userData = localStorage.getItem('user');

    function switchTab(targetId) {
        tabContents.forEach(tab => {
            tab.style.display = 'none';
            tab.style.opacity = '0';
            tab.classList.remove('active');
        });

        navBtns.forEach(btn => btn.classList.remove('active'));

        const activeTab = document.getElementById(targetId);
        const activeBtn = document.querySelector(`[data-tab="${targetId}"]`);

        if (activeTab && activeBtn) {
            activeTab.style.display = 'block';
            activeBtn.classList.add('active');
            void activeTab.offsetWidth;
            activeTab.classList.add('active');
            activeTab.style.opacity = '1';
        }
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            switchTab(targetId);
        });
    });

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

    document.querySelector('.edit-btn').addEventListener('click', () => openModal('editPersonal'));
    document.querySelector('.settings-btn').addEventListener('click', () => openModal('changePassword'));

    document.querySelectorAll('.close, .cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    switchTab('personal');

    document.getElementById('editPersonalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newPhone = document.getElementById('editPhone').value;
        document.querySelector('.info-item:nth-child(4) p').textContent = newPhone;
        closeModal(document.getElementById('editPersonalModal'));
    });

    document.getElementById('editPhone').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }

        e.target.value = value;
    });

    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
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

document.addEventListener("DOMContentLoaded", async () => {
    const personalInfoItems = document.querySelectorAll(".info-grid .info-item p");
    const navInfoItems = document.querySelectorAll(".profile-container .profile-info p, h1");
    const cadastroDadosPessoaisStr = localStorage.getItem("user");

    if (cadastroDadosPessoaisStr) {
        const cadastroDadosPessoais = JSON.parse(cadastroDadosPessoaisStr);
        personalInfoItems[0].textContent = cadastroDadosPessoais.nome;
        personalInfoItems[1].textContent = cadastroDadosPessoais.cpf;
        personalInfoItems[2].textContent = cadastroDadosPessoais.nascimento;
        personalInfoItems[3].textContent = cadastroDadosPessoais.telefone;
        navInfoItems[0].textContent = cadastroDadosPessoais.nome;
        navInfoItems[1].textContent = cadastroDadosPessoais.email;
    } else {
        await Swal.fire({
            icon: "info",
            title: "Você precisa estar logado para acessar esta página.",
            showConfirmButton: true,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        window.location.href = "/login";
    }
});

document.getElementById('editPersonalForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPhone = document.getElementById('editPhone').value;
    const cadastroStr = localStorage.getItem("user");

    if (!cadastroStr) {
        Swal.fire({
            icon: "error",
            title: "Erro ao encontrar usuário",
            text: "Dados não encontrados no localStorage.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        return;
    }

    const cadastroDadosPessoais = JSON.parse(cadastroStr);
    const userId = cadastroDadosPessoais.id;
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net"

    try {
        const response = await fetch(`${API_BASE_URL}/telefone/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ telefone: newPhone }),
        });

        const result = await response.json();

        if (response.ok) {
            const personalInfoItems = document.querySelectorAll(".info-grid .info-item p");
            personalInfoItems[3].textContent = newPhone;

            cadastroDadosPessoais.telefone = newPhone;
            localStorage.setItem("user", JSON.stringify(cadastroDadosPessoais));

            Swal.fire({
                position: "center",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: result.message || "Erro ao atualizar telefone.",
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6"
            });
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        Swal.fire({
            icon: "error",
            title: "Erro de conexão",
            text: "Erro ao atualizar telefone.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
    }

    const editModal = document.getElementById('editPersonalModal');
    editModal.classList.remove('show');
    setTimeout(() => editModal.style.display = 'none', 300);
});

async function mudarSenha(event) {
    event.preventDefault();

    const senhaAtual = document.getElementById('currentPassword').value;
    const novaSenha = document.getElementById('newPassword').value;
    const confirmarSenha = document.getElementById('confirmPassword').value;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        Swal.fire({
            icon: "info",
            title: "Preencha todos os campos!",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        return;
    }

    if (novaSenha !== confirmarSenha) {
        Swal.fire({
            icon: "error",
            title: "As senhas não coincidem!",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        return;
    }

    if (senhaAtual === novaSenha) {
        Swal.fire({
            icon: "info",
            title: "A nova senha deve ser diferente da atual!",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
        Swal.fire({
            icon: "error",
            title: "Usuário não autenticado.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        return;
    }
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net"

    try {
        const response = await fetch(`${API_BASE_URL}/atualizarSenha/${userId}`, {
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

        Swal.fire({
            icon: "success",
            title: "Senha alterada com sucesso!",
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });

        document.getElementById('changePasswordForm').reset();
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: `Erro: ${error.message}`,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
    }
}
