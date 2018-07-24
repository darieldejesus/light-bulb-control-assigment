import React from 'react';

import App from '../../src/App';

describe('App', () => {
  test('Should render the main page', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
