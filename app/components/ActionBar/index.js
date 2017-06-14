/**
 * Created by helge on 24.08.16.
 */
import React from 'react';

import AmountFlag from './AmountFlag';
import ControlBetRaise from './ControlBetRaise';
import ControlCheckCall from './ControlCheckCall';
import ControlFold from './ControlFold';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

const ActionBar = (props) => {
  if (props.visible) {
    return (
      <ActionBarWrapper name="action-bar-wrapper">
        <AmountFlag {...props} />
        <ControlPanel name="control-panel-visible">
          <ControlFold {...props} />
          <ControlCheckCall {...props} />
          <ControlBetRaise {...props} />
        </ControlPanel>
      </ActionBarWrapper>
    );
  }
  return null;
};

ActionBar.propTypes = {
  visible: React.PropTypes.bool,
};

export default ActionBar;
