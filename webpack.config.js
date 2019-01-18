// Imports
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Webpack Configuration
const config = {
    mode: 'development',
    // Entry
    entry: './src/js/index.js',
    
    // Output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    },
    devtool: 'source-map',
    devServer:{
        contentBase: path.resolve(__dirname, '.'),
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],
    // Loaders
    module: {
        rules : [
        // JavaScript/JSX Files
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        // CSS Files
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            },{
                loader: 'expose-loader',
                options: '$'
            }]
          }
        ]
    },
    externals: {
      jquery: 'jquery'
    }   
};
// Exports
module.exports = config;