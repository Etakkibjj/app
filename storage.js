// Capa de persistencia para EJJ Grappling Gauntlet
const STORAGE_KEYS = {
    SESSIONS: 'ejj_sessions',
    PLANNED: 'ejj_planned_workouts',
    STRENGTH: 'ejj_strength_logs',
    TECHNIQUES_PROGRESS: 'ejj_technique_progress',
    GAME_PLANS: 'ejj_game_plans',
    GOALS: 'ejj_goals',
    SETTINGS: 'ejj_settings'
};

export const StorageService = {
    load(key) {
        try {
            const data = localStorage.getItem(STORAGE_KEYS[key]);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error cargando datos de ${key}:`, error);
            return null;
        }
    },

    save(key, data) {
        try {
            localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error guardando datos en ${key}:`, error);
            return false;
        }
    },

    exportAllData() {
        const exportData = {};
        for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
            exportData[key] = this.load(key);
        }
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ejj-grappling-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importAllData(jsonData) {
        try {
            for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
                if (jsonData[key]) {
                    this.save(key, jsonData[key]);
                }
            }
            return true;
        } catch (error) {
            console.error('Error al importar datos:', error);
            return false;
        }
    }
};
