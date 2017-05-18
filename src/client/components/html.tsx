import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { Server, State } from '../../types'

export type HTMLChildren = React.ReactElement<React.Props<Provider>>

export interface HTMLProps extends React.Props<HTML> {
    chunks: Server.IsomorphicChunks
    store: Store<State.RootState>
}

export default class HTML extends React.Component<HTMLProps, {}> {
    public render(): JSX.Element {
        const {
            children,
            chunks: {
                javascript,
                styles,
            },
            store,
        } = this.props

        const appString = ReactDOMServer.renderToString((children as HTMLChildren))
        const stateString = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`

        return (
            <html>
                <head>
                    <title>Default App</title>
                    <link href={styles.application} rel="stylesheet" />
                </head>
                <body>
                    <div
                        id="app"
                        dangerouslySetInnerHTML={{ __html: appString }}
                    />
                    <script
                        dangerouslySetInnerHTML={{ __html: stateString }}
                        type="text/javascript"
                    />
                    {this.createScript(javascript.common)}
                    {this.createScript(javascript.app)}
                </body>
            </html>
        )
    }
    private createScript(src: string): JSX.Element | null {
        return <script src={src} type="text/javascript" />
    }
}
