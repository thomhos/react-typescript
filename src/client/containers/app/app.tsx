import * as React from 'react'
import { connect } from 'react-redux'
import { ActionCreator, bindActionCreators, Dispatch } from 'redux'
import { State } from '../../../types'
import { actions as weatherActions, Weather } from '../../redux/modules/weather'

/**
 * Types
 */
interface StateProps {
    weather: State.WeatherStateRecord
}

interface DispatchProps {
    requestForLocation: ActionCreator<Weather.Action>
}

type ComponentProps = StateProps & DispatchProps

/**
 * Class
 */
class App extends React.Component<ComponentProps, any> {
    private componentWillMount() {
        this.props.requestForLocation("home")
    }

    public render() {
        return (
            <h1>Hello at {this.props.weather.get('location')}</h1>
        )
    }
}

/**
 * Connect
 */
function mapStateToProps(state: State.Root): StateProps {
    return { weather: state.get('weather') }
}

function mapDispatchToProps<T>(dispatch: Dispatch<T>): DispatchProps {
    return bindActionCreators(weatherActions, dispatch)
}

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(App)
