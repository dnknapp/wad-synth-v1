import React, { Fragment } from 'react';
import SliderNew from '../uiElements/SliderNew';

const Output = () => {
  const id = 'output';

  const parameters = [
    {
      paramName: {}, // object
      paramSetter: () => {}, // function
      multiplier: 1000,
      power: 2,
    },
    // {
    //   paramName: envelopeDecay,
    //   paramSetter: setEnvelopeDecay,
    //   multiplier: 1000,
    //   power: 2,
    // },
    // {
    //   paramName: envelopeSustain,
    //   paramSetter: setEnvelopeSustain,
    //   multiplier: 100,
    //   power: 1,
    // },
    // {
    //   paramName: envelopeRelease,
    //   paramSetter: setEnvelopeRelease,
    //   multiplier: 1000,
    //   power: 2,
    // },
  ];

  // TODO: Make slider adjust overall output
  // TODO: Add clipping indicator. Set a clipping state in Brain.js using the audioMeter
  // TODO: Move this component the keyboard so that it's always visibible?

  return (
    <section className={`synthModuleContainer`}>
      <h2 className={`synthModuleHeader`}>Output</h2>
      <ul>
        <li>
          <div className={`synthModuleInner`}>
            <div className={`synthModuleSidebar`}>{/* Empty sidebar */}</div>
            <div className={`synthModuleControls`}>
              {parameters.map(
                ({ paramName, paramSetter, multiplier, power }, index) => (
                  <Fragment key={index}>
                    {/* {console.log(paramName, setter, multiplier, power)} */}
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
        </li>
      </ul>
    </section>
  );
};

export default Output;
