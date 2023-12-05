import axios, { AxiosInstance, AxiosError  } from 'axios';

const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_KEY;

if (!ETHERSCAN_API_KEY) {
  throw new Error('Missing EtherScan Api key from env variable');
}

const etherscanBaseURL = 'https://api.etherscan.io/api';

const etherscan: AxiosInstance = axios.create({
  baseURL: etherscanBaseURL,
  params: {
    apikey: ETHERSCAN_API_KEY,
  },
});

export const makeEtherscanRequest = async (
  module: string,
  action: string,
  params: Record<string, string | number> = {}
) => {
  try {
    const response = await etherscan.get('', {
      params: {
        module,
        action,
        ...params,
      },
    });
    return response.data.result;
  } catch (error) {
    const axiosError = error as AxiosError | undefined;
    const errorMessage = axiosError?.message || 'Unknown error';
    console.error(`Failed to fetch ${module} details: ${errorMessage}`);
    throw new Error(`Failed to fetch ${module} details: ${errorMessage}`);
  }
};

export const getEtherBalance = async (address: string) => {
  return makeEtherscanRequest('account', 'balance', { address });
};

export const getNormalTransactions = async (
  address: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return makeEtherscanRequest('account', 'txlist', {
    address,
    page,
    offset: pageSize,
  });
};

export const getERC20TokenTransfers = async (address: string, page: number = 1, pageSize: number = 10) => {
  return makeEtherscanRequest('account', 'tokentx', {
    address,
    page,
    offset: pageSize,
  });
};


export const getEthPrice = async () => {
  return makeEtherscanRequest('stats', 'ethprice');
};

export const getGasPrice = async () => {
  return makeEtherscanRequest('gastracker', 'gasoracle');
};
