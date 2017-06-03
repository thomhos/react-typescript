import { State } from '../../../../types'
import { Locations as LocationsActionTypes } from './action-types'

export const ActionNames = {
    // tslint:disable-next-line:max-line-length
    REQUEST_DATA_FOR_LOCATION: 'weather_REQUEST_DATA_FOR_LOCATION' as LocationsActionTypes.REQUEST_DATA_FOR_LOCATION,
    // tslint:disable-next-line:max-line-length
    SUCCESS_DATA_FOR_LOCATION: 'weather_SUCCESS_DATA_FOR_LOCATION' as LocationsActionTypes.SUCCESS_DATA_FOR_LOCATION,
    // tslint:disable-next-line:max-line-length
    FAILURE_DATA_FOR_LOCATION: 'weather_FAILURE_DATA_FOR_LOCATION' as LocationsActionTypes.FAILURE_DATA_FOR_LOCATION,
}

function requestDataForLocation(location: string): LocationsActionTypes.RequestDataForLocation {
    return {
        type: ActionNames.REQUEST_DATA_FOR_LOCATION,
        payload: location,
    }
}

function successDataForLocation(location: string, data: State.WaqiData): LocationsActionTypes.SuccessDataForLocation {
    return {
        type: ActionNames.SUCCESS_DATA_FOR_LOCATION,
        payload: {
            location,
            data,
        },
    }
}

function failureDataForLocation(error: Error): LocationsActionTypes.FailureDataForLocation {
    return {
        type: ActionNames.FAILURE_DATA_FOR_LOCATION,
        payload: error,
    }
}

export default {
    requestDataForLocation,
    successDataForLocation,
    failureDataForLocation,
}
