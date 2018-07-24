import React from 'react';

import SunIcon from '../../../../src/components/SliderSelectControl/SunIcon';

describe('SunIcon', () => {
  test('Should render the component', () => {
    const wrapper = shallow(<SunIcon />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should render the component with a classname and fill color', () => {
    const props = {
      fillColor: '#fff',
      className: 'sunIcon',
    };
    const wrapper = shallow(<SunIcon {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
