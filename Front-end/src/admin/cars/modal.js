const modal = document.getElementById('carModal');
const carForm = document.getElementById('carForm');


// abrir modal
function openModal(carId = null) {
    modal.style.display = 'block';
    editingCarId = carId;

    if (carId) {
        document.getElementById('modalTitle').textContent = 'Editar Veículo';
        // Fetch car data and populate form
        fetchCarData(carId);
    } else {
        document.getElementById('modalTitle').textContent = 'Adicionar Veículo';
        carForm.reset();
    }
}

//fechar modal (resetar)
function closeModal() {
    modal.style.display = 'none';
    carForm.reset();
    editingCarId = null;
}

// função preview de imagem
document.addEventListener('DOMContentLoaded', function () {
    // Função para exibir o preview da imagem
    function handleImagePreview(event, previewId) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById(previewId);
                preview.innerHTML = ''; // Limpa o conteúdo anterior
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }

    // Adiciona o evento de change para cada input file
    document.getElementById('imagem1').addEventListener('change', function (event) {
        handleImagePreview(event, 'preview1');
    });

    document.getElementById('imagem2').addEventListener('change', function (event) {
        handleImagePreview(event, 'preview2');
    });

    document.getElementById('imagem3').addEventListener('change', function (event) {
        handleImagePreview(event, 'preview3');
    });

    document.getElementById('imagem4').addEventListener('change', function (event) {
        handleImagePreview(event, 'preview4');
    });

    document.getElementById('imagem5').addEventListener('change', function (event) {
        handleImagePreview(event, 'preview5');
    });
});


// formulário
carForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Criar um objeto FormData para envio multipart
    const formData = new FormData();
    formData.append('marca', document.getElementById('marca').value);
    formData.append('modelo', document.getElementById('modelo').value);
    formData.append('ano', document.getElementById('ano').value);
    formData.append('preco', document.getElementById('preco').value);
    formData.append('quilometragem', document.getElementById('quilometragem').value);
    formData.append('combustivel', document.getElementById('combustivel').value);
    formData.append('cambio', document.getElementById('cambio').value);
    formData.append('cor', document.getElementById('cor').value);
    formData.append('ipva', document.getElementById('ipva').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('status_id', '1');
    formData.append('tipo_id', '1');

    // Adicionar imagens
    for (let i = 1; i <= 5; i++) {
        const fileInput = document.getElementById(`imagem${i}`);
        if (fileInput.files.length > 0) {
            formData.append(`imagem${i}`, fileInput.files[0]); 
        }
    }

    console.log('Dados enviados:', formData);

    try {
        const url = editingCarId
            ? `http://localhost:3000/AtualizarCarro/${editingCarId}`
            : 'http://localhost:3000/RegistroCarro';

        const response = await fetch(url, {
            method: editingCarId ? 'PUT' : 'POST',
            credentials: 'include', // Envia cookies de sessão
            body: formData // Envia os dados corretamente como `multipart/form-data`
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar o veículo');
        }

        alert('Veículo cadastrado com sucesso!', 'sucesso');
        setTimeout(() => {
            closeModal();
            loadCars(); // Refresh the table after successful submission
        }, 2000);
    } catch (error) {
        console.error('Erro:', error.message);
        alert(error.message, 'erro');
    }
});



// Função para formatar preço em Real
function formatarPreco(preco) {
    return parseFloat(preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

//--------------------------------------------------------

// Função atualizada para listar carros
async function ListarCarros() {
    try {
        // Fazer requisição GET para a API
        const response = await fetch('http://localhost:3000/Carros', {
            method: 'GET',
            credentials: 'include'
        });

        const carros = await response.json();
        console.log('Carros:', carros.cars);
        const carr = carros.cars;

        // Selecionar tbody da tabela
        const tbody = document.querySelector('.cars-table tbody');
        
        // Limpar conteúdo atual da tabela
        tbody.innerHTML = '';
        
        // Usar map para criar as linhas da tabela
        const linhasHTML = carr.map(carro => 
            `
            <tr>
                <td>
                    <img src="${carro.imagem1 || '../../../img/no-image.jpg'}" 
                         alt="${carro.modelo}"
                         style="width: 80px; height: 60px; object-fit: cover; border-radius: 6px;">
                </td>
                <td>${carro.marca} ${carro.modelo}</td>
                <td>${carro.ano}</td>
                <td>${formatarPreco(carro.preco)}</td>
                <td>
                    <span class="status-badge ${carro.status_id === 1 ? 'disponivel' : 'vendido'}">
                        ${carro.status_id === 1 ? 'Disponível' : 'Vendido'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="destaque-btn" onclick="marcarComoDestaque(${carro.id})">
                            <i class="fas fa-star ${carro.destaqueData !== null ? 'desfa-star' : ''}"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteCar(${carro.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `
        ).join('');
        
        // Inserir as linhas na tabela
        tbody.innerHTML = linhasHTML;   
        
    } catch (error) {
        console.error('Erro ao listar carros:', error);
        alert('Erro ao carregar veículos', 'erro');
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', ListarCarros);

// Delete car function
async function deleteCar(id) {
    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    console.log('userRole real:', decryptedRole);
    if (decryptedRole !== '1') {
        alert('Você não tem permissão para excluir veículos');
        return;
    }

    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        try {

            const response = await fetch(`http://localhost:3000/DeletarCarro/${id}`, {
                method: 'DELETE',
            });

            console.log(id);

            if (response.ok) {  
                ListarCarros(); // Refresh table
                alert('Veículo excluído com sucesso!', 'sucesso');
            } else {
                throw new Error('Erro ao excluir veículo');
            }
            } catch (error) {
                alert(error.message);
        }
    }
}

async function marcarComoDestaque(id_carro) {
    try {
        // Primeiro, verificar se o carro já está em destaque
        const responseCheck = await fetch('http://localhost:3000/mostrarDestaques', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (!responseCheck.ok) {
            throw new Error('Erro ao verificar destaques');
        }

        const destaques = await responseCheck.json();
        const carroJaDestaque = destaques.find(d => d.id_carro === id_carro);
        

        if (carroJaDestaque) {
            // Se já está em destaque, remove
            await fetch(`http://localhost:3000/removerDestaque/${carroJaDestaque.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            alert('Carro removido dos destaques!', 'sucesso');
        } else {
            // Se não está em destaque, adiciona
            const response = await fetch('http://localhost:3000/AdicionarDestaque', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_carro: id_carro
                })
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Erro ao marcar como destaque');
            }

            alert('Carro marcado como destaque!', 'sucesso');
        }

        // Atualiza a lista de carros para refletir as mudanças
        await ListarCarros();

    } catch (error) {
        console.error('Erro:', error);
        alert(error.message, 'erro');
    }
}

window.onload = async () => {
    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

        console.log('userRole real:', decryptedRole);

        if (decryptedRole !== '1') {
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            alert('Você não tem permissão para acessar esta página.');
            window.location.href = '/login';
        }
    }
}};