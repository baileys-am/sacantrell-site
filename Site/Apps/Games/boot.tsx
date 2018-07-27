import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { NavBar } from './NavBar/NavBar'
import { ChatClient } from './ChatRoom/ChatClient'
import { ChatRoom } from './ChatRoom/ChatRoom';
import './games.css'

function renderApp(): void {
    var chatClient = ChatClient.createSignalRClient('games/chat');

    ReactDOM.render(
        <AppContainer>
            <div className="app-container">
                <div className="app-container-top">
                    <div className="app-nav">
                        <i className="fa fa-gear fa-spin fa-4x"></i>
                        <div>Nav Bar - Work In Progress</div>
                    </div>
                    <div className="app-game">
                        <i className="fa fa-gear fa-spin fa-4x"></i>
                        <div>Game Contetn - Work In Progress</div>
                    </div>
                </div>
                <div className="app-chat">
                    <ChatRoom client={chatClient} />
                </div>
            </div>
        </AppContainer>,
        document.getElementById('app')
    );
}

renderApp();
