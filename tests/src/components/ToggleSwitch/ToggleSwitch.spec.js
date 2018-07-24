import React from 'react';
import 'jest-styled-components';

import ToggleSwitch from '../../../../src/components/ToggleSwitch';

describe('ToggleSwitch', () => {
  test('Should render ToggleSwitch as inactive', () => {
    const status = false;
    const wrapper = shallow(<ToggleSwitch active={status} onClick={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('background', 'unset');
    expect(wrapper.find({ active: status }).at(1)).toHaveStyleRule('left', '0');
  });

  test('Should render ToggleSwitch as active and green', () => {
    const status = true;
    const wrapper = shallow(<ToggleSwitch active={status} onClick={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('background', '#59A42B');
    expect(wrapper.find({ active: true }).at(1)).toHaveStyleRule('left', '14px');
  });

  test('Should trigger onClick event after clicking it', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<ToggleSwitch active={false} onClick={onClick} />);
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });

  test('Should trigger onKeyPress event', () => {
    const onKeyPress = jest.fn();
    const wrapper = shallow(<ToggleSwitch active={false} onClick={onKeyPress} />);
    wrapper.simulate('keypress', { key: 'Enter' });
  });
});
