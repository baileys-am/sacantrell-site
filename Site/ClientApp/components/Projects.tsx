import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class Projects extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return  <div>
                    <ul>
                        <li>
                            <NavLink to={ '/projects/blackjack' } exact activeClassName='active'>
                                Blackjack
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                </div>;
    }
}
