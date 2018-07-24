import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import api from '../../../../src/helpers/ApiClient';
import clientMiddleware from '../../../../src/stateManager/middleware/client';
import ReduxBrightnessControl, { BrightnessControl } from '../../../../src/components/BrightnessControl';
import theme from '../../../../src/theme';

const middleware = [
  clientMiddleware(api),
  thunk,
];
const mockStore = configureMockStore(middleware);

describe('BrightnessControl', () => {
  const props = {
    active: true,
    updateDeviceBrightness: jest.fn(),
    id: 5,
    brightness: 10,
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrightnessControl {...props} />);
  });

  test('Should render the brightness control', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should call "updateDeviceBrightness" with the Id and Brightness', () => {
    const {
      active,
      updateDeviceBrightness,
      id,
      brightness,
    } = props;
    wrapper.props().onChange(brightness);
    expect(updateDeviceBrightness).toBeCalledWith(id, {
      brightness,
      active,
    });
  });

  test('Should dispatch "updateBrightness" with the Id and Brightness', () => {
    const store = mockStore({
      devices: {
        isUpdatingName: false,
      },
    });
    const customProps = {
      active: true,
      id: 5,
      brightness: 10,
    };
    wrapper = mount(
      <Provider store={store}>
        <ReduxBrightnessControl {...customProps} theme={theme} />
      </Provider>,
    );
    const {
      active,
      id,
      brightness,
    } = customProps;
    const expectedAction = [
      {
        type: 'resinio/devices/UPDATE',
      },
    ];
    wrapper.find('BrightnessControl').props().updateDeviceBrightness(id, {
      active,
      brightness,
    });
    expect(store.getActions()).toEqual(expectedAction);
    // expect(updateDeviceBrightness).toBeCalledWith(id, {
    //   brightness,
    //   active,
    // });
  });
});
