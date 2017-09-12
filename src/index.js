import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import store, { history } from './store';
import WelcomeViewContainer from './containers/WelcomeViewContainer';
import AppContainer from './containers/AppContainer';
import './index.scss';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <section>
        <Route exact path="/" component={WelcomeViewContainer} />
        <Route path="/login" component={WelcomeViewContainer} />
        <Route path="/signup" component={WelcomeViewContainer} />
        <Route path="/dashboard" component={AppContainer} />
      </section>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
