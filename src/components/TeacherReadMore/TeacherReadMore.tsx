import { FC } from 'react';
import clsx from 'clsx';
import { FaUserAlt } from 'react-icons/fa';
import { PiStarFill } from 'react-icons/pi';

import { Review, Thema } from '@/utils/definitions';

interface TeacherProps {
  item: {
    reviews: Review[];
    experience: string;
  };
  status: Thema;
}

export const TeacherReadMore: FC<TeacherProps> = ({ item, status }) => {
  return (
    <div>
      <p className="mb-8 leading-6 md:text-justify">{item.experience}</p>
      {item.reviews.map(review => {
        return (
          <div key={review.reviewer_name} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaUserAlt
                size={44}
                className={clsx(
                  'relative flex-shrink-0 p-1 rounded-full border-[3px]',
                  {
                    'fill-orange': status === 'themaA',
                    'fill-darkGreen': status === 'themaB',
                    'fill-darkBlue': status === 'themaC',
                    'fill-rose': status === 'themaD',
                    'fill-peach': status === 'themaF',
                  },
                  {
                    'border-orange': status === 'themaA',
                    'border-darkGreen': status === 'themaB',
                    'border-darkBlue': status === 'themaC',
                    'border-rose': status === 'themaD',
                    'border-peach': status === 'themaF',
                  }
                )}
              />

              <div>
                <p className="text-greyLabel font-medium leading-6">{review.reviewer_name}</p>
                <div className="flex items-center">
                  <PiStarFill size={16} className="fill-goldStar mr-2" />
                  <p className="text-[14px] font-medium leading-[18px]">
                    {review.reviewer_rating.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
            <p className="font-medium leading-6">{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
};
