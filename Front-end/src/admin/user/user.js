const roleModal = document.getElementById('roleModal');
const roleForm = document.getElementById('roleForm');
let currentUserId = null;

function openRoleModal(userId) {
    roleModal.style.display = 'block';
    currentUserId = userId;
    // Fetch user data and populate modal
    fetchUserData(userId);
}

function closeRoleModal() {
    roleModal.style.display = 'none';
    currentUserId = null;
}

async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        
        document.getElementById('userName').textContent = user.nome;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userRole').value = user.tipo_id;
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }
}

roleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newRole = document.getElementById('userRole').value;
    
    try {
        const response = await fetch(`/api/users/${currentUserId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo_id: newRole })
        });

        if (response.ok) {
            closeRoleModal();
            loadUsers(); // Refresh table
        } else {
            throw new Error('Erro ao alterar tipo de usuário');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Search and filter functionality
document.getElementById('searchUser').addEventListener('input', filterUsers);
document.getElementById('roleFilter').addEventListener('change', filterUsers);

async function filterUsers() {
    const search = document.getElementById('searchUser').value.toLowerCase();
    const role = document.getElementById('roleFilter').value;
    
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        
        const filteredUsers = users.filter(user => {
            const matchesSearch = (user.nome + ' ' + user.email)
                .toLowerCase()
                .includes(search);
            const matchesRole = !role || user.tipo_id == role;
            
            return matchesSearch && matchesRole;
        });
        
        displayFilteredUsers(filteredUsers);
    } catch (error) {
        console.error('Erro ao filtrar usuários:', error);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', loadUsers);