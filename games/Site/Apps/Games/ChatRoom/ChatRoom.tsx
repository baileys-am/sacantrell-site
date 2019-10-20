import * as React from 'react';
import { JoinBar } from './JoinBar'
import { MessageBar } from './MessageBar'
import { Conversation } from './Conversation';
import { Visitors } from './Visitors';
import { ChatClient } from './ChatClient';
import './chat-room.css';

export class ChatRoom extends React.Component<{client: ChatClient}, {hasJoined: boolean}> {
    public constructor(props: {client: ChatClient}) {
        super(props);

        this.state = {
            hasJoined: false
        }
    }

    public componentWillMount(): void {
        this.props.client.onConnected(this.connected);
        this.props.client.onDisconnected(this.disconnected);
    }

    public componentWillUnmount(): void {
        this.props.client.offConnected(this.connected);
        this.props.client.offDisconnected(this.disconnected);
    }

    public render(): JSX.Element {
        return  <div className="chat-room">
                    <div className="chat-box">
                        <Conversation client={this.props.client} />
                        <div className="chat-box-bar">
                            {this.state.hasJoined ? <MessageBar client={this.props.client} /> : <JoinBar client={this.props.client} />}
                        </div>
                    </div>
                    <Visitors client={this.props.client} />
                </div>;
    }

    private connected = () : void => {
        this.setState({hasJoined: true});
    }

    private disconnected = () : void => {
        this.setState({hasJoined: false});
    }
}
