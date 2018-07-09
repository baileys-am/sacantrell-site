import * as React from 'react';
import '../css/chat-message.css'

export abstract class ChatMessage extends React.Component<{sender: string, message: string}, {sender: string, message: string}>  {
    public constructor(props: {sender: string, message: string}) {
        super(props);
        this.state = {
            sender: props.sender,
            message: props.message
        }
    }

    public get sender() : string {
        return this.state.sender;
    }

    public get message() : string {
        return this.state.message;
    }

    public abstract render(): JSX.Element;

    public static createIncoming(sender: string, message: string): ChatMessage {
        return new MessengerIncomingMessage({sender, message});
    }

    public static createOutgoing(sender: string, message: string): ChatMessage {
        return new MessengerOutgoingMessage({sender, message});
    }
}

class MessengerIncomingMessage extends ChatMessage {
    public constructor(props: {sender: string, message: string}) {
        super(props);
    }

    public render(): JSX.Element {
        return  <div>
                    <div className="incoming-message-username">{this.sender}</div>
                    <div className="incoming-message">{this.message}</div>
                </div>;
    }
}

class MessengerOutgoingMessage extends ChatMessage {
    public constructor(props: {sender: string, message: string}) {
        super(props);
    }
    
    public render(): JSX.Element {
        return <div className="outgoing-message">{this.message}</div>;
    }
}
