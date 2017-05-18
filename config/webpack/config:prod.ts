import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as webpack from 'webpack'

export default function(client: boolean): webpack.Configuration {
    const prodConfig: webpack.Configuration = {

        module: {
            rules: [
                {
                    include: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        loader: 'css-loader',
                    }),
                    test: /\.css$/,
                },
                {
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        loader: 'css-loader?modules&localIndentName=[hash:base64:5]',
                    }),
                    test: /\.css$/,
                },
            ],
        },



        /**
         * Disable replacement of process variables server side
         */
        node: {
            process: false,
        },

        /**
         * For production we don't need to fake the server path
         */
        output: {
            chunkFilename: '[hash].[id].min.js',
            filename: '[hash].min.js',
            publicPath: '/static/',
        },


        plugins: [
            new ExtractTextPlugin({
                filename: '[hash].min.css',
            }),
            new webpack.optimize.CommonsChunkPlugin({
                filename: '[hash].common.min.js',
                minChunks: 3,
                name: 'common',
            }),
            new webpack.optimize.OccurrenceOrderPlugin(false),
        ],
    }

    if (client) {
        (prodConfig.plugins as webpack.Plugin[]).push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
            new webpack.optimize.UglifyJsPlugin(),
        )
    }

    return prodConfig
}
