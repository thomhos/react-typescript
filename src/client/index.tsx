import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"
import { App } from './containers'
import { configureStore } from './redux/create'

const store = configureStore()

/**
 * Render the app!!
 */
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
)
