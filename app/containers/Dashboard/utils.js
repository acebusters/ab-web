import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import { conf } from '../../app.config';
const confParams = conf();

export function isSellEvent(event) {
  return (
    event.address === confParams.ntzAddr &&
    event.unit === 'ntz' &&
    event.type === 'outcome'
  );
}

export function isETHPayoutEvent(event) {
  return (
    event.address === confParams.pullAddr &&
    event.unit === 'eth' &&
    event.type === 'income'
  );
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp * 1000);

  return (
    <span>
      <FormattedDate
        value={date}
        year="numeric"
        month="numeric"
        day="2-digit"
      />,&nbsp;
      <FormattedTime
        value={date}
        hour12={false}
      />
    </span>
  );
}
