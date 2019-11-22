import BigNumber from 'bignumber.js';
import { formatAddress } from './formatter';

export const etherAddress = '0x000000000000000000000000000000000000000E';

export const getTokenLogoUrl = (address: string) => {
  address = formatAddress(address)
  if (address === etherAddress) {
    return 'https://gitcdn.xyz/repo/trustwallet/assets/master/blockchains/ethereum/info/logo.png';
  }
  return `https://gitcdn.xyz/repo/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
  // return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
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
