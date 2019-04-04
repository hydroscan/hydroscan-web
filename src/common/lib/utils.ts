import BigNumber from 'bignumber.js';

export const getTokenLogoUrl = address => {
  // https://gitcdn.xyz/
  return `https://gitcdn.xyz/repo/TrustWallet/tokens/master/tokens/${address.toLowerCase()}.png`;
  // return `https://raw.githubusercontent.com/TrustWallet/tokens/master/tokens/${address.toLowerCase()}.png`;
};

export const changeColor = num => {
  if (num >= 0) {
    return 'green';
  }
  if (num >= -1) {
    return 'red';
  }
  return 'gray';
};

export const getTradeWithSide = trade => {
  trade.buyerAddress = trade.buyerAddress ? trade.buyerAddress : trade.takerAddress;
  const buyerIsTaker = trade.buyerAddress === trade.takerAddress;
  trade.sellerAddress = buyerIsTaker ? trade.makerAddress : trade.takerAddress;
  trade.takerSide = buyerIsTaker ? 'buy' : 'sell';
  trade.buyerIs = buyerIsTaker ? 'Taker' : 'Maker';
  trade.sellerIs = buyerIsTaker ? 'Maker' : 'Taker';
  return trade;
};

export const HotDiscountRules = [[5000, 1.0], [20000, 0.9], [100000, 0.8], [500000, 0.7], [2000000, 0.6], [-1, 0.5]];
export const getHotDiscount = (balance: BigNumber): number => {
  for (const rule of HotDiscountRules) {
    if (balance.lt(rule[0])) {
      return rule[1];
    }
  }
  return 0.5;
};
