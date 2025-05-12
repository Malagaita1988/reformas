

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // VARIABLES GLOBALES
    // ==========================================
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const contactForm = document.querySelector('.contact-form');
    const chatBot = document.getElementById('chat-bot');
    const chatToggle = document.querySelector('.chat-toggle');
    const chatClose = document.querySelector('.chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-message');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    // Configuración de animaciones
    const animationConfig = {
        duration: 500,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        once: false,
        mirror: true
    };
    
    // ==========================================
    // FUNCIONES DE HEADER Y NAVEGACIÓN
    // ==========================================
    
    /**
     * Función para manejar el scroll y cambiar el estilo del header
     */
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    /**
     * Inicializa efectos de parallax en las secciones
     */
    function initParallaxEffects() {
        const parallaxSections = document.querySelectorAll('.parallax-bg');
        
        if (parallaxSections.length > 0) {
            window.addEventListener('scroll', () => {
                parallaxSections.forEach(section => {
                    const scrollPosition = window.pageYOffset;
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    // Solo aplicar el efecto cuando la sección está visible
                    if (scrollPosition > sectionTop - window.innerHeight && 
                        scrollPosition < sectionTop + sectionHeight) {
                        
                        const speed = section.dataset.speed || 0.5;
                        const yPos = (scrollPosition - sectionTop) * speed;
                        
                        section.style.backgroundPosition = `50% ${yPos}px`;
                    }
                });
            });
        }
    }

    /**
     * Inicializa el chatbot para presupuestos
     * @param {string} roomType - Tipo de habitación
     * @param {number} roomSize - Tamaño en metros cuadrados
     * @param {string} quality - Calidad de los acabados
     * @param {number} estimate - Presupuesto estimado
     */
    function initChatbot(roomType, roomSize, quality, estimate) {
        // Crear el contenedor del chatbot si no existe
        let chatbotContainer = document.querySelector('.chatbot-container');
        
        if (!chatbotContainer) {
            chatbotContainer = document.createElement('div');
            chatbotContainer.classList.add('chatbot-container');
            document.body.appendChild(chatbotContainer);
            
            // Estructura del chatbot
            chatbotContainer.innerHTML = `
                <div class="chatbot-header">
                    <h3>Asistente de Reformas</h3>
                    <button class="chatbot-close" aria-label="Cerrar chatbot">&times;</button>
                </div>
                <div class="chatbot-messages"></div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Escribe tu pregunta..." aria-label="Mensaje">
                    <button class="chatbot-send" aria-label="Enviar mensaje">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            `;
            
            // Evento para cerrar el chatbot
            const closeBtn = chatbotContainer.querySelector('.chatbot-close');
            closeBtn.addEventListener('click', () => {
                chatbotContainer.classList.remove('active');
                setTimeout(() => {
                    chatbotContainer.remove();
                }, 300);
            });
            
            // Evento para enviar mensajes
            const input = chatbotContainer.querySelector('input');
            const sendBtn = chatbotContainer.querySelector('.chatbot-send');
            const messagesContainer = chatbotContainer.querySelector('.chatbot-messages');
            
            function sendMessage() {
                const message = input.value.trim();
                if (message === '') return;
                
                // Añadir mensaje del usuario
                addMessage('user', message);
                input.value = '';
                
                // Simular respuesta del chatbot (con delay para realismo)
                setTimeout(() => {
                    // Mostrar indicador de escritura
                    const typingIndicator = document.createElement('div');
                    typingIndicator.classList.add('chatbot-message', 'bot', 'typing');
                    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
                    messagesContainer.appendChild(typingIndicator);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    
                    // Después de un tiempo, mostrar la respuesta real
                    setTimeout(() => {
                        typingIndicator.remove();
                        const response = getBotResponse(message, roomType, roomSize, quality, estimate);
                        addMessage('bot', response);
                    }, 1500);
                }, 500);
            }
            
            sendBtn.addEventListener('click', sendMessage);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
            
            // Función para añadir mensajes al chat
            function addMessage(sender, text) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('chatbot-message', sender);
                messageElement.textContent = text;
                messagesContainer.appendChild(messageElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
            
            // Mensaje inicial del chatbot
            setTimeout(() => {
                let roomTypeName = '';
                switch(roomType) {
                    case 'bathroom': roomTypeName = 'baño'; break;
                    case 'kitchen': roomTypeName = 'cocina'; break;
                    case 'living': roomTypeName = 'salón'; break;
                    case 'bedroom': roomTypeName = 'dormitorio'; break;
                    case 'full': roomTypeName = 'reforma integral'; break;
                    default: roomTypeName = 'reforma';
                }
                
                let qualityName = '';
                switch(quality) {
                    case 'basic': qualityName = 'básica'; break;
                    case 'standard': qualityName = 'estándar'; break;
                    case 'premium': qualityName = 'premium'; break;
                    default: qualityName = 'estándar';
                }
                
                const formatter = new Intl.NumberFormat('es-ES');
                const welcomeMessage = `¡Hola! Soy el asistente virtual de Reformas Donosti. Veo que estás interesado en una ${roomTypeName} de ${roomSize}m² con calidad ${qualityName} (€${formatter.format(estimate)}). ¿En qué puedo ayudarte?`;
                
                addMessage('bot', welcomeMessage);
            }, 500);
        }
        
        // Mostrar el chatbot con animación
        setTimeout(() => {
            chatbotContainer.classList.add('active');
        }, 100);
    }
    
    /**
     * Obtiene una respuesta del chatbot basada en el mensaje del usuario
     * @param {string} message - Mensaje del usuario
     * @param {string} roomType - Tipo de habitación
     * @param {number} roomSize - Tamaño en metros cuadrados
     * @param {string} quality - Calidad de los acabados
     * @param {number} estimate - Presupuesto estimado
     * @returns {string} - Respuesta del chatbot
     */
    function getBotResponse(message, roomType, roomSize, quality, estimate) {
        message = message.toLowerCase();
        
        // Respuestas predefinidas basadas en palabras clave
        if (message.includes('precio') || message.includes('costo') || message.includes('cuánto') || message.includes('cuanto')) {
            return `El presupuesto estimado para tu proyecto es de €${estimate.toLocaleString('es-ES')}. Este es un cálculo aproximado basado en los datos proporcionados. Para un presupuesto detallado, necesitaríamos realizar una visita técnica.`;
        }
        
        if (message.includes('tiempo') || message.includes('duración') || message.includes('cuándo') || message.includes('cuando') || message.includes('plazo')) {
            let tiempo = '';
            switch(roomType) {
                case 'bathroom': tiempo = 'entre 2 y 3 semanas'; break;
                case 'kitchen': tiempo = 'entre 3 y 4 semanas'; break;
                case 'living': tiempo = 'entre 2 y 3 semanas'; break;
                case 'bedroom': tiempo = 'entre 1 y 2 semanas'; break;
                case 'full': tiempo = 'entre 6 y 8 semanas'; break;
                default: tiempo = 'variable según el alcance del proyecto';
            }
            return `El tiempo estimado para completar este tipo de reforma es ${tiempo}, dependiendo de la complejidad y los materiales seleccionados.`;
        }
        
        if (message.includes('material') || message.includes('calidad')) {
            let materialesInfo = '';
            switch(quality) {
                case 'basic':
                    materialesInfo = 'materiales funcionales y económicos que cumplen con los estándares básicos de calidad';
                    break;
                case 'standard':
                    materialesInfo = 'materiales de buena calidad con mayor durabilidad y opciones de personalización';
                    break;
                case 'premium':
                    materialesInfo = 'materiales de alta gama, marcas reconocidas y acabados exclusivos con máxima durabilidad y diseño';
                    break;
                default:
                    materialesInfo = 'diferentes opciones de materiales según tus necesidades y presupuesto';
            }
            return `Para este tipo de proyecto utilizamos ${materialesInfo}. Podemos mostrarte muestras y catálogos durante una visita técnica.`;
        }
        
        if (message.includes('visita') || message.includes('técnico') || message.includes('tecnico') || message.includes('presencial')) {
            return 'Podemos programar una visita técnica gratuita para evaluar el espacio y ofrecerte un presupuesto detallado. Por favor, contáctanos a través del formulario en la sección de contacto o llámanos al 943 XX XX XX.';
        }
        
        if (message.includes('garantía') || message.includes('garantia')) {
            return 'Ofrecemos una garantía de 2 años en todos nuestros trabajos de reforma, cubriendo posibles defectos en la ejecución. Los materiales instalados cuentan con la garantía del fabricante.';
        }
        
        if (message.includes('pago') || message.includes('financiación') || message.includes('financiacion') || message.includes('plazos')) {
            return 'Ofrecemos varias opciones de pago, incluyendo financiación hasta 36 meses sin intereses (sujeto a aprobación). Normalmente solicitamos un 30% al inicio del proyecto, 50% durante la ejecución y 20% al finalizar.';
        }
        
        if (message.includes('gracias') || message.includes('adios') || message.includes('adiós')) {
            return '¡Gracias por tu interés en Reformas Donosti! Estamos a tu disposición para cualquier consulta adicional. ¿Deseas que te contactemos para concretar más detalles?';
        }
        
        // Respuesta por defecto
        return 'Gracias por tu pregunta. Para darte una respuesta más precisa, te recomendamos contactar directamente con nuestro equipo a través del formulario de contacto o llamando al 943 XX XX XX. Estaremos encantados de atenderte personalmente.';
    }
    
    // ==========================================
    // INICIALIZACIÓN Y EVENT LISTENERS
    // ==========================================
    
    // Inicializar el estado del header al cargar
    handleScroll();
    
    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Menú móvil toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animación de las barras del menú hamburguesa
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // BOTÓN CHATBOT FLOTANTE (abrir avanzado)
    // La lógica del chatbot avanzado ha sido movida a chatbot.js
    // Solo se mantiene el botón flotante en el HTML.
    

    // Cerrar el menú al hacer clic en un enlace (en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Inicializar efectos de parallax en secciones si existen
    initParallaxEffects();
    
    // ==========================================
    // INICIALIZACIÓN DE COMPONENTES ADICIONALES
    // ==========================================

    // Asigna la función global SOLO una vez
    if (typeof window.initChatbot !== 'function') {
        window.initChatbot = initChatbot;
    }

    
    // Inicializar comportamiento de las FAQ
    initFAQBehavior();
    
    /**
     * Inicializa el comportamiento de las preguntas frecuentes
     */
    function initFAQBehavior() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length > 0) {
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                if (question) {
                    question.addEventListener('click', () => {
                        // Cerrar todos los otros items
                        faqItems.forEach(otherItem => {
                            if (otherItem !== item && otherItem.classList.contains('active')) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Alternar el estado del item actual
                        item.classList.toggle('active');
                    });
                }
            });
            
            // Abrir el primer item por defecto
            if (faqItems.length > 0) {
                faqItems[0].classList.add('active');
            }
        }
    }
});

// Exportar funciones que necesitan ser accesibles globalmente
window.initChatbot = function(roomType, roomSize, quality, estimate) {
    // Esta función es un wrapper para la función interna
    // Se llama desde otros scripts o elementos HTML
    if (document.readyState === 'loading') {
        // Si el DOM aún no está cargado, esperar al evento DOMContentLoaded
        document.addEventListener('DOMContentLoaded', function() {
            initChatbot(roomType, roomSize, quality, estimate);
        });
    } else {
        // Si el DOM ya está cargado, ejecutar inmediatamente
        initChatbot(roomType, roomSize, quality, estimate);
    }
};