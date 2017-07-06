export const PERSIST = 'persist';
export const TEMP = 'temp';

export const loggedInSuccess = {
  txId: 'AUTH_LOGGED_IN',
  notifyType: 'AUTH_LOGGED_IN',
  category: 'Account Auth Success',
  details: 'Good luck!',
  removing: false,
  dismissable: true,
  date: new Date(),
  type: 'success',
};

export const tableJoining = {
  txId: null,
  notifyType: 'TABLE_JOINING',
  category: 'Joining Table',
  details: null, // tableId
  removing: false,
  dismissable: false,
  date: new Date(),
  type: 'warning',
};

export const tableJoined = {
  txId: 'TABLE_JOINED',
  notifyType: 'TABLE_JOINED',
  category: 'Joined Table',
  details: null, // tableId
  removing: false,
  dismissable: true,
  date: new Date(),
  type: 'success',
};

export const temp = {
  notifyType: 'FUNDS_TRANSFERRED_NTZ',
  category: 'NTZ Wallet',
  details: 'Sent 1,000 NTZ to 0x2381...3290',
  removing: false,
  dismissable: true,
  date: new Date(),
  type: 'success',
};

export const persist = {
  notifyType: 'TABLE_JOINING',
  category: 'Joining Table',
  details: '0xdsaifoj...dskafj',
  removing: false,
  dismissable: false,
  date: new Date(),
  type: 'danger',
};
