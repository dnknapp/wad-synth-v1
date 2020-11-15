import React, { Fragment, useContext, useEffect, useState } from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import Oscillator from './Oscillator';

const Oscillators = () => {
  const oscillatorContext = useContext(OscillatorContext);
  const { oscillators } = oscillatorContext;

  const [osc1, osc2, osc3] = oscillators;

  return (
    <section className={`synthModuleContainer`}>
      <h2 className={`synthModuleHeader`}>Oscillators</h2>
      <ul>
        <li>
          <Oscillator oscillator={osc1} />
        </li>
        <li>
          <Oscillator oscillator={osc2} />
        </li>
        <li>
          <Oscillator oscillator={osc3} />
        </li>
      </ul>
      {/* {oscillators.map((oscillator) => (
        <Oscillator oscillatorId={oscillator.id} key={oscillator.id} />
      ))} */}
      {/* <Oscillator oscillatorId={'osc1'} />
      <Oscillator oscillatorId={'osc2'} />
      <Oscillator oscillatorId={'osc3'} /> */}
    </section>
  );
};

export default Oscillators;
