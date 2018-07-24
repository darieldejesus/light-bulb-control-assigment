import React from 'react';
import { Provider as RenditionProvider } from 'rendition';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';

import api from '../../../../src/helpers/ApiClient';
import clientMiddleware from '../../../../src/stateManager/middleware/client';
import RoomCell, { RoomCell as RoomCellClass } from '../../../../src/components/DevicesTable/RoomCell';
import theme from '../../../../src/theme';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

const middlewares = [
  clientMiddleware(api),
  thunk,
];
const mockStore = configureMockStore(middlewares);

describe('RoomCell', () => {
  let props;
  let wrapper;
  const store = mockStore({
    isUpdatingName: false,
  });

  beforeEach(() => {
    props = {
      value: 'This is a name',
    };
    wrapper = shallow(
      <ReduxProvider store={store}>
        <RenditionProvider theme={theme}>
          <RoomCell {...props} />
        </RenditionProvider>
      </ReduxProvider>,
    );
  });

  test('Should render the component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
