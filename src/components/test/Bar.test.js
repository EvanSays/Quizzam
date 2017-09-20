import React from 'react';
import { shallow } from 'enzyme';
import Bar from '../Bar';

describe('Bar', () => {
  const wrapper = shallow(<Bar name={'Zelda'} width={'80%'} index={2} />);

  it('should render when it mounts', () => {
    expect(wrapper.find('.bar').length).toBe(1);
  });

  it('should render the correct label', () => {
    const label = wrapper.find('.bar-label').props().children;

    expect(label).toBe('A3');
  });

  it('should render the correct width in style', () => {
    const width = wrapper.find('.bar-color').props().style.width;

    expect(width).toBe('80%');
  });

  it('should render the correct name of answer', () => {
    const name = wrapper.find('.bar-name').props().children;

    expect(name).toBe('Zelda');
  });
});
