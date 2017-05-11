import Redux from 'redux'
import { State } from '../../../../types'

export namespace Weather {
    export type REQUEST_FOR_LOCATION = 'weather_REQUEST_FOR_LOCATION'

   export interface requestForLocation extends Redux.Action {
        type: REQUEST_FOR_LOCATION
        payload: string
    }

   export type Action = requestForLocation
}