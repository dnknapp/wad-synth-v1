import React, { Fragment, memo, useContext, useState } from 'react';
// import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
// import styles from './OscillatorOctaveSelect.module.scss';

const OscillatorOctaveSelect = ({ id, setOscillatorOctave }) => {
  // const oscillatorContext = useContext(OscillatorContext);
  // const { setOscillatorOctave } = oscillatorContext;

  // Transpose the pitch for different octave settings
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

  const [octaveSelected, setOctaveSelected] = useState('octave0');

  const handleSelectOctave = (e) => {
    setOctaveSelected(e.target.value);
    switch (e.target.value) {
      case 'octaveMinus2':
        setOscillatorOctave(id, 0.25);
        break;
      case 'octaveMinus1':
        setOscillatorOctave(id, 0.5);
        break;
      case 'octave0':
        setOscillatorOctave(id, 1);
        break;
      case 'octavePlus1':
        setOscillatorOctave(id, 2);
        break;
      case 'octavePlus2':
        setOscillatorOctave(id, 4);
        break;
      default:
      //
    }
  };

  return (
    <Fragment>
      <h4 className={`labelBg inline`}>Octave</h4>
      <div className={`selectButtonGroup`}>
        {octaves.map(({ value, text }, index) => (
          <Fragment key={index}>
            {/* TODO: Change these to buttons so that keyboard navigation is better */}
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

// TODO: There are weird rerenders happening. I don't know what's going on.
// const equalProps = (prevProps, nextProps) => {
//   console.log(prevProps.id);
//   console.log(nextProps.id);
//   console.log(prevProps.id === nextProps.id);
//   if (prevProps.id === nextProps.id) {
//     return true;
//   } else {
//     return false;
//   }
// };

export default OscillatorOctaveSelect;
// export default memo(OscillatorOctaveSelect, equalProps);
