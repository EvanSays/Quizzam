import React from 'react';
import { mount, shallow } from 'enzyme';
import TakeQuiz from '../TakeQuiz';
import { Link, Route, Redirect } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

describe.skip('TAKE QUIZ COMPONENT TEST', () => {
  const middlewares = [];
  const mockStore = configureMockStore(middlewares)();

  it('should mount', () => {
    mount(<Provider store={mockStore}><MemoryRouter><TakeQuiz user={{}} quiz={{}} history={[]} /></MemoryRouter></Provider>);
  });
});
