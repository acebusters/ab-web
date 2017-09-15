import React from 'react';

import { formatAbp } from '../../utils/amountFormatter';
import { formatDate } from './utils';
import TimedButton from '../../components/TimedButton';

export function downRequestsToList(
  downRequests,
  downtime,
  onTickClick
) {
  return downtime && downRequests && downRequests.map((r) => [
    `${formatAbp(r[0])} ABP`,
    `${formatAbp(r[0].sub(r[1]))} ABP`,
    formatDate(r[2].toNumber()),
    <PayoutDate request={r} downtime={downtime} />,
    <TimedButton
      until={nextPayout(r, downtime)}
      onClick={() => onTickClick(r[0])}
    >
      Execute Pay-Out
    </TimedButton>,
  ]);
}

function nextPayout(request, downtime) {
  const [total, left, start] = request;
  const nextStep = Math.floor(total.sub(left).div(total.mul(0.1)).toNumber()) + 1;

  return Math.min(
    Number(start) + downtime.div(10).mul(nextStep).toNumber(),
    Number(start) + downtime.toNumber()
  );
}

/* eslint-disable react/no-multi-comp, react/prop-types */
class PayoutDate extends React.Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { request, downtime } = this.props;
    return (
      <span>
        {formatDate(nextPayout(request, downtime))}
      </span>
    );
  }
}
/* eslint-enable */
