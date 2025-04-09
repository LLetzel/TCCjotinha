
// ----------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const CarContainer = document.querySelector('.car-container');



    async function fetchCarDetails() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const carId = urlParams.get('id');

            if (!carId) {
                alert('ID do carro não encontrado na URL.');
                return;
            }

            console.log('Car ID:', carId);
            const response = await fetch(`http://localhost:3000/Carro/${carId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const carro = await response.json();
            oneVehicle = carro.car
            console.log(oneVehicle);


            
            CarContainer.innerHTML = `
            
            <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="${oneVehicle.imagem1}" alt="${oneVehicle.marca} ${oneVehicle.modelo}">
      </div>
      <div class="swiper-slide">
        <img src="${oneVehicle.imagem2}" alt="${oneVehicle.marca} ${oneVehicle.modelo}">
      </div>
      <div class="swiper-slide">
        <img src="${oneVehicle.imagem3}" alt="${oneVehicle.marca} ${oneVehicle.modelo}">
      </div>
      <div class="swiper-slide">
        <img src="${oneVehicle.imagem4}" alt="${oneVehicle.marca} ${oneVehicle.modelo}">
      </div>
      <div class="swiper-slide">
        <img src="${oneVehicle.imagem5}" alt="${oneVehicle.marca} ${oneVehicle.modelo}">
      </div>
    </div>
   <!-- Botões -->
<div class="swiper-button-next"></div>
<div class="swiper-button-prev"></div>

<!-- Paginação -->
<div class="swiper-pagination"></div>
  </div>

            <section class="car-info" data-aos="fade-up" data-aos-delay="200">
            <div class="car-header">
                <h1>${oneVehicle.marca} ${oneVehicle.modelo}</h1>
                <p class="price">R$ ${Number(oneVehicle.preco).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</p> 
            </div>
            <div class="car-details-grid">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span id="carYear">Ano: ${oneVehicle.ano}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span id="carKm">${oneVehicle.quilometragem} km</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-gas-pump"></i>
                        <span id="carFuel">Combustível: ${oneVehicle.combustivel}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-cogs"></i>
                        <span id="carTransmission">Câmbio: ${oneVehicle.cambio}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-file-invoice-dollar"></i>
                        <span id="carIpva">IPVA: ${oneVehicle.ipva}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-car-side"></i>
                        <span id="carDoors">Portas: 4</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-palette"></i>
                        <span id="carColor">Cor: ${oneVehicle.cor}</span>
                    </div>
                </div>


                

                <div class="action-buttons" data-aos="fade-up" data-aos-delay="600">
                    <a href="/agendamento" class="schedule-btn" id="scheduleButton">
                        <i class="fas fa-calendar-alt"></i>
                        Agendar Visita
                    </a>

                </div>
            </section>
        </div>
                `;
                
                

        // depois disso, precisa inicializar o Swiper novamente:
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1,         // Número de slides visíveis (pode mudar no responsive depois)
            spaceBetween: 30,         // Espaço entre os slides
            loop: true,               // Deixa o carrossel em loop infinito
            navigation: {             // Botões de navegação
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            autoplay: {               // Ativa o autoplay
              delay: 3000,            // 3 segundos
              disableOnInteraction: false,  // Continua mesmo se o usuário interagir
            },
            breakpoints: {            // Responsividade 📱
              0: {  // Telas pequenas
                slidesPerView: 1,
              },
              768: {  // Tablets
                slidesPerView: 1,
              },
              1024: {  // Desktop
                slidesPerView: 1,
              }
            }
          });


        }
        catch {
            console.error('Erro ao buscar os dados do carro');
        }

    }

    fetchCarDetails();
})
