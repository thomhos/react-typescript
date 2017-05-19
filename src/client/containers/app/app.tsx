import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { State } from '../../../types'
import { actions as weatherActions, Weather } from '../../redux/modules/weather'

/**
 * Types
 */
interface StateProps {
    weather: State.WeatherState
}

interface DispatchProps {
    requestWeatherForLocation: ActionCreator<Weather.Action>
}

type ComponentProps = StateProps & DispatchProps & RouteComponentProps<any>

/**
 * Class
 */
class App extends React.Component<ComponentProps, any> {
    private componentWillMount() {
        const loc = this.props.match.params.location

        if (!this.props.weather.location[loc]) {
            console.log('havent got that city m8')
            this.props.requestWeatherForLocation(loc)
        }
    }

    public render() {
        const route = this.props.match.params.location
        return (
            <h1>Hello at {route}</h1>
        )
    }
}

/**
 * Connect
 */
function mapStateToProps(state: State.RootState): StateProps {
    return { weather: state.weather }
}

function mapDispatchToProps<T>(dispatch: Dispatch<T>): DispatchProps {
    return bindActionCreators(weatherActions, dispatch)
}

export default connect<StateProps, DispatchProps, ComponentProps>(mapStateToProps, mapDispatchToProps)(App)
