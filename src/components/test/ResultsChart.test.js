import React from 'react';
import { shallow, mount } from 'enzyme';
import { users, selectedQuestion } from './fixtures';
import ResultsChart from '../ResultsChart';

describe('ResultsChart', () => {
  Object.values = obj => Object.keys(obj).map(key => obj[key]);
  const wrapper = shallow(<ResultsChart users={users} selectedQuestion={selectedQuestion} />);

  it('should render when it mounts', () => {
    expect(wrapper.find('.results-chart').length).toBe(1);
  });

  it('should render the correct question title', () => {
    const title = wrapper.find('h2').props().children;

    expect(title).toBe('What does a bird eat?');
  });

  it('should render 1 Bar component', () => {
    const component = wrapper.find('Bar');

    expect(component.length).toBe(1);
  });

  it('should pass the correct properties to Bar', () => {
    const component = mount(<ResultsChart users={users} selectedQuestion={selectedQuestion} />);
    const width = component.find('.bar-result').props().children;
    const name = component.find('.bar-name').props().children;

    expect(width).toBe('100%');
    expect(name).toBe('Rocks');
  });
});
