import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import Stats from './Stats';

const Wrapper = styled.div`
  position: relative;
`;

const ContainerSvg = styled.svg`
  margin: 0 auto;
  display: block;
  filter: drop-shadow(0px 0px 3px #1b1b1f);
`;

const GrayPath = styled.path`
  stroke-linecap: round;
  stroke-width: ${({ width }) => width};
  stroke: #5F6062;
`;

const LightPath = styled.path`
  stroke-linecap: round;
  stroke-width: ${({ width }) => width};;
  stroke: url(#gradient);
`;

const Thumb = styled.circle`
  cursor: pointer;
  stroke: white;
  stroke-width: 5;
  fill: #FEC33A;
`;

export default class SliderSelectControl extends Component {
  constructor(props) {
    super(props);
    const {
      radius, padding, circleStartAngle, circleEndAngle,
    } = props;
    this.state = {
      height: 2 * (radius + padding),
      width: 2 * (radius + padding),
      centerRadius: radius + padding,
      circleLength: Math.abs(circleStartAngle - circleEndAngle),
    };
    this.callOnChange = debounce(this.callOnChange.bind(this), 150);
  }

  componentDidMount() {
    if (this.current) {
      this.offsets = this.current.getBoundingClientRect();
    }
    document.addEventListener('touchend', this.handleOnRemoveDragListeners);
    document.addEventListener('mouseup', this.handleOnRemoveDragListeners);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handleOnRemoveDragListeners);
    document.removeEventListener('mouseup', this.handleOnRemoveDragListeners);
  }

  /**
   * Method to sync the State with the Props. We need to get the prop "value"
   * and calculate the angle based on the circle length.
   *
   * @param {Object} nextProps - Next Props.
   * @param {Object} nextState - Next State.
   * @returns {Object} Object with the properties to be added in the state.
   */
  static getDerivedStateFromProps(
    { value: currentValue, circleStartAngle, circleEndAngle },
    { value, previowsValue },
  ) {
    return {
      value: !value || currentValue !== previowsValue
        ? ((currentValue / 100) * (circleEndAngle - circleStartAngle)) + circleStartAngle
        : value,
      percentageValue: value,
      previowsValue: currentValue,
    };
  }

  /**
   * Calculates the difference between two points.
   *
   * @param {Object} radialPoint - Calculated Radial Point.
   * @param {Object} cartesianPoint - Calculated Cartesian Point.
   * @returns {number} Difference between points.
   */
  getAngleDiff = (radialPoint, cartesianPoint) => {
    const y = radialPoint.x * (-cartesianPoint.y) - radialPoint.y * cartesianPoint.x;
    const x = radialPoint.x * cartesianPoint.x + radialPoint.y * (-cartesianPoint.y);
    return Math.atan2(y, x) * 180 / Math.PI;
  };

  /**
   * Finds and returns the current position of the cursor.
   *
   * @param {Object} e - Mouse/Touch event.
   * @returns {Object} Point X and Y.
   */
  getCursorPosition = (e) => {
    const event = e.changedTouches ? e.changedTouches[0] : e;
    return {
      x: event.pageX - (window.scrollX || window.pageXOffset),
      y: event.pageY - (window.scrollY || window.pageYOffset),
    };
  };

  /**
   * Given a polar point, calculates the Cartesian.
   *
   * @param {number} pointX - Point X.
   * @param {number} pointY - Point Y.
   * @param {number} degrees - Degree to be used on the calculation.
   * @returns {Object} Point X and Y.
   */
  getCartesian = (pointX, pointY, degrees) => {
    const { radius } = this.props;
    const { circleLength } = this.state;
    const radians = (degrees - circleLength) * Math.PI / 180.0;
    return {
      x: pointX + (radius * Math.cos(radians)),
      y: pointY + (radius * Math.sin(radians)),
    };
  };

  handleOnSelectThumb = () => {
    document.addEventListener('touchmove', this.handleOnMoveThumb);
    document.addEventListener('mousemove', this.handleOnMoveThumb);
  };

  handleOnRemoveDragListeners = () => {
    document.removeEventListener('touchmove', this.handleOnMoveThumb);
    document.removeEventListener('mousemove', this.handleOnMoveThumb);
  };

  /**
   * Calculate the radial position based on the cursor position.
   *
   * @param {number} pointerX - Position X of the cursor.
   * @param {number} pointerY - Position Y of the cursor.
   * @returns {Object} A pointer object with properties X and Y.
   */
  calculateRadialPosition = (pointerX, pointerY) => {
    const { centerRadius } = this.state;
    const offsets = this.offsets || {};
    const offsetLeft = offsets.left || 0;
    const offsetTop = offsets.top || 0;
    return {
      x: pointerX - offsetLeft - centerRadius,
      y: -1 * (pointerY - offsetTop - centerRadius),
    };
  };

  /**
   * Event handler to move the button throughout the circle and
   * send the percentage to the onChange callback.
   *
   * @param {Object} e - Click/Touch event.
   * @returns {undefined} Void returns.
   */
  handleOnMoveThumb = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const {
      enabled,
      circleEndAngle,
      circleStartAngle,
    } = this.props;

    if (!enabled) {
      return;
    }

    const {
      value,
    } = this.state;

    const {
      x: cursorX,
      y: cursorY,
    } = this.getCursorPosition(e);

    const radialPoint = this.calculateRadialPosition(cursorX, cursorY);
    const cartesianPoint = this.getCartesian(0, 0, value);
    const deltaTheta = this.getAngleDiff(radialPoint, cartesianPoint);
    const calculatedAngle = Math.round(value + deltaTheta);
    // Prevent the thumb (button) to track out of the circle.
    const newAngle = (calculatedAngle <= circleEndAngle && calculatedAngle >= circleStartAngle)
      ? calculatedAngle
      : value;
    this.setState({
      value: newAngle,
    }, () => {
      this.callOnChange();
    });
  };

  /**
   * Function to call the onChange function to update the brightness of the light bulb
   * through Redux/API.
   */
  callOnChange() {
    const {
      onChange,
      circleStartAngle,
    } = this.props;
    const {
      value,
      percentageValue,
      circleLength,
    } = this.state;
    const percentage = Math.round(((value - circleStartAngle) / circleLength) * 100);
    if (percentageValue !== percentage) {
      onChange(percentage);
    }
  }

  render() {
    const {
      value,
      circleLength,
      height,
      width,
      centerRadius,
    } = this.state;

    const {
      strokeWidth,
      circleEndAngle,
      circleStartAngle,
      padding,
      radius,
    } = this.props;

    const relCenterPos = {
      x: radius + padding,
      y: radius + padding,
    };

    const radialPosition = this.getCartesian(0, 0, value);

    const trackStart = this.getCartesian(centerRadius, centerRadius, circleEndAngle);
    const trackEnd = this.getCartesian(centerRadius, centerRadius, circleStartAngle);
    const lightStart = this.getCartesian(centerRadius, centerRadius, circleStartAngle);
    const lightEnd = this.getCartesian(centerRadius, centerRadius, value);
    const calculatedPercentage = Math.round(((value - circleStartAngle) / circleLength) * 100);

    return (
      <Wrapper>
        <ContainerSvg
          width={width}
          height={height}
          innerRef={(current) => { this.current = current; }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E5618" />
              <stop offset="100%" stopColor="#FEC33A" />
            </linearGradient>
          </defs>
          <GrayPath width={strokeWidth} fill="none" d={`M ${trackStart.x} ${trackStart.y} A ${radius} ${radius} 0 1 0 ${trackEnd.x} ${trackEnd.y}`} />
          <LightPath width={strokeWidth} fill="none" d={`M ${lightStart.x} ${lightStart.y} A ${radius} ${radius} 0 ${value > 225 ? 1 : 0} 1 ${lightEnd.x} ${lightEnd.y}`} />
          <Thumb
            draggable={false}
            onTouchStart={this.handleOnSelectThumb}
            onMouseDown={this.handleOnSelectThumb}
            cx={relCenterPos.x + radialPosition.x}
            cy={relCenterPos.y + radialPosition.y}
            r={strokeWidth}
          />
        </ContainerSvg>
        <Stats value={calculatedPercentage} />
      </Wrapper>
    );
  }
}

SliderSelectControl.propTypes = {
  strokeWidth: PropTypes.number.isRequired,
  circleStartAngle: PropTypes.number.isRequired,
  circleEndAngle: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
};
