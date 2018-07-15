import * as signalr from '@aspnet/signalr';
import { ChatMessage } from '../../Games/components/ChatMessage';

export abstract class ChatClient {
    protected readonly _username: string;

    protected joinedHandlers: { (username: string): void; }[] = [];
    protected leftHandlers: { (username: string): void; }[] = [];
    protected receiveHandlers: { (message: ChatMessage): void; }[] = [];

    onUserJoined(handler: (username: string) => void): void {
        this.joinedHandlers.push(handler);
    }

    offUserJoined(handler: (username: string) => void): void {
        this.joinedHandlers = this.joinedHandlers.filter(h => h !== handler);
    }
    
    onUserLeft(handler: (username: string) => void): void {
        this.leftHandlers.push(handler);
    }

    offUserLeft(handler: (username: string) => void): void {
        this.leftHandlers = this.leftHandlers.filter(h => h !== handler);
    }

    onMessageReceived(handler: (message: ChatMessage) => void): void {
        this.receiveHandlers.push(handler);
    }

    offMessageReceived(handler: (message: ChatMessage) => void): void {
        this.receiveHandlers = this.receiveHandlers.filter(h => h !== handler);
    }

    protected constructor(username: string) {
        this._username = username;
    }

    public abstract connect(): Promise<void>;
    public abstract sendMessage(message: string): Promise<void>;

    public static createSignalRClient(url: string, username: string): ChatClient {
        return new SignalrChatClient(url, username);
    }
}

class SignalrChatClient extends ChatClient {
    private readonly _hubConnection: signalr.HubConnection;

    public constructor(url: string, username: string) {
        super(username);
        this._hubConnection = new signalr.HubConnectionBuilder()
                                         .withUrl(url)
                                         .build();var x = new signalr.JsonHubProtocol();

        this._hubConnection.on('userJoined', (username: string) => {
            this.handleUserJoined(username);
        });
        this._hubConnection.on('userLeft', (username: string) => {
            this.handleUserLeft(username);
        });
        this._hubConnection.on('messageBroadcast', (message: {sender: string, message: string}) => {
            this.handleMessageReceived(ChatMessage.createIncoming(message.sender, message.message));
        });
    }

    public connect(): Promise<void> {
        return this._hubConnection.start().then(() => {
            this._hubConnection.invoke('join', this._username);
        });
    }

    public sendMessage(message: string): Promise<void> {
        return this._hubConnection.invoke('sendMessage', message);
    }

    private handleUserJoined(username: string): void {
        this.joinedHandlers.slice(0)
                            .forEach(h => h(username));
    }
    
    private handleUserLeft(username: string): void {
        this.leftHandlers.slice(0)
                         .forEach(h => h(username));
    }

    private handleMessageReceived(message: ChatMessage): void {
        this.receiveHandlers.slice(0)
                            .forEach(h => h(message));
    }
}
