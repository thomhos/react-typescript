import { Api, Server } from 'types'

export const ApiConfig: Api.Config = {
    base: 'http://localhost:3000/api',
    locations: 'http://localhost:3000/api/locations/',
}

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

export const WaqiConfig: Api.WaqiConfig = {
    base: 'https://api.waqi.info',
}
