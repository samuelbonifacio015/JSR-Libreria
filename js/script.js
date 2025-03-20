// JavaScript para el carrusel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Configuración para autoplay
    let autoplayInterval;
    const autoplayDelay = 8000; // CAMBIAR A 5000 PARA CORRECTA FUNCION
    
    function goToSlide(slideIndex) {
        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        }
        
        // Añadimos un pequeño retraso para que la transición se complete antes de actualizar
        carousel.style.transition = 'transform 0.8s ease-in-out'; // Asegura la transición
        carousel.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        // Actualizar dots después de la transición
        setTimeout(() => {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            currentSlide = slideIndex;
        }, 800); // Espera 800ms (coincide con la duración de la transición)
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event listeners para los botones
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
    });
    
    // Configurar autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Iniciar autoplay
    startAutoplay();
    
    // Pausar autoplay cuando el mouse está sobre el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
});

//carrusel de merchandising
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.merchandising-carousel .product-list');
    const cards = document.querySelectorAll('.merchandising-carousel .product-card');
    const prevBtn = document.querySelector('.merchandising-carousel .prev');
    const nextBtn = document.querySelector('.merchandising-carousel .next');
    
    let currentIndex = 0;
    const totalCards = cards.length;
    let visibleCards = 4;

    function updateVisibleCards() {
        if (window.innerWidth <= 480) {
            visibleCards = 1;
        } else if (window.innerWidth <= 768) {
            visibleCards = 2;
        } else if (window.innerWidth <= 1024) {
            visibleCards = 3;
        } else {
            visibleCards = 4;
        }
    }

    function goToSlide(index) {
        if (index < 0) {
            index = 0;
        } else if (index > totalCards - visibleCards) {
            index = totalCards - visibleCards;
        }
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * (100 / visibleCards)}%)`;
    }

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    window.addEventListener('resize', () => {
        updateVisibleCards();
        goToSlide(currentIndex);
    });

    updateVisibleCards();
    goToSlide(0);
});

//para volver arriba
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');

    // Función para desplazarse al inicio de la página
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento suave
        });
    });

    // Mostrar u ocultar el botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { // Mostrar después de 300px de scroll
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});