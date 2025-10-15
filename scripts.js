// fecha pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Modal behavior (accesible y simple)
(function () {
    const modal = document.getElementById('modal-cita');

    // Seleccionamos *todos* los disparadores de apertura:
    // - el header (#openModalBtn)
    // - el botón del hero (#open-cta-2)
    // - el sticky (#open-sticky)
    // - cualquier elemento con la clase .open-modal
    // - cualquier elemento con el atributo data-open-modal
    const openBtns = document.querySelectorAll(
        '#openModalBtn'
    );

    // dentro del modal: todos los elementos que tengan data-close="true"
    const closeTriggers = modal ? modal.querySelectorAll('[data-close]') : [];

    function openModal() {
        if (!modal) return;
        // guardar foco previo ANTES de moverlo al modal
        modal._previousActive = document.activeElement;

        // mostrar modal y bloquear scroll de fondo
        modal.hidden = false;
        document.body.style.overflow = 'hidden';

        // poner foco en el primer control del modal
        const first = modal.querySelector('input, select, button, [tabindex]:not([tabindex="-1"])');
        first && first.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.hidden = true;
        document.body.style.overflow = '';
        // restaurar foco
        if (modal._previousActive && typeof modal._previousActive.focus === 'function') {
            modal._previousActive.focus();
        }
    }

    // Conectar todos los botones/elementos que abren el modal
    if (openBtns && openBtns.length) {
        openBtns.forEach(b => {
            // por seguridad: ignorar nodos nulos o duplicates
            if (!b) return;
            b.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
    }

    // Conectar todos los triggers de cierre dentro del modal (backdrop, X, Cancelar)
    closeTriggers.forEach(c => c.addEventListener('click', closeModal));

    // cerrar con Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
    });

    // prevenir submit real, simular envío
    const form = document.getElementById('form-cita');
    form && form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Solicitud enviada (simulada). Nos pondremos en contacto contigo.');
        closeModal();
    });
})();
