import { FC } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

export const NoFavorites: FC = (): JSX.Element => {
  return (
    <div className="mt-[60px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <MagnifyingGlass
          visible={true}
          height="150"
          width="150"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />

        <p className="text-3xl lg:text-4xl xl:text-5xl text-center font-medium leading-tight tracking-tight lg:leading-[48px] lg:tracking-[-0.64px] mt-5">
          Oh, no... <br />
          You have not added any favorite teachers yet
        </p>
      </div>
    </div>
  );
};
