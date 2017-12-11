// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import create from '../mods/data/store';
import App from '../mods/ui/testapp';
const render = Component => {
    ReactDOM.render(
        <Provider store={create()}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root'),
    )
}

console.log(App);

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../mods/ui/testapp',() => { render(App) })
}