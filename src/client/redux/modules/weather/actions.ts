import { State } from '../../../../types'
import { Weather as WeatherActionTypes } from './action-types'

export const ActionNames = {
    REQUEST_FOR_LOCATION: 'weather_REQUEST_FOR_LOCATION' as WeatherActionTypes.REQUEST_FOR_LOCATION
}

function requestForLocation(location: string): WeatherActionTypes.Action {
    return {
        type: ActionNames.REQUEST_FOR_LOCATION,
        payload: location
    }
}

export default {
    requestForLocation,
}
