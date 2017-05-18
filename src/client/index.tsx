import 'babel-polyfill'
import * as React from 'react'
import { render as ReactDOMRender} from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from "react-redux"
import { App } from './containers'
import { configureStore } from './redux/create'

const store = configureStore()

/**
 * Render the app!!
 */
function render(Component: React.ComponentClass<any>) {
    ReactDOMRender(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('app'),
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./containers', () => {
        const nextApp = require('./containers').App
        render(nextApp)
    })
}
