document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        alert('ID do carro não encontrado na URL.');
        return;
    }

    // Faz a requisição para o backend usando a porta 3006 conforme configurado
    fetch(`http://localhost:3006/carros/${carId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do carro');
            }
            return response.json();
        })
        .then(data => {
            // Atualiza os elementos HTML com os dados do banco
            document.querySelector('.car-header h1').textContent = `${data.marca} ${data.modelo}`;
            document.querySelector('.price').textContent = `R$ ${Number(data.preco).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;

            // Atualiza os detalhes do carro
            const detalhes = [
                {selector: 'nth-child(1)', icon: 'calendar', text: `Ano: ${data.ano}`},
                {selector: 'nth-child(2)', icon: 'tachometer-alt', text: `${data.quilometragem} km`},
                {selector: 'nth-child(3)', icon: 'gas-pump', text: `Combustível: ${data.combustivel}`},
                {selector: 'nth-child(4)', icon: 'cogs', text: `Câmbio: ${data.cambio}`},
                {selector: 'nth-child(5)', icon: 'file-invoice-dollar', text: `IPVA: ${data.ipva}`},
                {selector: 'nth-child(6)', icon: 'car-side', text: `Portas: ${data.portas || 4}`},
                {selector: 'nth-child(7)', icon: 'palette', text: `Cor: ${data.cor}`}
            ];

            detalhes.forEach(detalhe => {
                const element = document.querySelector(`.car-details-grid .detail-item:${detalhe.selector}`);
                if (element) {
                    element.innerHTML = `
                        <i class="fas fa-${detalhe.icon}"></i>
                        <span>${detalhe.text}</span>
                    `;
                }
            });

            // Atualiza a descrição
            document.querySelector('.car-description p').textContent = data.descricao;

            // Atualiza o carrossel de imagens
            const swiperWrapper = document.querySelector('.swiper-wrapper');
            const imagens = [data.imagem1, data.imagem2, data.imagem3, data.imagem4, data.imagem5]
                .filter(img => img); // Remove imagens vazias/null

            swiperWrapper.innerHTML = imagens.map(img => `
                <div class="swiper-slide">
                    <img src="${img}" alt="${data.marca} ${data.modelo}">
                </div>
            `).join('');

            // Inicializa o Swiper
            new Swiper('.mySwiper', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                loop: imagens.length > 1, // Ativa o loop apenas se houver mais de uma imagem
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });

            // Atualiza informações adicionais
            const infoItems = document.querySelectorAll('.additional-info .info-item');
            const additionalInfo = [
                {label: 'Cor', value: data.cor},
                {label: 'Final Placa', value: data.final_placa || '-'},
                {label: 'Portas', value: data.portas || '4'},
                {label: 'IPVA', value: data.ipva || 'Pago'}
            ];

            infoItems.forEach((item, index) => {
                if (additionalInfo[index]) {
                    item.innerHTML = `
                        <strong>${additionalInfo[index].label}:</strong>
                        <span>${additionalInfo[index].value}</span>
                    `;
                }
            });

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar os detalhes do carro. Por favor, tente novamente mais tarde.');
        });
});