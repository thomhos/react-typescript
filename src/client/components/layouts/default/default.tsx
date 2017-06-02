import { App } from 'components'
import * as React from 'react'

/**
 * Styles
 */
// tslint:disable-next-line:no-var-requires
const styles = require('./default.css')

/**
 * Types
 */
type ComponentProps = any

/**
 * Class
 */
class DefaultLayout extends React.Component<ComponentProps, any> {
    public render() {
        return (
            <main className={styles.main}>
                <p>Test</p>
                {this.props.children}
            </main>
        )
    }
}

/**
 * Connect
 */
export default DefaultLayout
