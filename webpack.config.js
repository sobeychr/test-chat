const path = require('path');
const Htmlwb = require('html-webpack-plugin');

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

    plugins: [
        /*
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'src','index.html')
        })
        */
    ]
};


/*
module.exports = {
    mode:  'development',
    entry: './src/main.js',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader",
                options: {
                    presets: ['react-app']
                }
            }
        ]
    },

    output: {
        filename: 'src.min.js',
        path: path.resolve(__dirname, 'web')
    }
};
*/