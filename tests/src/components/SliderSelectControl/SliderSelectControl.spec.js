import React from 'react';

import SliderSelectControl from '../../../../src/components/SliderSelectControl';

describe('SliderSelectControl', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      strokeWidth: 10,
      circleStartAngle: 45,
      circleEndAngle: 315,
      padding: 20,
      radius: 100,
      enabled: true,
      value: 100,
      onChange: jest.fn(),
    };
    wrapper = shallow(<SliderSelectControl {...props} />);
  });

  test('Should render the component', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Should not call "onChange" when the "handleOnMoveThumb" is called with the same value', () => {
    const eventObject = {
      stopPropagation: () => {},
      preventDefault: () => {},
    };
    const { onChange, value } = props;
    wrapper.instance().handleOnMoveThumb(eventObject);
    expect(onChange).not.toBeCalledWith(value);
  });

  test('Should not call "onChange" when the "handleOnMoveThumb" is called but the control is not enable', () => {
    const eventObject = {
      stopPropagation: () => {},
      preventDefault: () => {},
    };
    const { onChange } = props;
    wrapper.setProps({
      enabled: false,
    });
    wrapper.instance().handleOnMoveThumb(eventObject);
    expect(onChange).not.toBeCalled();
  });
});
