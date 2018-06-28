import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render(): JSX.Element {
        return <div>
            <h1>Welcome!</h1>
            <p>Site is in progress. Expect more...</p>
            <ul>
                <li><strong>Projects</strong>. Probably will mostly be games. I'm thinking Connect Four and Blackjack to start with.</li>
                <li><strong>About</strong>. More information about myself.</li>
            </ul>
            <br/>
            <p>Meanwhile, enjoy Cosmo!</p>
            <img src="/images/cosmo.jpg" alt="Cosmo (Siberian Husky)" width="50%" height="50%"></img>
        </div>;
    }
}
