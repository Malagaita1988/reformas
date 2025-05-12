# Proyecto Reformas Donosti

## Descripción General

Reformas Donosti es un sitio web profesional para una empresa (ficticiad)e reformas integrales ubicada en San Sebastián (Donostia). El sitio está diseñado para mostrar los servicios de la empresa, proyectos realizados, facilitar el contacto con clientes potenciales y proporcionar una herramienta de cálculo de presupuestos.

## Estructura del Proyecto y Diseño

### Organización de Archivos

El proyecto está organizado de manera modular, separando claramente el HTML, CSS y JavaScript:

```
reformas-donosti/
├── assets/            # Recursos multimedia (imágenes, videos, iconos)
├── css/               # Archivos de estilos
│   ├── styles.css     # Estilos generales y variables CSS
│   ├── components.css # Componentes reutilizables (cards, botones, etc.)
│   ├── calculator.css # Estilos específicos para la calculadora
│   ├── testimonials.css # Estilos para la sección de testimonios
│   └── footer.css     # Estilos específicos para el footer
├── js/                # Archivos JavaScript
│   ├── main.js        # Funcionalidad principal y efectos UI
│   ├── calculator.js  # Lógica de la calculadora de presupuestos
│   ├── before-after-slider.js # Slider comparativo antes/después
│   ├── testimonials-slider.js # Carrusel de testimonios
│   └── chatbot.js     # Funcionalidad del asistente virtual
├── index.html         # Página principal
├── servicios.html     # Página de servicios
├── proyectos.html     # Página de proyectos
├── nosotros.html      # Página sobre la empresa
├── blog.html          # Blog con artículos
└── contacto.html      # Página de contacto
```

### Sistema de Diseño y Metodologías CSS

#### Sistema de Variables CSS

El proyecto utiliza variables CSS (custom properties) para mantener consistencia en todo el sitio:

```css
:root {
    /* Colores principales */
    --color-primary: #2c3e50;    /* Azul oscuro corporativo */
    --color-secondary: #e67e22;  /* Naranja para acentos */
    --color-accent: #3498db;     /* Azul claro para elementos interactivos */
    --color-light: #f5f5f5;
    --color-white: #fff;
    --color-dark: #333;
    --color-gray: #777;
    
    /* Tipografía */
    --font-primary: 'Montserrat', sans-serif;  /* Títulos y texto principal */
    --font-secondary: 'Lora', serif;          /* Textos destacados */
    
    /* Espaciado */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --spacing-xl: 8rem;
    
    /* Bordes y sombras */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 16px;
    --box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
    --box-shadow-hover: 0 15px 35px rgb(0 0 0 / 15%);
}
```

#### Técnicas de Layout

El sitio utiliza una combinación de técnicas modernas de CSS:

1. **Flexbox**: Utilizado principalmente para:
   - Alineación de elementos en el header y navegación
   - Distribución de contenido en tarjetas de servicios
   - Alineación vertical y horizontal en secciones como el hero
   - Organización de formularios y elementos interactivos

2. **CSS Grid**: Implementado para:
   - Layout general de secciones multi-columna
   - Distribución de tarjetas de servicios (`.services-grid`)
   - Opciones de calidad en la calculadora (`.quality-options`)
   - Footer responsive (`.footer-grid`)
   - Detalles de resultados en la calculadora (`.result-details`)

3. **Posicionamiento Avanzado**:
   - Elementos superpuestos como el slider antes/después
   - Overlay para el pop-up de la calculadora
   - Efectos de parallax en secciones con imágenes de fondo

## Componentes Principales y su Implementación

### 1. Header y Navegación

El header utiliza Flexbox para distribuir el logo y la navegación:

```css
.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

La navegación móvil implementa un menú hamburguesa con transiciones CSS:

```css
.menu-toggle {
    display: none; /* Oculto en desktop */
}

@media (width <= 768px) {
    .menu-toggle {
        display: block;
    }
    
    .nav-list {
        position: fixed;
        top: 80px;
        right: -100%;
        width: 80%;
        height: calc(100vh - 80px);
        background-color: var(--color-white);
        transition: right 0.3s ease;
    }
    
    .nav-list.active {
        right: 0;
    }
}
```

### 2. Calculadora de Presupuestos

#### Estructura HTML

La calculadora se organiza en dos componentes principales:
- Formulario de entrada (`.calculator-form`)
- Resultados (`.calculator-result`)

#### Diseño CSS

El formulario utiliza una estructura de grid para los campos:

```css
.calculator-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    position: relative;
    z-index: 1;
    min-height: 300px;
}

.calculator-form {
    margin: 0 auto;
    background-color: white;
    border-radius: var(--border-radius-lg);
    padding: 2rem;
    box-shadow: 0 15px 40px rgb(0 0 0 / 8%);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    max-width: 100%;
}
```

Los radio buttons de calidad están implementados como tarjetas seleccionables usando la técnica de input oculto + label:

```css
.quality-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.7rem;
}

