import React from 'react';
import { Alert } from 'rendition';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dismissError } from '../../stateManager/ducks/devices';

const mapStateToProps = ({ devices }) => ({
  error: devices.error,
});

const mapDispatchToProps = dispatch => ({
  onDismiss: () => dispatch(dismissError()),
});

/**
 * Component to show a box with the error message.
 *
 * @param {Object} props - Component props.
 * @param {string} props.error - Error message.
 * @param {Function} props.onDismiss - Callback to dismiss the error.
 * @returns {Object} As ReactElement.
 */
function NotificationBar({ error, onDismiss }) {
  return (
    error && (
      <Alert
        mb={2}
        py={0}
        danger
        onDismiss={onDismiss}
      >
        { error }
      </Alert>
    )
  );
}

NotificationBar.defaultProps = {
  error: false,
};

NotificationBar.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired,
  ]),
  onDismiss: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationBar);
