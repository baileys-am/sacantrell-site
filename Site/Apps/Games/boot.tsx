import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

function renderApp(): void {
    ReactDOM.render(
        <AppContainer>
            <h1>Coming soon...</h1>
        </AppContainer>,
        document.getElementById('gamesApp')
    );
}

renderApp();
