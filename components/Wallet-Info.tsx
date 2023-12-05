"use client";
import {
  useAccount,
  useDisconnect,
  useBalance,
  useChainId,
  useConnect,
} from "wagmi";
import { ConnectButton } from "./Wallet-Connect";
import { AddressDetails } from "./AddressDetails";

export function WalletInfo() {
  const { address, connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { data, isError, isLoading } = useBalance({ address });
  const {} = useChainId();

  if (address) {
    return (
      <div>
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <div className="pr-3 font-medium text-gray-900 dark:text-white">
            Address
          </div>
          <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
            {address}
          </div>
        </div>
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <div className="pr-3 font-medium text-gray-900 dark:text-white">
            Balance
          </div>
          <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
            {data?.formatted} {data?.symbol}
          </div>
          
        </div>
        <>
          {isConnected && <div>Connected to {activeConnector?.name}</div>}

          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              <div className="m-2">{connector.name}</div>
              <div className="m-2">
                {isLoading &&
                  pendingConnector?.id === connector.id &&
                  " (connecting)"}
              </div>
            </button>
          ))}

          {error && <div>{error.message}</div>}
        </>

        <AddressDetails address={address} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center">
        <ConnectButton />
      </div>
    );
  }
}
