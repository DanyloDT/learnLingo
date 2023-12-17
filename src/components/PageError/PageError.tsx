import { FC } from "react";

interface PageErrorProps {
  reset: () => void;
}

export const PageError: FC<PageErrorProps> = ({ reset }) => {
  return (
    <main className="flex h-full flex-col items-center justify-center min-h-screen">
      <h2 className="text-center md:text-2xl">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm md:text-2xl text-white transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
};
