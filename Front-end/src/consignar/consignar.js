document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        Swal.fire({
            icon: "error",
            title: "Acesso negado",
            text: "Você precisa estar logado para acessar esta página.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        }).then(() => {
            window.location.href = '/login';
        });
    }

    const marcaSelect = document.getElementById('marca');
    const modeloSelect = document.getElementById('modelo');
    const anoSelect = document.getElementById('ano');
    const fipeResult = document.getElementById('fipeResult');
    const form = document.getElementById('consignForm');
    const precoInput = document.getElementById('preco');
    
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

    fileInput.addEventListener('change', function () {
        previewGrid.innerHTML = '';
    
        // Cria uma cópia dos arquivos usando DataTransfer
        const dataTransfer = new DataTransfer();
    
        [...this.files].forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                const div = document.createElement('div');
                div.className = 'preview-item';
    
                reader.onload = function (e) {
                    div.innerHTML = `  
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-btn">❌</button>
                    `;
    
                    // Clique para remover a imagem
                    div.querySelector('.remove-btn').addEventListener('click', () => {
                        div.remove(); // remove da tela
                        // Remove da lista de arquivos (reconstrói o DataTransfer)
                        const novaLista = [...fileInput.files].filter((_, i) => i !== index);
                        const novoTransfer = new DataTransfer();
                        novaLista.forEach(f => novoTransfer.items.add(f));
                        fileInput.files = novoTransfer.files;
                    });
                };
    
                reader.readAsDataURL(file);
                previewGrid.appendChild(div);
    
                // Adiciona à nova lista de arquivos válida
                dataTransfer.items.add(file);
            }
        });
    
        // Substitui a lista original de arquivos pela nova (usando DataTransfer)
        fileInput.files = dataTransfer.files;
    });
    

    // Prevenir envio do formulário ao pressionar Enter
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    });

    // Máscara para o campo de preço
    IMask(precoInput, {
        mask: 'R$ num',
        blocks: {
            num: {
                mask: Number,
                thousandsSeparator: '.',
                radix: ',',
                scale: 2,
                padFractionalZeros: true,
                normalizeZeros: true,
                min: 0,
                max: 999999999.99
            }
        }
    });
});

// Submissão do formulário
document.getElementById("consignForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let userData = localStorage.getItem('user');
    let userName = "", userEmail = "", userTelefone = "", userCPF = "", userId = "";
    if (userData) {
        userData = JSON.parse(userData);
        userName = userData.nome || "";
        userEmail = userData.email || "";
        userTelefone = userData.telefone || "";
        userCPF = userData.cpf || "";
        userId = userData.id || "";
    }

    const idMarca = document.getElementById("marca").value;
    const marca = document.querySelector(`#marca option[value='${idMarca}']`).text;
    const idModelo = document.getElementById("modelo").value;
    const modelo = document.querySelector(`#modelo option[value='${idModelo}']`).text;
    const idAno = document.getElementById("ano").value;
    const ano = document.querySelector(`#ano option[value='${idAno}']`).text;
    const quilometragem = document.getElementById("quilometragem").value;
    const fipeResult = document.querySelector("#fipeResult .fipe-value").textContent.trim();
    const preco = document.getElementById("preco").value;
    const ratingElem = document.querySelector('input[name="estado"]:checked');
    const rating = ratingElem ? ratingElem.value : "";
    const observacoes = document.getElementById("observacoes").value;
    const fotosInput = document.getElementById("fotos");
    const files = fotosInput.files;

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userTelefone", userTelefone);
    formData.append("userCPF", userCPF);
    formData.append("marca", marca);
    formData.append("modelo", modelo);
    formData.append("ano", ano);
    formData.append("quilometragem", quilometragem);
    formData.append("fipeResult", fipeResult);
    formData.append("preco", preco);
    formData.append("rating", rating);
    formData.append("observacoes", observacoes);

    for (let i = 0; i < files.length; i++) {
        formData.append("fotos", files[i]);
    }

    try {
        const resposta = await fetch(`http://localhost:3000/consignar/${userId}`, {
            method: "POST",
            body: formData
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            // ✅ Sucesso
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Dados enviados com sucesso!",
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });

        } else {
            // ⚠️ Erro conhecido do backend
            Swal.fire({
                icon: "error",
                title: "Erro ao enviar",
                text: resultado.message || "Algo deu errado ao enviar os dados.",
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6",
            });
        }

    } catch (error) {
        // ❌ Erro inesperado
        console.error("Erro ao enviar os dados:", error);
        Swal.fire({
            icon: "error",
            title: "Erro de conexão",
            text: "Não foi possível conectar ao servidor. Tente novamente.",
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6",
        });
    }
});
