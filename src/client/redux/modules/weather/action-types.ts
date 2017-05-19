import Redux from 'redux'
import { State } from '../../../../types'

// tslint:disable-next-line:no-namespace
export namespace Weather {
    export type REQUEST_WEATHER_FOR_LOCATION = 'weather_REQUEST_WEATHER_FOR_LOCATION'
    export type SUCCESS_WEATHER_FOR_LOCATION = 'weather_SUCCESS_WEATHER_FOR_LOCATION'
    export type FAILURE_WEATHER_FOR_LOCATION = 'weather_FAILURE_WEATHER_FOR_LOCATION'

    export interface RequestWeatherForLocation extends Redux.Action {
        type: REQUEST_WEATHER_FOR_LOCATION
        payload: string
    }

    export interface SuccessWeatherForLocation extends Redux.Action {
        type: SUCCESS_WEATHER_FOR_LOCATION
        payload: {
            location: string,
            weather: State.WeatherObject,
        }
    }

    export interface FailureWeatherForLocation extends Redux.Action {
        type: FAILURE_WEATHER_FOR_LOCATION
        payload: Error
    }

    export type Action = RequestWeatherForLocation | SuccessWeatherForLocation | FailureWeatherForLocation
}
