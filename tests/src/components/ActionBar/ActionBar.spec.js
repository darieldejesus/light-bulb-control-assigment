import React from 'react';

import ActionBar from '../../../../src/components/ActionBar';

describe('ActionBar', () => {
  test('Should render the component', () => {
    const wrapper = shallow(<ActionBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
