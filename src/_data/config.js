module.exports = {
    env: {
        dev:  process.env.NODE_ENV !== 'production',
        prod: process.env.NODE_ENV === 'production',
    },
    featureFlags: {
        holdsEditor: {
            zoom: false,
            undo: false,
        },
    },
    appTitle: 'BetaSpray',
};