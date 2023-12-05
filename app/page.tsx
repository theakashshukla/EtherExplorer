"use client";

import { ConnectButton } from "@/components/Wallet-Connect";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-row justify-center m-2">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-600 md:text-5xl lg:text-6xl dark:text-white">
          Welcome to Ether Explorer
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          This is a simple Ethereum explorer that allows you to search for
          blocks, transactions, and addresses. View ETH price and ERC-20 token
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <div className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300   dark:text-white dark:border-gray-700 ">
            <Button
              className="m-5"
              type="button"
              variant="outline"
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
          </div>
          <div className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300  dark:text-white dark:border-gray-700 ">
            <ConnectButton />
          </div>
        </div>
      </div>
    </main>
  );
}
