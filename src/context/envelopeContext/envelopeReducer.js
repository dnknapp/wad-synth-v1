import {
  SET_ENVELOPE_ATTACK,
  SET_ENVELOPE_DECAY,
  SET_ENVELOPE_SUSTAIN,
  SET_ENVELOPE_HOLD,
  SET_ENVELOPE_RELEASE,
} from './envelopeTypes';

export default (state, action) => {
  switch (action.type) {
    case SET_ENVELOPE_ATTACK:
      return {
        ...state,
        envelopes: state.envelopes.map((envelope) =>
          envelope.id === action.payload.envelopeId
            ? {
                ...envelope,
                envelopeAttack: {
                  ...envelope.envelopeAttack,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : envelope
        ),
      };
    case SET_ENVELOPE_DECAY:
      return {
        ...state,
        envelopes: state.envelopes.map((envelope) =>
          envelope.id === action.payload.envelopeId
            ? {
                ...envelope,
                envelopeDecay: {
                  ...envelope.envelopeDecay,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : envelope
        ),
      };

    case SET_ENVELOPE_SUSTAIN:
      return {
        ...state,
        envelopes: state.envelopes.map((envelope) =>
          envelope.id === action.payload.envelopeId
            ? {
                ...envelope,
                envelopeSustain: {
                  ...envelope.envelopeSustain,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : envelope
        ),
      };

    // case SET_ENVELOPE_HOLD:
    //   return {
    //     ...state,
    //     envelopeHold: {
    //       ...state.envelopeHold,
    //       sliderValue: action.payload.sliderValue,
    //       scaledValue: action.payload.scaledValue,
    //     },
    //   };
    case SET_ENVELOPE_RELEASE:
      return {
        ...state,
        envelopes: state.envelopes.map((envelope) =>
          envelope.id === action.payload.envelopeId
            ? {
                ...envelope,
                envelopeRelease: {
                  ...envelope.envelopeRelease,
                  sliderValue: action.payload.sliderValue,
                  scaledValue: action.payload.scaledValue,
                },
              }
            : envelope
        ),
      };
    default:
      return state;
  }
};
