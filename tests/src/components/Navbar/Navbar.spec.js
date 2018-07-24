import React from 'react';

import Navbar from '../../../../src/components/Navbar';

jest.mock('moment', () => () => ({
  format: () => 'This is supposed to be a time',
}));

describe('Navbar', () => {
  test('Should render the nav bar', () => {
    const wrapper = shallow(<Navbar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should call "setState" with the new date', () => {
    const wrapper = shallow(<Navbar />);
    wrapper.instance().setState = jest.fn();
    wrapper.instance().updateDateTime();
    expect(wrapper.instance().setState).toBeCalled();
  });
});
