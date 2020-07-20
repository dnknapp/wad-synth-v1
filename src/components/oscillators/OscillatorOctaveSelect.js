import React, { Fragment } from 'react';
import styles from './OscillatorOctaveSelect.module.scss';

const OscillatorOctaveSelect = ({ id, handleSelectOctave, octaveSelected }) => {
  const octaves = [
    {
      value: 'octaveMinus2',
      text: '-2',
    },
    {
      value: 'octaveMinus1',
      text: '-1',
    },
    {
      value: 'octave0',
      text: '0',
    },
    {
      value: 'octavePlus1',
      text: '+1',
    },
    {
      value: 'octavePlus2',
      text: '+2',
    },
  ];

  return (
    <Fragment>
      <h4 className={`labelBg inline`}>Octave</h4>
      <div className={`selectButtonGroup`}>
        {octaves.map(({ value, text }, index) => (
          <Fragment key={index}>
            <input
              type="radio"
              id={`${id}${value}`}
              name={`${id}OctaveSelect`}
              value={value}
              onChange={handleSelectOctave}
              checked={octaveSelected === value}
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

export default OscillatorOctaveSelect;
