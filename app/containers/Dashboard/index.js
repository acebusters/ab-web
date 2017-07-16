import React from 'react';
import PropTypes from 'prop-types';

import Overview from './Overview';
import Wallet from './Wallet';
import Exchange from './Exchange';

import { OVERVIEW, WALLET, EXCHANGE } from './constants';

const PANE_COMPONENTS = {
  OVERVIEW: Overview,
  WALLET: Wallet,
  EXCHANGE: Exchange,
};

const PanesRoot = ({ panes, paneType, paneProps }) => {
  if (!paneType) {
    return null;
  }
  const SpecifiedPane = panes[paneType];
  return <SpecifiedPane name="dashboard-root" {...paneProps} />;
};
PanesRoot.propTypes = {
  panes: PropTypes.object.isRequired,
  paneType: PropTypes.string.isRequired,
  paneProps: PropTypes.object.isRequired,
};
PanesRoot.defaultProps = {
  paneType: 'WALLET',
  paneProps: {
    signerAddr: '1234',
  },
};

const Tabs = ({ tabs }) => (
  <ul name="tabs" style={{ margin: '80px 0 0 80px' }}>
    {tabs.map((tab) => (
      <li name="tab" key={tab}>
        <button>
          {/* onClick={() => console.log(tab)} */}
          {tab}
        </button>
      </li>
    ))}
  </ul>
);
Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
};

const Header = (props) => (
  <div>
    <Tabs {...props} />
  </div>
);

const DashboardRoot = () => (
  <div>
    <Header tabs={[OVERVIEW, WALLET, EXCHANGE]} />
    <PanesRoot
      panes={PANE_COMPONENTS}
      paneType={'WALLET'}
      paneProps={{
        signerAddr: 'jonathan',
      }}
    />
  </div>
);

export default DashboardRoot;
// export default connect(
//   state => state.modal,
// )(DashboardRoot);
