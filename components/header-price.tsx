import Link from "next/link";
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";

export function HeaderPrice() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 items-center">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <div className="flex items-center space-x-1">
            <div className="text-sm font-medium text-gray-500">
              ETH Price: <span className="text-blue-500">$2,103.69</span>{" "}
              <span className="text-green-500">(+0.08%)</span>
            </div>
            <div className="text-sm font-medium text-gray-500">
              Gas Price: <span className="text-blue-500">20 gwei</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
