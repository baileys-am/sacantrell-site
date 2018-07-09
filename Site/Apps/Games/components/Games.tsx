import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Chat } from './Chat';
import { ChatClient } from '../js/ChatClient';
import '../css/games.css';

export class Games extends React.Component<{}, {}> {
    private _chatClient: ChatClient;
    private _username: string = '';

    public constructor(props: RouteComponentProps<{}>, {}) {
        super(props);
        const name = window.prompt('Enter a user name:', 'Steven');
        this._username = name == null ? 'unknown' : name.toString();
        this._chatClient = ChatClient.createSignalRClient('games/chat', this._username);
    }

    public render(): JSX.Element {
        return  <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/games/blackjack">Blackjack</Link>
                            </li>
                        </ul>

                        <hr/>

                        <div>
                            <div className="game">
                                <Route path="/games/blackjack" />
                            </div>
                            <div className="game-chat">
                                <Chat username={this._username} client={this._chatClient}/>
                            </div>
                        </div>
                    </div>
                </Router>;
    }
}
