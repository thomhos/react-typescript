import 'babel-polyfill'
import * as React from 'react'
import { Provider } from "react-redux";
import { configureStore } from './redux/create'
import { render } from 'react-dom'
import { App } from './containers'

const store = configureStore()

/**
 * Render the app!!
 */
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
