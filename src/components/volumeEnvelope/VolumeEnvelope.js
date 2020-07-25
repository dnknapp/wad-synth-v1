import React, { Fragment, useContext, useRef } from 'react';
import VolumeEnvelopeContext from '../../context/volumeEnvelopeContext/volumeEnvelopeContext';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import throttle from 'lodash.throttle';
import Slider from '../uiElements/Slider';
import styles from './VolumeEnvelope.module.scss';
import useParameterRef from '../../hooks/usePararmeterRef';
import getScaledValue, { scaledValue } from '../../utils/getScaledValue';
import getInvertedValue, { invertedValue } from '../../utils/getInvertedValue';

const VolumeEnvelope = () => {
  const volumeEnvelopeContext = useContext(VolumeEnvelopeContext);
  const {
    volumeEnvelopeAttack,
    volumeEnvelopeDecay,
    volumeEnvelopeSustain,
    volumeEnvelopeHold,
    volumeEnvelopeRelease,
    setVolumeEnvelopeAttack,
    setVolumeEnvelopeDecay,
    setVolumeEnvelopeSustain,
    setVolumeEnvelopeHold,
    setVolumeEnvelopeRelease,
  } = volumeEnvelopeContext;

  const oscillatorContext = useContext(OscillatorContext);
  const { notePlaying } = oscillatorContext;

  const parameters = [
    {
      name: volumeEnvelopeAttack,
      setter: setVolumeEnvelopeAttack,
      multiplier: 1000,
      power: 2,
    },
    {
      name: volumeEnvelopeDecay,
      setter: setVolumeEnvelopeDecay,
      multiplier: 1000,
      power: 2,
    },
    {
      name: volumeEnvelopeSustain,
      setter: setVolumeEnvelopeSustain,
      multiplier: 100,
      power: 1,
    },
    {
      name: volumeEnvelopeRelease,
      setter: setVolumeEnvelopeRelease,
      multiplier: 1000,
      power: 2,
    },
  ];

  // Disable sliders while a note is playing
  // This functionality has been moved to Brain.js and disabled. Updates to the Oscillator/Wad only take effect if a note isn't playing
  // I'll keep this here for now, because I might like the visual indication that a slider doesn't function during playback
  // let disabled = notePlaying ? true : false;

  // useParameterRef stores slider values in useRef, so that slider event handlers can access the current state
  useParameterRef(volumeEnvelopeAttack); // attack state
  useParameterRef(volumeEnvelopeDecay); // decay state
  useParameterRef(volumeEnvelopeSustain); // sustain state
  useParameterRef(volumeEnvelopeRelease); // release state

  // Event Handlers
  // Slider
  const handleSliderThrottled = useRef(
    throttle(function handleSlider(
      parameterName, // ex. volumeEnvelopeAttack
      parameterSetter, // ex. setVolumeEnvelopeAttack
      value, // where the slider is set
      sliderPower // 1 = linear; use 2 or 3 for fine tuning lower ranges
    ) {
      // let releaseValue;
      getScaledValue(parameterName.min, parameterName.max, value, sliderPower); // Function to make the slider non-linear
      parameterSetter(Number(value), scaledValue); // ex. setVolumeEnvelopeAttack updates v olumeEnvelopeAttack in the Context
    }, 50)
  ).current;
  // Number Input
  const handleNumberInput = (
    parameterName, // ex. volumeEnvelopeAttack
    parameterSetter, // ex. setVolumeEnvelopeAttack
    value, // what the number is
    valueMultiplier, // ex. multiply value by .001 to get miliseconds
    sliderPower // should be the same as in handleSliderThrottled
  ) => {
    if (
      // If the number input is in the correct range, update the value
      value * valueMultiplier <= parameterName.max &&
      value * valueMultiplier >= parameterName.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        parameterName.min,
        parameterName.max,
        value * valueMultiplier,
        sliderPower
      );
      parameterSetter(invertedValue, value * valueMultiplier); // ex. setVolumeEnvelopeAttack updates v olumeEnvelopeAttack in the Context
    } else if (value === '') {
      // If the user deletes the numbers in the input, set an empty string
      parameterSetter('', '');
    } else if (value * valueMultiplier > parameterName.max) {
      // If the number input value is greater than the max, set it to the max
      parameterSetter(parameterName.max, parameterName.max);
    } else if (value * valueMultiplier < parameterName.min) {
      // If the number input value is less than the min, set it to the min
      parameterSetter(parameterName.min, parameterName.min);
    }
  };
  const handleNumberOnBlur = (parameterSetter, value, resetValue) => {
    if (value === '') {
      // If the user clicks out of the number input while it's empty, set the value to the default
      parameterSetter(
        resetValue, // should probably be the same as the default value. ex. set the Sustain to 100 if the input is empty
        resetValue
      );
    }
  };

  return (
    <section className={`synthModuleContainer`}>
      <h2 className={`synthModuleHeader`}>Amplifier</h2>
      <ul>
        <li>
          <div className={`synthModuleInner`}>
            <div className={`synthModuleSidebar`}>{/* Empty sidebar */}</div>
            <div className={`synthModuleControls`}>
              {parameters.map(({ name, setter, multiplier, power }, index) => (
                <Fragment key={index}>
                  {console.log(name, setter, multiplier, power)}
                  <Slider
                    label={name.label}
                    id={name.id}
                    min={name.min}
                    max={name.max}
                    step={name.step}
                    sliderValue={name.sliderValue}
                    scaledValue={name.scaledValue}
                    // disabled={disabled}
                    multiplier={multiplier}
                    decimal={0}
                    onChange={({ target: { value } }) =>
                      handleSliderThrottled(
                        name, // parameter name
                        setter, // parameter setter function
                        value, // current value of the slider
                        power // slider power
                      )
                    } // Destructuring e.target.value
                    handleNumberInput={({ target: { value } }) =>
                      handleNumberInput(
                        name, // parameter name
                        setter, // parameter setter function
                        value, // current value
                        1 / multiplier, // invert the value multiplier
                        power // slider power
                      )
                    }
                    handleOnBlur={({ target: { value } }) =>
                      handleNumberOnBlur(
                        setter, // parameter setter function
                        value, // current value
                        1 / multiplier // reset value (before the multiplier) if the input is empty
                      )
                    }
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default VolumeEnvelope;
