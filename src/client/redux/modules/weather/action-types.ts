import Redux from 'redux'
import { State } from '../../../../types'

// tslint:disable-next-line:no-namespace
export namespace Weather {
    export type REQUEST_FOR_LOCATION = 'weather_REQUEST_FOR_LOCATION'

    export interface RequestForLocation extends Redux.Action {
        type: REQUEST_FOR_LOCATION
        payload: string
    }

    export type Action = RequestForLocation
}
