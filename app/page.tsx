"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/context/SocketProvider";
import { useRouter } from "next/navigation";

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
  const { userId, setUserId } = useSocket();

  const [userIdLocal, setUserIdLocal] = useState<string>(userId);
  const navigate = useRouter();

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (userId) {
      navigate.push("/chat/instant-connect");
    }
  }, [userId]);

  return (
    <main className="w-full min-h-screen bg-slate-50 flex flex-col items-center p-16">
      <Header />
      <div className="rounded w-1/2 h-48 bg-white border border-gray-200 grid place-content-center">
        {
          <Dialog>
            <DialogTrigger>
              <Button
                className="bg-orange-600 hover:bg-orange-500 flex gap-2 items-center justify-center"
                size={"lg"}
                asChild
              >
                <p>Try Instant Connect</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter User Id</DialogTitle>
              </DialogHeader>

              <Input
                className="w-full"
                placeholder="Enter User Id"
                type="text"
                value={userIdLocal}
                onChange={(e) => setUserIdLocal(e.target.value)}
              />

              <DialogFooter>
                {!loading && (
                  <Button
                    className="bg-orange-600 hover:bg-orange-500 flex gap-2 items-center justify-center"
                    size={"lg"}
                    asChild
                    onClick={() => {
                      setUserId(userIdLocal);
                      setLoading(true);
                    }}
                  >
                    <Link href="/chat/instant-connect">
                      <p>Chat</p>
                      <ExternalLink />
                    </Link>
                  </Button>
                )}

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
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      </div>
    </main>
  );
}
