document.addEventListener("DOMContentLoaded", function() {
    const swiper = new Swiper(".mySwiper", {
        effect: "fade", // fade effect between slides
        loop: true, // infinite loop
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        speed: 800, // transition speed
        grabCursor: true,
        fadeEffect: {
            crossFade: true
        },
        keyboard: {
            enabled: true,
        },
        on: {
            init: function() {
                document.querySelector('.swiper').style.opacity = 1;
            }
        }
    });
});

let userId = localStorage.getItem('userId');

window.onload = () => {
     verificar();
}

function verificar() {
    console.log(userId);
    if (userId == null || userId == undefined) {
        window.location.href = '/Front-end/src/login/login.html';
        return;
    }
    console.log('asd')
    fetch(`http://localhost:3000/usuario/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            
            if (data) {
                console.log(data);
                
                if (data.response.tipo_id === 1) {
                    window.location.href = '/Front-end/src/admin/dashboard/dashboard.html';
                    return;
                }
                if (data.response.tipo_id === 2) {
                    return;
                }

            } 
            return console.log('Erro ao verificar o usuário');
        })
        .catch((err) => {
            console.log('erro de conexão com o servidor', err);
            alert('Erro de conexão com o servidor');
        });
}