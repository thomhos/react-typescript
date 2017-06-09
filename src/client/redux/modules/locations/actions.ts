import { Action, ActionCreator } from 'redux'
import { State } from 'types'
import { createActionCreator, stringEnum } from 'utils'

/**
 * Action names
 */
export const ActionNames = stringEnum([
    'weather_REQUEST_DATA_FOR_LOCATION',
    'weather_SUCCESS_DATA_FOR_LOCATION',
    'weather_FAILURE_DATA_FOR_LOCATION',
])

export type ActionNames = keyof typeof ActionNames

/**
 * Actions
 */
// tslint:disable-next-line:no-namespace
export namespace Actions {
    /**
     * Request action
     */
    export interface RequestDataForLocationPayload {
        location: string
    }

    export type RequestDataForLocationAction = State.ReduxAction<
        typeof ActionNames.weather_REQUEST_DATA_FOR_LOCATION,
        RequestDataForLocationPayload>

    /**
     * Success action
     */
    export interface SuccessDataForLocationPayload {
        location: string,
        data: State.WaqiData
    }

    export type SuccessDataForLocationAction = State.ReduxAction<
        typeof ActionNames.weather_SUCCESS_DATA_FOR_LOCATION,
        SuccessDataForLocationPayload>

    /**
     * Failure action
     */
    export interface FailureDataForLocationPayload {
        error: Error
    }

    export type FailureDataForLocationAction = State.ReduxAction<
        typeof ActionNames.weather_FAILURE_DATA_FOR_LOCATION,
        FailureDataForLocationPayload>
}

/**
 * Export all actions
 */
export type Actions = Actions.RequestDataForLocationAction
    | Actions.SuccessDataForLocationAction
    | Actions.FailureDataForLocationAction

export const ActionCreators = {
    // tslint:disable-next-line:max-line-length
    requestDataForLocation: createActionCreator<typeof ActionNames.weather_REQUEST_DATA_FOR_LOCATION, Actions.RequestDataForLocationPayload>(ActionNames.weather_REQUEST_DATA_FOR_LOCATION),
    // tslint:disable-next-line:max-line-length
    successDataForLocation: createActionCreator<typeof ActionNames.weather_SUCCESS_DATA_FOR_LOCATION, Actions.SuccessDataForLocationPayload>(ActionNames.weather_SUCCESS_DATA_FOR_LOCATION),
    // tslint:disable-next-line:max-line-length
    failureDataForLocation: createActionCreator<typeof ActionNames.weather_FAILURE_DATA_FOR_LOCATION, Actions.FailureDataForLocationPayload>(ActionNames.weather_FAILURE_DATA_FOR_LOCATION),
}
