import { makeEtherscanRequest } from '@/app/api/etherscan';

export const search = async (query: string) => {
  if (query.length === 66 && /^[0-9a-fA-F]+$/.test(query)) {
    // It might be a transaction hash
    return getTransactionDetails(query);
  } else if (query.length === 42 && /^[0-9a-fA-F]+$/.test(query)) {
    // It's likely an Ethereum address
    return getAddressDetails(query);
  } else {
    // Assume it's a token query or another kind of search
    return getTokenDetails(query);
  }
};

export const getTransactionDetails = async (txHash: string) => {
  return makeEtherscanRequest('proxy', 'eth_getTransactionByHash', { txhash: txHash });
};

export const getAddressDetails = async (address: string) => {
  return makeEtherscanRequest('account', 'balance', { address });
};

export const getTokenDetails = async (tokenAddress: string) => {
  // Implement logic to fetch token details using the Etherscan API
  // For example, you can use the 'token' module in the API
  return makeEtherscanRequest('token', 'tokeninfo', { contractaddress: tokenAddress });
};

