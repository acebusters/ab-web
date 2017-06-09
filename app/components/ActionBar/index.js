/**
 * Created by helge on 17.02.17.
 */
import React from 'react';

import {
  ControlPanel,
  ActionBarWrapper,
} from './styles';

export function ActionBarComponent(props) {
  return (
    <ActionBarWrapper {...props} id="action-bar">
      <ControlPanel {...props}>
      </ControlPanel>
    </ActionBarWrapper>
  );
}

ActionBarComponent.propTypes = {};
