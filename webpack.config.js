import path from 'path';
// const path = require('path');

module.exports = 
{    entry: path.join(__dirname,'src','main.js'),

    output: {
        path: path.join(__dirname,'web'),
        filename: 'src.min.js'
    },

    devServer: {
        bonjour: true,
        clientLogLevel: 'info',
        contentBase: path.join(__dirname,'web'),
        headers: {
            'X-Custom-Header': 'testing'
        },
        inline: true,
        host: 'localhost',
        https: false,
        open: true,
        port: 3000
    },

    mode: process.env.NODE_ENV || 'development',

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
    },

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ]
    }
};
