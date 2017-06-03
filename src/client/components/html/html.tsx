import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import { Helmet, HelmetData } from 'react-helmet'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import * as Transit from 'transit-immutable-js'
import { Server, State } from '../../../types'

/**
 * Types
 */
export type HTMLChildren = React.ReactElement<React.Props<Provider>>

export interface HTMLProps extends React.Props<HTML> {
    rootComponent: HTMLChildren
    chunks: Server.IsomorphicChunks
    store: Store<State.RootStateRecord>
}

/**
 * Style
 */
// tslint:disable-next-line:no-var-requires
const style = require('./html.styl')

export default class HTML extends React.Component<HTMLProps, any> {
    public render(): JSX.Element {
        const {
            rootComponent,
            chunks: {
                javascript,
                styles,
            },
            store,
        } = this.props

        const appString = ReactDOMServer.renderToString((rootComponent))
        const stateString = `window.__INITIAL_STATE__ = '${Transit.toJSON<State.RootStateRecord>(store.getState())}'`

        const head = Helmet.rewind()
        // https://github.com/Microsoft/TypeScript/issues/13618#issuecomment-300387407
        const { children: htmlChildren, ...htmlAttrs } = head.htmlAttributes.toComponent()
        const { children: bodyChildren, ...bodyAttrs } = head.bodyAttributes.toComponent()

        return (
            <html {...htmlAttrs}>
                <head>
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    <link rel="stylesheet" href={styles.app} />
                </head>
                <body {...bodyAttrs}>
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
