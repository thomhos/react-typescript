import * as Immutable from 'immutable'
import { makeTypedFactory } from 'typed-immutable-record'
import { State } from 'types'
import { ActionNames, Actions } from './actions'

const defaultState: State.LocationsState = Immutable.Map<string, State.WaqiData>({})

function reducer(state: State.LocationsState = defaultState, action: Actions ): State.LocationsState {

  switch (action.type) {

    case ActionNames.weather_SUCCESS_DATA_FOR_LOCATION:
      const { location, data } = action.payload
      return state.setIn([location], data)

    default:
      return state

  }

}

export default reducer
