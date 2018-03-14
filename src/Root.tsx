import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

const Root = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route exact path="/" render={() => <span>Hello world</span>} />
        </ConnectedRouter>
    </Provider>
);

export default Root;
