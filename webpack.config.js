// Imports
const path = require('path');

// Webpack Configuration
const config = {
    mode: 'development',
    // Entry
    entry: './src/js/index.js',
    
    // Output
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: 'bundle.js',
    },
    // Loaders
    module: {
        rules : [
        // JavaScript/JSX Files
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        // CSS Files
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }
        ]
    }
};
// Exports
module.exports = config;