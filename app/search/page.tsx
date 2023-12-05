"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getAddressDetails,
  getTransactionDetails,
  getTokenDetails,
  search,
} from "@/app/api/search";
import { AddressDetails } from "@/components/AddressDetails";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  console.log(`The current query is: ${query}`);

  const [searchResult, setSearchResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      console.log(`Fetching data for query: ${query}`);
      setLoading(true);

      try {
        const result = await search(query);
        setSearchResult(result);
        console.log("result: ", result);

      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);
  console.log("resulthh: ", searchResult);

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      
      {loading && <p>Loading...</p>}
      {/* {!loading && searchResult && (
        <div>
          {searchResult.type === "transaction" && (
            <p>Transaction Hash: {searchResult.txHash}</p>
          )}
          {searchResult.type === "address" && (
            <p>Address: {searchResult.address}</p>
          )}
        </div>
      )} */}
      {/* <p>Transaction Hash: {searchResult}</p> */}
          
      {!loading && searchResult && (
        <div>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
      
    </div>
  );
}
