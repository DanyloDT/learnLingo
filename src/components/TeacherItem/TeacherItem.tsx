'use client';

import { FC, useEffect, useState } from 'react';
import { PiBookOpenLight, PiStarFill } from 'react-icons/pi';
import { User, onAuthStateChanged } from 'firebase/auth';

import { TeacherAvatar } from '../TeacherAvatar/TeacherAvatar';
import { TeacherLike } from '../TeacherLike/TeacherLike';
import { TeacherReadMore } from '../TeacherReadMore/TeacherReadMore';
import { TeacherButtonTrialLesson } from '../TeacherButtonTrialLesson/TeacherButtonTrialLesson';
import { TeachersLevelsList } from '../TeachersLevelsList/TeachersLevelsList';

import { auth } from '@/firebase/config';
import { Teacher, Thema } from '@/utils/definitions';

interface TeacherProps {
  item: Teacher;
  status: Thema;
  onFavoriteChange: () => void;
  handleAuthCheck: (path: string, id?: string | null) => void;
}

export const TeacherItem: FC<TeacherProps> = ({
  item,
  status,
  onFavoriteChange,
  handleAuthCheck,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isUser, setIsUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsUser(user);
      } else {
        setIsUser(null);
      }
    });
  }, []);

  const toggleDetails = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <li className="relative flex flex-wrap md:flex-nowrap items-start md:gap-x-8  p-5 md:p-6 rounded-3xl bg-white">
      <TeacherAvatar
        name={item.name}
        surname={item.surname}
        avatarUrl={item.avatar_url}
        status={status}
      />

      <div className="w-full">
        <div className="flex flex-col xl:flex-row  xl:w-full items-center md:items-start justify-center xl:justify-between gap-1 xl:gap-8 mb-8 xl:mb-2 xl:pr-[85px]">
          <p className="text-greyLabel font-medium leading-6">Languages</p>
          <div className="flex items-center flex-wrap ">
            <ul className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center md:justify-start font-medium leading-6">
              <li className="flex items-center md:after:content-['|'] md:after:text-lightGrey md:after:ml-4 md:after:mr-4">
                <PiBookOpenLight size={16} className="mr-2" />
                <p>Lessons online</p>
              </li>
              <li className="flex items-center md:after:content-['|'] md:after:text-lightGrey md:after:ml-4 md:after:mr-4">
                <p>Lessons done: {item.lessons_done}</p>
              </li>
              <li className="flex items-center md:after:content-['|'] md:after:text-lightGrey md:after:ml-4 md:after:mr-4">
                <PiStarFill size={16} className="fill-goldStar mr-2" />
                <p>Rating: {item.rating}</p>
              </li>
              <li>
                <p>
                  Price / 1 hour: <span className="text-green">{item.price_per_hour} $</span>
                </p>
              </li>
            </ul>
            <TeacherLike
              onFavoriteChange={onFavoriteChange}
              handleAuthCheck={isUser ? null : () => handleAuthCheck('attention')}
              id={item.id}
              isUser={isUser}
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow flex-wrap ">
          <p className="mb-5 xl:mb-8 text-2xl font-medium leading-[1]">
            {item.name} {item.surname}
          </p>
          <p className="mb-2 font-medium leading-6 ">
            <span className="text-greyLabel font-medium leading-6">Speaks: </span>
            <span className="underline"> {item.languages.join(', ')}</span>
          </p>
          <p className="mb-2 font-medium leading-6">
            <span className="text-greyLabel font-medium leading-6">Lesson info: </span>
            {item.lesson_info}
          </p>
          <p className="mb-4 font-medium leading-6">
            <span className="text-greyLabel font-medium leading-6">Conditions: </span>
            {item.conditions}
          </p>
          <details>
            <summary
              onClick={toggleDetails}
              className="list-none underline cursor-pointer font-medium leading-6 mb-8 text-blue-700"
            >
              {isOpen ? 'Read less' : 'Read more'}
            </summary>

            <TeacherReadMore item={item} status={status} />
          </details>
          <TeachersLevelsList levels={item.levels} />
          {isOpen && (
            <TeacherButtonTrialLesson
              handleAuthCheck={() =>
                handleAuthCheck(isUser ? 'trial' : 'attention', isUser ? item.id : null)
              }
            />
          )}
        </div>
      </div>
    </li>
  );
};
