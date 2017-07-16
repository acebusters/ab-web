import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import {
  ARCHIVE,
  OVERVIEW,
  WALLET,
  EXCHANGE,
  setActiveTab,
} from './actions';

import { getActiveTab } from './selectors';
import Container from '../../components/Container';

import Archive from '../../components/Dashboard/Archive';
import Overview from '../../components/Dashboard/Overview';
import Wallet from '../../components/Dashboard/Wallet';
import Exchange from '../../components/Dashboard/Exchange';

import PanesRoot from '../../components/Dashboard/PanesRoot';
import Tabs from '../../components/Dashboard/Tabs';

const PANE_COMPONENTS = {
  [ARCHIVE]: Archive,
  [OVERVIEW]: Overview,
  [WALLET]: Wallet,
  [EXCHANGE]: Exchange,
};

const DashboardRoot = (props) => (
  <Container>
    <Tabs tabs={[ARCHIVE, OVERVIEW, WALLET, EXCHANGE]} {...props} />
    <PanesRoot
      panes={PANE_COMPONENTS}
      paneType={props.activeTab}
      paneProps={props}
    />
  </Container>
);
DashboardRoot.propTypes = {
  activeTab: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  setActiveTab: (whichTab) => dispatch(setActiveTab(whichTab)),
});

const mapStateToProps = createStructuredSelector({
  activeTab: getActiveTab(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardRoot);
