import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const history = createHistory();
const middleware = [routerMiddleware(history), thunk];

/* eslint-disable no-underscore-dangle */
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

// const composeEnhancers = compose(applyMiddleware(...middleware), devTools);
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
