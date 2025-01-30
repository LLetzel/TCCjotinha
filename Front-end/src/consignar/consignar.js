document.addEventListener('DOMContentLoaded', function() {
    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const anoSelect = document.getElementById('ano');
    const fipeResult = document.getElementById('fipeResult');
    const form = document.getElementById('consignForm');
    
    // API FIPE base URL
    const FIPE_API = 'https://parallelum.com.br/fipe/api/v1/carros';

    // Carregar marcas ao iniciar
    fetch(`${FIPE_API}/marcas`)
        .then(response => response.json())
        .then(marcas => {
            marcas.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca.codigo;
                option.textContent = marca.nome;
                marcaSelect.appendChild(option);
            });
        });

    // Evento de mudança da marca
    marcaSelect.addEventListener('change', function() {
        modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>';
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';
        modeloSelect.disabled = false;
        
        if (this.value) {
            fetch(`${FIPE_API}/marcas/${this.value}/modelos`)
                .then(response => response.json())
                .then(data => {
                    data.modelos.forEach(modelo => {
                        const option = document.createElement('option');
                        option.value = modelo.codigo;
                        option.textContent = modelo.nome;
                        modeloSelect.appendChild(option);
                    });
                });
        }
    });

    // Evento de mudança do modelo
    modeloSelect.addEventListener('change', function() {
        anoSelect.innerHTML = '<option value="">Selecione o ano</option>';
        anoSelect.disabled = false;

        if (this.value) {
            fetch(`${FIPE_API}/marcas/${marcaSelect.value}/modelos/${this.value}/anos`)
                .then(response => response.json())
                .then(anos => {
                    anos.forEach(ano => {
                        const option = document.createElement('option');
                        option.value = ano.codigo;
                        option.textContent = ano.nome;
                        anoSelect.appendChild(option);
                    });
                });
        }
    });

    // Evento de mudança do ano - buscar valor FIPE
    anoSelect.addEventListener('change', function() {
        if (this.value) {
            fetch(`${FIPE_API}/marcas/${marcaSelect.value}/modelos/${modeloSelect.value}/anos/${this.value}`)
                .then(response => response.json())
                .then(data => {
                    fipeResult.querySelector('.fipe-value').textContent = data.Valor;
                });
        }
    });

    // Preview de imagens
    const fileInput = document.getElementById('fotos');
    const previewGrid = document.getElementById('preview');

    fileInput.addEventListener('change', function() {
        previewGrid.innerHTML = '';
        
        [...this.files].forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                const div = document.createElement('div');
                div.className = 'preview-item';

                reader.onload = function(e) {
                    div.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                };

                reader.readAsDataURL(file);
                previewGrid.appendChild(div);
            }
        });
    });

    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const spinner = submitBtn.querySelector('.loading-spinner');
        const btnText = submitBtn.querySelector('span');

        // Simular envio
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        spinner.style.display = 'block';

        setTimeout(() => {
            alert('Proposta enviada com sucesso! Em breve entraremos em contato.');
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            spinner.style.display = 'none';
            form.reset();
            previewGrid.innerHTML = '';
        }, 2000);
    });

    // Prevenir envio do formulário ao pressionar Enter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    });
});