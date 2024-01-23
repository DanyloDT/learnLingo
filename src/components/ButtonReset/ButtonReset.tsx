"use client";
import { usePathname, useRouter } from "next/navigation";

export const ButtonReset = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname);
  };
  return (
    <button
      type="button"
      onClick={handleReset}
      className="py-[14px] px-[25px] rounded-xl border-2 border-dark text-dark font-extrabold md:font-bold md:text-base/5 hover:scale-105 shadow-md hover:shadow-slate-700 transition-all duration-300"
    >
      Reset
    </button>
  );
};
