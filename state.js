import { StorageService } from './storage.js';

class AppState {
    constructor() {
        this.sessions = StorageService.load('SESSIONS') || [];
        this.plannedWorkouts = StorageService.load('PLANNED') || [];
        this.strengthLogs = StorageService.load('STRENGTH') || [];
        this.techniqueProgress = StorageService.load('TECHNIQUES_PROGRESS') || {};
        this.gamePlans = StorageService.load('GAME_PLANS') || [];
        this.goals = StorageService.load('GOALS') || [];
        this.settings = StorageService.load('SETTINGS') || { theme: 'dark' };
    }

    addSession(sessionData) {
        this.sessions.unshift({ id: Date.now(), ...sessionData });
        StorageService.save('SESSIONS', this.sessions);
    }

    addPlannedWorkout(workoutData) {
        this.plannedWorkouts.push({ id: Date.now(), status: 'planned', ...workoutData });
        StorageService.save('PLANNED', this.plannedWorkouts);
    }

    updateTechniqueProgress(techniqueId, progressState) {
        this.techniqueProgress[techniqueId] = {
            state: progressState,
            updatedAt: new Date().toISOString()
        };
        StorageService.save('TECHNIQUES_PROGRESS', this.techniqueProgress);
    }
}

export const globalState = new AppState();
