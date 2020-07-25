import React, { Fragment, useContext } from 'react';
import EnvelopeContext from '../../context/envelopeContext/envelopeContext';
import SliderNew from '../uiElements/SliderNew';

const Envelope = ({ envelope }) => {
  const envelopeContext = useContext(EnvelopeContext);
  const {
    setEnvelopeAttack,
    setEnvelopeDecay,
    setEnvelopeSustain,
    setEnvelopeRelease,
  } = envelopeContext;

  const {
    id,
    envelopeAttack,
    envelopeDecay,
    envelopeSustain,
    envelopeRelease,
  } = envelope; // These things are set in EnvelopeState.js, but since they're specific to one envelope they're being passed as a prop instead of from Context

  const parameters = [
    {
      paramName: envelopeAttack, // object
      paramSetter: setEnvelopeAttack, // function
      multiplier: 1000,
      power: 2,
    },
    {
      paramName: envelopeDecay,
      paramSetter: setEnvelopeDecay,
      multiplier: 1000,
      power: 2,
    },
    {
      paramName: envelopeSustain,
      paramSetter: setEnvelopeSustain,
      multiplier: 100,
      power: 1,
    },
    {
      paramName: envelopeRelease,
      paramSetter: setEnvelopeRelease,
      multiplier: 1000,
      power: 2,
    },
  ];

  return (
    // <section className={`synthModuleContainer`}>
    //   <h2 className={`synthModuleHeader`}>Amplifier</h2>
    //   <ul>
    //     <li>
    <div className={`synthModuleInner`}>
      <h3 className={`synthModuleSidebar`}>
        <span className={`displaySub block`}>Env</span>{' '}
        <span className={`display block`}>{/* {oscillator.legend} */}</span>
      </h3>
      <div className={`synthModuleControls`}>
        {parameters.map(
          ({ paramName, paramSetter, multiplier, power }, index) => (
            <Fragment key={index}>
              {/* {console.log(paramName, setter, multiplier, power)} */}
              <SliderNew
                label={paramName.label}
                id={paramName.id}
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
    //     </li>
    //   </ul>
    // </section>
  );
};

export default Envelope;
