import * as express from 'express'
import * as path from 'path'
import { logAppStarted, logError } from './logger'
import { setupFrontend } from './middlewares/frontend'

const isDev: boolean        = process.env.NODE_ENV !== 'production'
const customHost: string    = process.env.HOST
const host: string          = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost: string    = customHost || 'localhost'
const port: number          = process.env.PORT || 3000
const app                   = express()

/**
 * Connect the frontend middleware
 */
setupFrontend(app, {
    outputPath: path.resolve(process.cwd(), 'build/public'),
    publicPath: '/',
})

/**
 * Define start callback function (to do some informational logging)
 */
function appStartCallback(err: Error): void {
    /* Log errror if we get one */
    if (err) {
        return logError(err.message)
    }

    logAppStarted(port, prettyHost)
}

/**
 * Start listening!
 */
app.listen(port, host, appStartCallback)
