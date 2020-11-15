import React, { useReducer } from 'react';
import OscillatorContext from './oscillatorContext';
import oscillatorReducer from './oscillatorReducer';
import {
  SET_OSCILLATORS,
  SET_OSCILLATOR_SOURCE,
  SET_OSCILLATOR_VOLUME,
  SET_OSCILLATOR_PITCH,
  SET_OSCILLATOR_OCTAVE,
  SET_OSCILLATOR_DETUNE_COARSE,
  SET_OSCILLATOR_DETUNE_FINE,
  SET_OSCILLATOR_DETUNE,
  SET_NOTE_PITCH,
  SET_NOTE_PLAYING,
  SET_NOTE_VOLUME,
} from './oscillatorTypes';

const OscillatorState = (props) => {
  const oscNums = ['1', '2', '3']; // Oscillator numbers
  const initialState = {
    oscillators: [],
  };
  // Loop through oscillator numbers and add oscillator objects to the initial state
  (function addOscillator() {
    oscNums.forEach((num) => {
      initialState.oscillators.push({
        id: `osc${num}`,
        legend: `${num}`,
        source: 'triangle',
        volume: 0.8, // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
        volumeControl: {
          id: `osc${num}VolumeControl`,
          label: 'volume',
          min: 0,
          max: 1,
          step: 0.01,
          sliderValue: 0.8, // What the slider visually displays
          scaledValue: 0.8, // Default output value. Updates may be scaled
        },
        pitch: 'A4', // Set a default pitch on the constructor if you don't want to set the pitch on <code>play()</code>.
        octave: '1',
        detune: 0, // Set a default detune on the constructor if you don't want to set detune on <code>play()</code>. Detune is measured in cents. 100 cents is equal to 1 semitone.
        detuneControlCoarse: {
          id: `osc${num}DetuneControlCoarse`,
          label: 'semitone',
          min: -1200,
          max: 1200,
          step: 100,
          sliderValue: 0, // What the slider visually displays
          scaledValue: 0, // Default output value. Updates may be scaled
        },
        detuneControlFine: {
          id: `osc${num}DetuneControlFine`,
          label: 'detune',
          min: -50,
          max: 50,
          step: 1,
          sliderValue: 0, // What the slider visually displays
          scaledValue: 0, // Default output value. Updates may be scaled
        },
        panning: 0, // Horizontal placement of the sound source. Possible values are from 1 to -1.
        env: {
          // Init settings for the Volume envelope.
          // These are overridden when a note plays by VolumeEnvelope.js
          attack: 0.0, // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
          decay: 0.0, // Time in seconds from peak volume to sustain volume.
          sustain: 1.0, // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
          hold: -1, // Time in seconds to maintain the sustain volume level. If set to -1, the sound will be sustained indefinitely until you manually call stop().
          release: 0, // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
        },
      });
    });
  })();

  //All of our actions involving state go below. The type of action is dispatched to the Reducer.
  const [state, dispatch] = useReducer(oscillatorReducer, initialState);

  // I don't think this is being used, and can be deleted...
  const setOscillators = (oscillatorsArray) => {
    dispatch({ type: SET_OSCILLATORS, payload: oscillatorsArray });
  };

  // Set the source/waveform of an oscillator
  const setOscillatorSource = (oscillatorId, wave) => {
    dispatch({
      type: SET_OSCILLATOR_SOURCE,
      payload: { oscillatorId, wave },
    });
  };

  // Set the volume of an oscillator
  const setOscillatorVolume = (oscillatorId, sliderValue, scaledValue) => {
    dispatch({
      type: SET_OSCILLATOR_VOLUME,
      payload: { oscillatorId, sliderValue, scaledValue },
    });
  };

  // Set the oscillator pitch
  const setOscillatorPitch = (oscillatorId, pitch) => {
    dispatch({
      type: SET_OSCILLATOR_PITCH,
      payload: { oscillatorId, pitch },
    });
  };
  // Set the oscillator octave value
  const setOscillatorOctave = (oscillatorId, octave) => {
    dispatch({
      type: SET_OSCILLATOR_OCTAVE,
      payload: { oscillatorId, octave },
    });
  };

  // Set the coarse detune amount - moves detune by semitones
  const setOscillatorDetuneCoarse = (
    oscillatorId,
    sliderValue,
    scaledValue
  ) => {
    dispatch({
      type: SET_OSCILLATOR_DETUNE_COARSE,
      payload: { oscillatorId, sliderValue, scaledValue },
    });
  };

  // Set the fine detune amount - moves pitch by cents
  const setOscillatorDetuneFine = (oscillatorId, sliderValue, scaledValue) => {
    dispatch({
      type: SET_OSCILLATOR_DETUNE_FINE,
      payload: { oscillatorId, sliderValue, scaledValue },
    });
  };

  // Set the combined fine and coarse detune amount; what you actually hear
  const setOscillatorDetune = (oscillatorId, detuneValue) => {
    dispatch({
      type: SET_OSCILLATOR_DETUNE,
      payload: { oscillatorId, detuneValue },
    });
  };

  const setNotePitch = (keyName) => {
    dispatch({ type: SET_NOTE_PITCH, payload: keyName });
  };

  const setNotePlaying = (bool) => {
    dispatch({ type: SET_NOTE_PLAYING, payload: bool });
  };

  const setNoteVolume = (num) => {
    dispatch({ type: SET_NOTE_VOLUME, payload: num });
  };

  return (
    <OscillatorContext.Provider
      value={{
        oscillators: state.oscillators,
        notePitch: state.notePitch,
        notePlaying: state.notePlaying,
        noteVolume: state.noteVolume,
        setOscillators,
        setOscillatorSource,
        setOscillatorVolume,
        setOscillatorPitch,
        setOscillatorOctave,
        setOscillatorDetuneCoarse,
        setOscillatorDetuneFine,
        setOscillatorDetune,
        setNotePitch,
        setNotePlaying,
        setNoteVolume,
      }}
    >
      {props.children}
    </OscillatorContext.Provider>
  );
};

export default OscillatorState;
