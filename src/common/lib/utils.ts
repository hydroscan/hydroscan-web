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
