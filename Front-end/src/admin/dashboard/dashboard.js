// Add to dashboard.js
document.addEventListener('DOMContentLoaded', () => {
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