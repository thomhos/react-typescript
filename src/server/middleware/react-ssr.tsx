import { Request, Response } from 'express'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import { App, HTML } from '../../client/components'
import { configureStore } from '../../client/redux/create'
import { rootSaga } from '../../client/redux/saga'
import Routes from '../../client/routes'
import { Server } from '../../types'


function renderApp(props: any) {
    const reactApp = ReactDOMServer.renderToStaticMarkup(
        <HTML chunks={props.chunks} store={props.store} rootComponent={props.rootComponent} />,
    )
    return reactApp
}

export default function(chunks: Server.IsomorphicChunks) {
    return (req: Request, res: Response) => {
        const context: any = {}
        const store = configureStore()

        const rootComponent = (
            <Provider store={store} >
                <StaticRouter location={req.url} context={context}>
                    <Routes />
                </StaticRouter>
            </Provider>
        )

        store.run(rootSaga).done.then(() => {
            const result = renderApp({ store, chunks, rootComponent })

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
