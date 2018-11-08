var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "web"),
    devtool: debug ? "inline-sourcemap" : false,
    entry: "./web/source.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs'],
                }
            }
        ]
    },
    output: {
        path: __dirname + "/web/",
        filename: "source.min.js"
    },
    plugins: []
};