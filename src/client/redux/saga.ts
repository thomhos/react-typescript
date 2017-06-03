import { fork } from "redux-saga/effects"
import { saga as Locations } from "./modules/locations"

/**
 * Combine all sagas
 */
export function* rootSaga() {
    yield fork(Locations)
}
