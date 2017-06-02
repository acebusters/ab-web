/** TableMenu.js
 * Created by zobroj on 20170531
 */

import React from 'react';

import { ActionButton } from '../ActionBar';
import { Wrapper } from '../Table/styles';

const TableMenu = ({
  onLeave,
  onSitout,
  pending,
  sitout,
}) => {
  // Note: sitout value possibilities
  // sitout > 0, for enabled "play"
  // sitout === 0, for disabled "play"
  // sitout === undefined, for enabled "pause"
  // sitout === null, for disabled "pause"
  const icon = (typeof sitout === 'number') ? 'fa fa-play' : 'fa fa-pause';
  const isToggleSitoutDisabled = sitout === 0 || sitout === null;
  return (
    <Wrapper className="anon-wrapper">
      <ActionButton className="action-button-1" size="small" onClick={onLeave} icon="fa fa-sign-out" />
      { !pending &&
        <ActionButton
          className="action-button-2"
          size="small"
          icon={icon}
          onClick={onSitout}
          disabled={isToggleSitoutDisabled}
        />
      }
    </Wrapper>
  );
};
TableMenu.propTypes = {
  pending: React.PropTypes.bool,
  onLeave: React.PropTypes.any,
  onSitout: React.PropTypes.any,
  sitout: React.PropTypes.any,
};

export default TableMenu;
