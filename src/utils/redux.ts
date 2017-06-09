import { State } from 'types'

/**
 * Create actionCreators from defined types
 */
export function createActionCreator<ACTION_NAME, PAYLOAD>(type: ACTION_NAME) {
    return (payload: PAYLOAD): State.ReduxAction<ACTION_NAME, PAYLOAD> => {
        return {
            type,
            payload,
        }
    }
}