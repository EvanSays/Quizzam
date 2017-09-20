import React from 'react';
import { shallow } from 'enzyme';
import { folder } from './fixtures';
import CodeForm from '../CodeForm';

describe('CodeForm', () => {
  const wrapper = shallow(<CodeForm folder={folder} />);

  it('should render when it mounts', () => {
    expect(wrapper.find('.code-form').length).toBe(1);
  });

  it('should have initial state', () => {
    const expected = { code: '', name: '' };

    expect(wrapper.state()).toEqual(expected);
  });

  it('should render correct amount of inputs', () => {
    expect(wrapper.find('input').length).toBe(2);
  });

  it('should be able to change name state on Change', () => {
    const nameInput = wrapper.find('#name');
    expect(wrapper.state('name')).toBe('');

    nameInput.simulate('change', { target: { value: 'Juan' } });

    expect(wrapper.state('name')).toBe('Juan');
  });

  it('should be able to change code state on Change', () => {
    const codeInput = wrapper.find('#code');
    expect(wrapper.state('code')).toBe('');

    codeInput.simulate('change', { target: { value: 'QWER' } });

    expect(wrapper.state('code')).toBe('QWER');
  });
});
