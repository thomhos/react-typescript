import { combineReducers } from 'redux-immutable'
import { State } from '../../types'
import { reducer as locations } from './modules/locations'

export const rootReducer =  combineReducers<State.RootStateRecord>({
    locations,
})
