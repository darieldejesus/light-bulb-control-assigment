import React from 'react';

import PrefixRowMessage from '../../../../src/components/PrefixRowMessage';

describe('PrefixRowMessage', () => {
  test('Should render a table row with a given message', () => {
    const wrapper = shallow(<PrefixRowMessage colSpan={1} message="Hello World!" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
