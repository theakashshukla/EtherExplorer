'use client'

import { ModeToggle } from "@/components/mode-toggle";
import { getEthPrice, getGasPrice } from "@/app/api/etherscan";
import { useEffect, useState } from "react";

export function HeaderPrice() {
  const [etherPrice, setEtherPrice] = useState<number | null>(null);
  const [gasPrice, setGasPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchEtherPrice = async () => {
      try {
        const data = await getEthPrice();
        const ethusdPrice = data; 
        setEtherPrice(ethusdPrice);
        console.log(ethusdPrice);
      } catch (error) {
        console.error('Error fetching Ether price:', error);
      }
    };

    const fetchGasPrice = async () => {
      try {
        const data = await getGasPrice( );
        const gasPrice = data;
        setGasPrice(Math.round(gasPrice.suggestBaseFee));
      } catch (error) {
        console.error('Error fetching gas price:', error);
      }
    };

    fetchEtherPrice();
    fetchGasPrice();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <div className="flex items-center space-x-1">
            <div className="text-sm font-medium text-gray-500">
              ETH Price: <span className="text-blue-500">{etherPrice}</span>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Gas: <span className="text-blue-500">{gasPrice} Gwei</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
