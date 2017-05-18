import 'babel-polyfill'
import { server } from 'universal-webpack'
import webpackConfig, { universalWebpack } from '../config/webpack/config'

// Start Server
server(webpackConfig('development'), universalWebpack)
