import React, { useContext, useEffect, useState, Fragment } from 'react';
import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
import styles from './Oscillators.module.scss';
import OscillatorWaveSelect from './OscillatorWaveSelect';
import OscillatorOctaveSelect from './OscillatorOctaveSelect';
import SliderNew from '../uiElements/SliderNew';

const Oscillator = ({ oscillator }) => {
  const oscillatorContext = useContext(OscillatorContext);
  const {
    setOscillatorSource,
    setOscillatorVolume,
    setOscillatorOctave,
    setOscillatorDetuneCoarse,
    setOscillatorDetuneFine,
    setOscillatorDetune,
  } = oscillatorContext;

  // TODO: Rename these things in the state. I think the way I did envelopes makes more sense.
  const {
    id,
    source,
    volume,
    volumeControl,
    detuneControlCoarse,
    detuneControlFine,
  } = oscillator; // These things are set in OscillatorState.js, but since they're specific to one oscillator they're being passed as a prop instead of from Context

  // Update the oscillator's detune value if either detuneControlCoarse or detuneControlFine change
  useEffect(() => {
    setOscillatorDetune(
      id,
      detuneControlCoarse.scaledValue + detuneControlFine.scaledValue
    );
    // eslint-disable-next-line
  }, [detuneControlCoarse, detuneControlFine]);

  // Sliders
  const parameters = [
    {
      paramName: detuneControlCoarse, // object
      paramSetter: setOscillatorDetuneCoarse, // function
      multiplier: 0.01,
      power: 1,
    },
    {
      paramName: detuneControlFine,
      paramSetter: setOscillatorDetuneFine,
      multiplier: 1,
      power: 1,
    },
    {
      paramName: volumeControl,
      paramSetter: setOscillatorVolume,
      multiplier: 100,
      power: 1,
    },
  ];

  return (
    <div className={`synthModuleInner`}>
      <h3 className={`synthModuleSidebar`}>
        <span className={`displaySub block`}>Osc</span>{' '}
        <span className={`display block`}>{oscillator.legend}</span>
      </h3>
      <div className={`synthModuleControls`}>
        <OscillatorWaveSelect
          id={id}
          waveSelected={source}
          setOscillatorSource={setOscillatorSource}
        />
        <OscillatorOctaveSelect
          id={id}
          setOscillatorOctave={setOscillatorOctave}
        />
        {parameters.map(
          (
            { paramName, paramSetter, multiplier, power, currentDetune },
            index
          ) => (
            <Fragment key={index}>
              <SliderNew
                label={paramName.label}
                moduleId={id}
                paramId={paramName.id}
                min={paramName.min}
                max={paramName.max}
                step={paramName.step}
                sliderValue={paramName.sliderValue}
                scaledValue={paramName.scaledValue}
                // disabled={disabled}
                multiplier={multiplier}
                decimal={0}
                paramName={paramName}
                paramSetter={paramSetter}
                power={power}
              />
            </Fragment>
          )
        )}
      </div>
    </div>
  );
};

export default Oscillator;
