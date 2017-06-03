import axios from 'axios'
import { ApiConfig } from 'config'

const endpoint = ApiConfig.locations

/**
 * Export Waqi (local) Api object
 */
export default {
    get: async (location: string) => {
        const { data } = await axios.get(endpoint + location)
        return data
    },
}
