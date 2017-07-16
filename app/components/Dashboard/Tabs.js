import React from 'react';
import PropTypes from 'prop-types';

const Tabs = (props) => {
  const { tabs, setActiveTab } = props;
  return (
    <ul name="tabs" style={{ margin: '80px 0 0 80px' }}>
      {tabs.map((tab) => (
        <li name="tab" key={tab}>
          <button onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};
Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tabs;
