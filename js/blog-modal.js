/* ===== FUNCIONALIDAD DEL MODAL DE BLOG ===== */
/* Script para manejar la apertura, cierre y navegación del modal de artículos del blog */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const blogCards = document.querySelectorAll('.blog-card');
    const modalOverlay = document.querySelector('.blog-modal-overlay');
    const modal = document.querySelector('.blog-modal');
    const closeBtn = document.querySelector('.blog-modal-close');
    const body = document.body;
    
    const articulos = [
        {
            id: 1,
            titulo: 'Tendencias en Cocinas para 2025',
            imagen: 'assets/img/blog_card_cocina.png',
            fecha: '15 de marzo, 2025',
            autor: 'Equipo Reformas Donosti',
            contenido: `
                <p>Las cocinas modernas están evolucionando rápidamente, combinando funcionalidad, tecnología y diseño. Para 2025, vemos tendencias claras que están definiendo el futuro de este espacio esencial del hogar.</p>
                
                <h3>1. Colores naturales y terrosos</h3>
                <p>Los tonos inspirados en la naturaleza están dominando las tendencias. Verdes oliva, azules oceánicos y marrones tierra aportan calidez y conexión con el exterior. Estos colores se combinan con acabados en madera natural para crear ambientes acogedores y atemporales.</p>
                
                <h3>2. Islas multifuncionales</h3>
                <p>Las islas de cocina han evolucionado para convertirse en el centro neurálgico del hogar. Ahora incorporan zonas de trabajo, almacenaje, cocción y asientos, todo en un diseño integrado. Las nuevas islas incluyen niveles variables para diferentes funciones y enchufes integrados para dispositivos.</p>
                
                <h3>3. Tecnología inteligente integrada</h3>
                <p>Los electrodomésticos conectados ya no son el futuro, sino el presente. Frigoríficos que sugieren recetas según su contenido, hornos que se pueden controlar remotamente y grifos activados por voz son algunas de las innovaciones que están transformando nuestras cocinas.</p>
                
                <p>En Reformas Donosti estamos a la vanguardia de estas tendencias, implementando soluciones innovadoras adaptadas a cada cliente. ¿Estás pensando en renovar tu cocina? Contáctanos para una consulta personalizada.</p>
            `
        },
        {
            id: 2,
            titulo: 'Caso de Éxito: Reforma Integral en Gros',
            imagen: 'assets/img/projects/partevieja_despues.png',
            fecha: '2 de febrero, 2025',
            autor: 'Mikel Aguirre',
            contenido: `
                <p>Hoy queremos compartir uno de nuestros proyectos más desafiantes y gratificantes: la reforma integral de un apartamento de 85m² en el barrio de Gros, Donostia.</p>
                
                <h3>El desafío</h3>
                <p>Nuestros clientes, una pareja joven con un hijo pequeño, querían transformar un piso antiguo con distribución tradicional en un espacio abierto, luminoso y funcional. El apartamento, construido en los años 60, presentaba problemas de humedad, instalaciones obsoletas y una distribución que no aprovechaba la luz natural.</p>
                
                <h3>Nuestra solución</h3>
                <p>Propusimos una redistribución completa del espacio, derribando varios tabiques para crear un gran espacio diáfano que integra salón, comedor y cocina. Mantuvimos dos dormitorios amplios y renovamos completamente el baño, añadiendo un aseo adicional.</p>
                
                <p>Renovamos todas las instalaciones (electricidad, fontanería, calefacción) e implementamos un sistema de aerotermia para mayor eficiencia energética. Los suelos de parquet natural, las ventanas de doble acristalamiento y la iluminación LED completan un hogar moderno y eficiente.</p>
                
                <h3>El resultado</h3>
                <p>La transformación ha sido espectacular. El piso ahora disfruta de una sensación de amplitud y luminosidad, con espacios bien definidos pero conectados. La cocina abierta se ha convertido en el centro de la vida familiar, mientras que los dormitorios ofrecen privacidad y confort.</p>
                
                <p>Nuestros clientes destacan especialmente la mejora en eficiencia energética, con una reducción significativa en sus facturas mensuales, y la calidad de los acabados.</p>
            `
        },
        {
            id: 3,
            titulo: 'Baños Modernos: Funcionalidad y Estilo',
            imagen: 'assets/img/projects/gros_despues.png',
            fecha: '18 de enero, 2025',
            autor: 'Laura Mendizábal',
            contenido: `
                <p>El baño ha dejado de ser un espacio puramente funcional para convertirse en un santuario de bienestar dentro del hogar. Las tendencias actuales combinan practicidad con diseño para crear espacios que invitan al relax.</p>
                
                <h3>Materiales premium y sostenibles</h3>
                <p>Los materiales naturales como la piedra, la madera tratada para ambientes húmedos y los azulejos artesanales están ganando protagonismo. Estos materiales no solo aportan calidez y textura, sino que también son más sostenibles y duraderos.</p>
                
                <h3>Iluminación estratégica</h3>
                <p>Una iluminación bien planificada transforma completamente la experiencia del baño. Combinamos luz ambiental, funcional y decorativa para crear diferentes ambientes según las necesidades: desde una luz brillante para las rutinas matutinas hasta una iluminación suave y relajante para un baño nocturno.</p>
                
                <h3>Soluciones de almacenamiento inteligentes</h3>
                <p>Maximizar el espacio es esencial, especialmente en baños pequeños. Implementamos soluciones como muebles suspendidos, nichos empotrados en duchas y bañeras, y armarios a medida que aprovechan cada centímetro disponible sin sacrificar la estética.</p>
                
                <p>En Reformas Donosti diseñamos baños que combinan belleza y funcionalidad, adaptados a tus necesidades específicas y al estilo de tu hogar. Contáctanos para descubrir cómo podemos transformar tu baño en un espacio de bienestar.</p>
            `
        },
        {
            id: 4,
            titulo: '5 Errores Comunes al Reformar y Cómo Evitarlos',
            imagen: 'assets/img/blog_card_errores.png',
            fecha: '5 de diciembre, 2024',
            autor: 'Equipo Reformas Donosti',
            contenido: `
                <p>Una reforma puede ser un proceso emocionante pero también desafiante. Después de años de experiencia, hemos identificado los errores más comunes que cometen los propietarios al embarcarse en un proyecto de reforma.</p>
                
                <h3>1. Planificación insuficiente</h3>
                <p>Muchos propietarios subestiman la importancia de una planificación detallada. Antes de comenzar cualquier trabajo, es esencial tener un plan completo que incluya diseño, materiales, presupuesto y cronograma. Una buena planificación evita sorpresas desagradables y sobrecostes.</p>
                
                <h3>2. Presupuesto irrealista</h3>
                <p>Es recomendable añadir un margen del 15-20% al presupuesto inicial para imprevistos. Las reformas a menudo revelan problemas ocultos (como humedades o instalaciones defectuosas) que necesitan ser abordados.</p>
                
                <h3>3. Elección incorrecta de materiales</h3>
                <p>Seleccionar materiales únicamente por su estética, sin considerar su durabilidad, mantenimiento o idoneidad para el espacio, es un error costoso a largo plazo. Es importante equilibrar estética, funcionalidad y calidad.</p>
                
                <h3>4. Ignorar la eficiencia energética</h3>
                <p>No aprovechar la reforma para mejorar la eficiencia energética del hogar es una oportunidad perdida. Invertir en aislamiento, ventanas eficientes y sistemas de climatización modernos reduce las facturas y aumenta el valor de la propiedad.</p>
                
                <h3>5. Comunicación deficiente</h3>
                <p>La falta de comunicación clara con los profesionales puede llevar a malentendidos y resultados insatisfactorios. Es fundamental establecer canales de comunicación efectivos y revisar regularmente el progreso del proyecto.</p>
            `
        },
        {
            id: 5,
            titulo: 'Sostenibilidad en Reformas: Materiales y Soluciones',
            imagen: 'assets/img/blog_card_Sostenibilidad.png',
            fecha: '10 de noviembre, 2024',
            autor: 'Ane Etxeberria',
            contenido: `
                <p>La sostenibilidad se ha convertido en una prioridad en el sector de la construcción y las reformas. Cada vez más clientes buscan opciones que minimicen el impacto ambiental sin comprometer la calidad o la estética.</p>
                
                <h3>Materiales ecológicos</h3>
                <p>Existen numerosas alternativas sostenibles a los materiales tradicionales. La madera certificada FSC, los azulejos reciclados, las pinturas sin COV (Compuestos Orgánicos Volátiles) y los aislantes naturales como la fibra de madera o el corcho son excelentes opciones para una reforma respetuosa con el medio ambiente.</p>
                
                <h3>Eficiencia hídrica</h3>
                <p>Los sistemas de ahorro de agua, como grifos con aireadores, inodoros de doble descarga y duchas de bajo flujo, pueden reducir el consumo de agua hasta en un 50% sin afectar al confort. Algunas soluciones más avanzadas incluyen sistemas de reutilización de aguas grises.</p>
                
                <h3>Aprovechamiento de materiales existentes</h3>
                <p>La reutilización y restauración de elementos como puertas, suelos de madera o radiadores antiguos no solo reduce residuos, sino que también preserva el carácter y la historia del espacio. Esta práctica, conocida como "upcycling", está ganando popularidad en proyectos de reforma.</p>
                
                <p>En Reformas Donosti estamos comprometidos con prácticas sostenibles y podemos asesorarte sobre las mejores opciones para tu proyecto específico, equilibrando sostenibilidad, presupuesto y estética.</p>
            `
        }
    ];
    
    // Función para abrir el modal con el contenido del artículo seleccionado
    function abrirModal(articulo) {
        // Actualizar contenido del modal
        document.querySelector('.blog-modal-header img').src = articulo.imagen;
        document.querySelector('.blog-modal-title').textContent = articulo.titulo;
        document.querySelector('.blog-modal-date').textContent = articulo.fecha;
        document.querySelector('.blog-modal-author').textContent = articulo.autor;
        document.querySelector('.blog-modal-body').innerHTML = articulo.contenido;
        
        // Configurar navegación entre artículos
        configurarNavegacion(articulo.id);
        
        // Mostrar el modal con animación
        modalOverlay.classList.add('active');
        body.style.overflow = 'hidden'; // Evitar scroll en el fondo
        
        // Enfocar el modal para accesibilidad
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    }
    
    // Función para cerrar el modal
    function cerrarModal() {
        modalOverlay.classList.remove('active');
        body.style.overflow = ''; // Restaurar scroll
    }
    
    // Función para configurar la navegación entre artículos
    function configurarNavegacion(articuloId) {
        const prevBtn = document.querySelector('.blog-modal-nav .prev');
        const nextBtn = document.querySelector('.blog-modal-nav .next');
        
        // Encontrar índices del artículo actual, anterior y siguiente
        const indiceActual = articulos.findIndex(art => art.id === articuloId);
        const indicePrev = indiceActual > 0 ? indiceActual - 1 : articulos.length - 1;
        const indiceNext = indiceActual < articulos.length - 1 ? indiceActual + 1 : 0;
        
        // Configurar botones de navegación
        prevBtn.onclick = () => abrirModal(articulos[indicePrev]);
        nextBtn.onclick = () => abrirModal(articulos[indiceNext]);
        
        // Actualizar textos de navegación
        prevBtn.querySelector('span').textContent = 'Anterior: ' + articulos[indicePrev].titulo;
        nextBtn.querySelector('span').textContent = 'Siguiente: ' + articulos[indiceNext].titulo;
    }
    
    // Asignar eventos a las tarjetas de blog
    blogCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Si el clic fue en el botón "Leer más", prevenir comportamiento por defecto
            if (e.target.classList.contains('btn-outline')) {
                e.preventDefault();
            }
            // Abrir el modal con el artículo correspondiente
            // Usamos el índice para simplificar, pero en una implementación real
            // podríamos usar IDs o slugs para identificar cada artículo
            abrirModal(articulos[index % articulos.length]);
        });
    });
    
    // Evento para cerrar el modal con el botón de cierre
    closeBtn.addEventListener('click', cerrarModal);
    
    // Cerrar el modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });
    
    // Cerrar el modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            cerrarModal();
        }
    });
});