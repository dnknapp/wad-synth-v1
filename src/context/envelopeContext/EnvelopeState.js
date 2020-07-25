import React, { useReducer } from 'react';
import EnvelopeContext from './envelopeContext';
import envelopeReducer from './envelopeReducer';
import {
  SET_ENVELOPE_ATTACK,
  SET_ENVELOPE_DECAY,
  SET_ENVELOPE_SUSTAIN,
  SET_ENVELOPE_HOLD,
  SET_ENVELOPE_RELEASE,
} from './envelopeTypes';

const EnvelopeState = (props) => {
  const envNums = ['1', '2']; // Envelope numbers
  const initialState = {
    envelopes: [],
  };
  // Loop through envelope numbers and add envelope objects to the initial state
  (function addEnvelope() {
    envNums.forEach((num) => {
      initialState.envelopes.push({
        id: `env${num}`,
        legend: `${num}`,
        envelopeAttack: {
          id: `env${num}Attack`,
          label: 'Attack',
          min: 0.001,
          max: 9.999,
          step: 'any',
          sliderValue: 0.001, // What the slider visually displays
          scaledValue: 0.001, // Default output value. Updates may be scaled
        },
        envelopeDecay: {
          id: `env${num}Decay`,
          label: 'Decay',
          min: 0.001,
          max: 9.999,
          step: 'any',
          sliderValue: 0.001, // What the slider visually displays
          scaledValue: 0.001, // Default output value. Updates may be scaled
        },
        envelopeSustain: {
          id: `env${num}Sustain`,
          label: 'Sustain',
          min: 0,
          max: 1,
          step: 0.01,
          sliderValue: 1, // What the slider visually displays
          scaledValue: 1, // Default output value. Updates may be scaled
        },
        envelopeRelease: {
          id: `env${num}Release`,
          label: 'Release',
          min: 0.001,
          max: 9.999,
          step: 'any',
          sliderValue: 0.001, // What the slider visually displays
          scaledValue: 0.001, // Default output value. Updates may be scaled
        },
        envelopeHold: -1,
      });
    });
  })();
  // const initialState = {
  //   envelopeAttack: {
  //     id: 'envelopeAttack',
  //     label: 'Attack',
  //     min: 0.001,
  //     max: 9.999,
  //     step: 'any',
  //     sliderValue: 0.001, // What the slider visually displays
  //     scaledValue: 0.001, // Default output value. Updates may be scaled
  //   },
  //   envelopeDecay: {
  //     id: 'envelopeDecay',
  //     label: 'Decay',
  //     min: 0.001,
  //     max: 9.999,
  //     step: 'any',
  //     sliderValue: 0.001, // What the slider visually displays
  //     scaledValue: 0.001, // Default output value. Updates may be scaled
  //   },
  //   envelopeSustain: {
  //     id: 'envelopeSustain',
  //     label: 'Sustain',
  //     min: 0,
  //     max: 1,
  //     step: 0.01,
  //     sliderValue: 1, // What the slider visually displays
  //     scaledValue: 1, // Default output value. Updates may be scaled
  //   },
  //   // envelopeHold: {
  //   //   id: 'envelopeHold',
  //   //   label: 'Sustain Time',
  //   //   min: 0.001,
  //   //   max: 10,
  //   //   step: 'any',
  //   //   sliderValue: 1, // What the slider visually displays
  //   //   scaledValue: 1, // Default output value. Updates may be scaled
  //   // },
  //   envelopeRelease: {
  //     id: 'envelopeRelease',
  //     label: 'Release',
  //     min: 0.001,
  //     max: 9.999,
  //     step: 'any',
  //     sliderValue: 0.001, // What the slider visually displays
  //     scaledValue: 0.001, // Default output value. Updates may be scaled
  //   },

  //   // envelopeAttack: 0,
  //   // envelopeDecay: 0,
  //   // envelopeSustain: 1,
  //   envelopeHold: -1,
  //   // envelopeRelease: 1,
  // };

  //All of our actions involving state go below. The type of action is dispatched to the Reducer.
  const [state, dispatch] = useReducer(envelopeReducer, initialState);

  const setEnvelopeAttack = (envelopeId, sliderValue, scaledValue) => {
    dispatch({
      type: SET_ENVELOPE_ATTACK,
      payload: { envelopeId, sliderValue, scaledValue },
    });
  };

  const setEnvelopeDecay = (envelopeId, sliderValue, scaledValue) => {
    dispatch({
      type: SET_ENVELOPE_DECAY,
      payload: { envelopeId, sliderValue, scaledValue },
    });
  };

  const setEnvelopeSustain = (envelopeId, sliderValue, scaledValue) => {
    dispatch({
      type: SET_ENVELOPE_SUSTAIN,
      payload: { envelopeId, sliderValue, scaledValue },
    });
  };

  // const setEnvelopeSustain = (num) => {
  //   dispatch({ type: SET_ENVELOPE_SUSTAIN, payload: num });
  // };

  const setEnvelopeHold = (envelopeId, num) => {
    dispatch({ type: SET_ENVELOPE_HOLD, payload: { envelopeId, num } });
  };

  // const setEnvelopeHold = (sliderValue, scaledValue) => {
  //   dispatch({
  //     type: SET_ENVELOPE_HOLD,
  //     payload: { sliderValue, scaledValue },
  //   });
  // };

  const setEnvelopeRelease = (envelopeId, sliderValue, scaledValue) => {
    dispatch({
      type: SET_ENVELOPE_RELEASE,
      payload: { envelopeId, sliderValue, scaledValue },
    });
  };

  return (
    <EnvelopeContext.Provider
      value={{
        envelopes: state.envelopes,
        // envelopeAttack: state.envelopeAttack,
        // envelopeDecay: state.envelopeDecay,
        // envelopeSustain: state.envelopeSustain,
        // envelopeHold: state.envelopeHold,
        // envelopeRelease: state.envelopeRelease,
        setEnvelopeAttack,
        setEnvelopeDecay,
        setEnvelopeSustain,
        setEnvelopeHold,
        setEnvelopeRelease,
      }}
    >
      {props.children}
    </EnvelopeContext.Provider>
  );
};

export default EnvelopeState;
