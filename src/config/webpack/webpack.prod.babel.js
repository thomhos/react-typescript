// Important modules this config uses
const path                          = require('path');
const webpack                       = require('webpack');
const HtmlWebpackPlugin             = require('html-webpack-plugin');
const CompressionPlugin             = require('compression-webpack-plugin')
const baseConfig                    = require('./webpack.base.babel')

module.exports = Object.assign({}, baseConfig, {
    // In production, we skip all hot-reloading stuff
    entry: [
        path.join(process.cwd(), 'src/client/index.tsx'),
    ],

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            children: true,
            minChunks: 2,
            async: true,
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            }
        }),

        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        new LodashModuleReplacementPlugin(),

        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: 'src/client/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),
    ],

    performance: {
        assetFilter: (assetFilename) => !(/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)),
    },
})
