import axios from 'axios'
import { ApiConfig } from 'config'

/**
 *  Default setup for Axios requests
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/**
 *  Set the root URL
 */
axios.defaults.baseURL = ApiConfig.base

/**
 *  Set always send with cookie
 */
axios.defaults.withCredentials = true

axios.defaults.responseType = 'json'


/**
 *  If the mock api is enabled, mount it
 */
// if (api.mock) {
//     mockApi.mount();
// }

/*
 *  Export the api resources
 */
export { default as waqiApi } from './resources/waqi'
