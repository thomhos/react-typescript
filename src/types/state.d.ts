import * as Immutable from 'immutable'
import { Store } from 'redux'
import { TypedRecord } from 'typed-immutable-record'

export namespace State {
    /**
     *  The RootRecord has the methods we need to get properties off it. 
     *  We need to use redux-immutable to be able to implement the redux store as an immutable Map.
     *  Because our rootState doesn't have a set method we get an error.
     *  Immutable Record extends Immutable Map so we can safely use it this way as they have identical methods.
     */
    interface CustomStore extends Store<RootStateRecord> {
        run: any
        close: any
    }

    interface RootStateRecord extends TypedRecord<RootStateRecord>, RootState { }

    interface RootState {
        locations: LocationsState
    }

    type LocationsState = Immutable.Map<string, WaqiData>

    interface WaqiData {
        status: string
        data: {
            aqi: number
            idx: number
            attributions: WaqiAttributions
            city: WaqiCity
            dominentpol: string
            iaqi: WaqiPollutants
            time: {
                s: string
                tz: string
                v: number
            }
        }
    }

    type WaqiAttributions = WaqiAttribution[]

    interface WaqiAttribution {
        url: string
        name: string
    }

    interface WaqiCity {
        geo: number[]
        name: string
        url: string
    }

    interface WaqiPollutants {
        co: {
            v: number
        }
        h: {
            v: number
        }
        no2: {
            v: number
        }
        o3: {
            v: number
        }
        p: {
            v: number
        }
        pm10: {
            v: number
        }
        pm25: {
            v: number
        }
        so2: {
            v: number
        }
        t: {
            v: number
        }
    }
}
