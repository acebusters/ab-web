/**
* Created by jzobro 20170520
*/
import React from 'react';

import SeatTimer from './SeatTimer';
import SitoutTimer from './SitoutTimer';

import { StatusWrapper, StatusActionStyle } from './styles';

const statusType = (showStatus) => {
  if (showStatus === 'posted SB') return 'info';
  if (showStatus === 'posted BB') return 'info';
  if (showStatus === 'fold') return 'info';
  if (showStatus === 'call') return 'success';
  if (showStatus === 'check') return 'success';
  if (showStatus === 'all-in') return 'warning';
  if (showStatus === 'winner') return 'warning';
  if (showStatus === 'raise') return 'danger';
  if (showStatus === 'bet') return 'danger';
  return 'info';
};

const StatusAction = ({
  showStatus,
  sitout,
  timeLeft,
  pos,
  whosTurn,
  wasMostRecentAction,
}) => {
  if (whosTurn === pos) {
    if (timeLeft >= 0) return <SeatTimer timeLeft={timeLeft} />;
  }
  if (sitout >= 0) return <SitoutTimer sitout={sitout} />;
  if (whosTurn !== pos && showStatus !== '') {
    return (
      <StatusWrapper>
        <StatusActionStyle
          type={statusType(showStatus)}
          recent={wasMostRecentAction}
        >
          {showStatus}
        </StatusActionStyle>
      </StatusWrapper>
    );
  }
  return null;
};
StatusAction.propTypes = {
  pos: React.PropTypes.number,
  showStatus: React.PropTypes.string,
  sitout: React.PropTypes.number,
  timeLeft: React.PropTypes.number,
  wasMostRecentAction: React.PropTypes.bool,
  whosTurn: React.PropTypes.number,
};

export default StatusAction;
