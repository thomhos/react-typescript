/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
const path                      = require('path')
const webpack                   = require('webpack')
const HtmlWebpackPlugin         = require('html-webpack-plugin')
const CircularDependencyPlugin  = require('circular-dependency-plugin')
const baseConfig                = require('./webpack.base.babel')

module.exports = Object.assign({}, baseConfig, {
    // Add hot reloading in development
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        'webpack/hot/only-dev-server',
        path.join(process.cwd(), 'src/client/index.tsx'),
    ],

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    // Emit a source map for easier debugging
    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading

        new webpack.NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/client/index.html',
            filename: 'index.html',
        }),

        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/, // exclude node_modules
            failOnError: false, // show a warning when there is a circular dependency
        }),
    ],

    performance: {
        hints: false,
    },
})
