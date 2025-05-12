/**
 * CALCULADORA DE PRESUPUESTOS - REFORMAS DONOSTI
 * Script para calcular presupuestos estimados de reformas
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const calculatorForm = document.getElementById('budget-calculator');
    const calculatorResult = document.getElementById('calculator-result');
    const recalculateBtn = document.getElementById('recalculate-btn');
    
    if (!calculatorForm || !calculatorResult) return;
    
    // Precios base por metro cuadrado según tipo de reforma
    const basePrices = {
        'integral': 800,
        'cocina': 650,
        'bano': 700,
        'carpinteria': 400
    };
    
    // Multiplicadores según calidad
    const qualityMultipliers = {
        'estandar': 1,
        'premium': 1.3,
        'lujo': 1.8
    };
    
    // Tiempos estimados por tipo (en semanas)
    const estimatedTimes = {
        'integral': {
            base: 8,
            perSquareMeter: 0.05 // 0.05 semanas adicionales por m²
        },
        'cocina': {
            base: 3,
            perSquareMeter: 0.02
        },
        'bano': {
            base: 2,
            perSquareMeter: 0.01
        },
        'carpinteria': {
            base: 1,
            perSquareMeter: 0.01
        }
    };
    
    // Servicios incluidos según tipo de reforma
    const includedServices = {
        'integral': [
            'Gestión integral del proyecto',
            'Coordinación de todos los gremios',
            'Diseño de interiores',
            'Asesoramiento en materiales',
            'Limpieza final de obra',
            'Certificados de calidad'
        ],
        'cocina': [
            'Diseño personalizado de cocina',
            'Instalación completa',
            'Fontanería y electricidad',
            'Montaje de muebles',
            'Limpieza final'
        ],
        'bano': [
            'Diseño personalizado de baño',
            'Instalación completa',
            'Fontanería y electricidad',
            'Alicatado y solado',
            'Limpieza final'
        ],
        'carpinteria': [
            'Diseño a medida',
            'Fabricación e instalación',
            'Acabados personalizados',
            'Limpieza final'
        ]
    };
    
    // Inicializar eventos
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const reformType = document.getElementById('reform-type').value;
        const squareMeters = parseInt(document.getElementById('square-meters').value);
        const quality = document.querySelector('input[name="quality"]:checked').value;
        
        // Validar entrada
        if (!reformType || isNaN(squareMeters) || squareMeters <= 0) {
            showCalculatorError('Por favor, completa todos los campos correctamente');
            return;
        }
        
        // Calcular presupuesto
        const estimate = calculateBudget(reformType, squareMeters, quality);
        
        // Mostrar resultado con todos los detalles
        showEstimate(estimate, reformType, squareMeters, quality);
        
        // Inicializar chatbot con los datos del presupuesto si existe la función
        if (typeof window.initChatbot === 'function') {
            window.initChatbot(reformType, squareMeters, quality, estimate);
        }
    });
    
    // Manejar el botón de recalcular
    if (recalculateBtn) {
        recalculateBtn.addEventListener('click', function() {
            // Ocultar el resultado
            calculatorResult.classList.remove('active');
            
            // Hacer scroll al formulario después de un breve retraso
            setTimeout(() => {
                calculatorForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
    
    // Función para mostrar errores
    function showCalculatorError(message) {
        const estimateElement = calculatorResult.querySelector('.estimate');
        estimateElement.textContent = 'Error';
        estimateElement.style.color = 'var(--color-error)';
        
        const disclaimer = calculatorResult.querySelector('.disclaimer');
        disclaimer.textContent = message;
        
        calculatorResult.classList.add('active', 'error');
        
        // Quitar la clase de error después de un tiempo
        setTimeout(() => {
            calculatorResult.classList.remove('error');
            estimateElement.style.color = '';
            disclaimer.textContent = 'Este es un cálculo aproximado. Para un presupuesto detallado, contacta con nosotros.';
        }, 10000);
    }
    
    // Función para mostrar el presupuesto estimado con detalles
    function showEstimate(amount, type, size, quality) {
        const formatter = new Intl.NumberFormat('es-ES');
        const estimateElement = calculatorResult.querySelector('.estimate');
        
        // Actualizar el resumen del proyecto
        updateProjectSummary(type, size, quality);
        
        // Actualizar el desglose de costes
        updateCostBreakdown(amount);
        
        // Actualizar los servicios incluidos
        updateIncludedServices(type);
        
        // Animación del contador
        const duration = 1000; // ms
        const steps = 20;
        const step = Math.ceil(amount / steps);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= amount) {
                clearInterval(timer);
                current = amount;
            }
            estimateElement.textContent = formatter.format(current) + ' €';
            // También actualizar el total en el desglose de costes
            document.getElementById('cost-total').textContent = formatter.format(current) + ' €';
        }, duration / steps);
        
        calculatorResult.classList.add('active');
        
        // Scroll suave hasta el resultado
        calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Función para actualizar el resumen del proyecto
    function updateProjectSummary(type, size, quality) {
        // Nombres completos para el tipo de reforma
        const reformTypeNames = {
            'integral': 'Reforma integral',
            'cocina': 'Reforma de cocina',
            'bano': 'Reforma de baño',
            'carpinteria': 'Carpintería'
        };
        
        // Nombres completos para la calidad
        const qualityNames = {
            'estandar': 'Estándar',
            'premium': 'Premium',
            'lujo': 'Lujo'
        };
        
        // Calcular tiempo estimado
        const timeData = estimatedTimes[type] || estimatedTimes['integral'];
        const estimatedTime = Math.ceil(timeData.base + (size * timeData.perSquareMeter));
        const timeText = estimatedTime === 1 ? '1 semana' : `${estimatedTime} semanas`;
        
        // Actualizar los elementos del DOM
        document.getElementById('summary-type').textContent = reformTypeNames[type] || type;
        document.getElementById('summary-area').textContent = size;
        document.getElementById('summary-quality').textContent = qualityNames[quality] || quality;
        document.getElementById('summary-time').textContent = timeText;
    }
    
    // Función para actualizar el desglose de costes
    function updateCostBreakdown(totalAmount) {
        const formatter = new Intl.NumberFormat('es-ES');
        
        // Calcular desglose de costos (porcentajes aproximados)
        const materials = Math.round(totalAmount * 0.6); // 60% materiales
        const labor = Math.round(totalAmount * 0.3); // 30% mano de obra
        const installations = Math.round(totalAmount * 0.1); // 10% instalaciones
        
        // Actualizar los elementos del DOM
        document.getElementById('cost-materials').textContent = formatter.format(materials) + ' €';
        document.getElementById('cost-labor').textContent = formatter.format(labor) + ' €';
        document.getElementById('cost-installations').textContent = formatter.format(installations) + ' €';
        document.getElementById('cost-total').textContent = formatter.format(totalAmount) + ' €';
    }
    
    // Función para actualizar los servicios incluidos
    function updateIncludedServices(type) {
        // Obtener la lista de servicios para el tipo seleccionado
        const services = includedServices[type] || includedServices['integral'];
        
        // Actualizar la lista en el DOM
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = '';
        
        services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = service;
            servicesList.appendChild(li);
        });
    }
    
    // Función para calcular el presupuesto
    function calculateBudget(type, size, quality) {
        // Calcular precio base
        let basePrice = basePrices[type] || 500;
        
        // Aplicar ajuste por tamaño (economía de escala)
        let sizeAdjustment = 1;
        if (size > 100) {
            sizeAdjustment = 0.9; // 10% descuento para espacios grandes
        } else if (size < 40) {
            sizeAdjustment = 1.1; // 10% extra para espacios pequeños (más complejos)
        }
        
        // Calcular presupuesto final
        const budget = Math.round(basePrice * size * qualityMultipliers[quality] * sizeAdjustment);
        
        return budget;
    }
});
