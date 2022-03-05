const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', '_scripts', 'main.js'),
    output: {
        path: path.resolve(__dirname, 'dist', 'assets'),
        filename: 'main.js'
    },
    devtool: 'eval-cheap-source-map', // 'source-map', // TODO only in dev?
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
    ],
    module: {
        rules: [
            // Javascript Loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            // CSS Loader
            {
                test: /\.(css|pcss|postcss)$/,  
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader',
                ],
            },
        ]
    }
}