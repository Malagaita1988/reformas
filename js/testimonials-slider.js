/**
 * Slider de testimonios
 * Permite mostrar testimonios de clientes con animaciones suaves y navegación
 * Incluye autoplay, controles de navegación y transiciones elegantes
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el carrusel de testimonios
    initTestimonialsCarousel();
    
    // Inicializar animaciones para tarjetas de testimonios (si existen)
    initTestimonialCards();
    
    /**
     * Inicializa el carrusel principal de testimonios con navegación y autoplay
     */
    function initTestimonialsCarousel() {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevButton = document.querySelector('.prev-testimonial');
        const nextButton = document.querySelector('.next-testimonial');
        
        if (!testimonials.length || !prevButton || !nextButton) {
            console.log('No se encontraron elementos necesarios para el carrusel de testimonios');
            return;
        }
        
        console.log('Inicializando carrusel de testimonios');
        
        let currentIndex = 0;
        let autoplayInterval;
        
        // Asegurarse de que todos los testimonios estén configurados correctamente
        testimonials.forEach((testimonial, index) => {
            if (index === 0) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
            testimonial.classList.remove('active');
        });
        
        // Mostrar el primer testimonio y marcarlo como activo
        testimonials[0].style.display = 'block';
        setTimeout(() => {
            testimonials[0].classList.add('active');
        }, 50);
        
        // Función para mostrar un testimonio específico
        function showTestimonial(index) {
            // Evitar operaciones innecesarias si ya estamos en el testimonio actual
            if (currentIndex === index) return;
            
            // Marcar el índice actual para referencia
            currentIndex = index;
            
            // Guardar referencia al testimonio actual y anterior
            const currentTestimonial = testimonials[index];
            
            // Primero, ocultar todos los testimonios excepto el actual
            testimonials.forEach((testimonial, i) => {
                if (i !== index) {
                    // Quitar clase active para iniciar la transición de salida
                    testimonial.classList.remove('active');
                    
                    // Ocultar después de que termine la transición
                    setTimeout(() => {
                        testimonial.style.display = 'none';
                    }, 500);
                }
            });
            
            // Mostrar el testimonio actual inmediatamente (pero aún invisible)
            currentTestimonial.style.display = 'block';
            
            // Forzar un reflow para asegurar que el navegador procese el cambio de display
            void currentTestimonial.offsetWidth;
            
            // Añadir la clase active para iniciar la transición de entrada
            setTimeout(() => {
                currentTestimonial.classList.add('active');
            }, 50);
        }
        
        // Función para ir al testimonio anterior
        function goToPrevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
            resetAutoplay();
        }
        
        // Función para ir al testimonio siguiente
        function goToNextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
            resetAutoplay();
        }
        
        // Resetear el autoplay
        function resetAutoplay() {
            clearInterval(autoplayInterval);
            // Añadir un pequeño retraso antes de reiniciar el autoplay para evitar conflictos
            setTimeout(() => {
                startAutoplay();
            }, 100);
        }
        
        // Iniciar autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(goToNextTestimonial, 8000);
        }
        
        // Ya no necesitamos estos eventos porque los hemos reemplazado con los nuevos manejadores de eventos
        // que incluyen la gestión del autoplay
        /*
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToPrevTestimonial();
        });
        
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            goToNextTestimonial();
        });
        */
        
        // Iniciar autoplay
        startAutoplay();
        
        // Detener el autoplay cuando el usuario interactúa con los botones
        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };
        
        // Mejorar la gestión de eventos para los botones de navegación
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            stopAutoplay();
            goToPrevTestimonial();
            // Reiniciar el autoplay después de 5 segundos de inactividad
            setTimeout(() => {
                startAutoplay();
            }, 5000);
        });
        
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            stopAutoplay();
            goToNextTestimonial();
            // Reiniciar el autoplay después de 5 segundos de inactividad
            setTimeout(() => {
                startAutoplay();
            }, 5000);
        });
        
        // Ya no necesitamos esta línea porque ya inicializamos el primer testimonio arriba
        // testimonials[0].classList.add('active');
    }
    
    /**
     * Inicializa animaciones para tarjetas de testimonios individuales
     * (Funcionalidad original del archivo)
     */
    function initTestimonialCards() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        if (!testimonialCards.length) return;
        
        // Configurar estilos iniciales
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.5s ease';
        });
        
        // Añadir animación de entrada a las tarjetas de testimonios
        testimonialCards.forEach((card, index) => {
            // Aplicar un retraso escalonado para crear efecto de cascada
            setTimeout(() => {
                // Añadir clase para animar la entrada
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index); // Incrementar el retraso para cada tarjeta
        });
    }
});