const roleModal = document.getElementById('roleModal');
const roleForm = document.getElementById('roleForm');
let currentUserId;
let users = [];

function openRoleModal(userId) {
    roleModal.style.display = 'block';
    currentUserId = userId;

    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('userName').innerText = user.nome;
        document.getElementById('userEmail').innerText = user.email;
    } else {
        console.error('Usuário não encontrado!');
    }

    console.log('Modal aberto para o usuário:', user);
}

function closeRoleModal() {
    roleModal.style.display = 'none';
    currentUserId = null;
}

async function ListarUsuarios() {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'GET',
            credentials: 'include'
        });

        const Usuarios = await response.json();
        users = Usuarios.response;

        const tbody = document.querySelector('.users-table tbody');
        tbody.innerHTML = ``;

        const linhasHTML = users.map(user =>
            `
             <tr>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${user.telefone}</td>
                <td>
                    ${user.tipo_id === 1
                        ? `<span class="role-badge admin">Administrador</span>`
                        : `<span class="role-badge cliente">Cliente</span>`}
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="openRoleModal(${user.id})">
                            <i class="fas fa-user-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteUser(${user.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `
        ).join('');

        tbody.innerHTML = linhasHTML;
    } catch (error) {
        console.error('Erro ao listar usuarios:', error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'Erro ao carregar usuários.',
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        });
    }
}

async function deleteUser(id) {
    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

        console.log('userRole real:', decryptedRole);

        if (decryptedRole !== '1') {
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Você não tem permissão para deletar um usuário.',
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
            window.location.href = '/login';
            return;
        }
    }

    // Confirmação com SweetAlert2
    const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você realmente deseja excluir este usuário?",
        icon: 'warning',
        iconColor: '#d33',
        showCancelButton: true,
        confirmButtonColor:' #28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        background: "rgba(0, 0, 0, 1)",
        color: "#F6F6F6",
    });

    if (result.isConfirmed) {
        const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
        try {
            const response = await fetch(`${API_BASE_URL}/deletarUsuario/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                ListarUsuarios();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Usuário excluído com sucesso!',
                    showConfirmButton: false,
                    timer: 2000,
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6",
                });
            } else {
                console.error('Erro ao excluir usuário:', response.status);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: 'Erro ao excluir usuário.',
                    showConfirmButton: false,
                    timer: 2000,
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6",
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        }
    }
}

async function alterarRole() {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    console.log(currentUserId);

    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

        console.log('userRole real:', decryptedRole);

        if (decryptedRole !== '1') {
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Você não tem permissão para alterar um cargo.',
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
            window.location.href = '/login';
            return;
        }
    }

    const userRoleSelect = document.getElementById('userRole');
    const selectedRole = parseInt(userRoleSelect.value);

    try {
        const response = await fetch(`${API_BASE_URL}/atualizarUsuario/${currentUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo_id: selectedRole
            })
        });

        if (!response.ok) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Erro ao alterar cargo.',
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Cargo alterado com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        }

    } catch (error) {
        console.log(error.message);
    }
}

// Filtros
document.getElementById('btnFiltrar').addEventListener('click', () => {
    const filterNome = document.getElementById('filterNome').value.toLowerCase();
    const filterEmail = document.getElementById('filterEmail').value.toLowerCase();
    const filterRole = document.getElementById('filterRole').value;

    const filteredUsers = users.filter(user => {
        return (
            (user.nome.toLowerCase().includes(filterNome) || filterNome === '') &&
            (user.email.toLowerCase().includes(filterEmail) || filterEmail === '') &&
            (user.tipo_id.toString() === filterRole || filterRole === '')
        );
    });

    const tbody = document.querySelector('.users-table tbody');
    tbody.innerHTML = ``;

    const linhasHTML = filteredUsers.map(user =>
        `
         <tr>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>${user.telefone}</td>
            <td>
                ${user.tipo_id === 1
                    ? `<span class="role-badge admin">Administrador</span>`
                    : `<span class="role-badge cliente">Cliente</span>`}
            </td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="openRoleModal(${user.id})">
                        <i class="fas fa-user-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `
    ).join('');

    tbody.innerHTML = linhasHTML;
});

document.getElementById('btnLimpar').addEventListener('click', () => {
    document.getElementById('filterNome').value = '';
    document.getElementById('filterEmail').value = '';
    document.getElementById('filterRole').value = '';
    ListarUsuarios();
});

// Carregar usuários ao iniciar
document.addEventListener('DOMContentLoaded', ListarUsuarios);

window.onload = async () => {
    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (!encryptedRole) {
        Swal.fire({
            position: "center",
            icon: "info",
            title: 'Você não está logado ou não tem permissão para acessar esta página.',
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        });
        window.location.href = '/login';
        return;
    }

    const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
    const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    console.log('userRole real:', decryptedRole);

    if (decryptedRole !== '1') {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'Você não tem permissão para acessar essa página.',
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        });
        window.location.href = '/login';
    }
};
