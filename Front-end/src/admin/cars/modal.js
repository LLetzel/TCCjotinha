const modal = document.getElementById('carModal');
const carForm = document.getElementById('carForm');

let editingCarId = null;

function openModal(carId = null) {
    modal.style.display = 'block';
    editingCarId = carId;

    // Sempre remova o required dos campos de imagem ao abrir o modal
    for (let i = 1; i <= 5; i++) {
        const fileInput = document.getElementById(`imagem${i}`);
        if (fileInput) fileInput.removeAttribute('required');
    }

    if (carId) {
        document.getElementById('modalTitle').textContent = 'Editar Veículo';
        fetchCarData(carId);
    } else {
        document.getElementById('modalTitle').textContent = 'Adicionar Veículo';
        carForm.reset();
        // Adicionar required apenas para a imagem principal ao adicionar novo
        const fileInput = document.getElementById('imagem1');
        if (fileInput) fileInput.setAttribute('required', 'required');
        // Limpa previews de imagem ao adicionar novo veículo
        for (let i = 1; i <= 5; i++) {
            const preview = document.getElementById(`preview${i}`);
            if (preview) preview.innerHTML = '<i class="fas fa-plus"></i><span>Imagem ' + (i === 1 ? 'Principal' : i) + '</span>';
        }
    }
}

