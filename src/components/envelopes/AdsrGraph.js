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
  // const allPoints = [
  //   `${x0}%`,
  //   `${y0}%`,
  //   `${x1}%`,
  //   `${y1}%`,
  //   `${x2}%`,
  //   `${y2}%`,
  //   `${x3}%`,
  //   `${y3}%`,
  //   `${x4}%`,
  //   `${y4}%`,
  // ];

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
  // const svgRef = useRef();
  // const polylineRef = useRef();
  // const polylineWidth = useRef(0);
  // const polylineTranslate = useRef(0);
  // TODO: Center the polyline... This isn't working right but I don't think I like it anyway
  // useEffect(() => {
  //   polylineWidth.current = polylineRef.current.getBoundingClientRect().width;
  // }, [allPoints]);

  // useEffect(() => {
  //   console.log(polylineWidth.current);
  //   polylineTranslate.current =
  //     svgRef.current.getBoundingClientRect().width / 2 - polylineWidth.current;
  // }, [polylineWidth.current]);

  // useEffect(() => {
  //   // console.log(svgRef.current.getBoundingClientRect().width);
  //   console.log(polylineRef.current.getBoundingClientRect().width);
  //   // setPolylineTranslate(
  //   //   svgRef.current.getBoundingClientRect().width / 2 -
  //   //     polylineRef.current.getBoundingClientRect().width / 2
  //   // );
  //   // setPolylineTranslate(
  //   //   200 - polylineRef.current.getBoundingClientRect().width
  //   // );
  // }, [allPoints]);
  // }, [svgRef, polylineRef, allPoints]);

  return (
    <div className={`${styles.adsrGraphContainer}`}>
      <svg
        viewBox="0 0 200 50"
        // width="100%"
        // height="100%"
        preserveAspectRatio="none" // stretch the svg to fit the container
        xmlns="http://www.w3.org/2000/svg"
        // ref={svgRef}
      >
        {/* Turning this off because I don't know how to make the dots circular again */}
        <defs>
          <marker
            id={`${id}-dot`}
            viewBox="0 0 4 4"
            refX="2"
            refY="2"
            markerWidth="4"
            markerHeight="4"
            // preserveAspectRatio="xMidYMid"
            // markerUnits="userSpaceOnUse"
          >
            {/* <circle cx="5" cy="5" r="5" fill="white" /> */}
            <line
              x1="2"
              y1="2"
              x2="2"
              y2="2"
              vectorEffect="non-scaling-stroke"
              className={`${styles.vertex}`}
            />
          </marker>
        </defs>

        <line
          x1="-10"
          y1=".5"
          x2="210"
          y2=".5"
          strokeDasharray="1, 2"
          vectorEffect="non-scaling-stroke"
          className={`${styles.gridLine}`}
        />
        <line
          x1="-10"
          y1="16"
          x2="210"
          y2="16"
          strokeDasharray="1, 2"
          vectorEffect="non-scaling-stroke"
          className={`${styles.gridLine}`}
        />
        <line
          x1="-10"
          y1="33"
          x2="210"
          y2="33"
          strokeDasharray="1, 2"
          vectorEffect="non-scaling-stroke"
          className={`${styles.gridLine}`}
        />
        <line
          x1="-10"
          y1="49.5"
          x2="210"
          y2="49.5"
          strokeDasharray="1, 2"
          vectorEffect="non-scaling-stroke"
          className={`${styles.gridLine}`}
        />

        <polyline
          // transform={`translate(${polylineTranslate.current}, 0)`}
          points={allPoints}
          vectorEffect="non-scaling-stroke" // keep the stroke width correct when the svg stretches
          markerStart={`url(#${id}-dot)`}
          markerMid={`url(#${id}-dot)`}
          markerEnd={`url(#${id}-dot)`}
          // ref={polylineRef}
        />
      </svg>
    </div>
  );
};

export default AdsrGraph;
