import { SagaIterator } from "redux-saga"
import { call, put, takeEvery } from "redux-saga/effects"
import { Weather } from './action-types'
import actions, { ActionNames } from './actions'

function fakeApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                temp: 23,
            })
        }, 1000)
    })
}

/**
 * Get data for current route
 */
function* requestWeatherForLocation(action: Weather.Action ): SagaIterator {
    try {
        const location = action.payload as string
        const data = yield call(fakeApi)
        yield put(actions.successWeatherForLocation(location, data))
    } catch (error) {
        yield put(actions.failureWeatherForLocation(error))
    }
}

/**
 * Combine all the uptime sagas
 */
export default function* watchWeather(): SagaIterator {
    yield takeEvery(ActionNames.REQUEST_WEATHER_FOR_LOCATION, requestWeatherForLocation)
}
