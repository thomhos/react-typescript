import * as path from 'path'
import { clientConfiguration, serverConfiguration } from 'universal-webpack'
import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'

import baseConfig from './config:base'
import devConfig from './config:dev'
import prodConfig from './config:prod'

export const universalWebpack = {
    server: {
        input: path.resolve(__dirname, '../../src/server/index.ts'),
        output: path.resolve(__dirname, '../../build/server/index.js'),
    },
}

export default (config: string = '') => {
    const settings: string[]    = config.split(':')
    const prod: boolean         = settings[0] === 'prod'
    const env: string           = settings[1]

    const configs: webpack.Configuration[] = [
        baseConfig,
    ]

    if (prod) {
        configs.push(prodConfig(env === 'client'))
    } else {
        configs.push(devConfig)
    }
    const webpackConfig = webpackMerge.smartStrategy({ entry: 'replace' })(configs)

    /* =======================
		 SET SERVER/CLIENT SIDE
	======================= */
    switch (env) {
        case 'client': {
            return clientConfiguration(webpackConfig, universalWebpack)
        }
        case 'server': {
            return serverConfiguration(webpackConfig, universalWebpack)
        }
        default: {
            return webpackConfig
        }
    }
}
