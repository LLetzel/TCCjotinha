document.addEventListener('DOMContentLoaded', function() {
    const FIPE_API = 'https://parallelum.com.br/fipe/api/v1/carros';
    const marcaSelect = document.getElementById('marca');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const vehiclesGrid = document.querySelector('.vehicles-grid');
    const anoSelect = document.getElementById('ano');
    const precoSelect = document.getElementById('preco');

    // Array to store all vehicles
    let allVehicles = [];
    
    // Load brands from FIPE API
    async function loadBrands() {
        try {
            const response = await fetch(`${FIPE_API}/marcas`);
            const brands = await response.json();
            
            brands.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand.codigo;
                option.textContent = brand.nome;
                marcaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar marcas:', error);
        }
    }

    // Filter vehicles
    function filterVehicles() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedBrand = marcaSelect.value;
        const selectedYear = anoSelect.value;
        const selectedPrice = precoSelect.value;

        const filteredVehicles = allVehicles.filter(vehicle => {
            const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm) ||
                                vehicle.brand.toLowerCase().includes(searchTerm);
            const matchesBrand = !selectedBrand || vehicle.brandCode === selectedBrand;
            const matchesYear = !selectedYear || vehicle.year === selectedYear;
            
            let matchesPrice = true;
            if (selectedPrice) {
                const price = parseFloat(vehicle.price.replace(/[^0-9]/g, ''));
                const [min, max] = selectedPrice.split('-').map(Number);
                matchesPrice = price >= min && (!max || price <= max);
            }

            return matchesSearch && matchesBrand && matchesYear && matchesPrice;
        });

        displayVehicles(filteredVehicles);
    }

    // Display vehicles in grid
    function displayVehicles(vehicles) {
        vehiclesGrid.innerHTML = '';
        
        vehicles.forEach(vehicle => {
            const card = `
                <div class="vehicle-card" data-aos="fade-up">
                    <div class="vehicle-image">
                        <img src="${vehicle.image}" alt="${vehicle.name}">
                        <span class="vehicle-badge">${vehicle.year}</span>
                    </div>
                    <div class="vehicle-info">
                        <h3>${vehicle.name}</h3>
                        <div class="vehicle-details">${vehicle.brand} • ${vehicle.year}</div>
                        <div class="vehicle-features">
                            <span><i class="fas fa-tachometer-alt"></i>${vehicle.mileage} km</span>
                            <span><i class="fas fa-gas-pump"></i>${vehicle.fuel}</span>
                            <span><i class="fas fa-cog"></i>${vehicle.transmission}</span>
                        </div>
                        <div class="vehicle-price">
                            <span class="price">R$ ${vehicle.price}</span>
                            <a href="/Front-end/src/cardetails/cardetailsfront.html?id=${vehicle.id}" class="details-btn">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            `;
            vehiclesGrid.insertAdjacentHTML('beforeend', card);
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterVehicles);
    searchButton.addEventListener('click', filterVehicles);
    marcaSelect.addEventListener('change', filterVehicles);
    anoSelect.addEventListener('change', filterVehicles);
    precoSelect.addEventListener('change', filterVehicles);

    // Initialize
    loadBrands();

    // Mock data - Replace with your actual data
    allVehicles = [
        {
            id: 1,
            name: 'T-Cross 200 TSI',
            brand: 'Volkswagen',
            brandCode: '59',
            year: '2023',
            price: '120.000',
            mileage: '15.000',
            fuel: 'Flex',
            transmission: 'Automático',
            image: '/Front-end/img/carrosdisponiveis.jpeg'
        },
        // Add more vehicles here
    ];

    // Initial display
    displayVehicles(allVehicles);
});