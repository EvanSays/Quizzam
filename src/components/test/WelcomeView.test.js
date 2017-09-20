import React from 'react';
import { mount, shallow } from 'enzyme';
import WelcomeView from '../WelcomeView';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';


describe('WELCOMEVIEW COMPONENT TEST', () => {
  const middlewares = [];
  const mockStore = configureMockStore(middlewares)();

  const wrapper = shallow(<WelcomeView quiz={{}} user={{}} />);
  const wrapperMount = mount(<Provider store={mockStore}><MemoryRouter><WelcomeView user={{}} quiz={{}} history={[]} /></MemoryRouter></Provider>);

  const initialState = {
    isHidden: false,
  };

  it('Should hold state', () => {
    expect(wrapper.state()).toEqual(initialState);
  });

  it('Should render headers and nav elements', () => {
    expect(wrapper.find('header').length).toEqual(1);
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(2);
  });

  it('Should change state for an onClick event on a nav-link', () => {
    const link = wrapper.find('.nav-link');
    link.simulate('click');

    expect(wrapper.state().isHidden).toEqual(true);
  });

  it('Should render LoginViewContainer', () => {
    const loginForm = wrapperMount.find(<LoginForm />);

    expect(loginForm).toBeTruthy();
  });
});
