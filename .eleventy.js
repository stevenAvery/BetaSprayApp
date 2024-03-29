const transforms = require('./src/_11ty/transforms');
const shortcodes = require('./src/_11ty/shortcodes');
const faviconPlugin = require('eleventy-favicon');


module.exports = (config) => {
    config.addWatchTarget('./dist/assets/main.css');
    config.addWatchTarget('./dist/assets/main.js');

    config.addPassthroughCopy('./src/assets/*.{jpg,jpeg,png,svg}');

    config.addPlugin(faviconPlugin, { destination: './dist' });

    config.setBrowserSyncConfig({
        files: ['dist/**/*'],
        open: false, // automatically opens a path when serving
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
