import { Request, Response } from 'express'
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, StaticRouter } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'

import { HTML } from '../../client/components'
import { configureStore } from '../../client/redux/create'
import Routes from '../../client/routes'
import { Server } from '../../types'
// import waitforall from './wait-for-all'

export default function(chunks: Server.IsomorphicChunks) {
    return (req: Request, res: Response) => {
        const context: any = {}
        const store = configureStore()

        const html = ReactDOMServer.renderToStaticMarkup(
            <HTML chunks={chunks} store={store}>
                <StaticRouter location={req.url} context={context} >
                    <Provider store={store} >
                        <Routes />
                    </Provider>
                </StaticRouter>
            </HTML>,
        )

        if (context.url) {
            res.writeHead(301, {
                Location: context.url,
            })
            res.end()
        } else {
            res.write(`<!doctype html>`)
            res.write(html)
            res.end()
        }

    }
}




//         const memoryHistory = createMemoryHistory(req.url)

//         const history = syncHistoryWithStore(memoryHistory, store)
//         const routes = createRoutes()

//         match({
//             history,
//             routes,
//         }, (error, redirectLocation, renderProps) => {
//             if (error) {
//                 return res.status(500).send(error);
//             } else if (redirectLocation) {
//                 return res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
//             } else if (renderProps) {
//                 return store.run(waitforall(req, renderProps)).done.then(() => {
//                     res.status(200);
//                     res.write('<!doctype HTML>');
//                     res.write(ReactDOMServer.renderToStaticMarkup((
//                         <HTML chunks={ chunks } store= { store } >
//                         <Provider store={ store } >
//                         <div>
//                         <RouterContext
// 										{...renderProps }
//                         />
//                         </div>
//                         < /Provider>
//                         < /HTML>
//                     )));
//                 return res.end();
//             });
//     }

//     return res.status(404).redirect('/not-found');
// });
// 	};
// }
