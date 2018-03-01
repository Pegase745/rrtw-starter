import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';

const rootReducer = combineReducers({
    routing: routerReducer,
});

export default rootReducer;
