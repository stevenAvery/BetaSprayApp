module.exports = {
    env: {
        dev:  process.env.NODE_ENV !== 'production',
        prod: process.env.NODE_ENV === 'production',
    },
    featureFlags: {
        holdsEditorZoom: false,
        holdsEditorUndo: false,
        problemDelete:   false,
    },
    appTitle: 'BetaSpray',
};