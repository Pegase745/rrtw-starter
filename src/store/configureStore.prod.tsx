import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';

import rootReducer from '../reducers';

export const history = createHistory();

const middleware = routerMiddleware(history);

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(middleware),
    );
}