async function fetchCarData(carId) {
    try {
        const response = await fetch(`http://localhost:3000/Carro/${carId}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Erro ao buscar dados do veículo');
        const data = await response.json();
        const carro = data.car;

        document.getElementById('marca').value = carro.marca || '';
        document.getElementById('modelo').value = carro.modelo || '';
        document.getElementById('ano').value = carro.ano || '';
        document.getElementById('preco').value = carro.preco || '';
        document.getElementById('quilometragem').value = carro.quilometragem || '';
        document.getElementById('combustivel').value = carro.combustivel || '';
        document.getElementById('cambio').value = carro.cambio || '';
        document.getElementById('cor').value = carro.cor || '';
        document.getElementById('ipva').value = carro.ipva || '';
        document.getElementById('descricao').value = carro.descricao || '';

        // Limpa todos os previews antes de preencher
        for (let i = 1; i <= 5; i++) {
            const preview = document.getElementById(`preview${i}`);
            if (preview) preview.innerHTML = '';
        }

        // Preencher previews das imagens, se existirem URLs no objeto carro
        for (let i = 1; i <= 5; i++) {
            const preview = document.getElementById(`preview${i}`);
            const imgUrl = carro[`imagem${i}`];
            if (preview) {
                if (imgUrl && imgUrl !== "" && imgUrl !== "null" && imgUrl !== null && imgUrl !== undefined) {
                    preview.innerHTML = `<img src="${imgUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">`;
                } else {
                    preview.innerHTML = `<i class="fas fa-plus"></i><span>Imagem ${i === 1 ? 'Principal' : i}</span>`;
                }
            }
        }

        for (let i = 1; i <= 5; i++) {
            const fileInput = document.getElementById(`imagem${i}`);
            if (fileInput) {
                fileInput.setAttribute('data-old', carro[`imagem${i}`] || '');
            }
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
    }
}

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


carForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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

    for (let i = 1; i <= 5; i++) {
        const fileInput = document.getElementById(`imagem${i}`);
        if (fileInput && fileInput.files.length > 0) {
            formData.append(`imagem${i}`, fileInput.files[0]);
        } else {
            const oldValue = fileInput ? fileInput.getAttribute('data-old') : '';
            formData.append(`imagem${i}`, oldValue);
        }
    }

    let url, method;
    if (editingCarId) {
        url = `http://localhost:3000/AtualizarCarro/${editingCarId}`;
        method = 'PUT';
    } else {
        url = 'http://localhost:3000/RegistroCarro';
        method = 'POST';
    }

    try {
        const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
        const url = editingCarId
            ? `${API_BASE_URL}/AtualizarCarro/${editingCarId}`
            : `${API_BASE_URL}/RegistroCarro`;

        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar o veículo');
        }

        Swal.fire({
            position: "center",
            icon: "success",
            title: editingCarId ? 'Veículo atualizado com sucesso!' : 'Veículo cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2000,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });

        setTimeout(() => {
            closeModal();
            loadCars();
        }, 2000);
    } catch (error) {
        console.error('Erro:', error.message);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
    }
});

function formatarPreco(preco) {
    return parseFloat(preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

async function ListarCarros() {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    try {
        const response = await fetch(`${API_BASE_URL}/Carros`, {
            method: 'GET',
            credentials: 'include'
        });

        const carros = await response.json();
        const carr = carros.cars;
        const tbody = document.querySelector('.cars-table tbody');
        tbody.innerHTML = '';

        const linhasHTML = carr.map(carro =>
            `<tr>
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
                        <button class="edit-btn" onclick="openModal(${carro.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="deleteCar(${carro.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`
        ).join('');

        tbody.innerHTML = linhasHTML;
    } catch (error) {
        console.error('Erro ao listar carros:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao carregar veículos',
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
    }
}

document.addEventListener('DOMContentLoaded', ListarCarros);

async function deleteCar(id) {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');

    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedRole !== '1') {
            Swal.fire({
                icon: 'info',
                title: 'Acesso negado',
                text: 'Você não tem permissão para excluir veículos',
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6"
            });
            return;
        }

        const confirmResult = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Você deseja realmente excluir este veículo?',
            icon: 'warning',
            iconColor: '#d33',
            showCancelButton: true,
            confirmButtonColor: ' #28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });

        if (confirmResult.isConfirmed) {
            try {
                
                const response = await fetch(`${API_BASE_URL}/DeletarCarro/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    await ListarCarros();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Veículo excluído com sucesso!',
                        showConfirmButton: false,
                        timer: 2000,
                        background: "rgba(0, 0, 0, 1)",
                        color: "#F6F6F6"
                    });
                } else {
                    throw new Error('Erro ao excluir veículo');
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: error.message,
                    background: "rgba(0, 0, 0, 1)",
                    color: "#F6F6F6"
                });
            }
        }
    }
}


async function marcarComoDestaque(id_carro) {
    try {
        const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
        const responseCheck = await fetch(`${API_BASE_URL}/mostrarDestaques`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!responseCheck.ok) {
            throw new Error('Erro ao verificar destaques');
        }

        const destaques = await responseCheck.json();
        const carroJaDestaque = destaques.find(d => d.id_carro === id_carro);

        if (carroJaDestaque) {
            const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
            await fetch(`${API_BASE_URL}/removerDestaque/${carroJaDestaque.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Carro removido dos destaques!',
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6"
            });
        } else {
            const response = await fetch(`${API_BASE_URL}/AdicionarDestaque`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ id_carro: id_carro })
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Erro ao marcar como destaque');
            }

            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Carro marcado como destaque!',
                showConfirmButton: false,
                timer: 2000,
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6"
            });
        }

        await ListarCarros();

    } catch (error) {
        console.error('Erro:', error);
        Swal.fire({
            icon: 'info',
            title: 'Erro',
            text: error.message,
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
    }
}

window.onload = async () => {
    const secretKey = 'letzellindo';
    const encryptedRole = localStorage.getItem('userRole');
    if (!encryptedRole) {
        Swal.fire({
            icon: 'info',
            title: 'Acesso negado',
            text: 'Você precisa estar logado para acessar esta página.',
            background: "rgba(0, 0, 0, 1)",
            color: "#F6F6F6"
        });
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    }


    if (encryptedRole) {
        const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
        const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedRole !== '1' || !decryptedRole) {
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            Swal.fire({
                icon: 'info',
                title: 'Acesso negado',
                text: 'Você não tem permissão para acessar esta página.',
                background: "rgba(0, 0, 0, 1)",
                color: "#F6F6F6"
            });
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        }
    }
};
