document.addEventListener('DOMContentLoaded', function () {
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
    async function displayVehicles() {

        const response = await fetch('http://localhost:3000/Carros', {
            method: 'GET',
            credentials: 'include'
        })

        const carros = await response.json();
        allVehicles = carros.cars;

        console.log(allVehicles);



        vehiclesGrid.innerHTML = '';
        //criar um card para cada veiculo
        allVehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.classList.add('card', 'col-md-4', 'mb-4');
            card.innerHTML = `
             <div class="vehicle-card" data-aos="fade-up">
                        <div class="vehicle-image">
                            <img src=${vehicle.imagem1} alt=${vehicle.modelo}>
                        </div>
                        <div class="vehicle-info">
                            <h3>${vehicle.modelo}</h3>
                            <p class="vehicle-details">${vehicle.quilometragem} Km • ${vehicle.ano} •  ${vehicle.cambio}</p>
                            <div class="vehicle-features">
                                <span><i class="fas fa-gas-pump"></i> ${vehicle.combustivel}</span>
                                <span><i class="fas fa-car"></i> ${vehicle.tipo.tipo}</span>
                                <span><i class="fas fa-palette"></i> ${vehicle.cor}</span>
                            </div>
                            <div class="vehicle-price">
                                <span class="price">R$ ${vehicle.preco}</span>
                                <a href="/cardetails" class="details-btn">Ver Detalhes</a>
                            </div>
                        </div>
                    </div>`;
            vehiclesGrid.appendChild(card);
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

    displayVehicles()

    // // Mock data - Replace with your actual data
    // allVehicles = [
    //     {
    //         id: 1,
    //         name: 'T-Cross 200 TSI',
    //         brand: 'Volkswagen',
    //         brandCode: '59',
    //         year: '2023',
    //         price: '120.000',
    //         mileage: '15.000',
    //         fuel: 'Flex',
    //         transmission: 'Automático',
    //         image: '/img/carrosdisponiveis.jpeg'
    //     },
    //     // Add more vehicles here
    // ];

    // // Initial display
    // displayVehicles(allVehicles);
});