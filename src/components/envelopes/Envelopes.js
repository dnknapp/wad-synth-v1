import React, { Fragment, useContext, useEffect, useState } from 'react';
import EnvelopeContext from '../../context/envelopeContext/envelopeContext';

import Envelope from './Envelope';

const Envelopes = () => {
  const envelopeContext = useContext(EnvelopeContext);
  const { envelopes } = envelopeContext;

  const [env1, env2] = envelopes;

  return (
    <section className={`synthModuleContainer`}>
      <h2 className={`synthModuleHeader`}>Envelopes</h2>
      <ul>
        <li>
          <Envelope envelope={env1} />
        </li>
        <li>
          <Envelope envelope={env2} />
        </li>
      </ul>
    </section>
  );
};

export default Envelopes;
