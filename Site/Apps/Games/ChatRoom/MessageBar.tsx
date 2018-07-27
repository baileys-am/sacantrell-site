import * as React from 'react';
import { ChatClient } from './ChatClient';
import './chat-room.css'

export class MessageBar extends React.Component<{client: ChatClient}, {text: string}> {
    public constructor(props: {client: ChatClient}) {
        super(props);

        this.state = {
            text: ''
        }
    }

    public render(): JSX.Element {
        return  <div className="message-bar">
                    <input placeholder="Type message here..." value={this.state.text} onChange={e => this.handleTextChange(e.target.value)} onKeyUp={e => this.handleTextKeyUp(e.keyCode)}></input>
                    <button onClick={e => this.handleSendClick()}>Send</button>
                </div>;
    }

    private handleTextChange(text: string): void {
        this.setState({
            text: text 
        });
    }

    private handleTextKeyUp(keyCode: number): void {
        if (keyCode == 13) {
            this.sendMessage(this.state.text);
        }
    }

    private handleSendClick(): void {
        this.sendMessage(this.state.text);
    }

    private sendMessage(message: string): void {
        if (message || message.length > 0) {
            this.props.client.sendMessage(message)
                             .then(() => this.setState({text: ''}))
                             .catch(err => {
                                 console.error(err.toString());
                                 alert('Failed to send message.')
                             });
        }
    }
}
