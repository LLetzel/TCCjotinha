// Add to dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (!menuToggle || !sidebar) {
        console.error('Menu elements not found');
        return;
    }

    menuToggle.style.display = 'block'; // Force display
    
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

    // Handle outside clicks
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Prevent touchmove on sidebar
    sidebar.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    }, { passive: true });

    // Keep navigation links working
    const navLinks = document.querySelectorAll('.sidebar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click from bubbling
            // Let the default link behavior work
        });
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            adminContainer.classList.remove('menu-open');
        }
    });

    // Initialize other dashboard functions
    initializeDashboard();
});

function previousDay() {
    // Handle previous day navigation
}

function nextDay() {
    // Handle next day navigation
}

function viewAppointment(id) {
    // Show appointment details modal
}

function initializeDashboard() {
    setCurrentDate();
    loadAppointments(getCurrentDate());
    updateStats();
}

function loadAppointments(date) {
    // Example structure for backend integration
    const appointments = {
        morning: generateTimeSlots(8, 12),
        afternoon: generateTimeSlots(13, 18)
    };
    
    renderTimeSlots('morningSlots', appointments.morning);
    renderTimeSlots('afternoonSlots', appointments.afternoon);
}

function generateTimeSlots(start, end) {
    const slots = [];
    for(let i = start; i <= end; i++) {
        slots.push({
            time: `${i}:00`,
            status: Math.random() > 0.5 ? 'available' : 'booked',
            clientName: 'João Silva',
            appointmentType: 'Test Drive'
        });
    }
    return slots;
}

function renderTimeSlots(containerId, slots) {
    const container = document.getElementById(containerId);
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

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function setCurrentDate() {
    document.getElementById('appointmentDate').value = getCurrentDate();
}

function updateStats() {
    // Placeholder for backend integration
    document.getElementById('totalCars').textContent = '24';
    document.getElementById('todayAppointments').textContent = '5';
    document.getElementById('totalClients').textContent = '156';
}

// Format and display current date
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
});