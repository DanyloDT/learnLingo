'use client';

import { useSearchParams } from 'next/navigation';
import { BookTrial } from '../BookTrial/BookTrial';
import Modal from '../Modal/Modal';
import { FC } from 'react';

interface TeacherButtonTrialLessonProps {
  handleAuthCheck: () => void;
}

export const TeacherButtonTrialLesson: FC<TeacherButtonTrialLessonProps> = ({
  handleAuthCheck,
}) => {
  return (
    <>
      <button
        type="button"
        className="md:w-max py-3 px-6 md:py-4 md:px-12 rounded-xl bg-orange mt-8 text-lg font-bold"
        onClick={handleAuthCheck}
      >
        Book trial lesson
      </button>
    </>
  );
};
