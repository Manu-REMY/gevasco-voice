// Application V2 - Gestion GEVA-Sco conforme

function resetForm() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le formulaire ?')) {
        document.querySelectorAll('input, textarea').forEach(field => {
            if (field.type === 'radio' || field.type === 'checkbox') {
                field.checked = false;
            } else {
                field.value = '';
            }
        });
        localStorage.removeItem('gevascoData');
        alert('Formulaire réinitialisé.');
    }
}

function saveData() {
    const data = collectFormData();
    localStorage.setItem('gevascoData', JSON.stringify(data));
    localStorage.setItem('gevascoSaveDate', new Date().toLocaleString('fr-FR'));
    alert('Données sauvegardées avec succès !');
}

function loadData() {
    const savedData = localStorage.getItem('gevascoData');
    if (savedData) {
        const data = JSON.parse(savedData);
        populateForm(data);
        console.log('Données chargées');
    }
}

function collectFormData() {
    const data = {};
    document.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type === 'radio') {
            if (field.checked) {
                data[field.name] = field.value;
            }
        } else if (field.type === 'checkbox') {
            data[field.id] = field.checked;
        } else {
            data[field.id] = field.value || '';
        }
    });
    return data;
}

function populateForm(data) {
    Object.keys(data).forEach(key => {
        const field = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'radio') {
                if (field.value === data[key]) {
                    field.checked = true;
                }
            } else if (field.type === 'checkbox') {
                field.checked = data[key];
            } else {
                field.value = data[key];
            }
        }
    });
}

// Auto-sauvegarde toutes les 30 secondes
setInterval(() => {
    const data = collectFormData();
    localStorage.setItem('gevascoAutoSave', JSON.stringify(data));
}, 30000);

// Charger au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    console.log('Application GEVA-Sco V2 chargée');
});
