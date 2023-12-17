import Header from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { Statistics } from '@/components/Statistics/Statistics';
import { statuses } from '@/utils/themaApi';

const Home = async () => {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  return (
    <>
      <Header status={status} />
      <main className="flex min-h-screen max-w-[1440px] mx-auto flex-col items-center px-5">
        <Hero status={status} />
        <Statistics status={status} />
      </main>
    </>
  );
};

export default Home;
