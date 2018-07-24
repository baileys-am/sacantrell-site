import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { NavBar } from './NavBar/NavBar'
import { ChatClient } from './ChatRoom/ChatClient'
import { ChatRoom } from './ChatRoom/ChatRoom';

function renderApp(): void {
    var chatClient = ChatClient.createSignalRClient('games/chat', 'Steven');

    ReactDOM.render(
        <AppContainer>
            <div>
                <NavBar />
                <ChatRoom username="Steven" client={chatClient}/>
            </div>
        </AppContainer>,
        document.getElementById('gamesApp')
    );
}

renderApp();
