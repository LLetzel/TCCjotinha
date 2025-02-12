const modal = document.getElementById('carModal');
const carForm = document.getElementById('carForm');
let editingCarId = null;

function openModal(carId = null) {
    modal.style.display = 'block';
    editingCarId = carId;
    
    if (carId) {
        document.getElementById('modalTitle').textContent = 'Editar Veículo';
        // Fetch car data and populate form
        fetchCarData(carId);
    } else {
        document.getElementById('modalTitle').textContent = 'Adicionar Veículo';
        carForm.reset();
    }
}

function closeModal() {
    modal.style.display = 'none';
    carForm.reset();
    editingCarId = null;
}

// Form submission
carForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const fields = ['marca', 'modelo', 'ano', 'preco', 'quilometragem', 
                   'combustivel', 'cambio', 'cor', 'descricao'];
    
    fields.forEach(field => {
        formData.append(field, document.getElementById(field).value);
    });

    // Handle images
    ['imagem1', 'imagem2', 'imagem3'].forEach(imageField => {
        const file = document.getElementById(imageField).files[0];
        if (file) {
            formData.append(imageField, file);
        }
    });

    try {
        const url = editingCarId 
            ? `/api/cars/${editingCarId}` 
            : '/api/cars';
        
        const method = editingCarId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            body: formData
        });

        if (response.ok) {
            closeModal();
            loadCars(); // Refresh table
        } else {
            throw new Error('Erro ao salvar veículo');
        }
    } catch (error) {
        alert(error.message);
    }
});

// Load cars into table
async function loadCars() {
    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        
        const tbody = document.getElementById('carsTableBody');
        tbody.innerHTML = '';
        
        cars.forEach(car => {
            const row = `
                <tr>
                    <td>
                        <img src="${car.imagem1 || '../../img/no-image.jpg'}" alt="${car.modelo}">
                    </td>
                    <td>${car.marca} ${car.modelo}</td>
                    <td>${car.ano}</td>
                    <td>R$ ${car.preco.toLocaleString()}</td>
                    <td>
                        <span class="status-badge ${car.status.toLowerCase()}">
                            ${car.status}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button onclick="openModal(${car.id})" class="edit-btn">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteCar(${car.id})" class="delete-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Erro ao carregar veículos:', error);
    }
}

// Delete car
async function deleteCar(id) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        try {
            const response = await fetch(`/api/cars/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadCars(); // Refresh table
            } else {
                throw new Error('Erro ao excluir veículo');
            }
        } catch (error) {
            alert(error.message);
        }
    }
}

// Search and filter functionality
document.getElementById('searchInput').addEventListener('input', filterCars);
document.getElementById('statusFilter').addEventListener('change', filterCars);
document.getElementById('typeFilter').addEventListener('change', filterCars);

async function filterCars() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const status = document.getElementById('statusFilter').value;
    const type = document.getElementById('typeFilter').value;
    
    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        
        const filteredCars = cars.filter(car => {
            const matchesSearch = (car.marca + ' ' + car.modelo)
                .toLowerCase()
                .includes(search);
            const matchesStatus = !status || car.status_id == status;
            const matchesType = !type || car.tipo_id == type;
            
            return matchesSearch && matchesStatus && matchesType;
        });
        
        displayFilteredCars(filteredCars);
    } catch (error) {
        console.error('Erro ao filtrar veículos:', error);
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', loadCars);