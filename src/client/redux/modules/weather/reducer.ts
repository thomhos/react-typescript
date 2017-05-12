import { makeTypedFactory } from 'typed-immutable-record'
import { State } from '../../../../types'
import { Weather as WeatherActionTypes } from './action-types'
import { ActionNames } from './actions'

const defaultState: State.WeatherState = {
  location: '',
}
const makeDefaultStateRecord = makeTypedFactory<State.WeatherState, State.WeatherStateRecord>(defaultState)

function reducer(
  state: State.WeatherStateRecord = makeDefaultStateRecord(),
  action: WeatherActionTypes.Action,
): State.WeatherStateRecord {

  switch (action.type) {

    case ActionNames.REQUEST_FOR_LOCATION:
      const { payload: location } = action
      return state.set('location', location)

    default:
      return state

  }

}

export default reducer
