import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import configureStore from './store/configureStore';

// tslint:disable-next-line:no-any
declare var module: { hot: any };

const store = configureStore.default();
const history = configureStore.history;

render(
    <AppContainer>
        <Root store={ store } history={ history }/>
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept('./Root', () => {
        const RootContainer = require('./Root').default;

        render(
            <AppContainer>
                <Root store={ store } history={ history }/>
            </AppContainer>,
            document.getElementById('root'),
        );
    });
}
