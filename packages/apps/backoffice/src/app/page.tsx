"use client";

import { Button } from "@/components/shadcn/button";
import { trpc } from "@/lib/trpc";

export default function Index() {
  const helloQuery = trpc.hello.useQuery();

  return (
    <div className="flex items-center p-8 pb-20">
      <Button>
        {helloQuery.isPending ? (
          <p>loading...</p>
        ) : helloQuery.isError ? (
          <p>error.</p>
        ) : (
          <p>{helloQuery.data}</p>
        )}
      </Button>
    </div>
  );
}
