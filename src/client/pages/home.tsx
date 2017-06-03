import { DefaultLayout, GoogleMap } from 'components'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { State } from 'types'
import { actions as locationActions, Locations as LocationsActionTypes } from '../redux/modules/locations'
import { pollutantsByLocation, PollutantsByLocationFunction } from '../redux/modules/locations/selectors'

/**
 * Types
 */
interface RouterProps {
    location: string
}

interface ComponentStateProps {
    locations: State.LocationsState
    getPollutants: PollutantsByLocationFunction
    pollutants?: State.WaqiPollutants
}

interface ComponentDispatchProps {
    requestDataForLocation: ActionCreator<LocationsActionTypes.RequestDataForLocation>
}

type ComponentOwnProps = RouteComponentProps<RouterProps>

type ComponentProps = ComponentStateProps & ComponentDispatchProps & ComponentOwnProps

/**
 * Class
 */
class HomePage extends React.Component<ComponentProps, any> {

    public componentWillMount() {
        const { location } = this.props.match.params
        this.props.requestDataForLocation(location)
    }

    public render() {
        const { location } = this.props.match.params
        const data = this.props.locations.get(location)

        return (
            <DefaultLayout>
                <Helmet>
                    <html lang="en" />
                    <title>Homepage</title>
                    <meta name="description" content="Welcome" />
                </Helmet>
                    {data && ( <p>The current index for {data.city.name} is {data.aqi}</p> )}
                    {this.props.pollutants && ( <p>The current pm25 is {this.props.pollutants.pm25.v}</p> )}
                <GoogleMap />
            </DefaultLayout>
        )
    }
}

/**
 * Connect
 */
function mapStateToProps(state: State.RootStateRecord): ComponentStateProps {
    const getPollutantsByLocationSelector = pollutantsByLocation(state)
    return {
        locations: state.get('locations'),
        getPollutants: getPollutantsByLocationSelector,
    }
}

function mapDispatchToProps<T>(dispatch: Dispatch<T>): ComponentDispatchProps {
    return bindActionCreators(locationActions, dispatch)
}

function mergeProps(
    stateProps: ComponentStateProps,
    dispatchProps: ComponentDispatchProps,
    ownProps: ComponentOwnProps,
): ComponentProps {
    return {
        ...dispatchProps,
        ...ownProps,
        ...stateProps,
        pollutants: stateProps.getPollutants(ownProps.match.params.location),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomePage)
