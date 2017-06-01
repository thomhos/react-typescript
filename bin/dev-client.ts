// import * as webpack from 'webpack'
// import * as webpackDevServer from 'webpack-dev-server'

// import { ServerConfig } from '../config'
// import getConfig from '../config/webpack/config'

// const port = ServerConfig.dev.port + 1
// const webpackConfig = getConfig('development:client')
// const compiler = webpack(webpackConfig)
// const devServerOptions = {
//     quiet: true,
//     noInfo: true,
//     hot: true,
//     publicPath: webpackConfig.output.publicPath,
//     watchOptions: {
//         aggregateTimeout: 300,
//         poll: true,
//         ignored: /node_modules/,
//     },
//     headers: { 'Access-Control-Allow-Origin': '*' },
//     stats: { colors: true },
//     historyApiFallback: true,
// }


// new webpackDevServer(compiler, devServerOptions)
// .listen(
//     port,
//     (error) => {
//         if (error) {
//             console.error(error.stack || error)
//             throw error
//         }

//         console.log('[webpack-dev-server] Running')
//     },
// )


import * as express from 'express'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import { ServerConfig } from '../config'
import getConfig from '../config/webpack/config'

const app = express()
const port = ServerConfig.dev.port + 1
const config = getConfig('development:client')
const compiler = webpack(config)

const options = {
  quiet: true,
  noInfo: true,
  hot: true,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
}

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(compiler))

app.listen(port, (error) => {
  if (error) {
    console.error(error.stack || error)
    throw error
  }

  console.info('Webpack client bundle server listening on port %s', port)
})
