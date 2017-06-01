import { History } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import { State } from '../../types'
import { rootReducer } from './reducer'
import { rootSaga } from './saga'

/* TODO: Fix this! */
declare var window: any

export function configureStore(defaultState?: State.RootStateRecord, history?: History): State.CustomStore {
    /**
     * Connect the middlewares
     */
    const reduxRouterMiddleware = routerMiddleware(history)
    const sagaMiddleware = createSagaMiddleware()
    const middlewares: Middleware[] = [reduxRouterMiddleware, sagaMiddleware]

    /* Add logger ONLY in development */
    if (process.env.NODE_ENV === `development` && !(global as any).__SERVER__) {
        middlewares.push(createLogger({ collapsed: true }))
    }

    /**
     * Create the store
     */
    const composeEnhancers = !(global as any).__SERVER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose

    const store = createStore(rootReducer, defaultState, composeEnhancers(
        applyMiddleware(...middlewares),
    )) as State.CustomStore

    store.run = sagaMiddleware.run
    store.close = () => store.dispatch(END)

    /**
     * Run the redux saga
     */
    sagaMiddleware.run(rootSaga)

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
