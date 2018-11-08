const path = require('path');

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
                    presets: ["es2015"]
                }
            }
        ]
    },

    output: {
        filename: 'src.min.js',
        path: path.resolve(__dirname, 'web')
    }
};