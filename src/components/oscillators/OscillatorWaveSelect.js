import React, { Fragment } from 'react';
import styles from './OscillatorWaveSelect.module.scss';

const OscillatorWaveSelect = ({ id, handleSelectWave, waveSelected }) => {
  const waveforms = [
    {
      value: 'triangle',
      text: 'tri',
    },
    {
      value: 'sawtooth',
      text: 'saw',
    },
    {
      value: 'square',
      text: 'sqr',
    },
    {
      value: 'sine',
      text: 'sin',
    },
  ];
  return (
    <Fragment>
      <h4 className={`labelBg inline`}>Shape</h4>
      <div className={`selectButtonGroup`}>
        {waveforms.map(({ value, text }, index) => (
          <Fragment key={index}>
            <input
              type="radio"
              id={`${id}${value}`}
              name={`${id}WaveSelect`}
              value={value}
              onChange={handleSelectWave}
              checked={waveSelected === value}
            />
            <label htmlFor={`${id}${value}`} className={`input`}>
              {text}
            </label>
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default OscillatorWaveSelect;
