import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Games } from './components/Games'

function renderApp(): void {
    ReactDOM.render(
        <AppContainer>
            <Games />
        </AppContainer>,
        document.getElementById('gamesApp')
    );
}

renderApp();
