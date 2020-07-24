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

  // const handleAttack = (e) => {
  //   getScaledValue(
  //     volumeEnvelopeAttack.min,
  //     volumeEnvelopeAttack.max,
  //     e.target.value,
  //     3
  //   );
  //   // console.log(scaledValue);
  //   setVolumeEnvelopeAttack(parseFloat(e.target.value), scaledValue);
  // };

  const handleAttackThrottled = useRef(
    throttle(function handleAttack(value) {
      // let attackValue;
      getScaledValue(
        volumeEnvelopeAttack.min,
        volumeEnvelopeAttack.max,
        value,
        2
      );
      setVolumeEnvelopeAttack(Number(value), scaledValue);
    }, 50)
  ).current;
  // --- Attack Number Input
  const handleAttackInput = (value) => {
    if (
      value * 0.001 <= volumeEnvelopeAttack.max &&
      value * 0.001 >= volumeEnvelopeAttack.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        volumeEnvelopeAttack.min,
        volumeEnvelopeAttack.max,
        value * 0.001,
        2
      );
      setVolumeEnvelopeAttack(invertedValue, value * 0.001);
    } else if (value === '') {
      setVolumeEnvelopeAttack('', '');
    } else if (value * 0.001 > volumeEnvelopeAttack.max) {
      setVolumeEnvelopeAttack(
        volumeEnvelopeAttack.max,
        volumeEnvelopeAttack.max
      );
    } else if (value * 0.001 < volumeEnvelopeAttack.min) {
      setVolumeEnvelopeAttack(
        volumeEnvelopeAttack.min,
        volumeEnvelopeAttack.min
      );
    }
  };
  // Attack Number Input onBlur
  const handleAttackOnBlur = (value) => {
    if (value === '') {
      setVolumeEnvelopeAttack(
        0.001, // Set the value to 1 if the input is empty
        0.001
      );
    }
  };

  // const handleDecay = (e) => {
  //   getScaledValue(
  //     volumeEnvelopeDecay.min,
  //     volumeEnvelopeDecay.max,
  //     e.target.value,
  //     3
  //   );
  //   // console.log(scaledValue);
  //   setVolumeEnvelopeDecay(parseFloat(e.target.value), scaledValue);
  // };

  const handleDecayThrottled = useRef(
    throttle(function handleDecay(value) {
      // let decayValue;
      getScaledValue(
        volumeEnvelopeDecay.min,
        volumeEnvelopeDecay.max,
        value,
        2
      );
      setVolumeEnvelopeDecay(Number(value), scaledValue);
    }, 50)
  ).current;
  // --- Decay Number Input
  const handleDecayInput = (value) => {
    if (
      value * 0.001 <= volumeEnvelopeDecay.max &&
      value * 0.001 >= volumeEnvelopeDecay.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        volumeEnvelopeDecay.min,
        volumeEnvelopeDecay.max,
        value * 0.001,
        2
      );
      setVolumeEnvelopeDecay(invertedValue, value * 0.001);
    } else if (value === '') {
      setVolumeEnvelopeDecay('', '');
    } else if (value * 0.001 > volumeEnvelopeDecay.max) {
      setVolumeEnvelopeDecay(volumeEnvelopeDecay.max, volumeEnvelopeDecay.max);
    } else if (value * 0.001 < volumeEnvelopeDecay.min) {
      setVolumeEnvelopeDecay(volumeEnvelopeDecay.min, volumeEnvelopeDecay.min);
    }
  };
  // Decay Number Input onBlur
  const handleDecayOnBlur = (value) => {
    if (value === '') {
      setVolumeEnvelopeDecay(
        0.001, // Set the value to 1 if the input is empty
        0.001
      );
    }
  };

  // const handleSustain = (e) => {
  //   setVolumeEnvelopeSustain(parseFloat(e.target.value));
  // };

  // const handleSustain = (e) => {
  //   getScaledValue(
  //     volumeEnvelopeSustain.min,
  //     volumeEnvelopeSustain.max,
  //     e.target.value,
  //     1
  //   );
  //   // console.log(scaledValue);
  //   setVolumeEnvelopeSustain(parseFloat(e.target.value), scaledValue);
  // };

  const handleSustainThrottled = useRef(
    throttle(function handleSustain(value) {
      // let sustainValue;
      getScaledValue(
        volumeEnvelopeSustain.min,
        volumeEnvelopeSustain.max,
        value,
        1
      );
      setVolumeEnvelopeSustain(Number(value), scaledValue);
    }, 50)
  ).current;
  // --- Sustain Number Input
  const handleSustainInput = (value) => {
    if (
      value * 0.01 <= volumeEnvelopeSustain.max &&
      value * 0.01 >= volumeEnvelopeSustain.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        volumeEnvelopeSustain.min,
        volumeEnvelopeSustain.max,
        value * 0.01,
        1
      );
      setVolumeEnvelopeSustain(invertedValue, value * 0.01);
    } else if (value === '') {
      setVolumeEnvelopeSustain('', '');
    } else if (value * 0.01 > volumeEnvelopeSustain.max) {
      setVolumeEnvelopeSustain(
        volumeEnvelopeSustain.max,
        volumeEnvelopeSustain.max
      );
    } else if (value * 0.01 < volumeEnvelopeSustain.min) {
      setVolumeEnvelopeSustain(
        volumeEnvelopeSustain.min,
        volumeEnvelopeSustain.min
      );
    }
  };
  // Sustain Number Input onBlur
  const handleSustainOnBlur = (value) => {
    if (value === '') {
      setVolumeEnvelopeSustain(
        1, // Set the value to 1 if the input is empty
        1
      );
    }
  };

  // const handleHold = (e) => {
  //   getScaledValue(
  //     volumeEnvelopeHold.min,
  //     volumeEnvelopeHold.max,
  //     e.target.value,
  //     3
  //   );
  //   // console.log(scaledValue);
  //   setVolumeEnvelopeHold(parseFloat(e.target.value), scaledValue);
  // };

  const handleRelease = (e) => {
    getScaledValue(
      volumeEnvelopeRelease.min,
      volumeEnvelopeRelease.max,
      e.target.value,
      3
    );
    // console.log(scaledValue);
    setVolumeEnvelopeRelease(parseFloat(e.target.value), scaledValue);
  };

  const handleReleaseThrottled = useRef(
    throttle(function handleRelease(value) {
      // let releaseValue;
      getScaledValue(
        volumeEnvelopeRelease.min,
        volumeEnvelopeRelease.max,
        value,
        2
      );
      setVolumeEnvelopeRelease(Number(value), scaledValue);
    }, 50)
  ).current;
  // --- Release Number Input
  const handleReleaseInput = (value) => {
    if (
      value * 0.001 <= volumeEnvelopeRelease.max &&
      value * 0.001 >= volumeEnvelopeRelease.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        volumeEnvelopeRelease.min,
        volumeEnvelopeRelease.max,
        value * 0.001,
        2
      );
      setVolumeEnvelopeRelease(invertedValue, value * 0.001);
    } else if (value === '') {
      setVolumeEnvelopeRelease('', '');
    } else if (value * 0.001 > volumeEnvelopeRelease.max) {
      setVolumeEnvelopeRelease(
        volumeEnvelopeRelease.max,
        volumeEnvelopeRelease.max
      );
    } else if (value * 0.001 < volumeEnvelopeRelease.min) {
      setVolumeEnvelopeRelease(
        volumeEnvelopeRelease.min,
        volumeEnvelopeRelease.min
      );
    }
  };
  // Release Number Input onBlur
  const handleReleaseOnBlur = (value) => {
    if (value === '') {
      setVolumeEnvelopeRelease(
        0.001, // Set the value to 1 if the input is empty
        0.001
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
                  handleAttackThrottled(value)
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleAttackInput(value)
                }
                handleOnBlur={({ target: { value } }) =>
                  handleAttackOnBlur(value)
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
                  handleDecayThrottled(value)
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleDecayInput(value)
                }
                handleOnBlur={({ target: { value } }) =>
                  handleDecayOnBlur(value)
                }
              />
              {/* <SliderTime
                label={volumeEnvelopeDecay.label}
                id={volumeEnvelopeDecay.id}
                min={volumeEnvelopeDecay.min}
                max={volumeEnvelopeDecay.max}
                step={volumeEnvelopeDecay.step}
                sliderValue={volumeEnvelopeDecay.sliderValue}
                scaledValue={volumeEnvelopeDecay.scaledValue}
                onChange={handleDecay}
                // disabled={disabled}
              /> */}

              <SliderLevel
                label={volumeEnvelopeSustain.label}
                id={volumeEnvelopeSustain.id}
                min={volumeEnvelopeSustain.min}
                max={volumeEnvelopeSustain.max}
                step={volumeEnvelopeSustain.step}
                sliderValue={volumeEnvelopeSustain.sliderValue}
                scaledValue={volumeEnvelopeSustain.scaledValue}
                // onChange={handleSustain}
                multiplier={100}
                decimal={0}
                onChange={({ target: { value } }) =>
                  handleSustainThrottled(value)
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleSustainInput(value)
                }
                handleOnBlur={({ target: { value } }) =>
                  handleSustainOnBlur(value)
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
                  handleReleaseThrottled(value)
                } // Destructuring e.target.value
                handleNumberInput={({ target: { value } }) =>
                  handleReleaseInput(value)
                }
                handleOnBlur={({ target: { value } }) =>
                  handleReleaseOnBlur(value)
                }
              />
              {/* <SliderTime
                label={volumeEnvelopeRelease.label}
                id={volumeEnvelopeRelease.id}
                min={volumeEnvelopeRelease.min}
                max={volumeEnvelopeRelease.max}
                step={volumeEnvelopeRelease.step}
                sliderValue={volumeEnvelopeRelease.sliderValue}
                scaledValue={volumeEnvelopeRelease.scaledValue}
                onChange={handleRelease}
                // disabled={disabled}
              /> */}
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default VolumeEnvelope;
