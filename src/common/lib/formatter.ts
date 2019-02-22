import numeral from 'numeral';

export const formatAmount = (data: string): string => {
  return parseFloat(data) >= 1000 ? numeral(data).format('0,0') : parseFloat(data).toPrecision(4);
};

export const formatPriceUsd = (data: string, withSymbol: boolean = true): string => {
  const prefix = withSymbol ? '$' : '';
  const result = parseFloat(data) >= 1 ? numeral(data).format('0,0.00') : parseFloat(data).toPrecision(4);
  return prefix + result;
};

export const formatVolumeUsd = (data: string, withSymbol: boolean = true): string => {
  const prefix = withSymbol ? '$' : '';
  const result = numeral(data).format('0,0.00');
  return prefix + result;
};

export const formatCount = (data: string | number): string => {
  return numeral(data).format('0,0');
};

export const formatPercent = (data: string | number): string => {
  return numeral(data).format('0.00%');
};

export const formatAddress = (data: string): string => {
  return data && data.slice ? data.slice(0, 6) + '...' + data.slice(-4) : data;
};
