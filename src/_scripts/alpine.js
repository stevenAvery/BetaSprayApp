import Alpine from 'alpinejs'

// Services
const apiService         = require('./services/apiService');
const utilService        = require('./services/utilService');
const holdsEditorService = require('./services/holdsEditorService');

window.Alpine = Alpine

// Start Alpine once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    Alpine.start()
});

// Initialize Alpine store with our services
window.addEventListener('alpine:initializing', () => {
    Alpine.store('apiService', apiService);
    Alpine.store('utilService', utilService);
    Alpine.store('holdsEditorService', holdsEditorService);
});
