import React from 'react';

import Stats from '../../../../src/components/SliderSelectControl/Stats';

describe('Stats', () => {
  test('Should render the component', () => {
    const wrapper = shallow(<Stats value={45} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
