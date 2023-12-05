"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { getEthPrice, getGasPrice } from "@/app/api/etherscan";
import { useEffect, useState } from "react";
import { PriceDisplay } from "@/components/ui/price-display";

export function HeaderPrice() {
  const [etherPrice, setEtherPrice] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ethPriceResponse, gasPriceResponse] = await Promise.all([
          getEthPrice(),
          getGasPrice(),
        ]);

        setEtherPrice(ethPriceResponse.ethusd);
        setGasPrice(gasPriceResponse.suggestBaseFee);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <div className="flex items-center space-x-1">
            <PriceDisplay
              label="ETH Price"
              value={etherPrice}
              loading={loading}
              decimals={2} 
              showDollarSign 
            />
            <PriceDisplay
              label="Gas"
              value={gasPrice}
              loading={loading}
              roundValue 
              lastGwei
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
