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

import Archive from './archive';
import Overview from '../../components/Dashboard/Overview';
import Wallet from '../../components/Dashboard/Wallet';
import Exchange from '../../components/Dashboard/Exchange';

import PanesRoot from '../../components/Dashboard/PanesRoot';
import Tabs from '../../components/Dashboard/Tabs';

const PANES = {
  [ARCHIVE]: Archive,
  [OVERVIEW]: Overview,
  [WALLET]: Wallet,
  [EXCHANGE]: Exchange,
};

const TABS = [
  {
    title: ARCHIVE,
    icon: 'fa-archive',
  },
  {
    title: OVERVIEW,
    icon: 'fa-tachometer',
  },
  {
    title: WALLET,
    icon: 'fa-money',
  },
  {
    title: EXCHANGE,
    icon: 'fa-exchange',
  },
];

const DashboardRoot = (props) => (
  <Container>
    <Tabs tabs={TABS} {...props} />
    <PanesRoot
      panes={PANES}
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
