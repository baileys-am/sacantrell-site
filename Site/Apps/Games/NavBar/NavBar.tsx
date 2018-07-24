import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './nav-bar.css';

export class NavBar extends React.Component<{}, {}> {
    public constructor(props: RouteComponentProps<{}>, {}) {
        super(props);
    }

    public render(): JSX.Element {
        return  <Router>
                    <div className="nav-bar">
                        <ul>
                            <li>
                                <Link to="/games/blackjack">Blackjack</Link>
                            </li>
                        </ul>

                        <div>
                            <Route path="/games/blackjack" />
                        </div>
                    </div>
                </Router>;
    }
}
