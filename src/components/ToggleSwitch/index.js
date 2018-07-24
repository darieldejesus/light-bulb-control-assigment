import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  border: 1px solid ${({ active }) => active ? '#59A42B' : '#000'};
  width: 38px;
  height: 24px;
  border-radius: 13px;
  cursor: pointer;
  display: inline-block;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ active }) => active ? '#59A42B' : 'unset'};
`;

const SwitchToggle = styled.div`
  border: 1px solid ${({ active }) => active ? '#59A42B' : '#000'};
  width: 22px;
  height: 22px;
  left: ${({ active }) => active ? '14px' : '0'};
  border-radius: 50%;
  background: white;
  position: relative;
  transition: left .2s ease-in-out;
`;

/**
 * Toggle Switch.
 *
 * @param {Object} obj - Main parameter.
 * @param {boolean} obj.active - Status of the toggle button.
 * @param {Function} obj.onClick - Function to handle the onClick event.
 * @returns {Object} ReactElement object.
 * */
function Switch({ active, onClick }) {
  const switchProps = {
    role: 'checkbox',
    tabIndex: 0,
    active,
    onKeyPress: e => onClick(e),
    onClick: e => onClick(e),
    'aria-checked': active,
  };
  return (
    <SwitchContainer {...switchProps}>
      <SwitchToggle active={active} />
    </SwitchContainer>
  );
}

Switch.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Switch;
