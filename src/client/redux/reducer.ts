import { combineReducers } from 'redux-immutable'
import { State } from '../../types'
import { reducer as weather } from './modules/weather'

export const rootReducer =  combineReducers<State.Root>({
    weather
})
