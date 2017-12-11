// main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

function Text() {
    return (<div>helloworld!</div>);
}

render(Text)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept(() => { render(Text) })
}