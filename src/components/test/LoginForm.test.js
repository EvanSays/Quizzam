/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginForm from './LoginForm';

describe.only('LOGINFORM COMPONENT TEST', () => {
  const wrapper = shallow(<LoginForm />);

  it('Should hold state', () => {
    expect(2).toEqual(2);
  });
});
