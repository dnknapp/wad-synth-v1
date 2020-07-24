import React from 'react';

const SliderLevel = ({
  label,
  id,
  min,
  max,
  step,
  sliderValue,
  scaledValue,
  onChange,
  handleNumberInput,
  handleOnBlur,
  disabled,
  multiplier,
  decimal,
  unit,
}) => {
  // console.log(min);
  // console.log(max);
  // console.log(step);

  return (
    <label
      // htmlFor={id}
      id={id}
      className={`labelLayout ${label}`}
    >
      <span className={`pb5`}>{label}</span>
      <div className={`rangeContainer`}>
        <input
          type="range"
          id={`${id}Range`}
          name={`${id}Range`}
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={onChange}
          // disabled={disabled} // Most sliders need to be disabled while a note is playing
          aria-labelledby={id}
        />
        <div className={`rangeTickmarksContainer`}>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
          <div className={`rangeTickmark`}></div>
        </div>
      </div>
      {/* {(scaledValue * multiplier).toFixed(decimal)} */}
      <input
        type="number"
        id={`${id}Number`}
        name={`${id}Number`}
        min={min * multiplier}
        max={max * multiplier}
        step={isNaN(step) ? step : step * multiplier} // if step is not "any", multiply the step by the multiplier
        value={
          // sliderValue !== 0 &&
          sliderValue !== '' ? (scaledValue * multiplier).toFixed(decimal) : ''
        }
        onChange={handleNumberInput}
        onBlur={handleOnBlur}
        // readOnly
        // disabled={disabled} // Most sliders need to be disabled while a note is playing
        aria-labelledby={id}
      />
      {unit}
    </label>
  );
};

export default SliderLevel;
