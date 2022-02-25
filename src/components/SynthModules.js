import React from 'react';
import Envelopes from './envelopes/Envelopes';
import Keyboard from './keyboard/Keyboard';
import Oscillators from './oscillators/Oscillators';
import Output from './output/Output';
import styles from './SynthModules.module.scss';
import VolumeEnvelope from './volumeEnvelope/VolumeEnvelope';

const SynthModules = () => {
  return (
    <main className={`${styles.mainContainer}`}>
      {/* <div className="App"> */}
      <h1 className={`srOnly`}>I'm a synth</h1>
      <Oscillators />
      <Envelopes />
      <VolumeEnvelope />
      <Output />
      <Keyboard />
      {/* </div> */}
    </main>
  );
};

export default SynthModules;
