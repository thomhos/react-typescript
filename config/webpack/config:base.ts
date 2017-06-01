import * as CircularDependencyPlugin from 'circular-dependency-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
import { ServerConfig } from '../index'

const port = ServerConfig.dev.port + 1

const baseConfig: webpack.Configuration = {

    context: path.resolve(__dirname, '..'),

    entry: {
        app: [
            path.resolve(__dirname, '../..', 'src', 'client'),
        ],
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                loaders: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader?configFileName=config/typescript/tsconfig.json',
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[hash].[ext]',
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                        },
                    },
                ],
            },
        ],
    },

    /**
     * Output of bundles and assets
     */
    output: {
        path: path.join(__dirname, '../..', 'build/static'),
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            filename: '[name].js',
            minChunks: 3,
            name: 'common',
        }),
        new webpack.NamedModulesPlugin(),

        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: false,
        }),

        new webpack.HotModuleReplacementPlugin(),
    ],

    resolve: {
        alias: {
            components: path.resolve(__dirname, '../../src/client/components'),
        },
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.css',
        ],
    },
}

export default baseConfig
