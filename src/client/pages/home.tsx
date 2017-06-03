import { DefaultLayout, GoogleMap } from 'components'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'

/**
 * Types
 */
interface RouterProps {
    location: string
}
type ComponentProps = RouteComponentProps<RouterProps>

/**
 * Class
 */
class HomePage extends React.Component<ComponentProps, any> {
    public render() {
        return (
            <DefaultLayout>
                <Helmet>
                    <html lang="en" />
                    <title>Homepage</title>
                    <meta name="description" content="Welcome" />
                </Helmet>
                Hello at homepage
                <div style={{ width: '100%', height: '500px'}}>
                    <GoogleMap />
                </div>
            </DefaultLayout>
        )
    }
}

/**
 * Connect
 */
export default HomePage
