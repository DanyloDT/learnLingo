import { FC, useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { NavLink } from "../NavLink/NavLink";
import { Auth } from "../Auth/Auth";
import { UserBar } from "../UserBar/UserBar";

import { auth } from "@/firebase/config";
import { Thema } from "@/utils/definitions";

interface BurgerProps {
  status: Thema;
  handleNavClick: (path: string) => void;
  toggleMenu?: (path: string) => void;
}

export const BurgerMenu: FC<BurgerProps> = ({ status, handleNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    const body = document.body;
    const newOverflow = body.style.overflow === "hidden" ? "auto" : "hidden";

    body.style.overflow = newOverflow;
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClick = (path: string) => {
    document.body.style.overflow = "hidden";
    if (toggleMenu) toggleMenu();
    handleNavClick(path);
  };

  return (
    <div className="ml-auto">
      <RxHamburgerMenu size={30} onClick={toggleMenu} />
      {isOpen && (
        <div className="absolute top-[50px] left-0 z-40 min-h-screen min-w-full border-2 bg-white">
          <div className="flex flex-col gap-24 items-center mt-24 ">
            <NavLink
              toggleMenu={toggleMenu}
              isLoggedIn={isLoggedIn}
              status={status}
            />
            {isLoggedIn ? (
              <UserBar
                handleClick={handleClick}
                userName={userName}
                status={status}
              />
            ) : (
              <Auth handleClick={handleClick} status={status} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
