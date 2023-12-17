"use client";

import React, { useState, useEffect, FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";

import { TeacherItem } from "../TeacherItem/TeacherItem";
import { AttentionModal } from "../AttentionModal/AttentionModal";
import { ButtonLoadMore } from "../ButtonLoadMore/ButtonLoadMore";
import Modal from "../Modal/Modal";
import { BookTrial } from "../BookTrial/BookTrial";

import { auth } from "@/firebase/config";
import { SearchParams, Teacher, Thema } from "@/utils/definitions";
import { getTeachersData, getFavorites } from "@/services/api";
import { NoFavorites } from "../NoFavorites/NoFavorites";

interface TeacherListProps {
  searchParams?: SearchParams;
  status: Thema;
}

export const TeachersList: FC<TeacherListProps> = ({
  searchParams,
  status,
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [pickedTeacher, setPickedTeacher] = useState<Teacher | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const showBookTrial = searchParams?.trial;

  const showAttention = searchParams?.attention;

  const loadMoreTeachers = async () => {
    if (!lastDoc) return;
    const teachersData = await getTeachersData(searchParams, lastDoc);

    setTeachers((prev) => [...prev, ...teachersData.teachers]);
    setLastDoc(teachersData.lastVisible ?? null);
  };

  const loadMoreFavorites = async () => {
    if (!lastDoc) return;
    const favoritesData = await getFavorites(lastDoc);
    setTeachers((prev: Teacher[]) => [...prev, ...favoritesData.teachers]);
    setLastDoc(favoritesData.lastVisible ?? null);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      if (pathname === "/teachers") {
        const teachersData = await getTeachersData(searchParams);

        setTeachers(teachersData.teachers);
        setLastDoc(teachersData.lastVisible ?? null);
      } else if (pathname === "/favorites") {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const favoritesData = await getFavorites();
              setTeachers(favoritesData.teachers);
              setLastDoc(favoritesData.lastVisible ?? null);
            } catch (error) {
              console.error("Error loading favorite teachers:", error);
            }
          } else {
            console.error("User is not authorized");
          }
        });
      }
    };
    loadInitialData();
  }, [pathname]);

  const handleAuthCheck = (path: string, teacherId?: string | null) => {
    if (teacherId) {
      document.body.style.overflow = "hidden";
      router.push(`${pathname}/?${path}=true`);
      const chosenTeacher = teachers.find(
        (teacher) => teacher.id === teacherId
      );
      setPickedTeacher(chosenTeacher ? chosenTeacher : null);
    } else {
      document.body.style.overflow = "hidden";
      router.push(`${pathname}/?${path}=true`);
    }
  };

  const handleFavoriteChange = async () => {
    try {
      const favoritesData = await getFavorites();
      setTeachers(favoritesData.teachers);
      setLastDoc(favoritesData.lastVisible ?? null);
    } catch (error) {
      console.error("Error loading favorite teachers:", error);
    }
  };

  return (
    <>
      <ul className="flex flex-col gap-y-8 mt-8">
        {teachers.length === 0 && pathname === "/favorites" ? (
          <NoFavorites />
        ) : (
          teachers.map((item) => (
            <TeacherItem
              onFavoriteChange={handleFavoriteChange}
              handleAuthCheck={handleAuthCheck}
              key={`${item.id}-${status}`}
              item={item}
              status={status}
            />
          ))
        )}
      </ul>

      {lastDoc && teachers.length % 4 === 0 && (
        <ButtonLoadMore
          loadMoreTeachers={
            pathname === "/teachers" ? loadMoreTeachers : loadMoreFavorites
          }
          status={status}
        />
      )}
      {showAttention && <AttentionModal status={status} />}
      {showBookTrial && pickedTeacher && (
        <Modal variant="trial">
          <BookTrial
            name={pickedTeacher?.name}
            surname={pickedTeacher?.surname}
            avatarUrl={pickedTeacher?.avatar_url}
            teacherId={pickedTeacher.id}
          />
        </Modal>
      )}
    </>
  );
};
