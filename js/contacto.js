

function mostrarPopupExito() {
    // Evita duplicados
    if (document.getElementById('popup-exito')) return;
    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(30,40,60,0.55)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.transition = 'opacity 0.2s';

    const modal = document.createElement('div');
    modal.id = 'popup-exito';
    modal.setAttribute('role','alertdialog');
    modal.setAttribute('aria-modal','true');
    modal.style.background = '#fff';
    modal.style.padding = '2.2rem 2.5rem 1.7rem 2.5rem';
    modal.style.borderRadius = '16px';
    modal.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
    modal.style.maxWidth = '92vw';
    modal.style.textAlign = 'center';
    modal.style.position = 'relative';
    modal.innerHTML = `
        <div style="font-size:2.5rem;color:#27ae60;margin-bottom:0.6rem;"><i class='fas fa-check-circle'></i></div>
        <h2 style="margin:0 0 0.7rem 0;font-size:1.45rem;">¡Mensaje enviado correctamente!</h2>
        <p style="margin-bottom:1.5rem;">Nos pondremos en contacto contigo pronto.</p>
        <button id="cerrar-popup-exito" style="background:linear-gradient(90deg,#2186c4 60%,#f39c12 100%);color:#fff;font-weight:700;font-size:1.1rem;border:none;border-radius:8px;padding:0.7rem 2.2rem;cursor:pointer;transition:background 0.18s;">Cerrar</button>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    // Focus accesible
    setTimeout(()=>{document.getElementById('cerrar-popup-exito').focus();},80);
    // Cerrar popup
    function cerrar() {
        overlay.style.opacity = '0';
        setTimeout(()=>{
            if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        },200);
    }
    document.getElementById('cerrar-popup-exito').onclick = cerrar;
    overlay.onclick = function(e){ if(e.target===overlay) cerrar(); };
    document.addEventListener('keydown', function esc(e){
        if(e.key==='Escape'){ cerrar(); document.removeEventListener('keydown',esc); }
    });
}

// === Validación instantánea y feedback visual ===
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fields = [
        {id: 'nombre', type: 'text', required: true, min: 2, label: 'Nombre'},
        {id: 'email', type: 'email', required: true, label: 'Email'},
        {id: 'telefono', type: 'tel', required: false, label: 'Teléfono'},
        {id: 'mensaje', type: 'textarea', required: true, min: 10, label: 'Mensaje'},
        {id: 'privacidad', type: 'checkbox', required: true, label: 'Política de privacidad'}
    ];

    function showError(input, message) {
        let error = input.parentElement.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');
    }

    function clearError(input) {
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.textContent = '';
        input.classList.remove('input-error');
        input.setAttribute('aria-invalid', 'false');
    }

    function validateField(field) {
        const input = document.getElementById(field.id);
        if (!input) return true;
        let valid = true;
        let value = (input.type === 'checkbox') ? input.checked : input.value.trim();
        if (field.required && (!value || value.length === 0 || (input.type === 'checkbox' && !input.checked))) {
            showError(input, `El campo ${field.label} es obligatorio.`);
            valid = false;
        } else if (field.type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
            showError(input, 'Introduce un email válido.');
            valid = false;
        } else if (field.type === 'tel' && value && !/^\+?[0-9\s-]{6,}$/.test(value)) {
            showError(input, 'Introduce un teléfono válido.');
            valid = false;
        } else if (field.min && value.length < field.min) {
            showError(input, `Debe tener al menos ${field.min} caracteres.`);
            valid = false;
        } else {
            clearError(input);
        }
        return valid;
    }

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
            input.addEventListener('input', () => validateField(field));
            if (input.type === 'checkbox') {
                input.addEventListener('change', () => validateField(field));
            }
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let allValid = true;
        fields.forEach(field => {
            if (!validateField(field)) allValid = false;
        });
        if (allValid) {
            // Simula envío con spinner y mensaje de éxito
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
            setTimeout(() => {
                form.reset();
                form.querySelectorAll('.error-message').forEach(e => e.textContent = '');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Enviar mensaje</span><span class="spinner" id="spinner" aria-hidden="true" style="display:none;"></span>';
                // Pop-up modal de éxito
                mostrarPopupExito();
                // Console log
                console.log('¡Mensaje enviado correctamente!');
            }, 1800);
        }
    });
});
