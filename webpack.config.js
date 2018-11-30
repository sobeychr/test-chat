import path from 'path';

module.exports = 
{    entry: path.join(__dirname,'src','main.js'),

    output: {
        path: path.join(__dirname,'web'),
        filename: 'src.min.js'
    },

    devtool: "source-map",
    devServer: {
        bonjour: true,
        clientLogLevel: 'info',
        compress: true,
        contentBase: path.join(__dirname,'web'),
        headers: {
            'X-Custom-Header': 'testing'
        },
        historyApiFallback: true,
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
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    {loader: '@epegzz/sass-vars-loader', options: {
                        syntax: 'scss',
                        files: [
                            path.resolve(__dirname, 'src/data/avatar.json')
                        ]
                    }}
                ]
            },
            {
                test: /\.(jpe?g|gif|png|mp3|svg)$/,
                loaders: ['file-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['source-map-loader'],
                enforce: 'pre'
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
