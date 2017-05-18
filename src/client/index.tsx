import 'babel-polyfill'
import * as React from 'react'
import { render as ReactDOMRender} from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from "react-redux"
import { ConnectedRouter } from 'react-router-redux'
import { State } from '../types'
import { configureStore, history } from './redux'
import Routes from './routes'

const initialState: State.RootState = (window as any).__INITIAL_STATE__ || {}
const store = configureStore(initialState)

/**
 * Render the app!!
 */
function render(Component: React.ComponentClass<any> | React.StatelessComponent<any>) {
    ReactDOMRender(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app'),
    )
}

render(Routes)

if (module.hot) {
    module.hot.accept('./routes', () => {
        const nextApp = require('./routes').default
        render(nextApp)
    })
}
