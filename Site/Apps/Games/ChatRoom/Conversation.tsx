import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChatClient } from './ChatClient';
import './chat-room.css'

export class Conversation extends React.Component<{client: ChatClient}, {messages: Array<Message>}> {
    public constructor(props: {client: ChatClient}) {
        super(props);

        this.state = {
            messages: new Array<Message>()
        }
    }

    public componentWillMount(): void {
        this.props.client.onUserJoined(this.userJoined);
        this.props.client.onUserLeft(this.userLeft);
        this.props.client.onMessageSent(this.messageSent);
        this.props.client.onMessageReceived(this.messageReceived);
    }

    public componentWillUnmount(): void {
        this.props.client.offUserJoined(this.userJoined);
        this.props.client.offUserLeft(this.userLeft);
        this.props.client.offMessageSent(this.messageSent);
        this.props.client.offMessageReceived(this.messageReceived);
    }

    public render(): JSX.Element {
        return  <div ref="messages" className="conversation">
                    <ul>{this.state.messages.map(msg => msg.render())}</ul>
                </div>;
    }

    private userJoined = (username: string): void => {
        var message = Message.createUserJoinedNotification(username);
        this.addMessageToConversation(message);
    }

    private userLeft = (username: string): void => {
        var message = Message.createUserLeftNotification(username);
        this.addMessageToConversation(message);
    }

    private messageReceived = (msg: {sender: string, message: string }): void => {
        var message = Message.createIncomingMessage(msg);
        this.addMessageToConversation(message);
    }
    
    private messageSent = (msg: {sender: string, message: string }): void => {
        var message = Message.createOutgoingMessage(msg);
        this.addMessageToConversation(message);
    }

    private addMessageToConversation(message: Message) {
        this.state.messages.push(message);
        this.setState({
            messages: this.state.messages
        });
        this.scrollMessagesToBottom();
    }

    private scrollMessagesToBottom(): void {
        var node = ReactDOM.findDOMNode(this.refs.messages) as Element;
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    }
}

class Message {
    private readonly _element: JSX.Element;

    private constructor(element: JSX.Element) {
        this._element = element;
    }
    
    public render(): JSX.Element {
        return this._element;
    }

    public static createUserJoinedNotification(username: string): Message {
        var element = <div className="joined-notification">
                        <p>{'[' + new Date().toLocaleTimeString() + '] ' + username + ' has joined! :)'}</p>
                      </div>;

        return new Message(element);
    }

    public static createUserLeftNotification(username: string): Message {
        var element = <div className="left-notification">
                        <p>{'[' + new Date().toLocaleTimeString() + '] ' + username + ' has left... :('}</p>
                      </div>;

        return new Message(element);
    }

    public static createIncomingMessage(msg: {sender: string, message: string }): Message {
        var element = <div className="incoming-message">
                         <p>{'[' + new Date().toLocaleTimeString() + '] ' + msg.sender + ': ' + msg.message}</p>
                      </div>;

        return new Message(element);
    }

    public static createOutgoingMessage(msg: {sender: string, message: string }): Message {
        var element = <div className="outgoing-message">
                        <p>{'[' + new Date().toLocaleTimeString() + '] ' + msg.sender + ': ' + msg.message}</p>
                      </div>;

        return new Message(element);
    }
}