.quality-option input[type="radio"] {
    position: absolute;
    opacity: 0;
}

.quality-option input[type="radio"]:checked + .quality-content {
    border-color: var(--color-primary);
    background-color: rgb(var(--color-primary-rgb), 0.05);
    transform: translateY(-3px);
}
```

El resultado se muestra como un overlay centrado con animación:

```css
.calculator-result {
    padding: 2.5rem;
    background-color: var(--color-primary);
    color: white;
    border-radius: var(--border-radius-lg);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    box-shadow: 0 15px 40px rgb(0 0 0 / 15%);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    visibility: hidden;
    z-index: 10;
}

.calculator-result.active {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
    position: relative;
}
```

#### Lógica JavaScript

La calculadora implementa:
- Cálculo dinámico basado en inputs del usuario
- Precios base por tipo de reforma
- Multiplicadores según calidad seleccionada
- Ajustes por tamaño (economía de escala)
- Animación de contador para mostrar resultados

```javascript
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

// Función para calcular el presupuesto
function calculateBudget(type, size, quality) {
    let basePrice = basePrices[type] || 500;
    let sizeAdjustment = 1;
    
    if (size > 100) {
        sizeAdjustment = 0.9; // 10% descuento para espacios grandes
    } else if (size < 40) {
        sizeAdjustment = 1.1; // 10% extra para espacios pequeños (más complejos)
    }
    
    const budget = Math.round(basePrice * size * qualityMultipliers[quality] * sizeAdjustment);
    return budget;
}
```

### 3. Slider Antes/Después

Implementa una comparación interactiva de imágenes usando:
- Posicionamiento relativo/absoluto para superponer imágenes
- JavaScript para control del deslizador
- Eventos de mouse/touch para interactividad

```css
.before-after-container {
    position: relative;
    overflow: hidden;
    cursor: col-resize;
}

.before-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    overflow: hidden;
}

.comparison-slider {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: white;
    transform: translateX(-50%);
    cursor: col-resize;
}

.slider-handle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### 4. Carrusel de Testimonios

Implementa un sistema de slides con:
- Navegación por flechas e indicadores
- Transiciones suaves entre slides
- Overlay con gradiente para mejorar legibilidad del texto

```css
.testimonial {
    display: none; /* Oculto por defecto */
    width: 100%;
    height: 400px;
    border-radius: 12px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.testimonial.active {
    display: block; /* Mostrar el testimonio activo */
    position: relative;
}

.testimonial-overlay {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    height: 100%;
}
```

### 5. Footer Responsive

Implementa un grid adaptativo que cambia de 4 columnas a 2 y luego 1 en móviles:

```css
.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2.2rem;
    margin-bottom: 2rem;
    align-items: start;
}

@media (width <= 700px) {
    .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 1.2rem;
    }
}

@media (width <= 500px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 0.5rem;
    }
}
```

## Responsive Design

El sitio implementa un enfoque mobile-first con breakpoints estratégicos:

```css
/* Tablet */
@media (width <= 992px) {
    /* Ajustes para tablet */
}

/* Mobile grande */
@media (width <= 768px) {
    /* Ajustes para móviles grandes */
}

/* Mobile pequeño */
@media (width <= 480px) {
    /* Ajustes para móviles pequeños */
}
```

Técnicas responsive implementadas:
- Unidades relativas (rem, %, vh/vw)
- Media queries para ajustes específicos
- Flexbox y Grid para layouts adaptables
- Imágenes responsive con object-fit
- Menú hamburguesa en móviles

## Optimización y Rendimiento

### Estrategias Implementadas

- **Imágenes Optimizadas**: Formato adecuado y tamaños responsivos
- **CSS Modular**: Separación en archivos por funcionalidad para mejor mantenimiento
- **Media Queries Eficientes**: Breakpoints estratégicos en 768px, 700px y 480px

### Accesibilidad

- **Contraste Adecuado**: Colores que cumplen con relaciones de contraste WCAG
- **Estructura Semántica**: Uso apropiado de elementos HTML5 (header, nav, section, etc.)
- **Atributos ARIA**: Implementados en componentes interactivos
- **Navegación por Teclado**: Soporte para usuarios que no utilizan ratón

## Notas Importantes

- La calculadora proporciona estimaciones aproximadas. Los presupuestos finales pueden variar.
- El sitio utiliza cookies para mejorar la experiencia del usuario.
- El proyecto ha sido migrado de Node.js a PHP para compatibilidad con el hosting de Hostinger.

## Contacto y Soporte

Para cualquier duda o problema técnico, contactar con el administrador del sitio a través de info@webdonosti.com.
