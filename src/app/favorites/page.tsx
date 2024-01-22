import clsx from "clsx";
import { FC } from "react";

import Header from "@/components/Header/Header";
import { TeachersList } from "@/components/TeachersList/TeachersList";

import { SearchParams } from "@/utils/definitions";
import { statuses } from "@/utils/themaApi";

interface FavoritesPageProps {
  searchParams: SearchParams;
}

const FavoritesPage: FC<FavoritesPageProps> = async ({ searchParams }) => {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  return (
    <>
      <Header status={status} />
      <main
        className={clsx(
          "flex min-h-screen max-w-[1440px] mx-auto flex-col items-center px-5",
          {
            "bg-lightOrange": status === "themaA",
            "bg-lightGreen": status === "themaB",
            "bg-lightBlue": status === "themaC",
            "bg-lightRose": status === "themaD",
            "bg-lightPeach": status === "themaF",
          }
        )}
      >
        <section className="xl:px-[108px] w-full pb-8">
          <TeachersList searchParams={searchParams} status={status} />
        </section>
      </main>
    </>
  );
};

export default FavoritesPage;
