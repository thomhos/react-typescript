import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'

import { App } from '../containers'

const Routes = ({ location }: RouteComponentProps<any>) => (
    <Switch location={location}>
        <Route key='/' path='/' component={App} />
    </Switch>
)

export default function routes(props: any): React.ReactElement<React.Props<Route>> {
    return (
        <Route render={Routes} />
    )
}
