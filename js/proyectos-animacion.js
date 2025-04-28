// Animación de entrada para las tarjetas de proyectos en la página de proyectos
// Se ejecuta al cargar el DOM

document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, 100 * index);
    });
});
