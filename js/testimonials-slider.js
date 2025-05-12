/**
 * Slider de testimonios
 * Permite mostrar testimonios de clientes con animaciones suaves y navegación
 * Incluye autoplay, controles de navegación y transiciones elegantes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const indicators = document.querySelectorAll('.testimonial-indicators .indicator');
    
    // Variables de control
    let currentIndex = 0;
    let autoplayTimer = null;
    
    // Verificar que existan testimonios
    if (testimonials.length === 0) {
        console.error('No se encontraron testimonios');
        return;
    }
    
    console.log('Inicializando slider de testimonios con ' + testimonials.length + ' elementos');
    
    // Función para mostrar un testimonio específico
    function showTestimonial(index) {
        // Ocultar todos los testimonios
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Mostrar el testimonio seleccionado
        testimonials[index].classList.add('active');
        
        // Actualizar los indicadores
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('is-active');
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('is-active');
                indicator.classList.remove('active');
            }
        });
        
        // Actualizar el índice actual
        currentIndex = index;
    }
    
    // Función para ir al testimonio anterior
    function prevTestimonial() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = testimonials.length - 1;
        }
        showTestimonial(newIndex);
        resetAutoplay();
    }
    
    // Función para ir al testimonio siguiente
    function nextTestimonial() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
        resetAutoplay();
    }
    
    // Iniciar el autoplay
    function startAutoplay() {
        stopAutoplay(); // Detener cualquier autoplay existente primero
        autoplayTimer = setInterval(function() {
            nextTestimonial();
        }, 5000);
    }
    
    // Detener el autoplay
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }
    
    // Reiniciar el autoplay
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Configurar eventos para los botones de navegación
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            prevTestimonial();
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            nextTestimonial();
        });
    }
    
    // Configurar eventos para los indicadores
    indicators.forEach(function(indicator, index) {
        indicator.addEventListener('click', function() {
            showTestimonial(index);
            resetAutoplay();
        });
    });
    
    // Mostrar el primer testimonio e iniciar el autoplay
    showTestimonial(0);
    startAutoplay();
});
