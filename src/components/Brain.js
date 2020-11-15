import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Wad from 'web-audio-daw';
import OscillatorContext from '../context/oscillatorContext/oscillatorContext';
// import VolumeEnvelopeContext from '../context/volumeEnvelopeContext/volumeEnvelopeContext';
import EnvelopeContext from '../context/envelopeContext/envelopeContext';
// import Oscillator from './Oscillator';

const Oscillators = () => {
  const oscillatorContext = useContext(OscillatorContext);
  const { oscillators, notePlaying, notePitch, noteVolume } = oscillatorContext;

  // const volumeEnvelopeContext = useContext(VolumeEnvelopeContext);
  // const {
  //   volumeEnvelopeAttack,
  //   volumeEnvelopeDecay,
  //   volumeEnvelopeSustain,
  //   volumeEnvelopeHold,
  //   volumeEnvelopeRelease,
  // } = volumeEnvelopeContext;

  const envelopeContext = useContext(EnvelopeContext);
  const { envelopes } = envelopeContext;

  const [osc1, osc2, osc3] = oscillators; // Destructure the oscillators into individual objects

  const allOscillatorWads = useRef();

  const meterIntervalId = useRef();

  useEffect(() => {
    // Get the envelope settings
    const playArgs = {
      // volume: noteVolume, // TODO: get this from each Oscillator volume
      // volume: osc1.volume,
      // pitch: notePitch,
      // label: notePitch,
      env: {
        attack: envelopes[0].envelopeAttack.scaledValue,
        decay: envelopes[0].envelopeDecay.scaledValue,
        sustain: envelopes[0].envelopeSustain.scaledValue,
        hold: envelopes[0].envelopeHold,
        release: envelopes[0].envelopeRelease.scaledValue,
      },
    };

    // Play and stop a note
    if (notePlaying === true) {
      allOscillatorWads.current = new Wad.Poly({
        audioMeter: {
          clipLevel: 0.98, // the level (0 to 1) that you would consider "clipping".
          averaging: 0.95, // how "smoothed" you would like the meter to be over time. Should be between 0 and less than 1.
          clipLag: 750, // how long you would like the "clipping" indicator to show after clipping has occured, in milliseconds.
        },
      });
      allOscillatorWads.current
        .add(new Wad(osc1))
        .add(new Wad(osc2))
        .add(new Wad(osc3));

      allOscillatorWads.current.play(playArgs);

      // Log the audioMeter level to check if it's clipping
      // TODO: Don't just log this stuff, set a clipping state to be consumed in Output.js
      meterIntervalId.current = setInterval(() => {
        console.log(
          'Volume: ',
          allOscillatorWads.current.audioMeter.volume.toFixed(3)
        );
        console.log(
          'Clipping: ',
          allOscillatorWads.current.audioMeter.checkClipping()
        );
      }, 500);
    } else if (notePlaying === false) {
      typeof allOscillatorWads.current !== 'undefined' &&
        allOscillatorWads.current.stop();
      clearInterval(meterIntervalId.current); // Stop the audioMeter
    }
  }, [notePlaying]);

  return <Fragment />;
};

export default Oscillators;
