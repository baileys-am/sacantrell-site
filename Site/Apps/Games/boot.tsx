import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { NavBar } from './NavBar/NavBar'
import { ChatClient } from './ChatRoom/ChatClient'
import { ChatRoom } from './ChatRoom/ChatRoom';
import './games.css'

function renderApp(): void {
    var chatClient = ChatClient.createSignalRClient('games/chat', 'Steven');

    ReactDOM.render(
        <AppContainer>
            <div className="app-container">
                <div className="app-nav">
                    <NavBar />
                </div>
                <div className="app-chat">
                    <ChatRoom  username="Steven" client={chatClient}/>
                </div>
            </div>
        </AppContainer>,
        document.getElementById('app')
    );
}

renderApp();
