import { FC } from 'react';
import clsx from 'clsx';

import { Thema } from '@/utils/definitions';

interface ButtonLoadMoreProps {
  loadMoreTeachers: () => void;
  status: Thema;
}

export const ButtonLoadMore: FC<ButtonLoadMoreProps> = ({ loadMoreTeachers, status }) => {
  return (
    <div>
      <button
        onClick={loadMoreTeachers}
        type="button"
        className={clsx(
          'w-full md:w-max block mx-auto px-20 text-lg text-center font-bold mt-10 py-4 rounded-xl hover:scale-105 transition-transform',
          {
            'bg-darkBlue': status === 'themaA',
            'bg-rose': status === 'themaB',
            'bg-orange': status === 'themaC',
            'bg-foxGreen': status === 'themaD',
            'bg-darkGreen': status === 'themaF',
          }
        )}
      >
        Load More
      </button>
    </div>
  );
};
