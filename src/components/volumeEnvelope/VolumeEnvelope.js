import React, { useContext, useEffect, useRef, useState } from 'react';
import VolumeEnvelopeContext from '../../context/volumeEnvelopeContext/volumeEnvelopeContext';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import { scalePow } from 'd3-scale';
import throttle from 'lodash.throttle';
import SliderTime from '../uiElements/SliderTime';
import SliderLevel from '../uiElements/SliderLevel';
import styles from './VolumeEnvelope.module.scss';
import useParameterRef from '../../hooks/usePararmeterRef';

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

  // const [release, setRelease] = useState('1');

  // Disable sliders while a note is playing
  // This functionality has been moved to Brain.js and disabled. Updates to the Oscillator/Wad only take effect if a note isn't playing
  // I'll keep this here for now, because I might like the visual indication that a slider doesn't function during playback
  // let disabled = notePlaying ? true : false;

  // Function to make sliders non-linear
  // Ex. a slider with an exponent value of 2 or 3 gives more detail to lower numbers
  let newSliderScale;
  let scaledValue;
  let invertedValue;
  // Scale the slider value
  const getScaledValue = (min, max, value, exponent) => {
    newSliderScale = scalePow()
      .range([min, max])
      .domain([min, max])
      .exponent(exponent);
    return (scaledValue = newSliderScale(value));
  };
  // Invert the scale of the number input
  const getInvertedValue = (min, max, value, exponent) => {
    newSliderScale = scalePow()
      .range([min, max])
      .domain([min, max])
      .exponent(exponent);
    return (invertedValue = newSliderScale.invert(value));
  };

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
      getScaledValue(parameterName.min, parameterName.max, value, sliderPower);
      parameterSetter(Number(value), scaledValue);
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
      parameterSetter(invertedValue, value * valueMultiplier);
    } else if (value === '') {
      parameterSetter('', '');
    } else if (value * valueMultiplier > parameterName.max) {
      parameterSetter(parameterName.max, parameterName.max);
    } else if (value * valueMultiplier < parameterName.min) {
      parameterSetter(parameterName.min, parameterName.min);
    }
  };
  const handleNumberOnBlur = (parameterSetter, value, resetValue) => {
    if (value === '') {
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
              <SliderTime
                label={volumeEnvelopeAttack.label}
                id={volumeEnvelopeAttack.id}
                min={volumeEnvelopeAttack.min}
                max={volumeEnvelopeAttack.max}
                step={volumeEnvelopeAttack.step}
                sliderValue={volumeEnvelopeAttack.sliderValue}
                scaledValue={volumeEnvelopeAttack.scaledValue}
                // disabled={disabled}
                multiplier={1000}
                decimal={0}
                onChange={({ target: { value } }) =>
                  handleSliderThrottled(
                    volumeEnvelopeAttack, // parameter name
                    setVolumeEnvelopeAttack, // parameter setter function
                    value, // current value of the slider
                    2 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeAttack, // parameter name
                    setVolumeEnvelopeAttack, // parameter setter function
                    value, // current value
                    0.001, // value multiplier
                    2 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeAttack, // parameter setter function
                    value, // current value
                    0.001 // reset value (before the multiplier) if the input is empty
                  )
                }
              />
              <SliderTime
                label={volumeEnvelopeDecay.label}
                id={volumeEnvelopeDecay.id}
                min={volumeEnvelopeDecay.min}
                max={volumeEnvelopeDecay.max}
                step={volumeEnvelopeDecay.step}
                sliderValue={volumeEnvelopeDecay.sliderValue}
                scaledValue={volumeEnvelopeDecay.scaledValue}
                // disabled={disabled}
                multiplier={1000}
                decimal={0}
                onChange={({ target: { value } }) =>
                  handleSliderThrottled(
                    volumeEnvelopeDecay, // parameter name
                    setVolumeEnvelopeDecay, // parameter setter function
                    value, // current value of the slider
                    2 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeDecay, // parameter name
                    setVolumeEnvelopeDecay, // parameter setter function
                    value, // current value
                    0.001, // value multiplier
                    2 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeDecay, // parameter setter function
                    value, // current value
                    0.001 // reset value (before the multiplier) if the input is empty
                  )
                }
              />
              <SliderLevel
                label={volumeEnvelopeSustain.label}
                id={volumeEnvelopeSustain.id}
                min={volumeEnvelopeSustain.min}
                max={volumeEnvelopeSustain.max}
                step={volumeEnvelopeSustain.step}
                sliderValue={volumeEnvelopeSustain.sliderValue}
                scaledValue={volumeEnvelopeSustain.scaledValue}
                // disabled={disabled}
                multiplier={100}
                decimal={0}
                onChange={({ target: { value } }) =>
                  handleSliderThrottled(
                    volumeEnvelopeSustain, // parameter name
                    setVolumeEnvelopeSustain, // parameter setter function
                    value, // current value of the slider
                    1 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeSustain, // parameter name
                    setVolumeEnvelopeSustain, // parameter setter function
                    value, // current value
                    0.01, // value multiplier
                    1 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeSustain, // parameter setter function
                    value, // current value
                    1 // reset value (before the multiplier) if the input is empty
                  )
                }
              />
              <SliderTime
                label={volumeEnvelopeRelease.label}
                id={volumeEnvelopeRelease.id}
                min={volumeEnvelopeRelease.min}
                max={volumeEnvelopeRelease.max}
                step={volumeEnvelopeRelease.step}
                sliderValue={volumeEnvelopeRelease.sliderValue}
                scaledValue={volumeEnvelopeRelease.scaledValue}
                // disabled={disabled}
                multiplier={1000}
                decimal={0}
                onChange={({ target: { value } }) =>
                  handleSliderThrottled(
                    volumeEnvelopeRelease, // parameter name
                    setVolumeEnvelopeRelease, // parameter setter function
                    value, // current value of the slider
                    2 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeRelease, // parameter name
                    setVolumeEnvelopeRelease, // parameter setter function
                    value, // current value
                    0.001, // value multiplier
                    2 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeRelease, // parameter setter function
                    value, // current value
                    0.001 // reset value (before the multiplier) if the input is empty
                  )
                }
              />
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default VolumeEnvelope;
