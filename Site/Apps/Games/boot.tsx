import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { NavBar } from './NavBar/NavBar'
import { ChatClient } from './ChatRoom/ChatClient'
import { ChatRoom } from './ChatRoom/ChatRoom';
import './games.css'

function renderApp(): void {
    ReactDOM.render(
        <AppContainer>
            <div className="app-container">
                <div className="app-container-top">
                    <div className="app-nav">
                        insert nav here
                    </div>
                    <div className="app-game">
                        insert game here
                    </div>
                </div>
                <div className="app-chat">
                    insert chat here
                </div>
            </div>
        </AppContainer>,
        document.getElementById('app')
    );
}

renderApp();
