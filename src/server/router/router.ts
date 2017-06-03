import * as express from 'express'
import * as path from 'path'
import { Server } from '../../types'
import { locations, renderReact } from '../modules'

export default (chunks: Server.IsomorphicChunks): express.Router => {
    const router = express.Router()

    router.use('/static', express.static(path.join(__dirname, '../static')))

    router.use('/api/locations/:location', locations)
    router.use('*', renderReact(chunks))

    return router
}
