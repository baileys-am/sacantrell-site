import * as signalr from '@aspnet/signalr';

export abstract class ChatClient {
    protected connectedHandlers: { (): void; }[] = [];
    protected disconnectedHandlers: { (): void; }[] = [];
    protected usersUpdatedHandlers: { (): void; }[] = [];
    protected joinedHandlers: { (username: string): void; }[] = [];
    protected leftHandlers: { (username: string): void; }[] = [];
    protected sentHandlers: { (msg: {sender: string, message: string}): void; }[] = [];
    protected receiveHandlers: { (msg: {sender: string, message: string}): void; }[] = [];

    public onConnected(handler: () => void): void {
        this.connectedHandlers.push(handler);
    }

    public offConnected(handler: () => void): void {
        this.connectedHandlers = this.connectedHandlers.filter(h => h !== handler);
    }

    public onDisconnected(handler: () => void): void {
        this.disconnectedHandlers.push(handler);
    }

    public offDisconnected(handler: () => void): void {
        this.disconnectedHandlers = this.disconnectedHandlers.filter(h => h !== handler);
    }

    public onUsersUpdated(handler: () => void): void {
        this.usersUpdatedHandlers.push(handler);
    }

    public offUsersUpdated(handler: () => void): void {
        this.usersUpdatedHandlers = this.usersUpdatedHandlers.filter(h => h !== handler);
    }

    public onUserJoined(handler: (username: string) => void): void {
        this.joinedHandlers.push(handler);
    }

    public offUserJoined(handler: (username: string) => void): void {
        this.joinedHandlers = this.joinedHandlers.filter(h => h !== handler);
    }
    
    public onUserLeft(handler: (username: string) => void): void {
        this.leftHandlers.push(handler);
    }

    public offUserLeft(handler: (username: string) => void): void {
        this.leftHandlers = this.leftHandlers.filter(h => h !== handler);
    }

    public onMessageSent(handler: (msg: {sender: string, message: string}) => void): void {
        this.sentHandlers.push(handler);
    }

    public offMessageSent(handler: (msg: {sender: string, message: string}) => void): void {
        this.sentHandlers = this.sentHandlers.filter(h => h !== handler);
    }

    public onMessageReceived(handler: (msg: {sender: string, message: string}) => void): void {
        this.receiveHandlers.push(handler);
    }

    public offMessageReceived(handler: (msg: {sender: string, message: string}) => void): void {
        this.receiveHandlers = this.receiveHandlers.filter(h => h !== handler);
    }

    protected constructor() {
        this.onUserJoined(this.handleUsersUpdated);
        this.onUserLeft(this.handleUsersUpdated);
    }

    public abstract connect(username: string): Promise<void>;
    public abstract getUsernames(): Promise<Array<string>>;
    public abstract sendMessage(message: string): Promise<void>;

    public static createSignalRClient(url: string): ChatClient {
        return new SignalrChatClient(url);
    }

    private handleUsersUpdated = (): void => {
        this.usersUpdatedHandlers.slice(0)
                                 .forEach(h => h());
    }

}

class SignalrChatClient extends ChatClient {
    private readonly _hubConnection: signalr.HubConnection;
    private _username: string = '';

    public constructor(url: string) {
        super();
        this._hubConnection = new signalr.HubConnectionBuilder()
                                         .withUrl(url)
                                         .build();

        this._hubConnection.on('userJoined', (username: string) => {
            this.handleUserJoined(username);
        });
        this._hubConnection.on('userLeft', (username: string) => {
            this.handleUserLeft(username);
        });
        this._hubConnection.on('messageBroadcast', (msg: {sender: string, message: string}) => {
            this.handleMessageReceived(msg);
        });
    }

    public connect(username: string): Promise<void> {
        this._username = username;
        return this._hubConnection.start()
                                  .then(() => this._hubConnection.invoke('join', this._username))
                                  .then(() => this.handleConnected());
    }

    public getUsernames(): Promise<Array<string>> {
        var invoke = this._hubConnection.invoke<Array<string>>('getUsernames');
        invoke.catch(() => { this.handleDisconnected(); console.log('getUsernames failed'); });
        return invoke;
    }

    public sendMessage(message: string): Promise<void> {
        return this._hubConnection.invoke('sendMessage', message)
                                  .then(() => this.handleMessageSent({sender: this._username, message: message}))
                                  .catch(() => this.handleDisconnected());
    }

    private handleConnected(): void {
        this.connectedHandlers.slice(0)
                              .forEach(h => h());
    }

    private handleDisconnected(): void {
        this.disconnectedHandlers.slice(0)
                                 .forEach(h => h());
    }

    private handleUserJoined(username: string): void {
        this.joinedHandlers.slice(0)
                           .forEach(h => h(username));
    }
    
    private handleUserLeft(username: string): void {
        this.leftHandlers.slice(0)
                         .forEach(h => h(username));
    }

    private handleMessageSent(msg: {sender: string, message: string}): void {
        this.sentHandlers.slice(0)
                         .forEach(h => h(msg));
    }

    private handleMessageReceived(msg: {sender: string, message: string}): void {
        this.receiveHandlers.slice(0)
                            .forEach(h => h(msg));
    }
}
