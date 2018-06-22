import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Chat } from './Chat';
import { ChatClient } from '../js/ChatClient'

export class Projects extends React.Component<{}, {}> {
    private _chatClient: ChatClient;
    private _username: string = '';

    public constructor(props: RouteComponentProps<{}>) {
        super(props);
        const name = window.prompt('Enter a user name:', 'Steven');
        this._username = name == null ? 'unknown' : name.toString();
        this._chatClient = ChatClient.createSignalRClient('projects/chat', this._username);
    }

    public render(): JSX.Element {
        return  <div>
                    <ul>
                        <li>
                            <NavLink to={ '/projects/blackjack' } exact activeClassName='active'>
                                Blackjack
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <Chat username={this._username} client={this._chatClient}/>
                </div>;
    }
}
