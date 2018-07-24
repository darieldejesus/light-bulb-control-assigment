import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SliderSelectControl from '../SliderSelectControl';
import { updateBrightness } from '../../stateManager/ducks/devices';

/**
 * Define the state properties required by the component.
 *
 * @param {Object} obj - Main paramater.
 * @param {Object} obj.devices - Object with the current Devices state from Redux.
 * @returns {undefined} Void return.
 */
const mapStateToProps = ({ devices }) => ({
  ...(devices.currentDevice || {}),
});

/**
 * Define the actions to be accessed by the component.
 *
 * @param {Function} dispatch - Redux dispatcher.
 * @returns {undefined} Void return.
 */
const mapDispatchToProps = dispatch => ({
  updateDeviceBrightness: (id, { active, brightness }) => (
    dispatch(updateBrightness(id, { active, brightness }))
  ),
});

/**
 * Stateless Component to handle the Brightness control.
 *
 * @param {Object} obj - Props of the stateless component.
 * @param {number} obj.id - Id of the selected device.
 * @param {number} obj.brightness - Percentage number of the current device brightness.
 * @param {Function} obj.updateDeviceBrightness - Function to update the brightness.
 * @returns {Object} ReactElement object.
 */
export function BrightnessControl({
  id, active, brightness, updateDeviceBrightness,
}) {
  return (
    <SliderSelectControl
      strokeWidth={13}
      circleStartAngle={45}
      circleEndAngle={315}
      padding={50}
      radius={120}
      enabled={id > 0}
      value={brightness}
      onChange={brightnessPercentage => (
        updateDeviceBrightness(id, { active, brightness: brightnessPercentage })
      )}
    />
  );
}

BrightnessControl.defaultProps = {
  id: 0,
  brightness: 0,
  active: false,
};

BrightnessControl.propTypes = {
  updateDeviceBrightness: PropTypes.func.isRequired,
  brightness: PropTypes.number,
  active: PropTypes.bool,
  id: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrightnessControl);
