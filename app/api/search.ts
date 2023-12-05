import { makeEtherscanRequest } from "@/app/api/etherscan";

export const search = async (query: string) => {
  if (query.length === 66 && /^0x[0-9a-fA-F]+$/.test(query)) {
    return getTransactionDetails(query);
  } else if (query.length === 42 && /^0x[0-9a-fA-F]+$/.test(query)) {
    return getAddressDetails(query);
  } else if (query.length === 42 && /^0x[0-9a-fA-F]+$/.test(query)) {
    return getTokenDetails(query);
  } else {
    return "unknown";
  }
};

export const getTransactionDetails = async (txHash: string) => {
  return makeEtherscanRequest("proxy", "eth_getTransactionByHash", {
    txhash: txHash,
  });
};

export const getAddressDetails = async (address: string) => {
  return makeEtherscanRequest("account", "balance", { address });
};

export const getTokenDetails = async (tokenContractAddress: string) => {
  return makeEtherscanRequest("token", "totalsupply", {
    contractaddress: tokenContractAddress,
  });
};
