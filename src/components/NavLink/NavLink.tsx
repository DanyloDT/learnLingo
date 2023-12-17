import { FC } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Thema } from "@/utils/definitions";

interface NavLinkProps {
  toggleMenu?: () => void;
  status?: Thema;
  isLoggedIn?: boolean | null;
}

export const NavLink: FC<NavLinkProps> = ({
  toggleMenu,
  status,
  isLoggedIn,
}) => {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-col gap-10 items-center
      md:flex-row "
    >
      <Link
        href="/"
        className={`link ${
          pathname === "/"
            ? "active"
            : "text-2xl font-medium md:text-base/5 md:font-normal relative group"
        }`}
        onClick={toggleMenu}
      >
        Home
        <span
          className={clsx(
            "absolute inset-x-0 bottom-0 w-0 h-0.5 bg-transparent transition-all duration-300 group-hover:w-full",
            {
              "group-hover:bg-orange": status === "themaA",
              "group-hover:bg-darkGreen": status === "themaB",
              "group-hover:bg-darkBlue": status === "themaC",
              "group-hover:bg-rose": status === "themaD",
              "group-hover:bg-peach": status === "themaF",
            }
          )}
        ></span>
      </Link>
      <Link
        href="/teachers"
        className={`link ${
          pathname === "/teachers"
            ? "active"
            : "text-2xl font-medium md:text-base/5 md:font-normal relative group"
        }`}
        onClick={toggleMenu}
      >
        Teachers
        <span
          className={clsx(
            "absolute inset-x-0 bottom-0 w-0 h-0.5 bg-transparent transition-all duration-300 group-hover:w-full",
            {
              "group-hover:bg-orange": status === "themaA",
              "group-hover:bg-darkGreen": status === "themaB",
              "group-hover:bg-darkBlue": status === "themaC",
              "group-hover:bg-rose": status === "themaD",
              "group-hover:bg-peach": status === "themaF",
            }
          )}
        ></span>
      </Link>
      {isLoggedIn && (
        <Link
          href="/favorites"
          className={`link ${
            pathname === "/favorites"
              ? "active"
              : "text-2xl font-medium md:text-base/5 md:font-normal relative group"
          }`}
          onClick={toggleMenu}
        >
          Favorites
          <span
            className={clsx(
              "absolute inset-x-0 bottom-0 w-0 h-0.5 bg-transparent transition-all duration-300 group-hover:w-full",
              {
                "group-hover:bg-orange": status === "themaA",
                "group-hover:bg-darkGreen": status === "themaB",
                "group-hover:bg-darkBlue": status === "themaC",
                "group-hover:bg-rose": status === "themaD",
                "group-hover:bg-peach": status === "themaF",
              }
            )}
          ></span>
        </Link>
      )}
    </nav>
  );
};
