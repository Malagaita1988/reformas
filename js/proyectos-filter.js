/**
 * Filtrado de proyectos por categoría
 * Permite filtrar los proyectos mostrados según su categoría
 */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Añadir evento click a cada botón de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            // Obtener categoría seleccionada
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                // Si el filtro es 'todos' o la categoría coincide, mostrar el proyecto
                if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Añadir animación de aparición
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Ocultar con animación
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Inicializar con todos los proyectos visibles
    const allButton = document.querySelector('[data-filter="todos"]');
    if (allButton) {
        allButton.click();
    }
});