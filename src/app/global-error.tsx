"use client";

import { PageError } from "@/components/PageError/PageError";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <PageError reset={reset} />
      </body>
    </html>
  );
}
