"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  return (
    <header className="w-1/2 rounded bg-white flex flex-col items-center justify-between px-16 py-4 mb-8 border border-gray-200">
      <h1 className="text-4xl font-bold text-slate-700">Instant Connect</h1>
      <p className="text-gray-700 mt-2">Connect with your friends instantly.</p>
    </header>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-slate-50 flex flex-col items-center p-16">
      <Header />
      <div className="rounded w-1/2 h-48 bg-white border border-gray-200 grid place-content-center">
        {!loading && <Button
          className="bg-orange-600 hover:bg-orange-500 flex gap-2 items-center justify-center"
          size={"lg"}
          asChild
          onClick={() => setLoading(true)}
        >
          <Link href="/chat">
            <p>Try Instant Connect</p>
            <ExternalLink />
          </Link>
        </Button>}

        {loading && (
          <Button
            className="bg-orange-600 hover:bg-orange-500 flex gap-2 items-center justify-center"
            size={"lg"}
            asChild
            disabled
          >
            <span>
              <p>Connecting</p>
              <Loader2 className="animate-spin" />
            </span>
          </Button>
        )}
      </div>
    </main>
  );
}
