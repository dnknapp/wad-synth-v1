import React from 'react';
import styles from './SynthModules.module.scss';
import Oscillators from './oscillators/Oscillators';
import VolumeEnvelope from './volumeEnvelope/VolumeEnvelope';
import Keyboard from './keyboard/Keyboard';
import Envelopes from './envelopes/Envelopes';

const SynthModules = () => {
  return (
    <main className={`${styles.mainContainer}`}>
      {/* <div className="App"> */}
      <h1 className={`srOnly`}>I'm a synth</h1>
      <Oscillators />
      <Envelopes />
      <VolumeEnvelope />

      <Keyboard />
      {/* </div> */}
    </main>
  );
};

export default SynthModules;
