'use client';
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col justify-center m-2">
      <div>
      <Button
        className="m-5"
        type="button"
        onClick={() => router.push("/profile")}
      >
        Profile
      </Button>
      <SearchBar />
    </div>
    </main>
  );
}
