import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'

import { App } from '../components'

const Routes = ({ location }: RouteComponentProps<any>) => (
    <Switch location={location}>
        <Route key='/' path='/' component={App} exact={true} />
        <Route key='/:location' path='/:location' component={App} />
    </Switch>
)

export default function routes(props: any): React.ReactElement<React.Props<Route>> {
    return (
        <Route render={Routes} />
    )
}
