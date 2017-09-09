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
        <Route path="/login" component={WelcomeView} />
        <Route path="/signup" component={WelcomeView} />
        <Route path="/about" component={WelcomeView} />
        <Route path="/" component={App} />
      </section>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
