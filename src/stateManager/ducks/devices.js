import findIndex from 'lodash/findIndex';

// Actions
export const LOAD = 'resinio/devices/LOAD';
export const LOAD_SUCCESS = 'resinio/devices/LOAD_SUCCESS';
export const LOAD_FAIL = 'resinio/devices/LOAD_FAIL';
export const SELECT = 'resinio/devices/SELECT';
export const UPDATE = 'resinio/devices/UPDATE';
export const UPDATE_SUCCESS = 'resinio/devices/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'resinio/devices/UPDATE_FAIL';
export const UPDATE_NAME = 'resinio/devices/UPDATE_NAME';
export const UPDATE_NAME_SUCCESS = 'resinio/devices/UPDATE_NAME_SUCCESS';
export const UPDATE_NAME_FAIL = 'resinio/devices/UPDATE_NAME_FAIL';
export const DISMISS = 'resinio/devices/DISMISS';

// Initial State
const initialState = {
  currentDevice: {},
  devices: [],
  isLoading: false,
  isUpdating: false,
  error: false,
  isUpdatingName: false,
};

/**
 * Update a device based on the response from the API.
 *
 * @param {Array} devices - List of devices in the state.
 * @param {number} deviceIndex - Index number where the old device is located.
 * @param {Object} newDevice - Updated device returned from the API.
 * @returns {Array} List of updated devices.
 * */
function updateDevice(devices, deviceIndex, newDevice) {
  return [
    ...devices.slice(0, deviceIndex),
    newDevice,
    ...devices.slice(deviceIndex + 1),
  ];
}

/**
 * Default Redux Reducer function.
 *
 * @param {Object} state - Current or default Redux state.
 * @param {Object} action - Object with the action type and data props.
 * @returns {Object} A new state based on given action.
 * */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_SUCCESS: {
      const devices = action.result.data || [];
      return {
        ...state,
        devices,
        currentDevice: devices[0] || {},
        isLoading: false,
      };
    }
    case LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: 'Unable to load the devices from the server.',
      };
    case SELECT:
      return {
        ...state,
        currentDevice: action.payload,
      };
    case UPDATE:
      return {
        ...state,
        isUpdating: true,
      };
    case UPDATE_SUCCESS: {
      const updatedDevice = action.result.data;
      const deviceIndex = findIndex(state.devices, ['id', updatedDevice.id]);
      const devices = updateDevice(state.devices, deviceIndex, updatedDevice);
      return {
        ...state,
        isUpdating: false,
        devices,
        currentDevice: updatedDevice,
      };
    }
    case UPDATE_FAIL:
      return {
        ...state,
        isUpdating: false,
        error: 'Unable to update the selected light bulb.',
      };
    case UPDATE_NAME:
      return {
        ...state,
        isUpdatingName: true,
      };
    case UPDATE_NAME_SUCCESS: {
      const updatedDevice = action.result.data;
      const deviceIndex = findIndex(state.devices, ['id', updatedDevice.id]);
      const devices = updateDevice(state.devices, deviceIndex, updatedDevice);
      return {
        ...state,
        isUpdatingName: false,
        devices,
        currentDevice: updatedDevice,
      };
    }
    case UPDATE_NAME_FAIL:
      return {
        ...state,
        isUpdatingName: false,
        error: 'Unable to update the name of the selected light bulb.',
      };
    case DISMISS:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
}

/**
 * Action to get all the devices from the server/API.
 *
 * @returns {Object} Object with the required props to handle this action.
 * */
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: api => api.get('device'),
  };
}

/**
 * Action to set the current device when the user selects a row.
 *
 * @param {Object} device - Device object.
 * @returns {Object} Object with the required props to handle this action.
 * */
export function select(device) {
  return {
    type: SELECT,
    payload: device,
  };
}

/**
 * Action to toggle the light bulb status of the current device.
 *
 * @param {number} id - Device ID.
 * @param {Object} device - Properties to be updated.
 * @returns {Object} Object with the required props to handle this action.
 * */
export function toggleStatus(id, device) {
  const { active, brightness } = device;
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: api => api.patch(`device/${id}`, {
      data: {
        ...device,
        active: !active,
        brightness: active ? 0 : brightness,
      },
    }),
  };
}

/**
 * Action to update the brightness of the current device.
 *
 * @param {number} id - Device ID.
 * @param {Object} device - Properties to be updated.
 * @returns {Object} Object with the required props to handle this action.
 * */
export function updateBrightness(id, device) {
  const { brightness, active } = device;
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: api => api.patch(`device/${id}`, {
      data: {
        ...device,
        active: brightness === 0 ? false : active,
      },
    }),
  };
}

/**
 * Action to update the brightness of the current device.
 *
 * @param {number} id - Device ID.
 * @param {Object} device - Properties to be updated.
 * @returns {Object} Object with the required props to handle this action.
 * */
export function updateName(id, device) {
  return {
    types: [UPDATE_NAME, UPDATE_NAME_SUCCESS, UPDATE_NAME_FAIL],
    promise: api => api.patch(`device/${id}`, {
      data: device,
    }),
  };
}

/**
 * Action to dismiss the current error.
 *
 * @returns {Object} Object with the required props to handle this action.
 * */
export function dismissError() {
  return {
    type: DISMISS,
  };
}
