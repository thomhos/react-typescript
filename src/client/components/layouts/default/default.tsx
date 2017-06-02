import * as React from 'react'

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
            <main>
                {this.props.children}
            </main>
        )
    }
}

/**
 * Connect
 */
export default DefaultLayout
