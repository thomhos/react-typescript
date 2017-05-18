import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux'
import logger from 'redux-logger'
import { State } from '../../types'
import { history } from './history'
import { rootReducer } from './reducer'

/* TODO: Fix this! */
declare var window: any

export function configureStore(defaultState?: State.RootState): Store<State.RootState> {
    /**
     * Connect the middlewares
     */
    const middlewares: Middleware[] = []

    /* Add logger ONLY in development */
    if (process.env.NODE_ENV === `development`) {
        middlewares.push(logger)
    }

    /**
     * Create the store
     */
    const composeEnhancers = compose
    const store = createStore(rootReducer, defaultState, composeEnhancers(
        applyMiddleware(...middlewares),
    ))

    /**
     * Enable hot reloading of reducers
     */
    if (module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
}