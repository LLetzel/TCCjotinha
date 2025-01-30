document.addEventListener('DOMContentLoaded', () => {
    // Get modal elements
    const personalModal = document.getElementById('editPersonalModal');
    const addressModal = document.getElementById('editAddressModal');
    const closeButtons = document.getElementsByClassName('close');
    const cancelButtons = document.getElementsByClassName('cancel-btn');

    // Get edit buttons
    const editPersonalBtn = document.querySelector('.content-section:nth-child(1) .edit-btn');
    const editAddressBtn = document.querySelector('.content-section:nth-child(2) .edit-btn');

    // Personal Info Edit
    editPersonalBtn.onclick = () => {
        personalModal.style.display = 'block';
        // Fill form with current values
        document.getElementById('editName').value = document.querySelector('.info-item:nth-child(1) p').textContent;
        document.getElementById('editCpf').value = document.querySelector('.info-item:nth-child(2) p').textContent;
        document.getElementById('editBirthdate').value = formatDateForInput(document.querySelector('.info-item:nth-child(3) p').textContent);
        document.getElementById('editPhone').value = document.querySelector('.info-item:nth-child(4) p').textContent;
    };

    // Address Edit
    editAddressBtn.onclick = () => {
        addressModal.style.display = 'block';
        // Fill form with current values
        document.getElementById('editCep').value = document.querySelector('.content-section:nth-child(2) .info-item:nth-child(1) p').textContent;
        document.getElementById('editStreet').value = document.querySelector('.content-section:nth-child(2) .info-item:nth-child(2) p').textContent;
        document.getElementById('editNeighborhood').value = document.querySelector('.content-section:nth-child(2) .info-item:nth-child(3) p').textContent;
        document.getElementById('editCity').value = document.querySelector('.content-section:nth-child(2) .info-item:nth-child(4) p').textContent;
    };

    // Close modal handlers
    Array.from(closeButtons).forEach(btn => {
        btn.onclick = () => {
            personalModal.style.display = 'none';
            addressModal.style.display = 'none';
        };
    });

    Array.from(cancelButtons).forEach(btn => {
        btn.onclick = () => {
            personalModal.style.display = 'none';
            addressModal.style.display = 'none';
        };
    });

    // Click outside modal to close
    window.onclick = (event) => {
        if (event.target === personalModal || event.target === addressModal) {
            personalModal.style.display = 'none';
            addressModal.style.display = 'none';
        }
    };

    // Form submissions
    document.getElementById('editPersonalForm').onsubmit = (e) => {
        e.preventDefault();
        // Update personal info
        document.querySelector('.info-item:nth-child(1) p').textContent = document.getElementById('editName').value;
        document.querySelector('.info-item:nth-child(2) p').textContent = document.getElementById('editCpf').value;
        document.querySelector('.info-item:nth-child(3) p').textContent = formatDateForDisplay(document.getElementById('editBirthdate').value);
        document.querySelector('.info-item:nth-child(4) p').textContent = document.getElementById('editPhone').value;
        
        personalModal.style.display = 'none';
        showNotification('Informações pessoais atualizadas com sucesso!');
    };

    document.getElementById('editAddressForm').onsubmit = (e) => {
        e.preventDefault();
        // Update address info
        document.querySelector('.content-section:nth-child(2) .info-item:nth-child(1) p').textContent = document.getElementById('editCep').value;
        document.querySelector('.content-section:nth-child(2) .info-item:nth-child(2) p').textContent = document.getElementById('editStreet').value;
        document.querySelector('.content-section:nth-child(2) .info-item:nth-child(3) p').textContent = document.getElementById('editNeighborhood').value;
        document.querySelector('.content-section:nth-child(2) .info-item:nth-child(4) p').textContent = document.getElementById('editCity').value;
        
        addressModal.style.display = 'none';
        showNotification('Endereço atualizado com sucesso!');
    };

    // Smooth transitions between tabs
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Set initial active tab
    document.querySelector('[data-tab="personal"]').classList.add('active');
    document.getElementById('personal').style.display = 'block';
    document.getElementById('personal').style.opacity = '1';

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            
            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Hide all tabs with transition
            tabContents.forEach(content => {
                if (content.id !== target) {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show target tab with transition
            const activeContent = document.getElementById(target);
            activeContent.style.display = 'block';
            setTimeout(() => {
                activeContent.style.opacity = '1';
            }, 50);
        });
    });

    // Add CSS transitions
    tabContents.forEach(content => {
        content.style.transition = 'opacity 0.3s ease';
    });

    // Vehicle display functionality
    const vehiclesContent = document.getElementById('vehicles');
    if (vehiclesContent) {
        // Example vehicle data - replace with your actual data
        // const vehicles = [
        //     {
        //         name: 'VW T-Cross',
        //         year: '2023',
        //         price: 'R$ 120.000',
        //         image: 'img/carrosdisponiveis.jpeg'
        //     },
        //     // Add more vehicles as needed
        // ];

        // Create vehicle cards
        const vehiclesGrid = vehiclesContent.querySelector('.vehicles-grid');
        if (vehiclesGrid) {
            vehicles.forEach(vehicle => {
                const card = document.createElement('div');
                card.className = 'vehicle-card';
                card.innerHTML = `
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                    <div class="vehicle-info">
                        <h3>${vehicle.name}</h3>
                        <p>Ano: ${vehicle.year}</p>
                        <p>Valor: ${vehicle.price}</p>
                    </div>
                `;
                vehiclesGrid.appendChild(card);
            });
        }
    }

    // Settings functionality
    const settingsContent = document.getElementById('settings');
    if (settingsContent) {
        settingsContent.style.display = 'none';
        settingsContent.style.opacity = '0';
    }

    // Add hover animations for cards
    const cards = document.querySelectorAll('.vehicle-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height / 2) / 20}deg)
                rotateY(${-(x - rect.width / 2) / 20}deg)
                translateY(-5px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Delete vehicle functionality with delegation
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    if (vehiclesGrid) {
        vehiclesGrid.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn) {
                e.preventDefault();
                const card = deleteBtn.closest('.vehicle-card');
                
                showConfirmDialog('Tem certeza que deseja remover este veículo?')
                    .then((confirmed) => {
                        if (confirmed) {
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                card.remove();
                                showNotification('Veículo removido com sucesso!');
                            }, 300);
                        }
                    });
            }
        });
    }

    // Add vehicle button functionality
    const addVehicleBtn = document.querySelector('.add-vehicle-btn');
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', () => {
            window.location.href = '/src/consignar/consignar.html';
            showNotification('Redirecionando para página de consignação...');
        });
    }

    // Change password functionality
    const modal = document.getElementById('changePasswordModal');
    const changePasswordBtn = document.querySelector('.settings-btn');
    const closeBtn = modal.querySelector('.close');
    const form = document.getElementById('changePasswordForm');
    
    changePasswordBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
    });

    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(icon => {
        icon.addEventListener('click', () => {
            const input = icon.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const currentPass = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;

        if (!currentPass || !newPass || !confirmPass) {
            showNotification('Preencha todos os campos!', 'error');
            return;
        }

        if (newPass !== confirmPass) {
            showNotification('As senhas não coincidem!', 'error');
            return;
        }

        if (newPass.length < 6) {
            showNotification('A senha deve ter no mínimo 6 caracteres!', 'error');
            return;
        }

        try {
            await simulatePasswordChange(currentPass, newPass);
            
            closeModal();
            form.reset();
            showNotification('Senha alterada com sucesso!', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            form.reset();
        }, 300);
    }

    async function simulatePasswordChange(currentPass, newPass) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (currentPass === 'senha123') {
                    resolve();
                } else {
                    reject(new Error('Senha atual incorreta!'));
                }
            }, 1000);
        });
    }

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Avatar change functionality
    const avatarModal = document.getElementById('changeAvatarModal');
    const editAvatarBtn = document.querySelector('.edit-avatar');
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarForm = document.getElementById('avatarForm');
    const profileAvatar = document.querySelector('.profile-avatar img');

    editAvatarBtn.addEventListener('click', () => {
        avatarModal.style.display = 'block';
        setTimeout(() => avatarModal.classList.add('show'), 10);
    });

    // Close modal when clicking X or outside
    avatarModal.querySelector('.close').addEventListener('click', closeAvatarModal);
    window.addEventListener('click', (e) => {
        if (e.target === avatarModal) closeAvatarModal();
    });

    // Preview selected image
    avatarInput.addEventListener('change', () => {
        const file = avatarInput.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                showNotification('A imagem deve ter menos de 5MB', 'error');
                avatarInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submit
    avatarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!avatarInput.files[0]) {
            showNotification('Selecione uma imagem', 'error');
            return;
        }

        // Update profile image
        profileAvatar.src = avatarPreview.src;
        showNotification('Foto de perfil atualizada com sucesso!');
        closeAvatarModal();
    });

    function closeAvatarModal() {
        avatarModal.classList.remove('show');
        setTimeout(() => {
            avatarModal.style.display = 'none';
            avatarForm.reset();
            avatarPreview.src = profileAvatar.src;
        }, 300);
    }
});

function formatDateForInput(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
}

function formatDateForDisplay(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
}

// Custom confirmation dialog
function showConfirmDialog(message) {
    return new Promise((resolve) => {
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-content">
                <p>${message}</p>
                <div class="confirm-buttons">
                    <button class="confirm-yes">Sim</button>
                    <button class="confirm-no">Não</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);

        setTimeout(() => dialog.classList.add('show'), 10);

        dialog.addEventListener('click', (e) => {
            if (e.target.classList.contains('confirm-yes')) {
                dialog.remove();
                resolve(true);
            } else if (e.target.classList.contains('confirm-no') || e.target === dialog) {
                dialog.remove();
                resolve(false);
            }
        });
    });
}

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}