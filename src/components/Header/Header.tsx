'use client';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';

import { Logo } from '../Logo/Logo';
import { NavLink } from '../NavLink/NavLink';
import { Auth } from '../Auth/Auth';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { HeaderSkeleton } from '../HeaderSkeleton/HeaderSkeleton';
import { UserBar } from '../UserBar/UserBar';
import Modal from '../Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { LogoutModal } from '../LogoutModal/LogoutModal';

import { auth } from '@/firebase/config';
import { Thema } from '@/utils/definitions';

interface HeaderProps {
  status: Thema;
}

const Header: React.FC<HeaderProps> = ({ status }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  const [showOnMobile, setShowOnMobile] = useState(false);
  const [showOnTablet, setShowOnTable] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const showLogin = searchParams.get('login');
  const showRegistration = searchParams.get('registration');
  const showLogout = searchParams.get('logout');

  const handleClick = (path: string) => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    currentQueryParams.set(path, 'true');
    const newPathname = `${pathname}?${currentQueryParams.toString()}`;
    document.body.style.overflow = 'hidden';
    router.push(newPathname);
  };

  useEffect(() => {
    let isComponentMounted = true;

    onAuthStateChanged(auth, user => {
      if (user && isComponentMounted) {
        if (user.displayName) {
          setUserName(user.displayName);
          setIsLoggedIn(true);
        } else {
          const timeoutId = setTimeout(async () => {
            await user.reload();
            setUserName(user.displayName);
            setIsLoggedIn(true);
          }, 1000);
          return () => {
            clearTimeout(timeoutId);
          };
        }
      } else if (isComponentMounted) {
        setUserName(null);
        setIsLoggedIn(false);
      }
      if (isComponentMounted) {
        setIsLoading(false);
      }
      setShowOnMobile(isMobile);
      setShowOnTable(isTablet);
    });

    return () => {
      isComponentMounted = false;
    };
  }, [isMobile, isTablet]);

  return (
    <>
      <header className="flex relative items-center p-4 md:justify-around">
        {isLoading ? (
          <HeaderSkeleton status={status} />
        ) : (
          <>
            <Logo variant="header" />
            {showOnTablet && (
              <>
                <NavLink status={status} isLoggedIn={isLoggedIn} />
                {isLoggedIn ? (
                  <UserBar handleClick={handleClick} userName={userName} status={status} />
                ) : (
                  <Auth handleClick={handleClick} status={status} />
                )}
              </>
            )}
            {showOnMobile && <BurgerMenu handleNavClick={handleClick} status={status} />}
          </>
        )}
      </header>
      {showLogin && (
        <Modal>
          <LoginForm />
        </Modal>
      )}
      {showRegistration && (
        <Modal>
          <RegisterForm />
        </Modal>
      )}
      {showLogout && <LogoutModal status={status} />}
    </>
  );
};

export default Header;
