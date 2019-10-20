import * as React from 'react';
import { ChatClient } from './ChatClient';
import './chat-room.css'

export class JoinBar extends React.Component<{client: ChatClient}, {hasJoined: boolean, username: string}> {
    public constructor(props: {client: ChatClient}) {
        super(props);

        this.state = {
            hasJoined: false,
            username: ''
        }
    }

    public render(): JSX.Element {
        return  <div classID="chat-join-bar" className="join-bar">
                    <input placeholder="Enter a name to join as..." value={this.state.username} onChange={e => this.handleNameChange(e.target.value)} onKeyUp={e => this.handleNameKeyUp(e.keyCode)}></input>
                    <button onClick={e => this.handleJoinClick()}>Join</button>
                </div>;
    }

    private handleNameChange(username: string): void {
        this.setState({
            username: username 
        });
    }

    private handleNameKeyUp(keyCode: number): void {
        if (keyCode == 13) {
            this.connectClient();
        }
    }

    private handleJoinClick(): void {
        this.connectClient();
    }

    private connectClient(): void {
        this.props.client.connect(this.state.username)
                         .then(() => this.setState({hasJoined: true}))
                         .catch(err => { console.error(err.toString()); this.setState({hasJoined: false}); });
    }
}
