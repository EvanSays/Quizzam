import React from 'react';
import { shallow } from 'enzyme';
import { folder } from './fixtures';
import Folder from '../Folder';

describe('Folder', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Folder folder={folder} getSelectedFolder={mockFn} />);
  it('should render when it mounts', () => {
    expect(wrapper.find('.folder').length).toBe(1);
  });

  it('should render the correct name', () => {
    const name = wrapper.find('h2').props().children[0];

    expect(name).toBe('Pop Quiz');
  });

  it('should render the correct quiz length', () => {
    const length = wrapper.find('h2').props().children[2];

    expect(length).toBe(2);
  });

  it('should trigger function on click', () => {
    const button = wrapper.find('button');

    button.simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
