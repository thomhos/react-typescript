import { makeTypedFactory } from 'typed-immutable-record'
import { State } from '../../../../types'
import { Weather as WeatherActionTypes } from './action-types'
import { ActionNames } from './actions'

const defaultState: State.WeatherState = {
  location: '',
}
function reducer(
  state: State.WeatherState = defaultState,
  action: WeatherActionTypes.Action,
): State.WeatherState {

  switch (action.type) {

    case ActionNames.REQUEST_FOR_LOCATION:
      const { payload: location } = action
      return { location }

    default:
      return state

  }

}

export default reducer
