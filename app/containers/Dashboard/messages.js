/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  advanced: {
    id: 'app.containers.Dashboard.advanced',
    defaultMessage: 'Advanced',
  },
  amount: {
    id: 'app.containers.Dashboard.amount',
    defaultMessage: 'Amount',
  },
  amountRequired: {
    id: 'app.containers.Dashboard.amountRequired',
    defaultMessage: 'The amount field cannot be empty',
  },
  amountTooLow: {
    id: 'app.containers.Dashboard.amountTooLow',
    defaultMessage: 'The amount must be greater than {minAmount}',
  },
  amountTooHigh: {
    id: 'app.containers.Dashboard.amountTooHigh',
    defaultMessage: 'The amount must be less than or equal to {maxAmount}',
  },
  amountZero: {
    id: 'app.containers.Dashboard.amountZero',
    defaultMessage: 'The amount must be greater than 0',
  },
  send: {
    id: 'app.containers.Dashboard.send',
    defaultMessage: 'Send',
  },
  receive: {
    id: 'app.containers.Dashboard.receive',
    defaultMessage: 'Receive',
  },
  ethereum: {
    id: 'app.containers.Dashboard.ethereum',
    defaultMessage: 'Ethereum',
  },
  nutz: {
    id: 'app.containers.Dashboard.nutz',
    defaultMessage: 'Nutz',
  },
  ok: {
    id: 'app.containers.Dashboard.ok',
    defaultMessage: 'Ok',
  },
  overview: {
    id: 'app.containers.Dashboard.overview',
    defaultMessage: 'Overview',
  },
  header: {
    id: 'app.containers.Dashboard.header',
    defaultMessage: 'Account Dashboard',
  },
  included: {
    id: 'app.containers.Dashboard.included',
    defaultMessage: 'Transaction History',
  },
  ethPayout: {
    id: 'app.containers.Dashboard.ethPayout',
    defaultMessage: 'ETH Payout',
  },
  transactionErrorTitle: {
    id: 'app.containers.Dashboard.transactionErrorTitle',
    defaultMessage: 'Transaction error',
  },
  retryTransaction: {
    id: 'app.containers.Dashboard.retryTransaction',
    defaultMessage: 'Retry',
  },
  ethLimit: {
    id: 'app.containers.Dashboard.ethLimit',
    defaultMessage: 'Warning: account limit {limit} ETH',
  },
  ntzTransferTitle: {
    id: 'app.containers.Dashboard.ntzTransferTitle',
    defaultMessage: 'Transfer NTZ',
  },
  ethTransferTitle: {
    id: 'app.containers.Dashboard.ethTransferTitle',
    defaultMessage: 'Transfer ETH',
  },
  tableJoin: {
    id: 'app.containers.Dashboard.tableJoin',
    defaultMessage: 'Table join',
  },
  tableLeave: {
    id: 'app.containers.Dashboard.tableLeave',
    defaultMessage: 'Table leave',
  },
  sellStatus: {
    id: 'app.containers.Dashboard.sellStatus',
    defaultMessage: 'Sell',
  },
  ethPayoutStatus: {
    id: 'app.containers.Dashboard.ethPayoutStatus',
    defaultMessage: 'ETH Pay-out',
  },
  purchaseStart: {
    id: 'app.containers.Dashboard.purchaseStart',
    defaultMessage: 'Purchase start',
  },
  purchaseEnd: {
    id: 'app.containers.Dashboard.purchaseEnd',
    defaultMessage: 'Purchase end',
  },
  acebusters: {
    id: 'app.containers.Dashboard.acebusters',
    defaultMessage: 'Acebusters',
  },
  me: {
    id: 'app.containers.Dashboard.me',
    defaultMessage: 'Me',
  },
  tableAddress: {
    id: 'app.containers.Dashboard.tableAddress',
    defaultMessage: 'Table {address}',
  },
  transferStatus: {
    id: 'app.containers.Dashboard.transferStatus',
    defaultMessage: 'Transfer',
  },
  powerUpStatus: {
    id: 'app.containers.Dashboard.powerUpStatus',
    defaultMessage: 'Power Up',
  },
  powerDownPayoutStatus: {
    id: 'app.containers.Dashboard.powerDownPayoutStatus',
    defaultMessage: 'Power Down Payout',
  },
  investTutButton: {
    id: 'app.containers.Dashboard.investTutButton',
    defaultMessage: 'Invest Tutorial',
  },
  ntzUnit: {
    id: 'app.containers.Dashboard.ntzUnit',
    defaultMessage: '{amount} NTZ',
  },
  abpUnit: {
    id: 'app.containers.Dashboard.abpUnit',
    defaultMessage: '{amount} ABP',
  },
  percentUnit: {
    id: 'app.containers.Dashboard.percentUnit',
    defaultMessage: '{amount} %',
  },
});
