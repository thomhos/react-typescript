import * as webpack from 'webpack'
import { ServerConfig } from '../index'

const port = ServerConfig.dev.port + 1

const deveConfig: webpack.Configuration = {

    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                include: /node_modules/,
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        query: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        query: {
                            localIdentName: '[path][name]---[local]---[hash:base64:5]',
                            modules: true,
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },

    /**
     * The output path of the bundle will be on the port of the dev server
     * The paths in the rendered HTML will point to the dev server.
     */
    output: {
        chunkFilename: '[name].[chunkhash].js',
        filename: '[name].bundle.js',
        publicPath: `http://localhost:${port}/static/`,
    },
}

export default deveConfig
