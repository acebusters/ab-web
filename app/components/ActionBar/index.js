/**
 * Created by helge on 24.08.16.
 */
import React from 'react';

import ControlBetRaise from './ControlBetRaise';
import ControlCheckCall from './ControlCheckCall';
import ButtonBlank from './ButtonBlank';
import ControlFold from './ControlFold';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

const ActionBar = (props) => (
  <ActionBarWrapper name="action-bar-wrapper">
    {props.visible ?
      <ControlPanel name="control-panel-visible">
        <ControlFold {...props} />
        <ControlCheckCall {...props} />
        <ControlBetRaise {...props} />
      </ControlPanel>
      :
      <ControlPanel name="control-panel-null">
        <ButtonBlank />
        <ButtonBlank />
        <ButtonBlank />
      </ControlPanel>
    }
  </ActionBarWrapper>
);

ActionBar.propTypes = {
  visible: React.PropTypes.bool,
};

export default ActionBar;
