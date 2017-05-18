import { combineReducers } from 'redux'
import { State } from '../../types'
import { reducer as weather } from './modules/weather'

export const rootReducer =  combineReducers<State.RootState>({
    weather,
})
