import * as React from 'react'
import { RouteComponentProps } from 'react-router'

/**
 * Types
 */
type ComponentProps = RouteComponentProps<any>

/**
 * Class
 */
class NotFound extends React.Component<ComponentProps, any> {
    public render() {
        return (
            <h1>Hello at NotFound</h1>
        )
    }
}

/**
 * Connect
 */
export default NotFound
