'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { User } from 'firebase/auth';
import { deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';

import { auth, db } from '@/firebase/config';

interface TeacherLikeProps {
  id: string;
  handleAuthCheck: (() => void) | null;
  isUser: User | null;
  onFavoriteChange: (() => void) | null;
}

export const TeacherLike: FC<TeacherLikeProps> = ({
  id,
  isUser,
  handleAuthCheck,
  onFavoriteChange,
}) => {
  const [like, setLike] = useState(false);
  const userId = auth.currentUser?.uid;
  const favoritesDocRef = doc(db, 'favorites', `${userId}_${id}`);
  const pathname = usePathname();

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(favoritesDocRef, doc => {
      setLike(doc.exists());
    });
    return () => unsubscribe();
  }, [favoritesDocRef, id, userId]);

  const handleToggle = async (id: string) => {
    if (handleAuthCheck) handleAuthCheck();
    if (!userId) return;
    try {
      if (like && pathname === '/favorites') {
        await deleteDoc(favoritesDocRef);
        if (onFavoriteChange) onFavoriteChange();
      } else {
        setLike(pre => !pre);
        if (like) {
          await deleteDoc(favoritesDocRef);
        } else {
          await setDoc(favoritesDocRef, { teacherId: id, userId });
        }
      }
    } catch (error) {
      console.error('error ', error);
    }
  };

  return (
    <button
      type="button"
      className="absolute top-5 right-5 cursor-pointer"
      onClick={() => handleToggle(id)}
    >
      {!like || !isUser ? (
        <VscHeart size={26} />
      ) : (
        <VscHeartFilled size={26} className="fill-orange" />
      )}
    </button>
  );
};
