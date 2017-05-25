import * as Immutable from 'immutable'
import { makeTypedFactory } from 'typed-immutable-record'
import { State } from '../../../../types'
import { Weather as WeatherActionTypes } from './action-types'
import { ActionNames } from './actions'

const makeWeatherStateRecord = makeTypedFactory<State.WeatherState, State.WeatherStateRecord>({
  location: Immutable.Map<string, State.WeatherObject>({}),
})

const defaultState: State.WeatherStateRecord = makeWeatherStateRecord()

function reducer(
  state: State.WeatherStateRecord = defaultState,
  action: WeatherActionTypes.Action,
): State.WeatherStateRecord {

  switch (action.type) {

    case ActionNames.SUCCESS_WEATHER_FOR_LOCATION:
      const { location, weather } = action.payload

      return state.setIn(["location", location], weather)

    default:
      return state

  }

}

export default reducer
