import Redux from 'redux'
import { State } from '../../../../types'

// tslint:disable-next-line:no-namespace
export namespace Locations {
    export type REQUEST_DATA_FOR_LOCATION = 'weather_REQUEST_DATA_FOR_LOCATION'
    export type SUCCESS_DATA_FOR_LOCATION = 'weather_SUCCESS_DATA_FOR_LOCATION'
    export type FAILURE_DATA_FOR_LOCATION = 'weather_FAILURE_DATA_FOR_LOCATION'

    export interface RequestDataForLocation extends Redux.Action {
        type: REQUEST_DATA_FOR_LOCATION
        payload: string
    }

    export interface SuccessDataForLocation extends Redux.Action {
        type: SUCCESS_DATA_FOR_LOCATION
        payload: {
            location: string,
            data: State.WaqiData,
        }
    }

    export interface FailureDataForLocation extends Redux.Action {
        type: FAILURE_DATA_FOR_LOCATION
        payload: Error
    }

    export type Action = RequestDataForLocation | SuccessDataForLocation | FailureDataForLocation
}
