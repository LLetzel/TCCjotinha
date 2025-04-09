document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('http://localhost:3000/mostrarDestaques', {
            method: 'GET',
            credentials: 'include',
        }); // ajuste a rota conforme necessário
        const data = await response.json();
        const destaques = data.id_carro;
        console.log('data:', data);

        for (var i = 0; i < data.length; i++) {
            carro = data[i]
            document.querySelector(".cards").innerHTML = document.querySelector(".cards").innerHTML +
            `
                <div class="card">
                    <img src="${carro.carro.imagem1 || '../../img/no-image.jpg'}" alt="${carro.carro.modelo}">
                    <div class="card__content">
                        <p class="card__title">${carro.marca} ${carro.carro.modelo}</p>
                        <p class="card__description">${carro.carro.descricao || 'Descrição indisponível'}</p>
                        <button onclick="window.location.href='/cardetails?id=${carro.carro.id}';" class="card__button">Ver mais</button>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Erro ao carregar destaques:', error);
    }

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
