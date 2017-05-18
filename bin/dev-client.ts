import * as webpack from 'webpack'
import * as webpackDevServer from 'webpack-dev-server'

import { ServerConfig } from '../config'
import getConfig from '../config/webpack/config'

const port = ServerConfig.dev.port + 1
const webpackConfig = getConfig('dev:client')
const compiler = webpack(webpackConfig)
const devServerOptions = {
    quiet: true,
    noInfo: true,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    historyApiFallback: true,
}


new webpackDevServer(compiler, devServerOptions)
.listen(
    port,
    (error) => {
        if (error) {
            console.error(error.stack || error)
            throw error
        }

        console.log('[webpack-dev-server] Running')
    },
)
