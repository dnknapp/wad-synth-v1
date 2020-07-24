import React, { useContext, useEffect, useRef, useState } from 'react';
import VolumeEnvelopeContext from '../../context/volumeEnvelopeContext/volumeEnvelopeContext';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import { scalePow } from 'd3-scale';
import throttle from 'lodash.throttle';
import SliderTime from '../uiElements/SliderTime';
import SliderLevel from '../uiElements/SliderLevel';
import styles from './VolumeEnvelope.module.scss';

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

  // console.log(volumeEnvelopeAttack);
  // console.log(volumeEnvelopeDecay);

  // const [release, setRelease] = useState('1');

  // This functionality has been moved to Brain.js. Updates to the Oscillator/Wad only take effect if a note isn't playing
  // But I'll keep this here for now, because I might like the visual indication that a slider doesn't function during playback
  // let disabled = notePlaying ? true : false;

  // Convert the linear scale of the slider to a Power Scale, so that there's more detail in the low numbers
  // let scale = scalePow()
  //   .range([volumeEnvelopeAttack.min, volumeEnvelopeAttack.max])
  //   .domain([volumeEnvelopeAttack.min, volumeEnvelopeAttack.max])
  //   .exponent(3);

  let newSliderScale;
  let scaledValue;
  let invertedValue;
  const getScaledValue = (min, max, value, exponent) => {
    newSliderScale = scalePow()
      .range([min, max])
      .domain([min, max])
      // .domain([0, 10])
      .exponent(exponent);
    return (scaledValue = newSliderScale(value));
  };
  // Invert the scale of the number input
  const getInvertedValue = (min, max, value, exponent) => {
    newSliderScale = scalePow()
      .range([min, max])
      .domain([min, max])
      // .domain([0, 10])
      .exponent(exponent);
    return (invertedValue = newSliderScale.invert(value));
  };

  // Store values with useRef, so that the event handlers can access the current state
  // Attack State
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedAttackRef = useRef(volumeEnvelopeAttack.scaledValue);
  // Create a function to update the Ref. It is passed our updated value
  const setUpdatedAttack = (updatedValue) => {
    updatedAttackRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedAttack(volumeEnvelopeAttack.scaledValue);
  }, [volumeEnvelopeAttack]);

  // Decay State
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedDecayRef = useRef(volumeEnvelopeDecay.scaledValue);
  // Create a function to update the Ref. It is passed our updated value
  const setUpdatedDecay = (updatedValue) => {
    updatedDecayRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedDecay(volumeEnvelopeDecay.scaledValue);
  }, [volumeEnvelopeDecay]);

  // Sustain State
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedSustainRef = useRef(volumeEnvelopeSustain.scaledValue);
  // Create a function to update the Ref. It is passed our updated value
  const setUpdatedSustain = (updatedValue) => {
    updatedSustainRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedSustain(volumeEnvelopeSustain.scaledValue);
  }, [volumeEnvelopeSustain]);

  // Release State
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedReleaseRef = useRef(volumeEnvelopeRelease.scaledValue);
  // Create a function to update the Ref. It is passed our updated value
  const setUpdatedRelease = (updatedValue) => {
    updatedReleaseRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedRelease(volumeEnvelopeRelease.scaledValue);
  }, [volumeEnvelopeRelease]);
  // Event Handlers

  const handleSliderThrottled = useRef(
    throttle(function handleSlider(
      controlName,
      controlSetter,
      value,
      sliderPower
    ) {
      // let releaseValue;
      getScaledValue(controlName.min, controlName.max, value, sliderPower);
      controlSetter(Number(value), scaledValue);
    },
    50)
  ).current;
  // --- Release Number Input
  // valueMultiplier: multiply value by .001 to get miliseconds
  const handleNumberInput = (
    controlName,
    controlSetter,
    value,
    valueMultiplier,
    sliderPower
  ) => {
    if (
      value * valueMultiplier <= controlName.max &&
      value * valueMultiplier >= controlName.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        controlName.min,
        controlName.max,
        value * valueMultiplier,
        sliderPower
      );
      controlSetter(invertedValue, value * valueMultiplier);
    } else if (value === '') {
      controlSetter('', '');
    } else if (value * valueMultiplier > controlName.max) {
      controlSetter(controlName.max, controlName.max);
    } else if (value * valueMultiplier < controlName.min) {
      controlSetter(controlName.min, controlName.min);
    }
  };
  const handleNumberOnBlur = (controlSetter, value, resetValue) => {
    if (value === '') {
      controlSetter(
        resetValue, // Set the value to 1 if the input is empty
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
                    volumeEnvelopeAttack, // control name
                    setVolumeEnvelopeAttack, // control setter function
                    value, // current value of the slider
                    2 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeAttack, // control name
                    setVolumeEnvelopeAttack, // control setter function
                    value, // current value
                    0.001, // value multiplier
                    2 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeAttack, // control setter function
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
                    volumeEnvelopeDecay, // control name
                    setVolumeEnvelopeDecay, // control setter function
                    value, // current value of the slider
                    2 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeDecay, // control name
                    setVolumeEnvelopeDecay, // control setter function
                    value, // current value
                    0.001, // value multiplier
                    2 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeDecay, // control setter function
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
                    volumeEnvelopeSustain, // control name
                    setVolumeEnvelopeSustain, // control setter function
                    value, // current value of the slider
                    1 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeSustain, // control name
                    setVolumeEnvelopeSustain, // control setter function
                    value, // current value
                    0.01, // value multiplier
                    1 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeSustain, // control setter function
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
                    volumeEnvelopeRelease, // control name
                    setVolumeEnvelopeRelease, // control setter function
                    value, // current value of the slider
                    2 // slider power
                  )
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleNumberInput(
                    volumeEnvelopeRelease, // control name
                    setVolumeEnvelopeRelease, // control setter function
                    value, // current value
                    0.001, // value multiplier
                    2 // slider power
                  )
                }
                handleOnBlur={({ target: { value } }) =>
                  handleNumberOnBlur(
                    setVolumeEnvelopeRelease, // control setter function
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
