import reducer, {
  load,
  updateBrightness,
  toggleStatus,
  select,
  updateName,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  SELECT,
  UPDATE,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_NAME,
  UPDATE_NAME_SUCCESS,
  UPDATE_NAME_FAIL,
  DISMISS
} from '../../../../src/stateManager/ducks/devices';
import api from '../../../../src/helpers/ApiClient';

const domain = 'http://www.api.test';
process.env = {
  REACT_APP_API_URL: domain,
};

describe('Devices - Redux Actions', () => {
  let state;

  beforeEach(() => {
    fetch.resetMocks();
    state = {
      currentDevice: {},
      devices: [],
      isLoading: false,
      isUpdating: false,
      error: false,
    };
  });

  test('LOAD: should return a object with the expected properties.', () => {
    const expectedActions = {
      types: [
        LOAD,
        LOAD_SUCCESS,
        LOAD_FAIL,
      ],
      promise: () => {},
    };
    const data = {
      name: 'Test',
    };
    fetch.mockResponseOnce(JSON.stringify({ data }));
    const requestPath = '/device';
    const loadAction = load();
    loadAction.promise(api).then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${domain}${requestPath}`);
    expect(JSON.stringify(loadAction)).toEqual(JSON.stringify(expectedActions));
  });

  test('load: should return the action types and promise', () => {
    const expectedAction = {
      types: [
        LOAD,
        LOAD_SUCCESS,
        LOAD_FAIL,
      ],
      promise: () => {},
    };
    const loadAction = load();
    expect(JSON.stringify(loadAction)).toEqual(JSON.stringify(expectedAction));
  });

  test('updateBrightness: should return the actions and the promise to update a device', () => {
    const expectedAction = {
      types: [
        UPDATE,
        UPDATE_SUCCESS,
        UPDATE_FAIL,
      ],
      promise: () => {},
    };
    const loadAction = updateBrightness(10, {
      brightness: 10,
      active: false,
    });
    expect(JSON.stringify(loadAction)).toEqual(JSON.stringify(expectedAction));
  });

  test('select: should return the actions and the promise to update a device', () => {
    const device = {
      brightness: 10,
      active: false,
    };
    const expectedAction = {
      type: SELECT,
      payload: device,
    };
    const loadAction = select(device);
    expect(JSON.stringify(loadAction)).toEqual(JSON.stringify(expectedAction));
  });

  test('toggleStatus: should return the actions and the promise to update a device with brightness', () => {
    const expectedAction = {
      types: [
        UPDATE,
        UPDATE_SUCCESS,
        UPDATE_FAIL,
      ],
      promise: () => {},
    };
    const id = 10;
    const data = {
      id,
      name: 'Test',
    };
    fetch.mockResponseOnce(JSON.stringify({ data }));
    const loadAction = toggleStatus(id, {
      brightness: 10,
      active: false,
    });
    const requestPath = `/device/${id}`;
    loadAction.promise(api).then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${domain}${requestPath}`);
    expect(JSON.stringify(loadAction)).toEqual(JSON.stringify(expectedAction));
  });

  test('LOAD: should result isLoading: true and error should not be defined.', () => {
    const newState = reducer(state, {
      type: LOAD,
    });
    const { isLoading, error } = newState;
    expect(isLoading).toBe(true);
    expect(error).toBeFalsy();
  });

  test('LOAD SUCCESS: should set the list of devices and current device.', () => {
    const device = {
      id: 5,
      name: 'Test',
      brightness: 10,
    };
    const data = [device];
    const stateV1 = reducer(state, {
      type: LOAD,
    });
    const stateV2 = reducer(stateV1, {
      type: LOAD_SUCCESS,
      result: { data },
    });
    const {
      isLoading, devices, currentDevice, error,
    } = stateV2;
    expect(isLoading).toBe(false);
    expect(devices).toBe(data);
    expect(currentDevice).toBe(device);
    expect(error).toBeFalsy();
  });

  test('LOAD FAIL: should set the error.', () => {
    const stateV1 = reducer(state, {
      type: LOAD,
    });
    const stateV2 = reducer(stateV1, {
      type: LOAD_FAIL,
    });
    const { isLoading, error } = stateV2;
    expect(isLoading).toBe(false);
    expect(error).toEqual('Unable to load the devices from the server.');
  });

  test('SELECT: should set the given selected device.', () => {
    const device = {
      id: 15,
      name: 'Test 15',
      brightness: 45,
    };
    const newState = reducer(state, {
      type: SELECT,
      payload: device,
    });
    const { currentDevice } = newState;
    expect(device).toEqual(currentDevice);
  });

  test('UPDATE: should set isUpdating as true when "update" is called.', () => {
    const newState = reducer(state, {
      type: UPDATE,
    });
    const { isUpdating } = newState;
    expect(isUpdating).toBe(true);
  });

  test('UPDATE_SUCCESS: should update the current device.', () => {
    const device = {
      id: 5,
      name: 'Test',
      brightness: 10,
    };
    const updatedDevice = {
      id: 5,
      name: 'Test 5',
      brightness: 55,
    };
    const data = [device];
    const newData = [updatedDevice];
    const stateV1 = { ...state, data };

    const stateV2 = reducer(stateV1, {
      type: UPDATE,
    });

    const stateV3 = reducer(stateV2, {
      type: UPDATE_SUCCESS,
      result: { data: updatedDevice },
    });

    const { isUpdating, currentDevice, devices } = stateV3;
    expect(isUpdating).toBe(false);
    expect(currentDevice).toEqual(updatedDevice);
    expect(devices).toEqual(newData);
    expect(currentDevice).not.toEqual(device);
    expect(devices).not.toEqual(data);
  });

  test('UPDATE_SUCCESS: "updateDevice" should update the list of devices.', () => {
    state = {
      ...state,
      currentDevice: {},
      devices: [
        {
          id: 5,
          name: 'Test 5',
          brightness: 55,
        },
        {
          id: 10,
          name: 'Test 10',
          brightness: 100,
        },
      ],
      isLoading: false,
      isUpdating: false,
      error: false,
    };
    const updatedDevice = {
      id: 5,
      name: 'Test 55',
      brightness: 0,
    };
    const stateV2 = reducer(state, {
      type: UPDATE_SUCCESS,
      result: { data: updatedDevice },
    });
    const { devices } = stateV2;
    expect(devices[0]).toEqual(updatedDevice);
  });

  test('UPDATE_FAIL: should set error if update fail.', () => {
    const stateV1 = reducer(state, {
      type: UPDATE,
    });
    const stateV2 = reducer(stateV1, {
      type: UPDATE_FAIL,
    });
    const { isUpdating, error } = stateV2;
    expect(isUpdating).toBe(false);
    expect(error).toEqual('Unable to update the selected light bulb.');
  });

  test('UPDATE_NAME: should return a object with the expected properties.', () => {
    const expectedActions = {
      types: [
        UPDATE_NAME,
        UPDATE_NAME_SUCCESS,
        UPDATE_NAME_FAIL,
      ],
      promise: () => {},
    };
    const id = 10;
    const data = {
      name: 'Test',
    };
    fetch.mockResponseOnce(JSON.stringify({ data }));
    const requestPath = `/device/${id}`;
    const loadAction = updateName(id, data);
    loadAction.promise(api).then((response) => {
      expect(response.data).toEqual(data);
    });
    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(`${domain}${requestPath}`);
    expect(JSON.stringify(loadAction)).toEqual(JSON.stringify(expectedActions));
  });

  test('DISMISS: should dismiss the error message.', () => {
    state = {
      ...state,
      error: 'This is an error message',
    };
    const stateV1 = reducer(state, {
      type: DISMISS,
    });
    const { error } = stateV1;
    expect(error).toBeFalsy();
  });

  test('UPDATE_NAME: should say the name is being updated.', () => {
    state = {
      ...state,
      error: 'This is an error message',
    };
    const stateV1 = reducer(state, {
      type: UPDATE_NAME,
    });
    const { isUpdatingName } = stateV1;
    expect(isUpdatingName).toBe(true);
  });

  test('UPDATE_NAME_SUCCESS: should update the current device.', () => {
    const device = {
      id: 5,
      name: 'Test',
      brightness: 10,
    };
    const updatedDevice = {
      id: 5,
      name: 'Test 5',
      brightness: 10,
    };
    const data = [device];
    const newData = [updatedDevice];
    const stateV1 = { ...state, data };

    const stateV2 = reducer(stateV1, {
      type: UPDATE_NAME,
    });

    const stateV3 = reducer(stateV2, {
      type: UPDATE_NAME_SUCCESS,
      result: { data: updatedDevice },
    });

    const { isUpdatingName, currentDevice, devices } = stateV3;
    expect(isUpdatingName).toBe(false);
    expect(currentDevice).toEqual(updatedDevice);
    expect(devices).toEqual(newData);
    expect(currentDevice).not.toEqual(device);
    expect(devices).not.toEqual(data);
  });

  test('UPDATE_NAME_FAIL: should set error if update fail.', () => {
    const stateV1 = reducer(state, {
      type: UPDATE_NAME,
    });
    const stateV2 = reducer(stateV1, {
      type: UPDATE_NAME_FAIL,
    });
    const { isUpdatingName, error } = stateV2;
    expect(isUpdatingName).toBe(false);
    expect(error).toEqual('Unable to update the name of the selected light bulb.');
  });
});
