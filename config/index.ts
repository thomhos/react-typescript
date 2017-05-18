import { Server } from '../src/types'

export const ServerConfig: Server.Config = {
    dev: {
        host: 'localhost',
        port: 3000,
    },
    prod: {
        host: 'localhost',
        port: 8080,
    },
}
