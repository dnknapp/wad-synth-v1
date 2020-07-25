import React, { Fragment, useContext, useRef } from 'react';
import throttle from 'lodash.throttle';
import getScaledValue, { d3ScaledValue } from '../../utils/getScaledValue';
import getInvertedValue, {
  d3InvertedValue,
} from '../../utils/getInvertedValue';

const SliderNew = ({
  label,
  moduleId,
  paramId,
  min,
  max,
  step,
  sliderValue,
  scaledValue,
  disabled,
  multiplier,
  decimal,
  unit,
  paramName,
  paramSetter,
  power,
}) => {
  // Event Handlers
  // Slider
  const handleSliderThrottled = useRef(
    throttle(function handleSlider(
      value // where the slider is set
    ) {
      getScaledValue(paramName.min, paramName.max, value, power); // Function to make the slider non-linear
      paramSetter(moduleId, Number(value), d3ScaledValue); // ex. setVolumeEnvelopeAttack updates volumeEnvelopeAttack in the Context
    }, 50)
  ).current;
  // Number Input
  const handleNumberInput = (
    value // what the number is
  ) => {
    if (
      // If the number input is in the correct range, update the value
      value * (1 / multiplier) <= paramName.max &&
      value * (1 / multiplier) >= paramName.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        paramName.min,
        paramName.max,
        value * (1 / multiplier),
        power
      );
      paramSetter(moduleId, d3InvertedValue, value * (1 / multiplier)); // ex. setVolumeEnvelopeAttack updates v olumeEnvelopeAttack in the Context
    } else if (value === '') {
      // If the user deletes the numbers in the input, set an empty string
      paramSetter(moduleId, '', '');
    } else if (value * (1 / multiplier) > paramName.max) {
      // If the number input value is greater than the max, set it to the max
      paramSetter(moduleId, paramName.max, paramName.max);
    } else if (value * (1 / multiplier) < paramName.min) {
      // If the number input value is less than the min, set it to the min
      paramSetter(moduleId, paramName.min, paramName.min);
    }
  };
  const handleNumberOnBlur = (value, resetValue) => {
    if (value === '') {
      // If the user clicks out of the number input while it's empty, set the value to the default
      paramSetter(
        // TODO: add a default reset value to the Context
        moduleId,
        resetValue, // should probably be the same as the default value. ex. set the Sustain to 100 if the input is empty
        resetValue
      );
    }
  };

  return (
    <label
      // htmlFor={id}
      id={paramId}
      className={`labelLayout ${label}`}
    >
      <span className={`pb5`}>{label}</span>
      <div className={`rangeContainer`}>
        <input
          type="range"
          id={`${paramId}Range`}
          name={`${paramId}Range`}
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={({ target: { value } }) =>
            handleSliderThrottled(
              value // current value of the slider
            )
          }
          // disabled={disabled} // Most sliders need to be disabled while a note is playing
          aria-labelledby={paramId}
        />
        <div className={`rangeTickmarksContainer`}>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
        </div>
      </div>
      <input
        type="number"
        id={`${paramId}Number`}
        name={`${paramId}Number`}
        min={min * multiplier}
        max={max * multiplier}
        step={isNaN(step) ? step : step * multiplier} // if step is not "any", multiply the step by the multiplier
        value={
          sliderValue !== '' ? (scaledValue * multiplier).toFixed(decimal) : ''
        }
        onChange={({ target: { value } }) =>
          handleNumberInput(
            value // current value
          )
        }
        onBlur={({ target: { value } }) =>
          handleNumberOnBlur(
            value, // current value
            1 / multiplier // reset value (before the multiplier) if the input is empty
          )
        }
        // readOnly
        // disabled={disabled} // Most sliders need to be disabled while a note is playing
        aria-labelledby={paramId}
      />
      {unit}
    </label>
  );
};

export default SliderNew;
