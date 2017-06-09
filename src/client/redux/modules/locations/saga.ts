import { waqiApi } from 'api'
import { SagaIterator } from "redux-saga"
import { call, put, takeEvery } from "redux-saga/effects"
import { State } from 'types'
import { ActionCreators, ActionNames, Actions } from './actions'
import actions from './actions'

/**
 * Get data for current route
 */
function* requestDataForLocationSaga(
    action: Actions.RequestDataForLocationAction,
): SagaIterator {
    try {
        const { location } = action.payload
        const { status, data }: State.WaqiResponse = yield call(waqiApi.get, location)

        if (status !== 'error') {
            yield put(ActionCreators.successDataForLocation({ location, data: data as State.WaqiData }))
        } else {
            yield put(ActionCreators.failureDataForLocation({ error: { name: 'error', message: data as string } }))
        }
    } catch (error) {
        yield put(ActionCreators.failureDataForLocation(error))
    }
}

/**
 * Combine all the uptime sagas
 */
export default function* watchLocations(): SagaIterator {
    yield takeEvery(ActionNames.weather_REQUEST_DATA_FOR_LOCATION, requestDataForLocationSaga)
}
