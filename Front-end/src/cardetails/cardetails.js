document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtém o id do carro a partir dos parâmetros da URL
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        if (!carId) {
            alert('ID do carro não encontrado na URL.');
            return;
        }
        
        // Busca os dados do carro no backend
        const response = await fetch(`http://localhost:3000/Carro/${carId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados do carro.');
        }
        
        // Extração dos dados do carro (suporte para endpoint que retorne { car: {…} } ou {…})
        const data = await response.json();
        const car = data.car || data;
        
        // Preenche os elementos do cardetails front com os dados do banco
        document.querySelector('#carTitle').textContent = `${car.marca} ${car.modelo}`;
        document.querySelector('#carPrice').textContent = `R$ ${Number(car.preco).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
        document.querySelector('#carYear').textContent = `Ano: ${car.ano}`;
        document.querySelector('#carKm').textContent = `${car.quilometragem} km`;
        document.querySelector('#carFuel').textContent = `Combustível: ${car.combustivel}`;
        document.querySelector('#carTransmission').textContent = `Câmbio: ${car.cambio}`;
        document.querySelector('#carIpva').textContent = `IPVA: ${car.ipva}`;
        document.querySelector('#carDoors').textContent = `Portas: ${car.portas || 4}`;
        document.querySelector('#carColor').textContent = `Cor: ${car.cor}`;
        document.querySelector('#carDescription').textContent = car.descricao;
        
        // Informações adicionais, se houver
        document.querySelector('#additionalColor').textContent = car.cor;
        document.querySelector('#additionalDoors').textContent = car.portas || 4;
        document.querySelector('#additionalIpva').textContent = car.ipva;
        document.querySelector('#licensePlate').textContent = car.placa || '--';
        
        // Caso tenha características extras (ex: tipo do carro)
        const featuresGrid = document.querySelector('#featuresGrid');
        featuresGrid.innerHTML = '';
        if (car.tipo && car.tipo.tipo) {
            const featureItem = document.createElement('div');
            featureItem.classList.add('feature-item');
            featureItem.innerHTML = `<i class="fas fa-car"></i><span>${car.tipo.tipo}</span>`;
            featuresGrid.appendChild(featureItem);
        }
        
        // Preenche o carrossel de imagens com as imagens disponíveis do carro
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = '';
        const imageFields = ['imagem1', 'imagem2', 'imagem3', 'imagem4', 'imagem5'];
        imageFields.forEach(field => {
            if (car[field]) {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');
                slide.innerHTML = `<img src="${car[field]}" alt="${car.modelo}" style="width: 100%; height: auto; object-fit: cover;">`;
                swiperWrapper.appendChild(slide);
            }
        });
        
        // Inicializa o slider do carrossel
        const swiper = new Swiper(".mySwiper", {
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            speed: 800,
        });
    } catch (error) {
        console.error('Erro ao carregar os detalhes do carro:', error);
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.style.display = 'block';
        }
    }
});