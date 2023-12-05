export interface NormalTransaction {
  blockNumber: number;
  hash: string;
  from: string;
  value: number;
}
export interface ERC20TokenTransfer {
  hash: string;
  from: string;
  to: string;
  value: number;
}
export interface EtherPriceResponse {
  ethusd: number;
}

export interface GasPriceResponse {
  suggestBaseFee: string;
}

