import { DefaultLayout, GoogleMap } from 'components'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { State } from 'types'
import { actions as locationActions, Locations as LocationsActionTypes } from '../redux/modules/locations'

/**
 * Types
 */
interface RouterProps {
    location: string
}

interface ComponentStateProps {
    locations: State.LocationsState
}

interface ComponentDispatchProps {
    requestDataForLocation: ActionCreator<LocationsActionTypes.RequestDataForLocation>
}

type ComponentProps = ComponentStateProps & ComponentDispatchProps & RouteComponentProps<RouterProps>

/**
 * Class
 */
class HomePage extends React.Component<ComponentProps, any> {

    public componentWillMount() {
        this.props.requestDataForLocation('amsterdam')
    }

    public render() {
        const data = this.props.locations.get('amsterdam')

        return (
            <DefaultLayout>
                <Helmet>
                    <html lang="en" />
                    <title>Homepage</title>
                    <meta name="description" content="Welcome" />
                </Helmet>
                    {data && ( <p>The current index for {data.data.city.name} is {data.data.aqi}</p> )}
                <GoogleMap />
            </DefaultLayout>
        )
    }
}

/**
 * Connect
 */
function mapStateToProps(state: State.RootStateRecord): ComponentStateProps {
    return {
        locations: state.get("locations"),
    }
}

function mapDispatchToProps<T>(dispatch: Dispatch<T>): ComponentDispatchProps {
    return bindActionCreators(locationActions, dispatch)
}

export default connect<ComponentStateProps, ComponentDispatchProps, RouteComponentProps<RouterProps>>(
    mapStateToProps, mapDispatchToProps)(HomePage)
