import React from 'react';
import PropTypes from 'prop-types';
import Tour from 'reactour';

import {
  OVERVIEW,
  WALLET,
  EXCHANGE,
  INVEST,
} from '../../containers/Dashboard/actions';

import A from '../A';
import Alert from '../Alert';

const InvestTour = ({
  setActiveTab,
  setAmountUnit,
  setInvestType,
  investTour,
  toggleInvestTour,
}) => {
  const stepStyle = { borderRadius: 10 };
  const metaMaskWarning = (<Alert theme="danger">
    <i>Make sure that MetaMask is using the &#39;Ethereum Main Net&#39;!</i>
  </Alert>);
  const confirmationNote = (<Alert theme="info">
    You will confirmation in the &#39;Overview&#39; tab.
  </Alert>);
  const STEPS = [
    {
      selector: '[data-tour="tour-begin"]',
      content: (<div>
        To invest in Acebusters, follow these easy steps:
        <ol>
          <li>Unlock your account</li>
          <li>Deposit ether</li>
          <li>Exchange ether for nutz</li>
          <li>Power Up!</li>
        </ol>
      </div>),
      style: stepStyle,
    },
    {
      selector: '[data-tour="wallet"]',
      content: <div>Goto the &#39;Wallet&#39; tab</div>,
      showNavigationNumber: false,
      action: () => setActiveTab(WALLET),
      style: stepStyle,
    },
    {
      selector: '[data-tour="wallet-receive"]',
      content: (<div>
        Unlock your account:
        <ol>
          <li>Install the <A href="https://metamask.io/" target="_blank">MetaMask</A> plugin for Chrome, Edge, Firefox or Opera</li>
          <li>Fund your MetaMask wallet with ether</li>
          <li>Click the &#39;Unlock your Account&#39; button</li>
        </ol>
        {metaMaskWarning}
      </div>),
      showNavigationNumber: false,
      style: stepStyle,
    },
    {
      selector: '[data-tour="wallet-receive"]',
      content: (<div>
        <p>From the MetaMask wallet, deposit ether to your account address (in green).</p>
        {confirmationNote}
        {metaMaskWarning}
      </div>),
      style: stepStyle,
    },
    {
      selector: '[data-tour="exchange"]',
      content: <div>Goto the &#39;Exchange&#39; tab</div>,
      action: () => {
        setActiveTab(EXCHANGE);
        setAmountUnit('eth');
      },
      style: stepStyle,
    },
    {
      selector: '[data-tour="exchange-eth-form"]',
      content: (<div>
        <p>Select the &#39;Ethereum&#39; from the dropdown, and use the form to exchange ETH for NTZ.</p>
        {confirmationNote}
      </div>),
      style: stepStyle,
    },
    {
      selector: '[data-tour="invest"]',
      content: <div>Goto the &#39;Invest&#39; tab</div>,
      action: () => {
        setActiveTab(INVEST);
        setInvestType('powerUp');
      },
      style: stepStyle,
    },
    {
      selector: '[data-tour="dashboard-invest-powerUp"]',
      content: (<div>
        <p>Using the Power Up form, Power Up your NTZ, and receive ABP.</p>
        {confirmationNote}
      </div>),
      style: stepStyle,
    },
    {
      selector: '[data-tour="dashboard-invest-powerUp"]',
      content: 'Congratuations! You are now part of the Acebusters economy',
      style: stepStyle,
    },
  ];
  return (
    <Tour
      steps={STEPS}
      isOpen={investTour}
      onRequestClose={toggleInvestTour}
      onBeforeClose={() => setActiveTab(OVERVIEW)}
      scrollDuration={20}
      showNavigationNumber={false}
      showNavigation
      showNumber={false}
      startAt={0}
      lastStepNextButton="Done"
    />
  );
};
InvestTour.propTypes = {
  setActiveTab: PropTypes.func,
  setAmountUnit: PropTypes.func,
  setInvestType: PropTypes.func,
  investTour: PropTypes.bool.isRequired,
  toggleInvestTour: PropTypes.func.isRequired,
};

export default InvestTour;
