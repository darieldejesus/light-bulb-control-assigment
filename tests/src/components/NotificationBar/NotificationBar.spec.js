import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as RenditionProvider } from 'rendition';

import api from '../../../../src/helpers/ApiClient';
import clientMiddleware from '../../../../src/stateManager/middleware/client';
import NotificationBar from '../../../../src/components/NotificationBar';
import theme from '../../../../src/theme';

const middleware = [
  clientMiddleware(api),
  thunk,
];
const mockStore = configureMockStore(middleware);

describe('NotificationBar', () => {
  test('Should render the NotificationBar without error message', () => {
    const store = mockStore({
      devices: {
        error: false,
      },
    });
    const wrapper = shallow(
      <ReduxProvider store={store}>
        <NotificationBar />
      </ReduxProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should render the NotificationBar with error message', () => {
    const store = mockStore({
      devices: {
        error: 'Ups! Something went wrong',
      },
    });
    const wrapper = shallow(
      <ReduxProvider store={store}>
        <NotificationBar />
      </ReduxProvider>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should call DISMISS message after clicking the close (x) button', () => {
    const store = mockStore({
      devices: {
        error: 'Ups! Something went wrong',
      },
    });
    const wrapper = mount(
      <ReduxProvider store={store}>
        <RenditionProvider theme={theme}>
          <NotificationBar />
        </RenditionProvider>
      </ReduxProvider>,
    );
    const expectedActions = [
      {
        type: 'resinio/devices/DISMISS',
      },
    ];
    wrapper.find('NotificationBar').props().onDismiss();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
