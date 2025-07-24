document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const weightRadios = document.querySelectorAll('input[name="packageWeight"]');
    const quantitySlider = document.getElementById('quantity-slider');
    const currentQuantityDisplay = document.getElementById('cantidad');
    const costValueSpan = document.getElementById('precio');
    const totalCostValueSpan = document.getElementById('total-cost-value');
    const categoryNameSpan = document.getElementById('category-name');

    // Datos de tarifas de FedEx (desde tu imagen)
    const fedExRates = {
        '5kg': {
            'esencial': 172,   // 1 a 9 envíos
            'emprendedor': 132, // 10 a 49 envíos
            'pyme': 122      // 50+ envíos
        },
        '30kg': {
            'esencial': 230,   // 1 a 9 envíos
            'emprendedor': 200, // 10 a 49 envíos
            'pyme': 180      // 50+ envíos
        }
    };

    // Rangos de envíos para determinar la categoría
    const quantityRanges = {
        'esencial': { min: 1, max: 9 },
        'emprendedor': { min: 10, max: 49 },
        'pyme': { min: 50, max: Infinity }
    };

    function updateCalculator() {
        // 1. Obtener el peso seleccionado
        let selectedWeight = '5kg';
        for (const radio of weightRadios) {
            if (radio.checked) {
                selectedWeight = radio.value;
                break;
            }
        }

        // 2. Obtener la cantidad de envíos seleccionada
        const selectedQuantity = parseInt(quantitySlider.value);
        currentQuantityDisplay.textContent = selectedQuantity;

        // 3. Determinar la categoría (Esencial, Emprendedor, PyME)
        let category = '';
        if (selectedQuantity >= quantityRanges.pyme.min) {
            category = 'pyme';
        } else if (selectedQuantity >= quantityRanges.emprendedor.min) {
            category = 'emprendedor';
        } else {
            category = 'esencial';
        }

        // 4. Actualizar la categoría visualmente
        categoryNameSpan.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalizar
        categoryNameSpan.className = `category-feedback ${'category-' + category}`; // Actualizar clase CSS

        // 5. Obtener la tarifa por envío basada en peso y categoría
        const ratePerShipment = fedExRates[selectedWeight][category];
        costValueSpan.textContent = ratePerShipment.toFixed(2);

        // 6. Calcular y mostrar el costo total estimado
        const totalEstimatedCost = ratePerShipment * selectedQuantity;
        totalCostValueSpan.textContent = totalEstimatedCost.toFixed(2);
    }

    // Event Listeners para la calculadora
    weightRadios.forEach(radio => {
        radio.addEventListener('change', updateCalculator);
    });
    quantitySlider.addEventListener('input', updateCalculator);

    // --- Lógica para el Carrusel ---
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const nextButton = document.querySelector('.carousel-nav.next');
    let currentIndex = 0;

    function updateCarousel() {
        if (carouselSlides.length === 0) return; // Asegura que haya slides
        const slideWidth = carouselSlides[0].clientWidth; // Obtiene el ancho del primer slide
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Navegación con botones
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselSlides.length - 1;
        updateCarousel();
        clearInterval(carouselInterval); // Detener auto-avance al interactuar
        carouselInterval = setInterval(autoAdvanceCarousel, 5000); // Reiniciar auto-avance
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselSlides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
        clearInterval(carouselInterval); // Detener auto-avance al interactuar
        carouselInterval = setInterval(autoAdvanceCarousel, 5000); // Reiniciar auto-avance
    });

    // Auto-avance del carrusel
    function autoAdvanceCarousel() {
        currentIndex = (currentIndex < carouselSlides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    let carouselInterval = setInterval(autoAdvanceCarousel, 5000); // Iniciar auto-avance cada 5 segundos

    // Pausar/Reanudar carrusel al pasar el mouse/tocar
    if (carouselTrack) { // Asegurarse de que el elemento existe
        carouselTrack.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carouselTrack.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(autoAdvanceCarousel, 5000);
        });
    }


    // Inicializar la calculadora y el carrusel al cargar la página y al redimensionar
    updateCalculator();
    updateCarousel(); // Asegurar que el carrusel se posicione correctamente al cargar
    window.addEventListener('resize', updateCarousel); // Actualizar carrusel al redimensionar la ventana
});