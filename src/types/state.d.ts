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
    
    interface RootStateRecord extends TypedRecord<RootStateRecord>, RootState {}

    interface RootState {
        weather: WeatherState
    }

    interface WeatherStateRecord extends TypedRecord<WeatherStateRecord>, WeatherState {}

    interface WeatherState {
        location: Immutable.Map<string, WeatherObject>
    }

    interface WeatherObject {
        temp: number
    }
}