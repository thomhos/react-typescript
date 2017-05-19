import { fork } from "redux-saga/effects"
import { saga as Weather } from "./modules/weather"

/**
 * Combine all sagas
 */
export function* rootSaga() {
    yield fork(Weather)
}
