export const indentity = (a) => a;

export const last = (arr) => arr[arr.length - 1];

export const not = (fn) => (...args) => !fn(...args);

export function round(n, prec) {
  const dec = 10 ** prec;
  return Math.round(n * dec) / dec;
}

/**
 * Checks (except edge) copypasted from https://github.com/conditionizr/conditionizr/tree/master/detects
 */
export function isSupportedBrowser() {
  if (window.web3) {
    return true;
  }

  const isChrome = !!window.chrome && /google/i.test(navigator.vendor);
  const isChromium = /cros i686/i.test(navigator.platform); // chrome extension should work for chromium
  const isFirefox = 'InstallTrigger' in window;
  const isEdge = window.navigator.userAgent.indexOf('Edge') > -1;

  return isChrome || isChromium || isFirefox || isEdge;
}
