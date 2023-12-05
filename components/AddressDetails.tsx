"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { formatEther } from "viem";
import {
  getEtherBalance,
  getNormalTransactions,
  getERC20TokenTransfers,
} from "@/app/api/etherscan";
import { NormalTransaction, ERC20TokenTransfer } from "@/types/ether";

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
    return str.slice(0, num) + "...";
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ether balance
        const balance = await getEtherBalance(address);
        const ethBal = formatEther(balance);
        setEtherBalance(ethBal);

        // Fetch normal transactions
        const transactions = await getNormalTransactions(
          address,
          currentPage,
          itemsPerPage
        );
        setNormalTransactions(transactions);

        // Fetch ERC-20 token transfers
        const tokenTransfersData: ERC20TokenTransfer[] =
          await getERC20TokenTransfers(address, itemsPerPage);
        setTokenTransfers(tokenTransfersData);
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchData();
  }, [address, currentPage]); // Include currentPage in the dependency array

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginate = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div className="border-gray-300 dark:border-gray-600 py-4">
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700 mb-5">
          <div className="pr-3 font-medium text-gray-900 dark:text-white">
            Ether Balance
          </div>
          <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
            {etherBalance}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div className="border-2 border-gray-300 dark:border-gray-600">
            <dt className="my-4 ms-4 font-semibold leading-none text-gray-900 dark:text-white">
              Normal Transactions
            </dt>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Block
                    </th>
                    <th scope="col" className="px-4 py-3">
                      from
                    </th>
                    <th scope="col" className="px-4 py-3">
                      to
                    </th>
                    <th scope="col" className="px-4 py-3">
                      value
                    </th>
                  </tr>
                </thead>
                {Array.isArray(normalTransactions) &&
                  paginate(normalTransactions).map((transaction) => (
                    <tr
                      key={transaction.hash}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3">
                        {truncateString(transaction.hash, 15)}
                      </td>
                      <td className="px-4 py-3">
                        {truncateString(transaction.from, 15)}
                      </td>
                      <td className="px-4 py-3">{transaction.blockNumber}</td>
                      <td className="px-4 py-3">{transaction.value}</td>
                    </tr>
                  ))}
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <div className="inline-flex items-stretch -space-x-px">
                <button
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {" "}
                  {currentPage}{" "}
                </span>
                <button
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    normalTransactions.length < itemsPerPage ||
                    normalTransactions.length <= currentPage * itemsPerPage
                  }
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
          <div className="border-2 border-gray-300 dark:border-gray-600 ">
            <div className="overflow-x-auto">
              <dt className="my-4 ms-4 font-semibold leading-none text-gray-900 dark:text-white">
                ERC 20 Transactions
              </dt>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      TX Hash
                    </th>
                    <th scope="col" className="px-4 py-3">
                      from
                    </th>
                    <th scope="col" className="px-4 py-3">
                      to
                    </th>
                    <th scope="col" className="px-4 py-3">
                      value
                    </th>
                  </tr>
                </thead>
                {Array.isArray(tokenTransfers) &&
                  tokenTransfers.map((transfer) => (
                    <tbody key={transfer.hash}>
                      <tr className="border-b dark:border-gray-700">
                        <td className="px-4 py-3">
                          {truncateString(transfer.hash, 15)}
                        </td>
                        <td className="px-4 py-3">
                          {truncateString(transfer.from, 15)}
                        </td>
                        <td className="px-4 py-3">
                          {truncateString(transfer.to, 15)}
                        </td>
                        <td className="px-4 py-3">{transfer.value}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
            <nav
              className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <div className="inline-flex items-stretch -space-x-px">
                <button
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {" "}
                  {currentPage}{" "}
                </span>
                <button
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    tokenTransfers.length < itemsPerPage ||
                    tokenTransfers.length <= currentPage * itemsPerPage
                  }
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
