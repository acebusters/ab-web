import React from 'react';

import H2 from '../H2';
import Tabs from './Tabs';
import PanesRoot from './PanesRoot';
import PowerUp from './PowerUp';
import PowerDown from './PowerDown';

import { Pane, Section, ExchangeContainer } from './styles';

const TABS = [
  {
    name: 'PowerUp',
    title: 'PowerUp',
  },
  {
    name: 'PowerDown',
    title: 'PowerDown',
  },
];

const PANES = {
  powerUp: PowerUp,
  powerDown: PowerDown,
};

const Invest = (props) => (
  <Pane name="dashboard-exchange" >
    <Section>
      <H2>Acebuster Power (ABP/NTZ)</H2>
      <ExchangeContainer>
        <Tabs tabs={TABS} {...props} />
        <PanesRoot
          panes={PANES}
          paneType="powerUp"
          paneProps={{
            ...props,
          }}
        />
      </ExchangeContainer>
    </Section>
  </Pane>
);
export default Invest;
