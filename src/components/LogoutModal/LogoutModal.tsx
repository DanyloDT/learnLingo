import { FC } from 'react';
import clsx from 'clsx';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import Modal from '../Modal/Modal';
import { logout } from '@/services/api';

import { Thema } from '@/utils/definitions';

interface LogoutModalProps {
  status: Thema;
}

export const LogoutModal: FC<LogoutModalProps> = ({ status }) => {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      document.body.style.overflow = 'auto';
      await logout();
      const currentUrl = new URL(window.location.href);
      const params = currentUrl.searchParams;
      params.delete('logout');
      const newPath = `/teachers?${params.toString()}`;
      router.replace(newPath);
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  const handleClose = () => {
    document.body.style.overflow = 'auto';
    router.back();
  };

  return (
    <Modal>
      <div className="py-6">
        <h3 className="text-3xl font-medium text-center mb-10">Already leaving&#63;</h3>

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-4 ">
          <button
            onClick={handleLogOut}
            className="flex gap-2 items-center justify-center text-2xl font-extrabold md:font-bold hover:scale-110 transition-all duration-300"
          >
            <FiLogIn
              size={30}
              className={clsx({
                'stroke-orange': status === 'themaA',
                'stroke-darkGreen': status === 'themaB',
                'stroke-darkBlue': status === 'themaC',
                'stroke-rose': status === 'themaD',
                'stroke-peach': status === 'themaF',
              })}
            />
            Yes
          </button>
          <button
            onClick={handleClose}
            className={clsx(
              'w-full h-14 md:w-40 md:h-10 rounded-xl bg-dark text-white hover:text-dark text-2xl font-extrabold md:font-bold hover:scale-105 transition-all duration-300',
              {
                'hover:bg-orange': status === 'themaA',
                'hover:bg-darkGreen': status === 'themaB',
                'hover:bg-darkBlue': status === 'themaC',
                'hover:bg-rose': status === 'themaD',
                'hover:bg-peach': status === 'themaF',
              }
            )}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
