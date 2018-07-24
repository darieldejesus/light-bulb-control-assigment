import React from 'react';
import { Provider as RenditionProvider } from 'rendition';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';

import api from '../../../../src/helpers/ApiClient';
import clientMiddleware from '../../../../src/stateManager/middleware/client';
import devices from '../../../fixtures/devices';
import { DevicesTable } from '../../../../src/components/DevicesTable';
import theme from '../../../../src/theme';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

const middlewares = [
  clientMiddleware(api),
  thunk,
];
const mockStore = configureMockStore(middlewares);

describe('DevicesTable', () => {
  let props;

  beforeEach(() => {
    props = {
      loadDevices: () => {},
      toggleLightBulb: () => {},
      selectDevice: () => {},
      updateDeviceName: () => {},
      devices,
    };
  });

  test('Should render a table with the devices', () => {
    const wrapper = shallow(<DevicesTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should render a table even if devices but with a message', () => {
    props = {
      ...props,
      devices: [],
    };
    const wrapper = shallow(<DevicesTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should render a loading message if "isLoading" is active', () => {
    props = {
      ...props,
      devices: [],
      isLoading: true,
    };
    const wrapper = shallow(<DevicesTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should render an error message if "error" is defined', () => {
    props = {
      ...props,
      devices: [],
      error: true,
    };
    const wrapper = shallow(<DevicesTable {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should call loadDevices to fetch devices', () => {
    const loadDevices = jest.fn();
    props = {
      ...props,
      loadDevices,
      devices: [],
    };
    shallow(<DevicesTable {...props} />);
    expect(loadDevices).toBeCalled();
  });

  test('Should show formatted brightness as percentage numbers', () => {
    const brightness = 70;
    const formattedBrightness = `${brightness}%`;
    const currentDevice = {
      id: 2,
      name: 'Bedroom 01',
      active: false,
      brightness,
    };
    props = {
      ...props,
      devices: [currentDevice],
    };
    const store = mockStore({
      devices: {
        currentDevice,
        isUpdatingName: false,
      },
    });
    const wrapper = mount(
      <ReduxProvider store={store}>
        <RenditionProvider theme={theme}>
          <DevicesTable {...props} />
        </RenditionProvider>
      </ReduxProvider>,
    );
    expect(wrapper.find('a').at(2).text()).toEqual(formattedBrightness);
  });

  test('Should call toggleLightBulb with the device id and status', () => {
    const toggleLightBulb = jest.fn();
    const id = 2;
    const active = false;
    const brightness = 70;
    const device = {
      id,
      name: 'Bedroom 01',
      active,
      brightness,
    };
    props = {
      ...props,
      toggleLightBulb,
      devices: [device],
    };
    const wrapper = shallow(<DevicesTable {...props} />);
    wrapper.instance().handleOnToggleStatus(device)();
    expect(toggleLightBulb).toBeCalledWith(id, {
      active,
      brightness,
    });
  });

  test('Should call "selectDevice" with the selected device', () => {
    const selectDevice = jest.fn();
    const id = 2;
    const active = false;
    const device = {
      id,
      name: 'Bedroom 01',
      active,
      brightness: 70,
    };
    props = {
      ...props,
      selectDevice,
      devices: [device],
    };
    const wrapper = shallow(<DevicesTable {...props} />);
    wrapper.instance().handleOnSelectDevice(device);
    expect(selectDevice).toBeCalledWith(device);
  });
});
