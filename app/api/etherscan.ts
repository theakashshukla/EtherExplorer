import axios from 'axios';
import { NormalTransaction, ERC20TokenTransfer, EtherPriceResponse, GasPriceResponse } from '@/types/ether';

// add ether scan api key form env
const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_KEY;

if(!ETHERSCAN_API_KEY) {
  throw new Error('Missing EtherScan Api key from env variable');
}

const etherscanBaseURL = 'https://api.etherscan.io/api'; // Etherscan API base URL



// Function to get the ether balance of an address
export const getEtherBalance = async (address: string): Promise<string> => {
  try {
    const response = await axios.get(`${etherscanBaseURL}?module=account&action=balance&address=${address}&apikey=${ETHERSCAN_API_KEY}`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching ether balance:', error);
    throw error;
  }
};


// Function to get the list of normal transactions for an address with pagination
export const getNormalTransactions = async (
  address: string,
  page: number = 1,
  pageSize: number = 10
): Promise<NormalTransaction[]> => {
  try {
    const response = await axios.get<{ result: NormalTransaction[] }>(
      `${etherscanBaseURL}?module=account&action=txlist&address=${address}&page=${page}&offset=${pageSize}&apikey=${ETHERSCAN_API_KEY}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching normal transactions:', error);
    throw error;
  }
};


// Function to get the list of ERC-20 token transfers for an address
export const getERC20TokenTransfers = async (address: string): Promise<ERC20TokenTransfer[]> => {
  try {
    const response = await axios.get<{ result: ERC20TokenTransfer[] }>(
      `${etherscanBaseURL}?module=account&action=tokentx&address=${address}&apikey=${ETHERSCAN_API_KEY}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching ERC-20 token transfers:', error);
    throw error;
  }
};

// Function to fetch ETH price
export const getEthPrice = async (): Promise<number> => {
  try {
    const response = await axios.get<{ result: EtherPriceResponse}>(
      `${etherscanBaseURL}?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`
    );
    return response.data.result.ethusd;
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    throw error;
  }
};

// Function to fetch Gas price
export const getGasPrice = async (): Promise<GasPriceResponse> => {
  try {
    const response = await axios.get<{result: GasPriceResponse}>(
      `${etherscanBaseURL}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
    );
    return response.data.result;
  } catch (error) {
    console.error('Error fetching Gas price:', error);
    throw error;
  }
};