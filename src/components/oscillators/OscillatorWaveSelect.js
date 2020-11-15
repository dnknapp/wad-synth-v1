import React, { Fragment, memo, useContext } from 'react';
// import OscillatorContext from '../../context/oscillatorContext/oscillatorContext';
// import styles from './OscillatorWaveSelect.module.scss';

const OscillatorWaveSelect = ({ id, waveSelected, setOscillatorSource }) => {
  // const oscillatorContext = useContext(OscillatorContext);
  // const { setOscillatorSource } = oscillatorContext;
  const waveforms = [
    {
      value: 'triangle',
      text: 'tri',
      points: '1,6 4,1 10,11 16,1 22,11 25,6',
      path: '',
    },
    {
      value: 'sawtooth',
      text: 'saw',
      points: '1,6 1,1 13,11 13,1 25,11 25,6',
      path: '',
    },
    {
      value: 'square',
      text: 'sqr',
      points: '1,6 1,1 7,1 7,11 13,11 13,1 19,1 19,11 25,11 25,6',
      path: '',
    },
    {
      value: 'sine',
      text: 'sin',
      path:
        'M1,6 L1.54281953,2.77336094 C1.7972689,1.26085776 3.10365804,0.264630311 4.46072134,0.548224658 C5.47427145,0.760032819 6.26713982,1.64371741 6.45718047,2.77336094 L7.54281953,9.22663906 C7.7972689,10.7391422 9.10365804,11.7353697 10.4607213,11.4517753 C11.4742715,11.2399672 12.2671398,10.3562826 12.4571805,9.22663906 L13.5428195,2.77336094 C13.7972689,1.26085776 15.103658,0.264630311 16.4607213,0.548224658 C17.4742715,0.760032819 18.2671398,1.64371741 18.4571805,2.77336094 L19.5428195,9.22663906 C19.7972689,10.7391422 21.103658,11.7353697 22.4607213,11.4517753 C23.4742715,11.2399672 24.2671398,10.3562826 24.4571805,9.22663906 L25,6 L25,6',
    },
  ];

  // Set the source/waveform for an oscillator
  const handleSelectWave = (e) => {
    setOscillatorSource(id, e.target.value);
  };
  return (
    <Fragment>
      {/* <svg viewBox="0 0 26 12" xmlns="http://www.w3.org/2000/svg">
        <polyline
          stroke="#000000"
          fill="none"
          points="1,6 4,1 10,11 16,1 22,11 25,6"
        />
      </svg> */}

      {/* <?xml version="1.0" encoding="UTF-8"?>
<svg width="26px" height="12px" viewBox="0 0 26 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Path Copy 3</title>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Artboard" stroke="#000000">
            <path d="M1,6 L1.54281953,2.77336094 C1.7972689,1.26085776 3.10365804,0.264630311 4.46072134,0.548224658 C5.47427145,0.760032819 6.26713982,1.64371741 6.45718047,2.77336094 L7.54281953,9.22663906 C7.7972689,10.7391422 9.10365804,11.7353697 10.4607213,11.4517753 C11.4742715,11.2399672 12.2671398,10.3562826 12.4571805,9.22663906 L13.5428195,2.77336094 C13.7972689,1.26085776 15.103658,0.264630311 16.4607213,0.548224658 C17.4742715,0.760032819 18.2671398,1.64371741 18.4571805,2.77336094 L19.5428195,9.22663906 C19.7972689,10.7391422 21.103658,11.7353697 22.4607213,11.4517753 C23.4742715,11.2399672 24.2671398,10.3562826 24.4571805,9.22663906 L25,6 L25,6" id="Path-Copy-3"></path>
        </g>
    </g>
</svg> */}

      <h4 className={`labelBg inline`}>Shape</h4>
      <div className={`selectButtonGroup`}>
        {waveforms.map(({ value, text, points, path }, index) => (
          <Fragment key={index}>
            {/* TODO: Change these to buttons so that keyboard navigation is better */}
            <input
              type="radio"
              id={`${id}${value}`}
              name={`${id}WaveSelect`}
              value={value}
              onChange={handleSelectWave}
              checked={waveSelected === value}
            />
            <label
              htmlFor={`${id}${value}`}
              className={`input`}
              aria-label={value}
            >
              {/* {text} */}
              <svg viewBox="0 0 26 12" xmlns="http://www.w3.org/2000/svg">
                <polyline
                  // stroke="#E4E9F2"
                  // strokeWidth="1px"
                  // fill="none"
                  points={points}
                />
                <path
                  // stroke="#E4E9F2"
                  // strokeWidth="1px"
                  // fill="none"
                  d={path}
                />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default memo(OscillatorWaveSelect);
