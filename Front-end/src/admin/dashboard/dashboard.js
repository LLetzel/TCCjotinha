// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const adminContainer = document.querySelector('.admin-container');
    const logoutBtn = document.getElementById('logoutBtn');

    function fazerLogout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            fazerLogout();
        });
    }

    if (!menuToggle || !sidebar) {
        console.error('Menu elements not found');
        return;
    }

    menuToggle.style.display = 'block';
    
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        sidebar.classList.toggle('active');
        this.classList.toggle('active');
        
        if (sidebar.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times" style="transform: rotate(0deg); transition: all 0.3s ease"></i>';
            this.style.background = 'var(--primary-color)';
        } else {
            this.innerHTML = '<i class="fas fa-bars" style="transform: rotate(180deg); transition: all 0.3s ease"></i>';
            this.style.background = 'rgba(0, 0, 0, 0.2)';
        }
    });

    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    sidebar.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });

    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            adminContainer.classList.remove('menu-open');
        }
    });

    initializeDashboard();
});

async function contarUsuarios() {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
        })

    const Usuarios = await response.json();
    // console.log(Usuarios)
    let ContadorUsers = Usuarios.response.length;
    // console.log(ContadorUsers)
    document.getElementById('contador-users').textContent = ContadorUsers;
    }
    
    catch (err) {
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', contarUsuarios);


//contador carros 
async function contarCarros() {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    try {
        const response = await fetch(`${API_BASE_URL}/Carros`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
        })

    

    const Carros = await response.json();
    // console.log(Carros)
    // console.log(Carros.cars.length)
    let ContadorCarros = Carros.cars.length;
    // console.log(ContadorCarros)
    document.getElementById('contador-cars').textContent = ContadorCarros;
    }
    
    catch (error) {
        console.log(error)
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', contarCarros);


// Funções principais
async function initializeDashboard() {
    setCurrentDate();
    await loadAppointments(getCurrentDate());
}

function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

async function loadAppointments(dateSelected) {
    const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://jotinha2-hdecesc2cba3b9bg.brazilsouth-01.azurewebsites.net";
    try {
        const response = await fetch(`${API_BASE_URL}/agendamento/get`);
        const result = await response.json();
        const userId = result[0].id_usuario; // ID do usuário logado

        const interesse = result[0].interesse; 
        console.log('Interesse do usuário:', interesse); // Verifica o interesse do usuário logado

        console.log('ID do usuário:', userId); // Verifica o ID do usuário logado

        const reqUser = await fetch(`${API_BASE_URL}/usuario/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resultUser = await reqUser.json();
        nomeUser= resultUser.response.nome; // Nome do usuário logado


        console.log('Nome do usuário:', nomeUser); 
        console.log('Usuário:', resultUser.response); 
        console.log('Resposta do backend:', result);

        let agendamentos = [];

        // Se for um único agendamento
        if (result.data) {
            agendamentos = [result.data]; // transforma em array
        } else if (Array.isArray(result)) {
            agendamentos = result; // se vier um array já
        }

        // Filtrar apenas os agendamentos da data selecionada
        const agendamentosDoDia = agendamentos.filter(agendamento => agendamento.data === dateSelected);

        console.log('Agendamentos do dia:', agendamentosDoDia);

        const bookedSlots = agendamentosDoDia.map(agendamento => agendamento.hora);

        console.log('Horários agendados no dia:', bookedSlots);

        const morning = generateTimeSlots(8, 12, bookedSlots, nomeUser, interesse);
        const afternoon = generateTimeSlots(13, 18, bookedSlots, nomeUser, interesse);

        renderTimeSlots('morningSlots', morning);
        renderTimeSlots('afternoonSlots', afternoon);
        
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}
function generateTimeSlots(start, end, bookedSlots, clientName, appointmentType) {
    const slots = [];
    for (let i = start; i <= end; i++) {
        const time = `${i}:00`;
        const isBooked = bookedSlots.includes(time);

        slots.push({
            time: time,
            status: isBooked ? 'booked' : 'available',
            clientName: isBooked ? clientName : '',
            appointmentType: isBooked ? appointmentType : ''
        });
    }
    return slots;
}

function renderTimeSlots(containerId, slots) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = slots.map(slot => `
        <div class="slot-item ${slot.status}">
            <span class="slot-time">${slot.time}</span>
            <div class="slot-info">
                ${slot.status === 'booked' ? `
                    <span class="client-name">${slot.clientName}</span>
                    <span class="appointment-type">${slot.appointmentType}</span>
                ` : '<span class="status">Disponível</span>'}
            </div>
        </div>
    `).join('');
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