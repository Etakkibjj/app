import { globalState } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
    initPlanner();
    initSessions();
    renderLists();
});

function initPlanner() {
    const form = document.getElementById('plannerForm');
    if (!form) return;

    // Establecer fecha actual por defecto
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('planDate').value = now.toISOString().slice(0, 16);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const workout = {
            date: document.getElementById('planDate').value,
            modalidad: document.getElementById('planModalidad').value,
            objetivo: document.getElementById('planObjetivo').value
        };

        globalState.addPlannedWorkout(workout);
        form.reset();
        renderLists();
        alert('¡Sesión planificada con éxito!');
    });
}

function initSessions() {
    const form = document.getElementById('sessionForm');
    if (!form) return;

    document.getElementById('sessDate').value = new Date().toISOString().split('T')[0];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const session = {
            date: document.getElementById('sessDate').value,
            modalidad: document.getElementById('sessModalidad').value,
            duration: document.getElementById('sessDuration').value,
            rpe: document.getElementById('sessRPE').value,
            notes: document.getElementById('sessNotes').value
        };

        globalState.addSession(session);
        form.reset();
        renderLists();
        alert('¡Sesión de BJJ registrada correctamente!');
    });
}

function renderLists() {
    // Renderizar sesiones realizadas
    const sessionsListContainer = document.getElementById('sessionsList');
    if (sessionsListContainer) {
        sessionsListContainer.innerHTML = '';
        if (globalState.sessions.length === 0) {
            sessionsListContainer.innerHTML = '<p style="color: #A0A0A0; font-size: 0.9rem;">No hay sesiones registradas todavía.</p>';
        } else {
            globalState.sessions.forEach(sess => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.padding = '1rem';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-weight: 700;">
                        <span>${sess.modalidad}</span>
                        <span style="color: #FF2A2A;">RPE: ${sess.rpe}/10</span>
                    </div>
                    <p style="font-size: 0.85rem; color: #A0A0A0; margin-top: 0.25rem;">Fecha: ${sess.date} | Duración: ${sess.duration} min</p>
                    ${sess.notes ? `<p style="font-size: 0.9rem; margin-top: 0.5rem;">${sess.notes}</p>` : ''}
                `;
                sessionsListContainer.appendChild(card);
            });
        }
    }

    // Renderizar planificados
    const plannedListContainer = document.getElementById('plannedList');
    if (plannedListContainer) {
        plannedListContainer.innerHTML = '';
        if (globalState.plannedWorkouts.length === 0) {
            plannedListContainer.innerHTML = '<p style="color: #A0A0A0; font-size: 0.9rem;">No hay entrenamientos planificados.</p>';
        } else {
            globalState.plannedWorkouts.forEach(plan => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.padding = '1rem';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-weight: 700;">
                        <span>${plan.modalidad}</span>
                        <span style="color: #A0A0A0; font-size: 0.85rem;">${plan.date.replace('T', ' ')}</span>
                    </div>
                    ${plan.objetivo ? `<p style="font-size: 0.9rem; margin-top: 0.5rem;"><strong>Objetivo:</strong> ${plan.objetivo}</p>` : ''}
                `;
                plannedListContainer.appendChild(card);
            });
        }
    }
}
