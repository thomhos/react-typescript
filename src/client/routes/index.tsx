import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'

import { HomePage, NotFound } from '../pages'

const Routes = ({ location }: RouteComponentProps<any>) => (
    <Switch location={location}>
        <Route key='homepage' path='/:location' component={HomePage} exact={true} />
        <Route key='notfound' path='*' component={NotFound} />
    </Switch>
)

export default function routes(props: any): React.ReactElement<React.Props<Route>> {
    return (
        <Route render={Routes} />
    )
}
