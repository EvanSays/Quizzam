import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import store, { history } from './store';
import WelcomeViewContainer from './containers/WelcomeViewContainer';
import TakeQuizContainer from './containers/TakeQuizContainer';
import App from './components/App';
import './index.scss';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <section>
        <Route path="/room/:id" component={TakeQuizContainer} />
        <Route exact path="/" component={WelcomeViewContainer} />
        <Route exact path="/login" component={WelcomeViewContainer} />
        <Route exact path="/signup" component={WelcomeViewContainer} />
      </section>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
