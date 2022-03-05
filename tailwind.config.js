module.exports = {
    // purge: ['./dist/*.html'],
    content: [
        // './src/**/*.{js,md,njk,svg,html}',
        './dist/**/*.html',
    ],
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
    theme: {
        extend: {},
    },
}
