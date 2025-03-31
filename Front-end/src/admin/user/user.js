const roleModal = document.getElementById('roleModal');
const roleForm = document.getElementById('roleForm');
let currentUserId;

window.onload = async () => {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (!userId || userId == 'undefined' || userRole == 2 || userId == null) {
        window.location.href = '/login';
        return;
    }
};

function openRoleModal(userId) {
    roleModal.style.display = 'block';
    currentUserId = userId;

    // Busca o usuário na lista carregada
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
    try {
        //Fazer o GET
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'GET',
            credentials: 'include'
        }

        );

        const Usuarios = await response.json();
        users = Usuarios.response;


        //selecionando o lugar no html
        const tbody = document.querySelector('.users-table tbody')
        //limpar o conteudo
        tbody.innerHTML = ``

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
        ).join('')

        tbody.innerHTML = linhasHTML;
    } catch (error) {
        console.error('Erro ao listar usuarios:', error);
        alert('Erro ao carregar usuarios', 'erro');

    }
}



async function deleteUser(id) {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== '1') {
        alert('Você não tem permissão para excluir usuários!');
        return;

    }
    if (confirm('Tem certeza que deseja excluir esse usuário?')) {

        try {
            const response = await fetch(`http://localhost:3000/deletarUsuario/${id}`, {
                method: 'DELETE',
            })

            console.log(id)

            if (response.ok) {
                ListarUsuarios();
                alert('Usuário excluído com sucesso!', 'sucesso');
            } else {
                alert('Erro ao excluir usuário', 'erro');
                console.error('Erro ao excluir usuário:', response.status);
            }

        } catch (error) {
            alert(error.message);
        }
    }
}



async function alterarRole() {

    console.log(currentUserId)

    const userRole = localStorage.getItem('userRole');
    if (userRole !== '1') {
        alert('Você não tem permissão para alterar cargos!');
        return;
    }

    const userRoleSelect = document.getElementById('userRole');
    const selectedRole = parseInt(userRoleSelect.value);

    try {
        const response = await fetch(`http://localhost:3000/atualizarUsuario/${currentUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo_id: selectedRole
            })
        });

        if (!response.ok) {
            alert('Erro ao alterar cargo.');
        } else {
            alert('Cargo alterado com sucesso!');
        }

    } catch (error) {
        console.log(error.message);
    }
}


// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', ListarUsuarios);