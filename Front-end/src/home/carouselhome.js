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