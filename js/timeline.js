document.addEventListener("DOMContentLoaded", () => {
    const events = document.querySelectorAll(".timeline-event");
    const cardImage = document.querySelector(".timeline-card img");
    const cardTitle = document.querySelector(".card-text h3");
    const cardText = document.querySelector(".card-text p");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    const timelineData = {
        "2005": {
            img: "img/timeline-1.png",
            title: "GENESIS",
            text: "Fundación de JSR en Jr. Tacna 3100, Urb. Perú, San Martín de Porres, como negocio de artículos de librería y bazar. (5 de agosto)"
        },
        "2010": {
            img: "img/timeline-2.jpg",
            title: "EXPANSION",
            text: "Expansión de JSR con la apertura de nuevas sucursales en Lima."
        },
        "2018": {
            img: "img/timeline-3.jpg",
            title: "CONSOLIDACION",
            text: "Consolidación como una de las principales librerías del país."
        },
        "2019": {
            img: "img/timeline-4.jpg",
            title: "DIGITALIZACION",
            text: "Lanzamiento de la tienda en línea y ventas por ecommerce."
        },
        "2020": {
            img: "img/timeline-5.jpg",
            title: "INNOVACION",
            text: "Implementación de un sistema de membresía con descuentos exclusivos."
        },
        "2025": {
            img: "img/timeline-6.jpg",
            title: "FUTURO",
            text: "Expansión internacional y nuevas tecnologías en librerías digitales."
        }
    };

    const years = Object.keys(timelineData); // Lista de años ordenados
    let currentIndex = 0; // Índice actual en la lista de años

    // Función para actualizar la tarjeta con la información del año seleccionado
    function updateCard(year) {
        if (timelineData[year]) {
            cardImage.src = timelineData[year].img;
            cardTitle.textContent = timelineData[year].title;
            cardText.textContent = timelineData[year].text;
        }

        // Actualizar la clase "active" en la línea de tiempo
        events.forEach(e => e.classList.remove("active"));
        document.querySelector(`.timeline-event[data-year="${year}"]`)?.classList.add("active");

        // Actualizar índice actual
        currentIndex = years.indexOf(year);
    }

    // Evento de clic en los eventos de la línea de tiempo
    events.forEach(event => {
        event.addEventListener("click", function () {
            const year = this.getAttribute("data-year");
            updateCard(year);
        });
    });

    // Evento de clic en el botón "prev"
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + years.length) % years.length; // Ciclo infinito
        updateCard(years[currentIndex]);
    });

    // Evento de clic en el botón "next"
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % years.length; // Ciclo infinito
        updateCard(years[currentIndex]);
    });

    // Seleccionar automáticamente el primer año al cargar la página
    updateCard(years[0]);
});

//faq

document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos todas las preguntas de la sección FAQ
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function () {
            let faqItem = this.parentElement; // Obtiene el contenedor padre .faq-item

            // Verifica si ya está activo
            let isActive = faqItem.classList.contains("active");

            // Cierra todas las preguntas antes de abrir una nueva
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });

            // Si no estaba activo antes, lo activamos
            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });
});
