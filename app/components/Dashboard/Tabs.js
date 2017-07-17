import React from 'react';
import PropTypes from 'prop-types';

import { Tab, TabButton, TabsWrapper } from './styles';

const Tabs = ({ activeTab, tabs, setActiveTab }) => (
  <TabsWrapper name="tabs">
    {tabs.map((tab) => (
      <Tab active={tab === activeTab} name="tab" key={tab}>
        <TabButton
          disabled={tab === activeTab}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </TabButton>
      </Tab>
    ))}
  </TabsWrapper>
);
Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tabs;
