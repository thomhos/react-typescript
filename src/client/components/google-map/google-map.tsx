import GoogleMapReact, { Props } from 'google-map-react'
import * as React from 'react'

class GoogleMap extends React.Component<Props, any> {
    public static defaultProps = {
        center: { lat: 0, lng: 0 },
        zoom: 1,
    }

    public render() {
        return (
            <GoogleMapReact defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
                {this.props.children}
            </GoogleMapReact>
        )
    }
}

export default GoogleMap
