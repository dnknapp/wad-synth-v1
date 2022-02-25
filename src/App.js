import React from 'react';
import './App.scss';
//Components
import Brain from './components/Brain'; // Where Wads are constructed
import SynthModules from './components/SynthModules';
import EnvelopeState from './context/envelopeContext/EnvelopeState';
// State/Context
import OscillatorState from './context/oscillatorContext/OscillatorState';
import VolumeEnvelopeState from './context/volumeEnvelopeContext/VolumeEnvelopeState';
// import Oscillators from './components/oscillators/Oscillators';
// import VolumeEnvelope from './components/volumeEnvelope/VolumeEnvelope';
// import Keyboard from './components/keyboard/Keyboard';

function App() {
  return (
    <OscillatorState>
      <EnvelopeState>
        {/* TODO: delete VolumeEnvelopeState once EnvelopeState works correctly */}
        <VolumeEnvelopeState>
          <Brain />
          <SynthModules />
        </VolumeEnvelopeState>
      </EnvelopeState>
    </OscillatorState>
  );
}

export default App;
