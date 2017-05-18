require('babel-polyfill')
const initialiseServer = require('../build/server').default
const webpackChunks = require('../build/static/webpack-chunks.json')

const params = {
	chunks() {
		return webpackChunks
	},
}

initialiseServer(params)
