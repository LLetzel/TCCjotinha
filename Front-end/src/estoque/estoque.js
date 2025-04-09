document.addEventListener('DOMContentLoaded', function () {
    const marcaSelect = document.getElementById('marca');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    const anoSelect = document.getElementById('ano');
    const precoSelect = document.getElementById('preco');

    let allVehicles = [];

    // Formata o valor do preço para o padrão BRL
    function formatPrice(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // Popula o select de marcas com as marcas únicas dos veículos do banco
    function populateBrands(vehicles) {
        const brandSet = new Set();
        vehicles.forEach(vehicle => {
            if (vehicle.marca) {
                // Armazena em lowercase para consistência
                brandSet.add(vehicle.marca.toLowerCase());
            }
        });
        // Define a opção padrão
        marcaSelect.innerHTML = '<option value="">Todas as marcas</option>';
        brandSet.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            // Exemplo: Capitaliza a primeira letra para exibição
            option.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
            marcaSelect.appendChild(option);
        });
    }

    // Filtra os veículos com base na busca, marca, ano e preço
    function filterVehicles() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedBrand = marcaSelect.value;
        const selectedYear = anoSelect.value;
        const selectedPrice = precoSelect.value;

        const filteredVehicles = allVehicles.filter(vehicle => {
            const matchesSearch =
                vehicle.modelo.toLowerCase().includes(searchTerm) ||
                vehicle.marca.toLowerCase().includes(searchTerm);
            const matchesBrand =
                !selectedBrand || vehicle.marca.toLowerCase() === selectedBrand;
            const matchesYear =
                !selectedYear || vehicle.ano.toString() === selectedYear;

            let matchesPrice = true;
            if (selectedPrice) {
                const price = parseFloat(vehicle.preco);
                if (selectedPrice.includes('+')) {
                    const min = parseFloat(selectedPrice.replace('+', ''));
                    matchesPrice = price >= min;
                } else {
                    const [min, max] = selectedPrice.split('-').map(p => parseFloat(p));
                    matchesPrice = price >= min && price <= max;
                }
            }

            return matchesSearch && matchesBrand && matchesYear && matchesPrice;
        });

        displayVehicles(filteredVehicles);
    }

    // Busca os veículos do banco e popula a grid e os filtros
    async function loadVehicles() {
        try {
            const response = await fetch('http://localhost:3000/Carros', {
                method: 'GET',
                credentials: 'include'
            });
            const carros = await response.json();
            allVehicles = carros.cars;

            displayVehicles(allVehicles);
            populateBrands(allVehicles);
        } catch (error) {
            console.error('Erro ao carregar veículos:', error);
        }
    }

    // Renderiza os veículos na grid
    function displayVehicles(vehicles) {
        vehiclesGrid.innerHTML = '';
        vehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.classList.add('card', 'col-md-4', 'mb-4');

            card.innerHTML = `
                <div class="vehicle-card">
                    <div class="vehicle-image">
                        <img src="${vehicle.imagem1}" alt="${vehicle.modelo}">
                    </div>
                    <div class="vehicle-info">
                        <h3>${vehicle.modelo}</h3>
                        <p class="vehicle-details">${vehicle.quilometragem} Km • ${vehicle.ano} • ${vehicle.cambio}</p>
                        <div class="vehicle-features">
                            <span><i class="fas fa-gas-pump"></i> ${vehicle.combustivel}</span>
                            <span><i class="fas fa-car"></i> ${vehicle.tipo?.tipo || ''}</span>
                            <span><i class="fas fa-palette"></i> ${vehicle.cor}</span>
                        </div>
                        <div class="vehicle-price">
                            <span class="price">${formatPrice(parseFloat(vehicle.preco))}</span>
                            <a href="/cardetails?id=${vehicle.id}" class="details-btn">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            `;
            vehiclesGrid.appendChild(card);
        });
    }

    // Eventos para filtrar os veículos conforme a interação do usuário
    searchInput.addEventListener('input', filterVehicles);
    searchButton.addEventListener('click', filterVehicles);
    marcaSelect.addEventListener('change', filterVehicles);
    anoSelect.addEventListener('change', filterVehicles);
    precoSelect.addEventListener('change', filterVehicles);


    displayVehicles()
    loadVehicles();
});
