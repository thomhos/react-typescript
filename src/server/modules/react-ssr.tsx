import { NextFunction, Request, Response } from 'express'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import { Server, State } from 'types'
import { HTML } from '../../client/components'
import { configureStore } from '../../client/redux/create'
import { rootSaga } from '../../client/redux/saga'
import Routes from '../../client/routes'


function renderApp(store: State.CustomStore, chunks: Server.IsomorphicChunks, component: JSX.Element) {
    try {
        return ReactDOMServer.renderToStaticMarkup(
            <HTML chunks={chunks} store={store} rootComponent={component} />,
        )
    } catch (err) {
        console.log(err)
    }
}

export default function(chunks: Server.IsomorphicChunks) {
    return (req: Request, res: Response, next: NextFunction ) => {
        const context: Server.Context = {}
        const store = configureStore()

        const rootComponent = (
            <Provider store={store} >
                <StaticRouter location={req.url} context={context}>
                    <Routes />
                </StaticRouter>
            </Provider>
        )

        store.run(rootSaga).done.then(() => {
            const result = renderApp(store, chunks, rootComponent)
            if (context.url) {
                res.writeHead(301, {
                    Location: context.url,
                })
                res.end()
            } else {
                res.write(`<!doctype html>${result}`)
                res.end()
            }
        })

        ReactDOMServer.renderToString(rootComponent)

        store.close()

    }
}
