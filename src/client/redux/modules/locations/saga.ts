import { waqiApi } from 'api'
import { SagaIterator } from "redux-saga"
import { call, put, takeEvery } from "redux-saga/effects"
import { State } from 'types'
import { Locations as LocationsActionTypes } from './action-types'
import actions, { ActionNames } from './actions'

/**
 * Get data for current route
 */
function* requestDataForLocationSaga(action: LocationsActionTypes.RequestDataForLocation ): SagaIterator {
    try {
        const location = action.payload
        const {status, data}: State.WaqiResponse = yield call(waqiApi.get, location)

        if (status !== 'error') {
            yield put(actions.successDataForLocation(location, data as State.WaqiData))
        } else {
            yield put(actions.failureDataForLocation({ name: 'error', message: data as string }))
        }
    } catch (error) {
        yield put(actions.failureDataForLocation(error))
    }
}

/**
 * Combine all the uptime sagas
 */
export default function* watchLocations(): SagaIterator {
    yield takeEvery(ActionNames.REQUEST_DATA_FOR_LOCATION, requestDataForLocationSaga)
}
