import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SunIcon from './SunIcon';

const Container = styled.div`
font-size: 30px;
  color: white;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-align: center;
  top: 35%;
`;

const PercentageLabel = styled.span`
  position: relative;
  color: white;
  display: block;
  font-size: 1em;
  margin: 0.2em auto;
  text-align: center;

  span {
    bottom: 15%;
    font-size: 0.4em;
    margin-left: 0.1em;
    position: absolute;
  }
`;

const BrightnessLabel = styled.p`
  color: #adadad;
  margin: 0;
  font-size: 0.4em;
`;

const Sun = styled(SunIcon)`
  display: block;
  height: 0.5em;
  width: 0.5em;
  margin: 0 auto;
`;

/**
 * Stats Stateless Components.
 *
 * @param {Object} props - Component properties.
 * @returns {Object} ReactElement.
 */
export default function Stats({ value }) {
  return (
    <Container>
      <Sun fillColor="#FEC33A" />
      <PercentageLabel>
        {value}
        <span>
          %
        </span>
      </PercentageLabel>
      <BrightnessLabel>
        Brightness
      </BrightnessLabel>
    </Container>
  );
}

Stats.propTypes = {
  value: PropTypes.number.isRequired,
};
