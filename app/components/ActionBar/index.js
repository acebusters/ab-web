/**
 * Created by helge on 24.08.16.
 */
import React from 'react';

import ButtonBetRaise from './ButtonBetRaise';
import ButtonCheckCall from './ButtonCheckCall';
import ButtonNull from './ButtonNull';
import ButtonFold from './ButtonFold';

import {
  ActionBarWrapper,
  ControlPanel,
} from './styles';

const ActionBar = (props) => (
  <ActionBarWrapper name="action-bar-wrapper">
    {props.visible ?
      <ControlPanel name="control-panel-visible">
        <ButtonFold {...props} />
        <ButtonCheckCall {...props} />
        <ButtonBetRaise {...props} />
      </ControlPanel>
      :
      <ControlPanel name="control-panel-null">
        <ButtonNull />
        <ButtonNull />
        <ButtonNull />
      </ControlPanel>
    }
  </ActionBarWrapper>
);

ActionBar.propTypes = {
  visible: React.PropTypes.bool,
};

export default ActionBar;
