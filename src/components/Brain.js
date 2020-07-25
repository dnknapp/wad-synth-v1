import React, { Fragment, useContext, useEffect, useState } from 'react';
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

  const [componentLoading, setComponentLoading] = useState(true);

  const [osc1, osc2, osc3] = oscillators; // Destructure the oscillators into individual objects

  // Setup state for Wads.
  const [oscillator1Wad, setOscillator1Wad] = useState(new Wad(osc1));
  const [oscillator2Wad, setOscillator2Wad] = useState(new Wad(osc2));
  const [oscillator3Wad, setOscillator3Wad] = useState(new Wad(osc3));

  // Update the Wads if their state changes
  useEffect(() => {
    // Only update the Wad if a note isn't playing, otherwise weird things happen
    if (!notePlaying) {
      setOscillator1Wad(new Wad(osc1));
      setOscillator2Wad(new Wad(osc2));
      setOscillator3Wad(new Wad(osc3));
      // console.log(oscillator1Wad);
    }
  }, [osc1, osc2, osc3, notePlaying]);

  // Setup the PolyWad
  const [allOscillatorWads, setAllOscillatorWads] = useState(new Wad.Poly());

  // Get the data for a note from the context
  const playArgs = {
    // volume: noteVolume, // TODO: get this from each Oscillator volume
    // volume: osc1.volume,
    // pitch: notePitch,
    label: notePitch,
    env: {
      attack: envelopes[0].envelopeAttack.scaledValue,
      decay: envelopes[0].envelopeDecay.scaledValue,
      sustain: envelopes[0].envelopeSustain.scaledValue,
      hold: envelopes[0].envelopeHold,
      release: envelopes[0].envelopeRelease.scaledValue,
    },
  };

  // Play and stop a note
  useEffect(() => {
    // Playing state from the oscillator context
    if (notePlaying) {
      // PolyWad
      // --- Add Wads to the PolyWad
      allOscillatorWads
        .add(oscillator1Wad)
        .add(oscillator2Wad)
        .add(oscillator3Wad);
      // --- Play the PolyWad
      allOscillatorWads.play(playArgs);
      // // Try Individual Oscillators if the Poly Wad doesn't work right
      // oscillator1Wad.play(playArgs);
      // oscillator2Wad.play(playArgs);
      // oscillator3Wad.play(playArgs);
    } else if (!notePlaying) {
      // PolyWad
      // --- Stop the PolyWad. Calling a general stop(). Stop(notePitch) has a bug where the note keeps playing very quietly, causing high cpu usage.
      allOscillatorWads.stop();
      // --- Remove the Wads from the PolyWad so that we don't get Wads added to Wads added to Wads
      allOscillatorWads
        .remove(oscillator1Wad)
        .remove(oscillator2Wad)
        .remove(oscillator3Wad);

      // allOscillatorWads.remove(oscillator1Wad);
      // setAllOscillatorWads(new Wad.Poly());
      // allOscillatorWads.setPitch(0);
      // allOscillatorWads.stop(notePitch);
      // allOscillatorWads.setVolume(0);

      // Try Individual Oscillators if the Poly Wad doesn't work right
      // oscillator1Wad.stop(); // Really I need to stop the previous note before playing the new one
      // TODO: A very low level of sound continues to play even after the volume envelope closes. .setPitch(0) seems to fix this. I want to do .setPitch(0) after the duration of the Oscillator release.
      // oscillator1Wad.setPitch(0);
      // oscillator1Wad.setVolume(0.0); // Doesn't really have an effect
      // oscillator2Wad.stop(notePitch); // Really I need to stop the previous note before playing the new one
      // oscillator2Wad.setPitch(0);
      // oscillator2Wad.setVolume(0.0);
      // oscillator3Wad.stop(notePitch); // Really I need to stop the previous note before playing the new one
      // oscillator3Wad.setPitch(0);
      // oscillator3Wad.setVolume(0.0);
    }
  }, [
    // allOscillatorWads,
    // oscillator1Wad,
    // oscillator2Wad,
    // oscillator3Wad,
    // notePitch,
    notePlaying,
    // oscillatorHold,
    // noteVolume,
    // volumeEnvelopeAttack,
    // volumeEnvelopeDecay,
    // playArgs,
  ]);

  // useEffect(() => {
  //   console.log(allOscillatorWads);
  // }, [allOscillatorWads]);

  return <Fragment />;
};

export default Oscillators;
