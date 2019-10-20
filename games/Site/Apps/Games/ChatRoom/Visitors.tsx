import * as React from 'react';
import { ChatClient } from './ChatClient';
import './chat-room.css'

export class Visitors extends React.Component<{client: ChatClient}, {visitors: Array<Visitor>}> {
    public constructor(props: {client: ChatClient}) {
        super(props);

        this.state = {
            visitors: new Array<Visitor>()
        }
    }

    public componentWillMount(): void {
        this.props.client.onConnected(this.updateUsers);
        this.props.client.onDisconnected(this.clearUsers);
        this.props.client.onUsersUpdated(this.updateUsers);
    }

    public componentWillUnmount(): void {
        this.props.client.offConnected(this.updateUsers);
        this.props.client.offDisconnected(this.clearUsers);
        this.props.client.offUsersUpdated(this.updateUsers);
    }

    public render(): JSX.Element {
        return  <div className="visitors">
                    <div>Visitors</div>
                    <ul>{this.state.visitors.map(vis => vis.render())}</ul>
                </div>;
    }

    private updateUsers = (): void => {
        this.props.client.getUsernames().then(usernames =>
            {
                var visitors = new Array<Visitor>();
                usernames.forEach((username: string) => {
                    var visitor = Visitor.createVisitor(username);
                    visitors.push(visitor);
                });
                this.setState({
                    visitors: visitors
                });
            });    
    };

    private clearUsers = (): void => {
        this.setState({
            visitors: new Array<Visitor>()
        });
    }
}

class Visitor {
    private readonly _username: string;
    private readonly _element: JSX.Element;

    private constructor(username: string, element: JSX.Element) {
        this._username = username;
        this._element = element;
    }

    public render(): JSX.Element {
        return this._element;
    }

    public static createVisitor(username: string): Visitor {
        var element = <div className="visitor">{username}</div>;

        return new Visitor(username, element);
    }

    public is(username: string): boolean {
        return this._username == username;
    }
}
