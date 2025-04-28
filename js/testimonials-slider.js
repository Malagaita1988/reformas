/**
 * Slider de testimonios
 * Permite mostrar testimonios de clientes con animaciones suaves
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Añadir animación de entrada a las tarjetas de testimonios
    testimonialCards.forEach((card, index) => {
        // Aplicar un retraso escalonado para crear efecto de cascada
        setTimeout(() => {
            // Añadir clase para animar la entrada
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index); // Incrementar el retraso para cada tarjeta
    });
    
    // Configurar estilos iniciales
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
    });
});