import autoprefixer = require('autoprefixer-stylus')
import * as path from 'path'
import * as webpack from 'webpack'
import { ServerConfig } from '../index'

const port = ServerConfig.dev.port + 1

const devConfig: webpack.Configuration = {

    devtool: 'inline-source-map',

    entry: {
        app: [
            `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
            'react-hot-loader/patch',
            path.resolve(__dirname, '../..', 'src', 'client'),
        ],
    },

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
                test: /\.styl$/,
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
                    { loader: 'stylus-loader' },
                ],
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),

        new webpack.LoaderOptionsPlugin({
            test: /\.styl?$/,
            stylus: {
                default: {
                    use: [autoprefixer({ browsers: ["last 2 versions", "ios 8", "ie 10"] })],
                    preferPathResolver: 'webpack',
                },
            },
        }),
    ],

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

export default devConfig
