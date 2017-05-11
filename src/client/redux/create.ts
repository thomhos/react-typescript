import { createStore, applyMiddleware, compose, Middleware, Store } from 'redux'
import logger from 'redux-logger'
import { history } from './history'
import { rootReducer } from './reducer'
import { State } from '../../types'

/* TODO: Fix this! */
declare var window: any;

export function configureStore(): Store<State.Root> {
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
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(
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
