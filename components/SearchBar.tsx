"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchBar( ) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault(); 
  
    const encodeSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodeSearchQuery}`);
      console.log(`Navigating to search results page for query: ${encodeSearchQuery}`);
   
  };

  return (
    <div className="flex items-center">
     
      <form className="flex w-full max-w-sm items-center space-x-2" onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Enter address, transaction hash, or token"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
