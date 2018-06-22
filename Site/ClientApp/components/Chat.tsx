import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChatMessage } from './ChatMessage';
import { ChatClient } from '../js/ChatClient';
import '../css/chat.css'

export class Chat extends React.Component<{username: string, client: ChatClient}, {text: string, messages: Array<ChatMessage>}> {
    private readonly _username: string;
    private readonly _client: ChatClient;

    public constructor(props: {username: string, client: ChatClient}) {
        super(props);4
        this._username = props.username;
        this._client = props.client;

        this.state = {
            text: '',
            messages: new Array<ChatMessage>()
        }
    }

    public componentWillMount(): void {
        this._client.onUserJoined(this.handlerUserJoined);
        this._client.onUserLeft(this.handleUserLeft);
        this._client.onMessageReceived(this.handleMessageReceived);
        this.connectClient();
    }

    public componentWillUnmount(): void {
        this._client.offUserJoined(this.handlerUserJoined);
        this._client.offUserLeft(this.handleUserLeft);
        this._client.offMessageReceived(this.handleMessageReceived);
    }

    public render(): JSX.Element {
        const messages = this.state.messages.map((message: ChatMessage) =>
            message.render()
        );

        return  <div className="chat">
                    <div ref="messageList" className="chat-box">
                        <ul ref="messages" className="message-list">{messages}</ul>
                    </div>
                    <div>
                        <input ref="text" className="chat-input" value={this.state.text} onChange={e => this.handleTextChange(e.target.value)} onKeyUp={e => this.handleTextKeyUp(e.keyCode)}></input>
                        <button className="chat-send" onClick={e => this.handleSendClick()}>Send</button>
                    </div>
                </div>;
    }

    private handlerUserJoined = (username: string): void => {
        console.log('User joined: '.concat(username));
    }

    private handleUserLeft = (username: string): void => {
        console.log('User left: '.concat(username));
    }

    private handleMessageReceived = (message: ChatMessage): void => {
        if (this.refs.messages) {
            this.state.messages.push(message);
            this.setState({
                messages: this.state.messages
            });
            this.scrollMessagesToBottom();
        }
    }

    private handleTextChange(text: string): void {
        if (this.refs.text) {
            this.setState({
               text: text 
            });
        }
    }

    private handleTextKeyUp(keyCode: number): void {
        if (keyCode == 13) {
            this.sendMessage(this.state.text);
        }
    }

    private handleSendClick(): void {
        this.sendMessage(this.state.text);
    }

    private handleSendFailed(): void {
        alert('Failed to send message.');
    }

    private scrollMessagesToBottom(): void {
        var node = ReactDOM.findDOMNode<HTMLDivElement>(this.refs.messageList);
        node.scrollTop = node.scrollHeight;
    }

    private connectClient(): void {
        this._client.connect()
                    .catch(err => console.error(err.toString()));
    }

    private sendMessage(message: string): void {
        if (message || message.length > 0) {
            this._client.sendMessage(message)
                        .then(() => this.handleMessageSent(message), () => { this.handleSendFailed(); this.connectClient(); })
                        .catch(err => console.error(err.toString()));
        }
    }

    private handleMessageSent(message: string): void {
        if (this.refs.text && this.refs.messages) {
            this.state.messages.push(ChatMessage.createOutgoing(this._username, message));
            this.setState({
                text: '',
                messages: this.state.messages
            });
            this.scrollMessagesToBottom();
        }
    }
}
