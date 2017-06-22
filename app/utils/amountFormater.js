import { NTZ_DECIMALS } from '../app.config';

export function formatNtz(babzAmount, decimals = 0, decimalMark = '.', thousandSeparator = ',') {
  const s = babzAmount < 0 ? '-' : '';
  const amount = Math.abs(Number(babzAmount / NTZ_DECIMALS)) || 0;
  const i = String(parseInt(amount, 10).toFixed(decimals));
  const j = (i.length) > 3 ? i.length % 3 : 0;
  const p = i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousandSeparator}`);
  return `${s}${(j ? i.substr(0, j) + thousandSeparator : '')}${p}${(decimals ? decimalMark + Math.abs(amount - i).toFixed(decimals).slice(2) : '')}`;
}
