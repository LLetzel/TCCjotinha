document.addEventListener("DOMContentLoaded", async function() {

    // Função auxiliar para formatar o preço no padrão BRL
    function formatPrice(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    try {
        const response = await fetch('http://jotinhadb.mysql.database.azure.com:3000/mostrarDestaques', {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        console.log('data:', data);

        const cardsContainer = document.querySelector(".cards");
        // Para cada destaque, cria um card utilizando a mesma estrutura dos cards da página estoque
        data.forEach(carro => {
            cardsContainer.innerHTML += `
                <div class="vehicle-card">
                    <div class="vehicle-image">
                        <img src="${carro.carro.imagem1 || '../../img/no-image.jpg'}" alt="${carro.carro.modelo}">
                    </div>
                    <div class="vehicle-info">
                        <h3>${carro.carro.marca} ${carro.carro.modelo}</h3>
                        <p class="vehicle-details">${carro.carro.quilometragem} Km • ${carro.carro.ano} • ${carro.carro.cambio}</p>
                        <div class="vehicle-features">
                            <span><i class="fas fa-gas-pump"></i> ${carro.carro.combustivel}</span>
                            <span><i class="fas fa-palette"></i> ${carro.carro.cor}</span>
                        </div>
                        <div class="vehicle-price">
                            <span class="price">${formatPrice(parseFloat(carro.carro.preco))}</span>
                            <a href="/cardetails?id=${carro.carro.id}" class="details-btn">Ver Detalhes</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar destaques:', error);
    }

    // Inicializa o swiper conforme a configuração atual
    const swiper = new Swiper(".mySwiper", {
        effect: "fade", // fade effect between slides
        loop: true, // infinite loop
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
        speed: 800, // transition speed
        grabCursor: true,
        fadeEffect: {
            crossFade: true
        },
        keyboard: {
            enabled: true,
        },
        on: {
            init: function() {
                document.querySelector('.swiper').style.opacity = 1;
            }
        }
    });
});
