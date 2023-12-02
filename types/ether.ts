export interface NormalTransaction{
    hash: string;
    blockNumber: number;
}
export interface ERC20TokenTransfer{
    hash: string;
    blockNumber: number;
}

export interface EtherPriceResponse {
    ethusd: number;
  }
  
  export interface GasPriceResponse {
    suggestBaseFee: number;
  }