import * as React from 'react'

/**
 * Styles
 */
// tslint:disable-next-line:no-var-requires
const styles = require('./default.styl')

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
                {this.props.children}
            </main>
        )
    }
}

/**
 * Connect
 */
export default DefaultLayout
