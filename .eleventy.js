const transforms = require('./src/_11ty/transforms');
const shortcodes = require('./src/_11ty/shortcodes');


module.exports = (config) => {
    config.addWatchTarget('./dist/assets/main.css');
    config.addWatchTarget('./dist/assets/main.js');

    config.addPassthroughCopy('./src/assets/*.{jpg,jpeg,png}');

    config.setBrowserSyncConfig({
        files: ['dist/**/*'],
        open: true,
    });


    // Transforms
    Object.entries(transforms).forEach(([key, value]) => {
        config.addTransform(key, value);
    });

    // Shortcodes
    Object.entries(shortcodes.shortcodes).forEach(([key, value]) => {
        config.addShortcode(key, value);
    });

    Object.entries(shortcodes.pairedShortcodes).forEach(([key, value]) => {
        config.addPairedShortcode(key, value);
    });

    // Result
    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: "njk",
    }
}
