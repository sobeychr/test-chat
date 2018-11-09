import path from 'path';
// const path = require('path');

module.exports = {
    entry: path.join(__dirname,'src','main.js'),
    output: {
        path: path.join(__dirname,'web'),
        filename: 'src.min.js'
    },

    mode: process.env.NODE_ENV || 'development',

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    },

    devServer: {
        contentBase: path.join(__dirname,'web')
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|gif|png|mp3|svg)$/,
                loaders: ['file-loader']
            }
        ]
    }
};