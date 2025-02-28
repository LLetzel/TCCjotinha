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

// Form submission handler
carForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Criar objeto FormData para enviar dados do formulário
    const formData = new FormData();

    // Adiciona os campos básicos do carro
    formData.append('marca', document.getElementById('marca').value);
    formData.append('modelo', document.getElementById('modelo').value);
    formData.append('ano', document.getElementById('ano').value);
    formData.append('preco', document.getElementById('preco').value);
    formData.append('quilometragem', document.getElementById('quilometragem').value);
    formData.append('combustivel', document.getElementById('combustivel').value);
    formData.append('cambio', document.getElementById('cambio').value);
    formData.append('cor', document.getElementById('cor').value);
    formData.append('descricao', document.getElementById('descricao').value);

    // Configuração base do caminho das imagens
    const baseImagePath = '/Front-end/img/imgcarros/';

    // Processa cada imagem
    for (let i = 1; i <= 5; i++) {
        const inputId = `imagem${i}`;
        const fileInput = document.getElementById(inputId);
        const file = fileInput.files[0];

        if (file) {
            // Gera nome único para o arquivo usando timestamp
            const timestamp = new Date().getTime();
            const fileName = `${timestamp}_${file.name}`;
            const filePath = baseImagePath + fileName;

            // Adiciona arquivo e caminho ao FormData
            formData.append(inputId, file);
            formData.append(`${inputId}Path`, filePath);
        }
    }

    // Adiciona status e tipo (necessários pelo modelo)
    formData.append('status_id', 1); // 1 = Disponível
    formData.append('tipo_id', 1);   // 1 = Novo (ajuste conforme necessário)

    try {
        // Define URL baseada se está editando ou criando
        const url = editingCarId 
            ? `http://localhost:3006/AtualizarCarro/${editingCarId}`
            : 'http://localhost:3006/RegistroCarro';

        // Configuração da requisição
        const response = await fetch(url, {
            method: editingCarId ? 'PUT' : 'POST',
            body: formData,
            credentials: 'include' // Necessário para enviar cookies de autenticação
        });

        const data = await response.json();

        if (data.success) {
            // Fecha o modal e atualiza a lista
            modal.style.display = 'none';
            loadCars(); // Função para recarregar a lista de carros
        } else {
            alert(data.response || 'Erro ao salvar o carro');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar o carro');
    }
});

/*
NOTAS PARA INTEGRAÇÃO COM BACKEND:

1. No Backend (carsController.js):
   - Usar multer para processar upload de arquivos
   - Configurar armazenamento das imagens em /Front-end/img/imgcarros/
   - Salvar caminhos das imagens no banco

2. Configuração Multer necessária:
   const storage = multer.diskStorage({
     destination: './Front-end/img/imgcarros/',
     filename: (req, file, cb) => {
       cb(null, Date.now() + '_' + file.originalname)
     }
   });

3. Rotas necessárias:
   - POST /RegistroCarro (criar)
   - PUT /AtualizarCarro/:id (atualizar)
   - Ambas precisam processar múltiplos arquivos

4. Modelo do Banco:
   - Todos os campos estão alinhados com o modelo Cars
   - Campos de imagem armazenam os caminhos
   - status_id e tipo_id são obrigatórios

5. Autenticação:
   - Usar credentials: 'include' para sessão
   - Verificar middleware isAuthenticated
   - Verificar permissões (checkPermissions)
*/

// Update loadCars function to include featured toggle
async function loadCars() {
    try {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        const featuredResponse = await fetch('/api/featured-cars');
        const featured = await featuredResponse.json();
        
        const tbody = document.getElementById('carsTableBody');
        tbody.innerHTML = '';
        
        cars.forEach(car => {
            const isFeatured = featured.some(f => f.id_carro === car.id);
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
                        <button class="feature-toggle ${isFeatured ? 'featured' : ''}" 
                                onclick="toggleFeatured(${car.id})">
                            <i class="fas fa-star"></i>
                        </button>
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
        
        updateFeaturedDisplay(featured);
    } catch (error) {
        console.error('Erro ao carregar veículos:', error);
    }
}

async function updateFeaturedDisplay(featured) {
    const container = document.querySelector('.featured-grid');
    container.innerHTML = '';
    
    // Add featured cars
    featured.forEach(car => {
        container.innerHTML += `
            <div class="featured-slot">
                <div class="featured-car">
                    <img src="${car.imagem1 || '../../img/no-image.jpg'}" alt="${car.modelo}">
                    <div class="featured-details">
                        <h3>${car.marca} ${car.modelo}</h3>
                        <p>R$ ${car.preco.toLocaleString()}</p>
                    </div>
                    <button class="remove-featured" onclick="removeFeatured(${car.id})">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    // Add empty slots
    const emptySlots = 3 - featured.length;
    for(let i = 0; i < emptySlots; i++) {
        container.innerHTML += `
            <div class="featured-slot empty">
                <div class="empty-state">
                    <i class="fas fa-plus-circle"></i>
                    <p>Selecione um carro da lista</p>
                </div>
            </div>
        `;
    }
}

async function toggleFeatured(carId) {
    try {
        const featured = document.querySelector(`button[onclick="toggleFeatured(${carId})"]`);
        if (featured.classList.contains('featured')) {
            await removeFeatured(carId);
        } else {
            await addFeatured(carId);
        }
        
        loadCars(); // Refresh display
    } catch (error) {
        console.error('Erro ao alterar destaque:', error);
    }
}

// Delete car
async function deleteCar(id) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        try {
            const response = await fetch(`http://localhost:3000/DeletarCarro/${id}`, {
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

let featuredCars = [];

function toggleFeatured(carId) {
    if (featuredCars.includes(carId)) {
        removeFeatured(carId);
    } else {
        addFeatured(carId);
    }
}

function addFeatured(carId) {
    if (featuredCars.length >= 3) {
        alert('Máximo de 3 carros em destaque atingido');
        return;
    }
    
    featuredCars.push(carId);
    updateFeaturedDisplay();
    saveFeaturedCars();
}

function removeFeatured(carId) {
    featuredCars = featuredCars.filter(id => id !== carId);
    updateFeaturedDisplay();
    saveFeaturedCars();
}

async function saveFeaturedCars() {
    try {
        await fetch('/api/featured-cars', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ featuredCars })
        });
    } catch (error) {
        console.error('Erro ao salvar carros em destaque:', error);
    }
}

function updateFeaturedDisplay() {
    const slots = document.querySelectorAll('.featured-slot');
    // Update featured slots display
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