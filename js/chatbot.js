// chatbot.js - Lógica avanzada del chatbot para Reformas Donosti

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
        // Hacer visible y animar
        chatbotContainer.classList.add('active');
        chatbotContainer.style.display = 'block';
    } else {
        chatbotContainer.classList.add('active');
        chatbotContainer.style.display = 'block';
    }

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
        addMessage('user', message);
        input.value = '';
        setTimeout(() => {
            // Indicador de escritura
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('chatbot-message', 'bot', 'typing');
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            messagesContainer.appendChild(typingIndicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
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
        return `El tiempo estimado para tu reforma es ${tiempo}. Podemos darte una fecha más precisa tras una visita técnica.`;
    }
    if (message.includes('contacto') || message.includes('llamar') || message.includes('email') || message.includes('correo')) {
        return 'Puedes contactarnos directamente al correo info@webdonosti.com o llamando al 943 123 456. ¡Estaremos encantados de ayudarte!';
    }
    return '¡Gracias por tu mensaje! Un especialista te responderá lo antes posible.';
}

// Asigna la función global SOLO una vez
if (typeof window.initChatbot !== 'function') {
    window.initChatbot = initChatbot;
}
