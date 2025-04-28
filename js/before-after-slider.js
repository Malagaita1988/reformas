/**
 * Comparador Antes/Después
 * Implementa un slider interactivo para comparar dos imágenes
 */

class BeforeAfterSlider {
    constructor(element) {
        this.container = element;
        this.beforeImage = element.querySelector('.before-image');
        this.slider = element.querySelector('.comparison-slider');
        this.handle = element.querySelector('.slider-handle');
        this.isResizing = false;
        this.startX = 0;
        this.sliderLeft = 0;
        
        // Añadir elementos de flecha al handle para mejor indicación visual
        if (this.handle) {
            // Crear flecha izquierda
            const arrowLeft = document.createElement('span');
            arrowLeft.className = 'arrow-left';
            this.handle.appendChild(arrowLeft);
            
            // Crear flecha derecha
            const arrowRight = document.createElement('span');
            arrowRight.className = 'arrow-right';
            this.handle.appendChild(arrowRight);
        }
        
        this.init();
    }
    
    init() {
        // Configuración inicial
        this.setInitialPosition();
        this.addEventListeners();
        
        // Asegurar que las imágenes se muestren correctamente
        const images = this.container.querySelectorAll('img');
        let loadedImages = 0;
        
        // Verificar si las imágenes ya están cargadas
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
                this.adjustContainerHeight();
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    this.adjustContainerHeight();
                    if (loadedImages === images.length) {
                        this.showWithAnimation();
                    }
                });
            }
            
            // Aseguramos que las imágenes cubran correctamente el contenedor
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
        });
        
        // Si todas las imágenes ya están cargadas, mostrar la animación
        if (loadedImages === images.length) {
            this.showWithAnimation();
        }
    }
    
    // Ajustar la altura del contenedor basado en las imágenes
    adjustContainerHeight() {
        const images = this.container.querySelectorAll('img');
        if (images.length > 0) {
            // Aseguramos que el contenedor tenga suficiente altura
            const minHeight = 500; // Altura mínima en píxeles para coincidir con el CSS
            this.container.style.minHeight = `${minHeight}px`;
        }
    }
    
    setInitialPosition() {
        this.updateSliderPosition(50);
    }
    
    addEventListeners() {
        // Mouse events
        this.slider.addEventListener('mousedown', this.startSliding.bind(this));
        document.addEventListener('mousemove', this.slide.bind(this));
        document.addEventListener('mouseup', this.stopSliding.bind(this));
        
        // Touch events
        this.slider.addEventListener('touchstart', this.startSliding.bind(this), { passive: true });
        document.addEventListener('touchmove', this.slide.bind(this), { passive: false });
        document.addEventListener('touchend', this.stopSliding.bind(this), { passive: true });
        
        // Prevent image dragging
        this.container.addEventListener('dragstart', (e) => e.preventDefault());
    }
    
    startSliding(e) {
        this.isResizing = true;
        this.container.classList.add('resizing');
        
        // Capturar posición inicial
        this.startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        this.sliderLeft = this.slider.offsetLeft;
    }
    
    slide(e) {
        if (!this.isResizing) return;
        
        e.preventDefault();
        
        const pageX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const container = this.container.getBoundingClientRect();
        const position = pageX - container.left;
        const percentage = Math.min(Math.max((position / container.width) * 100, 0), 100);
        
        // Usar requestAnimationFrame para una animación más suave
        requestAnimationFrame(() => {
            this.updateSliderPosition(percentage);
            
            // Mostrar u ocultar etiquetas según la posición del slider
            const beforeLabel = this.container.querySelector('.before-label');
            const afterLabel = this.container.querySelector('.after-label');
            
            if (beforeLabel && afterLabel) {
                beforeLabel.style.opacity = percentage < 20 ? '0' : '1';
                afterLabel.style.opacity = percentage > 80 ? '0' : '1';
            }
        });
    }
    
    stopSliding() {
        this.isResizing = false;
        this.container.classList.remove('resizing');
    }
    
    updateSliderPosition(percentage) {
        this.beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        this.slider.style.left = `${percentage}%`;
        
        // Ajustar la posición de la imagen antes para mantener alineación
        const beforeImg = this.beforeImage.querySelector('img');
        if (beforeImg) {
            // Mantener la imagen cubriendo todo el contenedor
            beforeImg.style.width = '100%';
            beforeImg.style.height = '100%';
            beforeImg.style.objectFit = 'cover';
            beforeImg.style.left = '0';
            beforeImg.style.top = '0';
        }
    }
    
    showWithAnimation() {
        requestAnimationFrame(() => {
            this.container.style.opacity = '1';
            this.container.style.transform = 'translateY(0)';
        });
    }
}

// Inicializar todos los comparadores cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.before-after-container');
    sliders.forEach(slider => new BeforeAfterSlider(slider));
});