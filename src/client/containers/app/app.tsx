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
    requestForLocation: ActionCreator<Weather.Action>
}

type ComponentProps = StateProps & DispatchProps & RouteComponentProps<any>

/**
 * Class
 */
class App extends React.Component<ComponentProps, any> {
    private componentWillMount() {
        // this.props.requestForLocation("home")
    }

    public render() {
        console.log(this.props)
        return (
            <h1>Hello at {this.props.weather.location}</h1>
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
