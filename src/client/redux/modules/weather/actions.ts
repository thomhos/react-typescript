import { State } from '../../../../types'
import { Weather as WeatherActionTypes } from './action-types'

export const ActionNames = {
    // tslint:disable-next-line:max-line-length
    REQUEST_WEATHER_FOR_LOCATION: 'weather_REQUEST_WEATHER_FOR_LOCATION' as WeatherActionTypes.REQUEST_WEATHER_FOR_LOCATION,
    // tslint:disable-next-line:max-line-length
    SUCCESS_WEATHER_FOR_LOCATION: 'weather_SUCCESS_WEATHER_FOR_LOCATION' as WeatherActionTypes.SUCCESS_WEATHER_FOR_LOCATION,
    // tslint:disable-next-line:max-line-length
    FAILURE_WEATHER_FOR_LOCATION: 'weather_FAILURE_WEATHER_FOR_LOCATION' as WeatherActionTypes.FAILURE_WEATHER_FOR_LOCATION,
}

function requestWeatherForLocation(location: string): WeatherActionTypes.Action {
    return {
        type: ActionNames.REQUEST_WEATHER_FOR_LOCATION,
        payload: location,
    }
}


function successWeatherForLocation(location: string, weather: { temp: number }): WeatherActionTypes.Action {
    return {
        type: ActionNames.SUCCESS_WEATHER_FOR_LOCATION,
        payload: {
            location,
            weather,
        },
    }
}

function failureWeatherForLocation(error: Error): WeatherActionTypes.Action {
    return {
        type: ActionNames.FAILURE_WEATHER_FOR_LOCATION,
        payload: error,
    }
}

export default {
    requestWeatherForLocation,
    successWeatherForLocation,
    failureWeatherForLocation,
}
