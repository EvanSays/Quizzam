
import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';


describe('LOGINFORM COMPONENT TEST', () => {
  const mockFn = jest.fn();

  const wrapper = shallow(<LoginForm location={{ pathname: '/somewhere/' }} isHidden={false} userFail={mockFn()} signUp={mockFn()} login={mockFn()} updateUserFail={mockFn()} />);

  const initialState = {
    firstName: '',
    lastName: '',
    email: 'joe@joe.com',
    password: 'password',
  };

  it('Should hold state', () => {
    expect(wrapper.state()).toEqual(initialState);
  });

  it('Should render inputs so a user can log in', () => {
    expect(wrapper.find('input').length).toEqual(4);
    expect(wrapper.find('Link').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
  });

  it.skip('Should change state for an onChange event on an input', () => {
    const email = wrapper.find('.login-input').at(0);
    const firstName = wrapper.find('#firstName');
    const lastName = wrapper.find('#lastName');
    const password = wrapper.find('#password');

    email.simulate('change', { target: { value: 'I love testing FE' } });
    firstName.simulate('change', { target: { value: 'I love testing FE' } });
    lastName.simulate('change', { target: { value: 'I love testing FE' } });
    password.simulate('change', { target: { value: 'I love testing FE' } });

    expect(wrapper.state().email).toEqual('I love testing FE');
    expect(wrapper.state().firstName).toEqual('I love testing FE');
    expect(wrapper.state().lastName).toEqual('I love testing FE');
    expect(wrapper.state().password).toEqual('I love testing FE');
  });

  it('On submit should call a function', () => {
    const submit = wrapper.find('.login-btn');

    submit.simulate('click');

    expect(mockFn).toHaveBeenCalled();
  });
});
