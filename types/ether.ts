export interface NormalTransaction{
    hash: string;
    blockNumber: number;
}
export interface ERC20TokenTransfer{
    hash: string;
    value: number;
    from: string;
    to: string;
}

export interface EtherPriceResponse {
    ethusd: number;
  }
  
  export interface GasPriceResponse {
    suggestBaseFee: number;
  }