import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import partition from 'lodash/partition';
import BigNumber from 'bignumber.js';

import A from '../../components/A';
import WithLoading from '../../components/WithLoading';
import { conf } from '../../app.config';
import { formatEth, formatNtz } from '../../utils/amountFormater';

import { Icon, TypeIcon, typeIcons } from './styles';

const confParams = conf();

export function txnsToList(events, tableAddrs, proxyAddr) {
  if (!tableAddrs || !events) {
    return null;
  }

  const [pending, completed] = partition(
    events.sort((a, b) => b.blockNumber - a.blockNumber),
    (event) => event.pending,
  );
  return pending.concat(completed)
    .map((event) => [
      event.pending
        ? <WithLoading isLoading loadingSize={14} type="inline" />
        : <TypeIcon>{typeIcons[event.type]}</TypeIcon>,
      formatTxAddress(event.address, tableAddrs, proxyAddr),
      formatDate(event.timestamp),
      infoIcon(event),
      formatValue(event),
      txDescription(event, tableAddrs, proxyAddr),
    ]);
}

function formatDate(timestamp) {
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

const cutAddress = (addr) => addr.substring(2, 8);

function formatTxAddress(address, tableAddrs, proxyAddr) {
  if (address === confParams.ntzAddr) {
    return 'Nutz Contract';
  } else if (tableAddrs.indexOf(address) > -1) {
    return `Table ${cutAddress(address)}`;
  } else if (address === proxyAddr) {
    return 'Me';
  }

  return cutAddress(address);
}

function formatValue(event) {
  const sign = event.type === 'income' ? '' : '−';
  const formatFn = event.unit === 'ntz' ? formatNtz : formatEth;
  const number = formatFn(new BigNumber(event.value));
  return `${sign}${number.toString()} ${event.unit.toUpperCase()}`;
}

function infoIcon(event) {
  return (
    <A
      href={`${confParams.etherscanUrl}tx/${event.transactionHash}`}
      target="_blank"
    >
      <Icon
        className="fa fa-info-circle"
        aria-hidden="true"
      />
    </A>
  );
}

function txDescription(event, tableAddrs, proxyAddr) {
  if (tableAddrs.indexOf(event.address) > -1) {
    return `Table ${event.type === 'income' ? 'leave' : 'join'}`;
  } else if (
    event.address === confParams.ntzAddr &&
    event.unit === 'eth' &&
    event.type === 'income'
  ) {
    return 'Sell end';
  } else if (
    event.address === confParams.ntzAddr &&
    event.unit === 'ntz' &&
    event.type === 'outcome'
  ) {
    return 'Sell start';
  } else if (event.address === proxyAddr && event.unit === 'ntz') {
    return 'Purchase end';
  } else if (event.address === confParams.ntzAddr && event.unit === 'eth') {
    return 'Purchase start';
  }

  return 'Transfer';
}
