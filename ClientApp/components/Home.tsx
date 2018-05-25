import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Welcome!</h1>
            <p>Site is in progress. Expect more...</p>
            <ul>
                <li><strong>Projects</strong>. Probably will mostly be games. I'm thinking Connect Four and Blacjack to start with.</li>
                <li><strong>About</strong>. More information about myself.</li>
            </ul>
        </div>;
    }
}
