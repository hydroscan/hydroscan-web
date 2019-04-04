import Web3 from 'web3';
import BigNumber from 'bignumber.js';
export const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/83438c4dcf834ceb8944162688749707')
);

const getBalance = async (tokenAddress: string, ownerAddress: string): Promise<BigNumber> => {
  if (ownerAddress.slice(0, 2) === '0x') {
    ownerAddress = ownerAddress.slice(2);
  }

  // '0x70a08231' is the contract 'balanceOf()' ERC20 token function in hex.
  const contractData = '0x70a08231000000000000000000000000' + ownerAddress;

  return new Promise((resolve, reject) => {
    web3.eth.call(
      {
        to: tokenAddress,
        data: contractData
      },
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          result = web3.toBigNumber(result).toString(10);
          result = new BigNumber(result);
          resolve(result);
        }
      }
    );
  });
};

export const getHotBalance = async (ownerAddress: string): Promise<BigNumber> => {
  const hotBalance = await getBalance('0x9AF839687F6C94542ac5ece2e317dAAE355493A1', ownerAddress);
  return hotBalance.div(new BigNumber(10).pow(18));
};
