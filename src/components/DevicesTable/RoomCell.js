import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Box,
  Txt,
  Button,
  Flex,
  Input,
} from 'rendition';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDiscard from 'react-icons/lib/fa/mail-reply';
import FaCheck from 'react-icons/lib/fa/floppy-o';
import FaUpdating from 'react-icons/lib/fa/spinner';
import styled from 'styled-components';

import { updateName } from '../../stateManager/ducks/devices';

const CellContainer = styled(Box)`
  position: relative;
`;

const ActionButton = styled(Button)`
  display: ${({ show }) => show ? 'inline-block' : 'none'}
`;

const EditButton = ActionButton.extend`
  position: absolute;
  left: -1.8em;
  top: 0.1em;
  
  &:hover, :active {
    color: unset;
  }
`;

const mapStateToProps = ({ devices }) => ({
  currentDevice: devices.currentDevice,
  isUpdating: devices.isUpdatingName,

});

const mapDispatchToProps = dispatch => ({
  updateDeviceName: (id, device) => dispatch(updateName(id, device)),
});

export class RoomCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  /**
   * Prevent component to be re-rendered if isUpdating is active
   * but the component is not being edited.
   *
   * @param {Object} nextProps - Next component props.
   * @param {boolean} nextProps.isUpdating - Tells if a component is being updated.
   * @param {Object} nextState - Next component state.
   * @param {boolean} nextState.show - Tells if a component is selected.
   * @returns {boolean} False or True depending on the condition.
   */
  shouldComponentUpdate({ isUpdating }, { show }) {
    const { isUpdating: currentUpdating } = this.props;
    return !(isUpdating !== currentUpdating && !show);
  }

  static getDerivedStateFromProps({ value, currentDevice }, { name, edit }) {
    const { id, name: deviceName } = currentDevice;
    const show = value === deviceName;
    return {
      id,
      show,
      name: edit && show ? name : value,
      edit: edit && !show ? false : edit,
    };
  }

  handleOnToggleView = () => {
    this.setState(({ edit }) => ({
      edit: !edit,
    }));
  };

  handleOnChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleOnEditClick = () => {
    const { updateDeviceName } = this.props;
    const { id, name } = this.state;
    updateDeviceName(id, {
      name,
    });
  };

  render() {
    const { show, edit, name } = this.state;
    const { isUpdating } = this.props;
    const tooltip = edit && show
      ? 'Cancel edition'
      : 'Edit Room name';
    const icon = edit && show
      ? <FaDiscard />
      : <FaPencil />;

    return (
      <CellContainer>
        <Flex>
          <EditButton
            tooltip={tooltip}
            danger={edit}
            m={2}
            fontSize={[3, 2]}
            show={show}
            plaintext
            primary
            onClick={this.handleOnToggleView}
            iconElement={icon}
          />
          {edit && show ? ([
            <Input
              key="EditInput"
              value={name}
              autoFocus
              fontSize={0}
              width="8em"
              px={1}
              placeholder="Room name"
              onChange={this.handleOnChangeName}
            />,
            !isUpdating && (
              <ActionButton
                key="SaveChanges"
                tooltip="Save changes"
                success
                m={2}
                fontSize={[3, 2]}
                show={show}
                plaintext
                primary
                onClick={this.handleOnEditClick}
                iconElement={<FaCheck />}
              />
            ),
            isUpdating && (
              <ActionButton
                key="SaveChanges"
                success
                m={2}
                fontSize={[3, 4]}
                show={show}
                plaintext
                primary
                onClick={this.handleOnEditClick}
                iconElement={<FaUpdating />}
              />
            ),
          ]) : (
            <Txt.p>
              {name}
            </Txt.p>
          )}
        </Flex>
      </CellContainer>
    );
  }
}

RoomCell.propTypes = {
  value: PropTypes.string.isRequired, // eslint-disable-line
  currentDevice: PropTypes.shape({ // eslint-disable-line
    name: PropTypes.string.isRequired,
  }),
  isUpdating: PropTypes.bool.isRequired,
  updateDeviceName: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomCell);
