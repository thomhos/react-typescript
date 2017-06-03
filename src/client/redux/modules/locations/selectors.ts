import { createSelector } from 'reselect'
import { State } from 'types'

function getLocations(state: State.RootStateRecord): State.LocationsState {
    return state.get('locations')
}

export type PollutantsByLocationFunction = (location: string) => State.WaqiPollutants

export const pollutantsByLocation: (state: State.RootStateRecord) => PollutantsByLocationFunction =
    createSelector([getLocations], (locationsMap): PollutantsByLocationFunction => {
        return (location: string): State.WaqiPollutants => {
            return locationsMap.get(location) ? locationsMap.get(location).iaqi : undefined
        }
    })
