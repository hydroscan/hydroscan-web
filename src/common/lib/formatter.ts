import numeral from 'numeral';
import BigNumber from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: 18 });

export const formatAmount = (data: string | number): string => {
  return data && parseFloat(data.toString()) >= 1000 ? numeral(data).format('0,0') : new BigNumber(data).toPrecision(4);
};

export const formatAmountWithDecimals = (data: string, decimals: number = 18): string => {
  return numeral(new BigNumber(data).div(Math.pow(10, decimals)).toFixed()).format('0,0.[000000000000000000]');
};

export const formatPriceUsd = (data: string, showSymbol: boolean = true): string => {
  const prefix = showSymbol ? '$' : '';
  const result = parseFloat(data) >= 1 ? numeral(data).format('0,0.00') : new BigNumber(data).toPrecision(4);
  return prefix + result;
};

export const formatVolumeUsd = (data: string, showSymbol: boolean = true): string => {
  const prefix = showSymbol ? '$' : '';
  const result = numeral(data).format('0,0.00');
  return prefix + result;
};

export const formatVolumeUsdShort = (data: string, showSymbol: boolean = true): string => {
  const prefix = showSymbol ? '$' : '';
  const result = numeral(data).format('0a');
  return prefix + result;
};

export const formatCount = (data: string | number): string => {
  return numeral(data).format('0,0');
};

export const formatCountShort = (data: string | number): string => {
  return numeral(data).format('0a');
};

export const formatPercent = (data: string | number, showPositiveSign: boolean = true): string => {
  const result = numeral(data).format('0.00%');
  if (showPositiveSign && !result.startsWith('-')) {
    return '+' + result;
  }
  return result;
};

export const formatAddress = (data: string): string => {
  return data && data.slice ? data.slice(0, 6) + '...' + data.slice(-4) : data;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
