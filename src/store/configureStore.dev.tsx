import createHistory from 'history/createBrowserHistory';
import { Iterable } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

// tslint:disable-next-line:no-any
declare var module: { hot: any };
// tslint:disable-next-line:no-any
declare var require: any;

export const history = createHistory();

const stateTransformer = state => {
    return Iterable.isIterable(state) ? state.toJS() : state;
};

const middlewares = [
    routerMiddleware(history),
    thunkMiddleware,
    createLogger({stateTransformer}),
];

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares)),
    );

    if (module.hot) {
        // Hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
