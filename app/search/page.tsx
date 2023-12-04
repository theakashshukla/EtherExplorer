'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { search } from '@/app/api/search';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
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
        console.log(`Search results:`, result);
        setSearchResult(result);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [query]);

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {loading && <p>Loading...</p>}
      {!loading && searchResult && (
        <div>
          {searchResult.type === 'transaction' && <p>Transaction Hash: {searchResult.txHash}</p>}
          {searchResult.type === 'address' && <p>Address: {searchResult.address}</p>}
          {searchResult.type === 'token' && <p>Token Address: {searchResult.tokenAddress}</p>}
        </div>
      )}
    </div>
  );
}