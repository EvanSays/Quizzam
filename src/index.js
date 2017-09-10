import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import store, { history } from './store';
import WelcomeView from './components/WelcomeView';
import App from './components/App';
import './index.scss';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <section>
        <App />
      </section>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
