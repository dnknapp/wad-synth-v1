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

export default (state, action) => {
  switch (action.type) {
    case SET_OSCILLATORS:
      return {
        ...state,
        oscillators: action.payload,
      };
    case SET_OSCILLATOR_SOURCE:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                source: action.payload.wave,
              }
            : oscillator
        ),
      };
    case SET_OSCILLATOR_VOLUME:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                volume: action.payload.scaledValue,
                volumeControl: {
                  ...oscillator.volumeControl,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : oscillator
        ),
      };
    case SET_OSCILLATOR_PITCH:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                pitch: action.payload.pitch,
              }
            : oscillator
        ),
      };
    case SET_OSCILLATOR_OCTAVE:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                octave: action.payload.octave,
              }
            : oscillator
        ),
      };
    case SET_OSCILLATOR_DETUNE_COARSE:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                detuneControlCoarse: {
                  ...oscillator.detuneControlCoarse,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : oscillator
        ),
      };
    case SET_OSCILLATOR_DETUNE_FINE:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                detuneControlFine: {
                  ...oscillator.detuneControlFine,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : oscillator
        ),
      };
    case SET_OSCILLATOR_DETUNE:
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator) =>
          oscillator.id === action.payload.oscillatorId
            ? {
                ...oscillator,
                detune: action.payload.detuneValue,
              }
            : oscillator
        ),
      };
    // case SET_NOTE_PITCH:
    //   return {
    //     ...state,
    //     oscillators: state.oscillators.map((oscillator) => {
    //       return {
    //         ...oscillator,
    //         pitch: action.payload,
    //       };
    //     }),
    //   };
    case SET_NOTE_PITCH:
      return {
        ...state,
        notePitch: action.payload,
      };
    case SET_NOTE_PLAYING:
      return {
        ...state,
        notePlaying: action.payload,
      };
    case SET_NOTE_VOLUME:
      return {
        ...state,
        noteVolume: action.payload,
      };
    default:
      return state;
  }
};
