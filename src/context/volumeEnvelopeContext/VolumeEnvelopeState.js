import React, { useReducer } from 'react';
import VolumeEnvelopeContext from './volumeEnvelopeContext';
import volumeEnvelopeReducer from './volumeEnvelopeReducer';
import {
  SET_VOLUME_ENVELOPE_ATTACK,
  SET_VOLUME_ENVELOPE_DECAY,
  SET_VOLUME_ENVELOPE_SUSTAIN,
  SET_VOLUME_ENVELOPE_HOLD,
  SET_VOLUME_ENVELOPE_RELEASE,
} from './volumeEnvelopeTypes';

const VolumeEnvelopeState = (props) => {
  const initialState = {
    volumeEnvelopeAttack: {
      id: 'volumeEnvelopeAttack',
      label: 'Attack',
      min: 0.001,
      max: 9.999,
      step: 'any',
      sliderValue: 0.001, // What the slider visually displays
      scaledValue: 0.001, // Default output value. Updates may be scaled
    },
    volumeEnvelopeDecay: {
      id: 'volumeEnvelopeDecay',
      label: 'Decay',
      min: 0.001,
      max: 9.999,
      step: 'any',
      sliderValue: 0.001, // What the slider visually displays
      scaledValue: 0.001, // Default output value. Updates may be scaled
    },
    volumeEnvelopeSustain: {
      id: 'volumeEnvelopeSustain',
      label: 'Sustain',
      min: 0,
      max: 1,
      step: 0.01,
      sliderValue: 1, // What the slider visually displays
      scaledValue: 1, // Default output value. Updates may be scaled
    },
    // volumeEnvelopeHold: {
    //   id: 'volumeEnvelopeHold',
    //   label: 'Sustain Time',
    //   min: 0.001,
    //   max: 10,
    //   step: 'any',
    //   sliderValue: 1, // What the slider visually displays
    //   scaledValue: 1, // Default output value. Updates may be scaled
    // },
    volumeEnvelopeRelease: {
      id: 'volumeEnvelopeRelease',
      label: 'Release',
      min: 0.001,
      max: 9.999,
      step: 'any',
      sliderValue: 0.001, // What the slider visually displays
      scaledValue: 0.001, // Default output value. Updates may be scaled
    },

    // volumeEnvelopeAttack: 0,
    // volumeEnvelopeDecay: 0,
    // volumeEnvelopeSustain: 1,
    volumeEnvelopeHold: -1,
    // volumeEnvelopeRelease: 1,
  };

  //All of our actions involving state go below. The type of action is dispatched to the Reducer.
  const [state, dispatch] = useReducer(volumeEnvelopeReducer, initialState);

  const setVolumeEnvelopeAttack = (sliderValue, scaledValue) => {
    dispatch({
      type: SET_VOLUME_ENVELOPE_ATTACK,
      payload: { sliderValue, scaledValue },
    });
  };

  const setVolumeEnvelopeDecay = (sliderValue, scaledValue) => {
    dispatch({
      type: SET_VOLUME_ENVELOPE_DECAY,
      payload: { sliderValue, scaledValue },
    });
  };

  const setVolumeEnvelopeSustain = (sliderValue, scaledValue) => {
    dispatch({
      type: SET_VOLUME_ENVELOPE_SUSTAIN,
      payload: { sliderValue, scaledValue },
    });
  };

  // const setVolumeEnvelopeSustain = (num) => {
  //   dispatch({ type: SET_VOLUME_ENVELOPE_SUSTAIN, payload: num });
  // };

  const setVolumeEnvelopeHold = (num) => {
    dispatch({ type: SET_VOLUME_ENVELOPE_HOLD, payload: num });
  };

  // const setVolumeEnvelopeHold = (sliderValue, scaledValue) => {
  //   dispatch({
  //     type: SET_VOLUME_ENVELOPE_HOLD,
  //     payload: { sliderValue, scaledValue },
  //   });
  // };

  const setVolumeEnvelopeRelease = (sliderValue, scaledValue) => {
    dispatch({
      type: SET_VOLUME_ENVELOPE_RELEASE,
      payload: { sliderValue, scaledValue },
    });
  };

  return (
    <VolumeEnvelopeContext.Provider
      value={{
        volumeEnvelopeAttack: state.volumeEnvelopeAttack,
        volumeEnvelopeDecay: state.volumeEnvelopeDecay,
        volumeEnvelopeSustain: state.volumeEnvelopeSustain,
        volumeEnvelopeHold: state.volumeEnvelopeHold,
        volumeEnvelopeRelease: state.volumeEnvelopeRelease,
        setVolumeEnvelopeAttack,
        setVolumeEnvelopeDecay,
        setVolumeEnvelopeSustain,
        setVolumeEnvelopeHold,
        setVolumeEnvelopeRelease,
      }}
    >
      {props.children}
    </VolumeEnvelopeContext.Provider>
  );
};

export default VolumeEnvelopeState;
