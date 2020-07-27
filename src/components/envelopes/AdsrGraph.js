import React, { useEffect, useRef, useState } from 'react';
// import EnvelopeContext from '../../context/envelopeContext/envelopeContext';
import styles from './AdsrGraph.module.scss';

const AdsrGraph = ({ envelope }) => {
  const {
    id,
    legend,
    envelopeAttack,
    envelopeDecay,
    envelopeSustain,
    envelopeRelease,
  } = envelope; // These things are set in EnvelopeState.js, but since they're specific to one envelope they're being passed as a prop instead of from Context

  // const [points, setPoints] = useState('');
  // const points = useRef({});
  const x0 = 0;
  const y0 = 50;
  const [x1, setX1] = useState(0);
  const y1 = 0;
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(50);
  const [x3, setX3] = useState(50);
  const [y3, setY3] = useState(50);
  const [x4, setX4] = useState(50);
  const y4 = 50;
  const allPoints = [x0, y0, x1, y1, x2, y2, x3, y3, x4, y4];

  // Update the Attack ramp
  useEffect(() => {
    setX1(envelopeAttack.sliderValue * 5);
  }, [envelopeAttack]);

  // Update the Decay ramp
  useEffect(() => {
    setX2(x1 + envelopeDecay.sliderValue * 5);
  }, [x1, envelopeDecay]);

  // Update Sustain level
  useEffect(() => {
    setY2((envelopeSustain.sliderValue - 1) / (-1 / 50));
    setY3((envelopeSustain.sliderValue - 1) / (-1 / 50));
    setX3(x2 + 50);
    // y = mx + b
    // I think b = 1, because the slider can't go beyond that
    // .75 = m11 + 1
    // .5 = m22 + 1
    // .25 = m33 + 1
    // .25 = (-1 / 50) * x + 1
    // (sliderValue - 1) / (-1 / 50) = x; x is actually the y coordinate we want to set in setY2()
  }, [x2, envelopeSustain]);

  // Update Release ramp
  useEffect(() => {
    setX4(x3 + envelopeRelease.sliderValue * 5);
  }, [x3, envelopeRelease]);

  // Create a Ref for the polyline. This is used to center it.
  const svgRef = useRef();
  const polylineRef = useRef();
  const [polylineTranslate, setPolylineTranslate] = useState(0);
  // TODO: Center the polyline
  // I think it should be: containerWidth/2 - polylineWidth/2
  // FIXME: setPolylineTranslate() + allPoints is causing an infinite loop
  // useEffect(() => {
  //   console.log(svgRef.current.getBoundingClientRect().width);
  //   console.log(polylineRef.current.getBoundingClientRect().width);
  //   setPolylineTranslate(
  //     svgRef.current.getBoundingClientRect().width / 2 -
  //       polylineRef.current.getBoundingClientRect().width / 2
  //   );
  // }, [svgRef, polylineRef, allPoints]);

  return (
    <div className={`${styles.adsrGraphContainer}`}>
      <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" ref={svgRef}>
        {/* <svg x="50%"> */}
        <polyline
          // stroke="#000000"
          // fill="none"
          // points="4,45 38,4 100,25, 160,25 196,45"
          // points={points.current}
          // points={`${x0},${y0} ${x1},${y1}`}
          transform={`translate(${polylineTranslate}, 0)`}
          points={allPoints}
          ref={polylineRef}
        />
        {/* </svg> */}
      </svg>
    </div>
  );
};

export default AdsrGraph;
