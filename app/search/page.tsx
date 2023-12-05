"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { search } from "@/app/api/search";
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
      <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700 m-6">
        <div className="pr-3 font-medium text-gray-900 dark:text-white">
          Search Query
        </div>
        <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
          {query}
        </div>
      </div>
      <div className="m-5">
        <AddressDetails address={query || ""} />
      </div>
      <div className="m-6">
        {!loading && searchResult && (
          <div>
            <pre>{JSON.stringify(searchResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
