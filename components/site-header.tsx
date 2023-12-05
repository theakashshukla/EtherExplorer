import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";
import { ConnectButton } from "@/components/Wallet-Connect";

export function SiteHeader() {
  return (
    <header className="top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <ConnectButton/>
        </div>
      </div>
    </header>
  );
}
