/**
 * Created by helge on 24.08.16.
 */
import React from 'react';

import FlagBetAmount from './FlagBetAmount';
import FlagCallAmount from './FlagCallAmount';
import ControlBetRaise from './ControlBetRaise';
import ControlCheckCall from './ControlCheckCall';
import ControlFold from './ControlFold';
import ControlBlank from './ControlBlank';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

const ActionBar = (props) => {
  if (props.visible) {
    if (props.active) {
      return (
        <ActionBarWrapper name="action-bar-wrapper">
          <FlagBetAmount {...props} />
          <FlagCallAmount {...props} />
          <ControlPanel name="control-panel-visible">
            <ControlFold {...props} />
            <ControlCheckCall {...props} />
            <ControlBetRaise {...props} />
          </ControlPanel>
        </ActionBarWrapper>
      );
    }
    return (
      <ActionBarWrapper style={{ opacity: 0.5 }}>
        <ControlPanel>
          <ControlBlank />
          <ControlBlank />
          <ControlBlank />
        </ControlPanel>
      </ActionBarWrapper>
    );
  }
  return null;
};

ActionBar.propTypes = {
  visible: React.PropTypes.bool,
  active: React.PropTypes.bool,
};

export default ActionBar;
