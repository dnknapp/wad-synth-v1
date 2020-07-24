import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import styles from './Oscillators.module.scss';
import { scalePow } from 'd3-scale';
import throttle from 'lodash.throttle';
import OscillatorWaveSelect from './OscillatorWaveSelect';
import OscillatorOctaveSelect from './OscillatorOctaveSelect';
import SliderTime from '../uiElements/SliderTime';
import SliderLevel from '../uiElements/SliderLevel';

const Oscillator = ({ oscillator }) => {
  const oscillatorContext = useContext(OscillatorContext);
  const {
    setOscillatorSource,
    setOscillatorVolume,
    setOscillatorOctave,
    setOscillatorDetuneCoarse,
    setOscillatorDetuneFine,
  } = oscillatorContext;

  const [componentLoading, setComponentLoading] = useState(true);
  const [thisOscillator, setThisOscillator] = useState();
  const [oscillatorWad, setOscillatorWad] = useState();

  const {
    id,
    source,
    volume,
    volumeControl,
    detuneControlCoarse,
    detuneControlFine,
  } = oscillator; // These things are set in OscillatorState.js, but since they're specific to one oscillator they're being passed as a prop instead of from Context

  // Get the current oscillator using the oscillatorId prop passed from Oscillators.js
  // useEffect(() => {
  //   oscillators.map(
  //     (oscillator) =>
  //       oscillatorId === oscillator.idd && setThisOscillator(oscillator)
  //   );
  //   setComponentLoading(false);
  // }, [oscillatorId, oscillators, thisOscillator]);

  let newSliderScale;
  let scaledValue;
  let invertedValue;
  // Scale the range slider value, so that it's not linear
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

  // Set the source/waveform for an oscillator
  const handleSelectWave = (e) => {
    setOscillatorSource(id, e.target.value);
  };

  // Transpose the pitch for different octave settings
  const [octaveSelected, setOctaveSelected] = useState('octave0');

  const handleSelectOctave = (e) => {
    setOctaveSelected(e.target.value);
    switch (e.target.value) {
      case 'octaveMinus2':
        setOscillatorOctave(id, 0.25);
        break;
      case 'octaveMinus1':
        setOscillatorOctave(id, 0.5);
        break;
      case 'octave0':
        setOscillatorOctave(id, 1);
        break;
      case 'octavePlus1':
        setOscillatorOctave(id, 2);
        break;
      case 'octavePlus2':
        setOscillatorOctave(id, 4);
        break;
      default:
      //
    }
  };

  // Store the Detune values with useRef, so that the event handlers can access the current state
  // Detune Coarse State
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedDetuneCoarseRef = useRef(detuneControlCoarse.scaledValue);
  // Create a function to update the Ref. It is passed our updated value
  const setUpdatedDetuneCoarse = (updatedValue) => {
    updatedDetuneCoarseRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedDetuneCoarse(detuneControlCoarse.scaledValue);
  }, [detuneControlCoarse]);

  // Detune Fine State
  // --- Create a Ref with the initial state (from a prop/context)
  const updatedDetuneFineRef = useRef(detuneControlFine.scaledValue);
  // Create a function to update both the Ref and the state. It is passed our updated value
  const setUpdatedDetuneFine = (updatedValue) => {
    updatedDetuneFineRef.current = updatedValue;
  };
  // --- Run the update function (and pass it the updated value) when the state changes
  useEffect(() => {
    setUpdatedDetuneFine(detuneControlFine.scaledValue);
  }, [detuneControlFine]);

  // Event Handlers
  // --- Detune Coarse Slider
  // ------ Throttle the slider event
  // ------ Throttle needs to use useRef, otherwise react just makes a new event
  // ------ See https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6 for how the onChange works
  const handleDetuneCoarseThrottled = useRef(
    throttle(function handleDetuneCoarse(value) {
      let detuneValue;
      getScaledValue(
        detuneControlCoarse.min,
        detuneControlCoarse.max,
        value,
        1
      );
      detuneValue = scaledValue + updatedDetuneFineRef.current; // Add the value of the Coarse slider to the current value of the Fine slider. To get the updated state in an event handler we need to use a Ref, see above for the setup.

      setOscillatorDetuneCoarse(id, Number(value), scaledValue, detuneValue);
    }, 50)
  ).current;
  // --- Detune Coarse Number Input
  const handleDetuneCoarseInput = (value) => {
    let detuneValue;
    if (
      value * 100 <= detuneControlCoarse.max &&
      value * 100 >= detuneControlCoarse.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scale function to update the slider value
        detuneControlCoarse.min,
        detuneControlCoarse.max,
        value * 100, // ex.: input is "3", but really we want 300
        1
      );
      detuneValue = invertedValue + updatedDetuneFineRef.current; // Add the value of the Coarse slider to the current value of the Fine slider. To get the updated state in an event handler we need to use a Ref, see above for the setup.

      setOscillatorDetuneCoarse(id, invertedValue, value * 100, detuneValue);
    } else if (value === '') {
      setOscillatorDetuneCoarse(
        id,
        '', // An empty string allows typing a negative or delete all numbers without the Scale/Invert functions running
        '',
        updatedDetuneFineRef.current // Detune value. Normally Coarse and Fine values are added, but Coarse is empty so we don't need it
      );
    } else if (value * 100 > detuneControlCoarse.max) {
      setOscillatorDetuneCoarse(
        id,
        detuneControlCoarse.max,
        detuneControlCoarse.max,
        detuneControlCoarse.max + updatedDetuneFineRef.current // Detune value
      );
    } else if (value * 100 < detuneControlCoarse.min) {
      setOscillatorDetuneCoarse(
        id,
        detuneControlCoarse.min,
        detuneControlCoarse.min,
        detuneControlCoarse.min + updatedDetuneFineRef.current // Detune value
      );
    }
  };
  // Detune Coarse Number Input onBlur
  const handleDetuneCoarseOnBlur = (value) => {
    if (value === '') {
      setOscillatorDetuneCoarse(
        id,
        0, // Set the value to 0 if the input is empty
        0,
        updatedDetuneFineRef.current // Detune value. Normally Coarse and Fine values are added, but Coarse is empty so we don't need it
      );
    }
  };

  // --- Detune Fine Slider
  const handleDetuneFineThrottled = useRef(
    throttle(function handleDetuneFine(value) {
      let detuneValue;
      getScaledValue(detuneControlFine.min, detuneControlFine.max, value, 1);
      detuneValue = scaledValue + updatedDetuneCoarseRef.current; // Add the value of the Fine slider to the current value of the Coarse slider. To get the updated state in an event handler we need to use a Ref, see above for the setup.
      setOscillatorDetuneFine(id, parseFloat(value), scaledValue, detuneValue);
    }, 50)
  ).current;
  // --- Detune Fine Number Input
  const handleDetuneFineInput = (value) => {
    let detuneValue;
    if (
      value * 1 <= detuneControlFine.max &&
      value * 1 >= detuneControlFine.min &&
      value !== ''
    ) {
      getInvertedValue(
        detuneControlFine.min,
        detuneControlFine.max,
        value * 1, // Sometimes we want a multiplier, but just coercing the value from a string to a number here
        1
      );
      detuneValue = invertedValue + updatedDetuneCoarseRef.current; // Add the value of the Fine slider to the current value of the Coarse slider. To get the updated state in an event handler we need to use a Ref, see above for the setup.

      setOscillatorDetuneFine(id, invertedValue, value * 1, detuneValue);
    } else if (value === '') {
      setOscillatorDetuneFine(
        id,
        '',
        '',
        updatedDetuneCoarseRef.current // Detune value. Normally Coarse and Fine values are added, but Fine is empty so we don't need it
      );
    } else if (value * 1 > detuneControlFine.max) {
      setOscillatorDetuneFine(
        id,
        detuneControlFine.max,
        detuneControlFine.max,
        detuneControlFine.max + updatedDetuneCoarseRef.current // Detune value
      );
    } else if (value * 1 < detuneControlFine.min) {
      setOscillatorDetuneFine(
        id,
        detuneControlFine.min,
        detuneControlFine.min,
        detuneControlFine.min + updatedDetuneCoarseRef.current // Detune value
      );
    }
  };
  // Detune Fine Number Input onBlur
  const handleDetuneFineOnBlur = (value) => {
    if (value === '') {
      setOscillatorDetuneFine(
        id,
        0,
        0,
        updatedDetuneCoarseRef.current // Detune value. Normally Coarse and Fine values are added, but Fine is empty so we don't need it
      );
    }
  };

  // --- Volume Slider
  const handleVolumeThrottled = useRef(
    throttle(function handleVolume(value) {
      getScaledValue(volumeControl.min, volumeControl.max, value, 1);
      setOscillatorVolume(id, Number(value), scaledValue);
    }, 50)
  ).current;
  // --- Volume Number Input
  const handleVolumeInput = (value) => {
    if (
      value * 0.01 <= volumeControl.max &&
      value * 0.01 >= volumeControl.min &&
      value !== ''
    ) {
      getInvertedValue(
        // Invert the scaled value to update the slider value
        volumeControl.min,
        volumeControl.max,
        value * 0.01,
        1
      );
      setOscillatorVolume(id, invertedValue, value * 0.01);
    } else if (value === '') {
      setOscillatorVolume(
        id,
        '', // An empty string allows typing a negative or delete all numbers without the Scale/Invert functions running. The slider goes to the middle, but I think that's okay.
        0 // Temporarily set the volume to 0
      );
    } else if (value * 0.01 > volumeControl.max) {
      setOscillatorVolume(
        id,
        volumeControl.max,
        volumeControl.max // Volume value
      );
    } else if (value * 0.01 < volumeControl.min) {
      setOscillatorVolume(
        id,
        volumeControl.min,
        volumeControl.min // Volume value
      );
    }
  };
  // Detune Coarse Number Input onBlur
  const handleVolumeOnBlur = (value) => {
    if (value === '') {
      setOscillatorVolume(
        id,
        0, // Set the value to 0 if the input is empty
        0 // Set the Volume to 0
      );
    }
  };

  return (
    <div className={`synthModuleInner`}>
      <h3 className={`synthModuleSidebar`}>
        <span className={`displaySub block`}>Osc</span>{' '}
        <span className={`display block`}>{oscillator.legend}</span>
      </h3>
      <div className={`synthModuleControls`}>
        <OscillatorWaveSelect
          id={id}
          handleSelectWave={handleSelectWave}
          waveSelected={source}
        />
        <OscillatorOctaveSelect
          id={id}
          handleSelectOctave={handleSelectOctave}
          octaveSelected={octaveSelected}
        />

        <SliderLevel
          label={detuneControlCoarse.label}
          id={detuneControlCoarse.id}
          min={detuneControlCoarse.min}
          max={detuneControlCoarse.max}
          step={detuneControlCoarse.step}
          sliderValue={detuneControlCoarse.sliderValue}
          scaledValue={detuneControlCoarse.scaledValue}
          multiplier={0.01}
          decimal={0}
          onChange={({ target: { value } }) =>
            handleDetuneCoarseThrottled(value)
          } // Destructuring e.target.value, see the handleVolumeThrottled definition for more of an explanation
          handleNumberInput={({ target: { value } }) =>
            handleDetuneCoarseInput(value)
          }
          handleOnBlur={({ target: { value } }) =>
            handleDetuneCoarseOnBlur(value)
          }
          // disabled={disabled}
        />
        <SliderLevel
          label={detuneControlFine.label}
          id={detuneControlFine.id}
          min={detuneControlFine.min}
          max={detuneControlFine.max}
          step={detuneControlFine.step}
          sliderValue={detuneControlFine.sliderValue}
          scaledValue={detuneControlFine.scaledValue}
          multiplier={1}
          decimal={0}
          onChange={({ target: { value } }) => handleDetuneFineThrottled(value)} // See the handleVolumeThrottled definition for an explanation
          handleNumberInput={({ target: { value } }) =>
            handleDetuneFineInput(value)
          }
          handleOnBlur={({ target: { value } }) =>
            handleDetuneFineOnBlur(value)
          }
          // disabled={disabled}
        />

        <SliderLevel
          label={volumeControl.label}
          id={volumeControl.id}
          min={volumeControl.min}
          max={volumeControl.max}
          step={volumeControl.step}
          sliderValue={volumeControl.sliderValue}
          scaledValue={volumeControl.scaledValue}
          multiplier={100}
          decimal={0}
          // onChange={handleVolumeThrottled}
          onChange={({ target: { value } }) => handleVolumeThrottled(value)} // See the handleVolumeThrottled definition for an explanation
          handleNumberInput={({ target: { value } }) =>
            handleVolumeInput(value)
          }
          handleOnBlur={({ target: { value } }) => handleVolumeOnBlur(value)}
          // disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Oscillator;
