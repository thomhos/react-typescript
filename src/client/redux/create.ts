import { History } from 'history'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware, { END } from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import { State } from '../../types'
import { rootReducer } from './reducer'
import { rootSaga } from './saga'

/* TODO: Fix this! */
declare var window: any

export function configureStore(defaultState?: State.RootState, history?: History): State.CustomStore {
    /**
     * Connect the middlewares
     */
    const reduxRouterMiddleware = routerMiddleware(history)
    const sagaMiddleware = createSagaMiddleware()
    const middlewares: Middleware[] = [reduxRouterMiddleware, sagaMiddleware]

    /* Add logger ONLY in development */
    if (process.env.NODE_ENV === `development`) {
        middlewares.push(logger)
    }

    /**
     * Create the store
     */
    const store = createStore(rootReducer, defaultState, composeWithDevTools(
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
