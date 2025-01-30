document.addEventListener('DOMContentLoaded', function() {
    // Initialize flatpickr date picker
    flatpickr("#date", {
        dateFormat: "d/m/Y",
        minDate: "today",
        disable: [
            function(date) {
                // Disable Sundays
                return date.getDay() === 0;
            }
        ],
        locale: {
            firstDayOfWeek: 1
        }
    });

    // Initialize phone mask
    $('#phone').mask('(00) 00000-0000');

    // Form submission handler
    const form = document.getElementById('appointmentForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to button
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            showNotification('Agendamento realizado com sucesso!');
            
            // Reset form
            form.reset();
            
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add show class for animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}