const htmlmin = require("html-minifier");

module.exports = {
    // Minify HTML in production
    htmlmin: (content, outputPath) => {
        if (process.env.NODE_ENV === 'production' && outputPath && outputPath.endsWith(".html")) {
            const minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }

        return content;
    },
};