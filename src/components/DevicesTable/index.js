import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'rendition';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import RowCell from './RoomCell';

import Switch from '../ToggleSwitch';
import PrefixRowMessage from '../PrefixRowMessage';
import {
  load,
  select,
  toggleStatus,
} from '../../stateManager/ducks/devices';
import { colors } from '../../theme';

const mapStateToProps = ({ devices }) => ({
  ...devices,
});

const mapDispatchToProps = dispatch => ({
  loadDevices: () => dispatch(load()),
  selectDevice: device => dispatch(select(device)),
  toggleLightBulb: (id, { active, brightness }) => (
    dispatch(toggleStatus(id, { active, brightness }))
  ),
});

// Styles to highlight selected row.
const DevicesList = styled(Table)`
  a[data-key="${({ currentDeviceName }) => currentDeviceName}"] {
    background: ${colors.info.light};
  }
  a[data-key="${({ currentDeviceName }) => currentDeviceName}"]:first-child {
    box-shadow: inset 4px 0px ${colors.info.main};
  }
`;

export class DevicesTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        field: 'name',
        label: 'Room',
        sortable: true,
        render: (value, device) => (
          <RowCell
            value={value}
            currentDevice={device}
          />
        ),
      },
      {
        field: 'active',
        label: 'State',
        sortable: false,
        render: (value, device) => (
          <Switch onClick={this.handleOnToggleStatus(device)} active={value} />
        ),
      },
      {
        field: 'brightness',
        label: 'Brightness',
        sortable: false,
        render: value => `${value}%`,
      },
    ];
  }

  componentWillMount() {
    const { loadDevices } = this.props;
    loadDevices();
  }

  /**
   * Handles the click event of the Toggle Switch that turn off/on a light bulb.
   * It's defined as a debounce to prevent spam clicking.
   *
   * @param {Object} device - Device object.
   * @returns {Function} - A new debounce function with the desired behavior.
   */
  handleOnToggleStatus = device => debounce(() => {
    const { toggleLightBulb } = this.props;
    const { id, active, brightness } = device;
    toggleLightBulb(id, {
      active,
      brightness,
    });
  }, 150);

  /**
   * Handles the click event of the Devices Table when the user selects a row.
   *
   * @param {Object} device - Device object.
   * @returns {undefined} Void.
   */
  handleOnSelectDevice = (device) => {
    const { selectDevice } = this.props;
    selectDevice(device);
  };

  render() {
    const {
      isLoading,
      devices,
      currentDevice,
    } = this.props;
    const { name } = currentDevice;
    let prefixRow;
    if (isLoading) {
      prefixRow = (
        <PrefixRowMessage
          colSpan={this.columns.length}
          message="Loading devices..."
        />
      );
    }

    if (!prefixRow && !devices.length) {
      prefixRow = (
        <PrefixRowMessage
          colSpan={this.columns.length}
          message="No devices were found."
        />
      );
    }

    return (
      <DevicesList
        columns={this.columns}
        data={devices}
        rowKey="name"
        tbodyPrefix={prefixRow}
        onRowClick={this.handleOnSelectDevice}
        currentDeviceName={name}
        rowAnchorAttributes={{
          'data-device-name': name,
        }}
      />
    );
  }
}

DevicesTable.defaultProps = {
  isLoading: false,
  currentDevice: {
    name: '',
  },
};

DevicesTable.propTypes = {
  loadDevices: PropTypes.func.isRequired,
  toggleLightBulb: PropTypes.func.isRequired,
  selectDevice: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentDevice: PropTypes.shape({
    name: PropTypes.string,
  }),
  devices: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    brightness: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesTable);
