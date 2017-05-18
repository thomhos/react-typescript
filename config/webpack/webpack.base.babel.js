/**
 * COMMON WEBPACK CONFIGURATION
 */
const path                          = require('path')
const webpack                       = require('webpack')
const CopyWebpackPlugin             = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin    = require('script-ext-html-webpack-plugin')

/**
 * The webpack config is a function which takes in additional options.
 */
module.exports = {
    output: {
        path: path.resolve(process.cwd(), 'build/public'),
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader?configFileName=src/config/typescript/client/tsconfig.json',
                    }
                ]

            },
            {
                // Do not transform vendor's CSS with CSS-modules
                // The point is that they remain in global scope.
                // Since we require these CSS files in our JS or CSS files,
                // they will be a part of our compilation either way.
                // So, no need for ExtractTextPlugin here.
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[hash].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4,
                            },
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                },
            }
        ],
    },
    plugins: [
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.NamedModulesPlugin(),

        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
    ],
    resolve: {
        extensions: [
            '.js',
            '.ts',
            '.jsx',
            '.tsx',
            '.json'
        ]
    },
    target: 'web', // Make web variables accessible to webpack, e.g. window
}