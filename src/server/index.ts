import * as compression from 'compression'
import * as express from 'express'
import { Server as HttpServer } from 'http'
import * as path from 'path'
import { ServerConfig } from '../../config'
import { Server } from '../types'
import { router } from './router'

/**
 * Isomorphic webpack uses this function to create the server
 * The build result is passed as params.
 */
export default function(params: Server.IsomorphicWebpackParams): HttpServer {

    /**
     * Get ENV settings
     */
    const isProd = process.env.NODE_ENV === 'production'
    const port = isProd ? ServerConfig.prod.port : ServerConfig.dev.port

    /**
     * Set a global var to allow us to check if we're server / client side.
     */
    if (global) {
        (global as any).__SERVER__ = true
    }

    /**
     * Set the app up
     */
    const app = express()

    app.use(compression())
    app.use(router(params.chunks()))

    return app.listen(port, () => {
        console.info('Server started on', port)
    })
}
