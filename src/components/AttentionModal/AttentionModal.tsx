'use client';
import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Auth } from '../Auth/Auth';
import Modal from '../Modal/Modal';

import { Thema } from '@/utils/definitions';

interface AttentionModalProps {
  status: Thema;
}

export const AttentionModal: FC<AttentionModalProps> = ({ status }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (path: string) => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    currentQueryParams.set(path, 'true');
    const newPathname = `${pathname}?${currentQueryParams.toString()}`;
    document.body.style.overflow = 'hidden';
    router.push(newPathname);
  };

  return (
    <Modal>
      <div>
        <h3 className="text-3xl font-medium text-center mb-5">Attention</h3>
        <p className="text-sm font-medium tracking-[0.56px] text-center mb-10">
          We would like to remind you that certain functionality is available only to authorized
          users.If you have an account, please log in with your credentials. If you do not already
          have an account, you must register to access these features.
        </p>
        <div className="md:flex items-center justify-center md:gap-5">
          <Auth handleClick={handleClick} status={status} />
        </div>
      </div>
    </Modal>
  );
};
