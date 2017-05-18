import * as Compression from 'compression'
import * as Express from 'express'
import * as path from 'path'
import * as Webpack from 'webpack'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import * as WebpackHotMiddleware from 'webpack-hot-middleware'

import { Server } from '../../types'

/**
 * Add the dev middleware
 */
function addDevMiddlewares(app: Express.Application, webpackConfig: Webpack.Configuration): void {
    const devMiddlewareOptions: WebpackDevMiddleware.Options =  {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats: 'errors-only',
    }

    const compiler      = Webpack(webpackConfig)
    const middleware    = WebpackDevMiddleware(compiler, devMiddlewareOptions) as (Server.FrontendDevMiddleware)
    const fs            = middleware.fileSystem

    app.use(middleware)
    app.use(WebpackHotMiddleware(compiler))

    app.get('*', (req: Express.Request, res: Express.Response) => {
        const indexFile = path.join(webpackConfig.output.path, "index.html")
        fs.readFile(indexFile, (err, file) => {
            if (err) {
                res.sendStatus(404)
            } else {
                res.send(file.toString())
            }
        })
    })
}

/**
 * Add the production middleware
 */
function addProdMiddlewares(app: Express.Application, options: Server.FrontendProdOptions): void {
    const publicPath = options.publicPath || '/'
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'web/build/public')

    app.use(Compression())
    app.use(publicPath, Express.static(outputPath))

    app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')))
}

/**
 * Front-end middleware
 */
export function setupFrontend(app: Express.Application, options: Server.FrontendProdOptions): Express.Application {
    const isProd = process.env.NODE_ENV === 'production'

    if (isProd) {
        addProdMiddlewares(app, options)
    } else {
        const webpackConfig: Webpack.Configuration = require('../../config/webpack/webpack.dev.babel.js')
        addDevMiddlewares(app, webpackConfig)
    }

    return app
}
