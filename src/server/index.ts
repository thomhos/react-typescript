import * as express from 'express'
import { Server as HttpServer } from 'http'
import * as path from 'path'
import { ServerConfig } from '../../config'
import { Server } from '../types'

import { render } from './middleware'

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
     * Set the app up
     */
    const app: express.Express = express()

    app.set('port', port)
    app.use('/static', express.static(path.join(__dirname, 'static')))
    app.get('*', render(params.chunks()))

    return app.listen(app.get('port'), () => {
        console.info('Server started on', app.get('port'))
    })
}