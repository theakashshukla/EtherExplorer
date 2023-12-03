"use client";

import { useEffect, useState } from "react";
import { NormalTransaction, ERC20TokenTransfer } from "@/types/ether";
import {
  getEtherBalance,
  getNormalTransactions,
  getERC20TokenTransfers,
} from "@/app/api/etherscan";

export function AddressDetails({ address }: { address: string }) {
  const [etherBalance, setEtherBalance] = useState<string | null>(null);
  const [normalTransactions, setNormalTransactions] = useState<
    NormalTransaction[]
  >([]);
  const [tokenTransfers, setTokenTransfers] = useState<ERC20TokenTransfer[]>(
    []
  );

  function truncateString(str: string, num: number): string {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ether balance
        const balance = await getEtherBalance(address);
        setEtherBalance(balance);

        // Fetch normal transactions
        const transactions = await getNormalTransactions(address);
        setNormalTransactions(transactions);

        // Fetch ERC-20 token transfers
        const tokenTransfersData: ERC20TokenTransfer[] =
          await getERC20TokenTransfers(address);
        setTokenTransfers(tokenTransfersData);
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchData();
  }, [address]);

  return (
    <div>
      <h2>Address Details</h2>
      <p>Ether Balance: {etherBalance} ETH</p>

      {/* <div>
        <h3>Normal Transactions</h3>
        <ul>
          {Array.isArray(normalTransactions) && normalTransactions.map((transaction) => (
            <li key={transaction.hash}>
              {transaction.hash}

              <li>{transaction.blockNumber} </li>
            </li>
          ))}
        </ul>
      </div> */}
      <h3>Normal Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                TX Hash
              </th>
              <th scope="col" className="px-4 py-3">
                satus
              </th>
              <th scope="col" className="px-4 py-3">
                Address
              </th>

              <th scope="col" className="px-4 py-3">
                Amount
              </th>
            </tr>
          </thead>
          {Array.isArray(normalTransactions) && normalTransactions.map((transaction) => (
            <tbody key={transaction.hash}>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-3">{truncateString(transaction.hash, 15)}</td>
                <td className="px-4 py-3">{truncateString(transaction.hash, 15)}</td>
                <td className="px-4 py-3">{truncateString(transaction.hash, 15)}</td>
                <td className="px-4 py-3">{truncateString(transaction.hash, 15)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                TX Hash
              </th>
              <th scope="col" className="px-4 py-3">
                satus
              </th>
              <th scope="col" className="px-4 py-3">
                Address
              </th>

              <th scope="col" className="px-4 py-3">
                Amount
              </th>
            </tr>
          </thead>
          {Array.isArray(tokenTransfers) && tokenTransfers.map((transfer) => (
            <tbody key={transfer.hash}>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-3">{truncateString(transfer.hash, 15)}</td>
                <td className="px-4 py-3">{truncateString(transfer.from, 15)}</td>
                <td className="px-4 py-3">{truncateString(transfer.to, 15)}</td>
                <td className="px-4 py-3">{transfer.value}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* <div>
        <h3>ERC-20 Token Transfers</h3>
        <ul>
          {Array.isArray(tokenTransfers) && tokenTransfers.map((transfer) => (
            <li key={transfer.hash}>{transfer.hash}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
