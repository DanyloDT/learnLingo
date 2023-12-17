import { FC } from "react";
import { SelectInput } from "../SelectInput/SelectInput";

interface TeacherFilterFormProps {
  [key: string]: string[];
}

export const TeacherFilterForm: FC<TeacherFilterFormProps> = ({
  languages,
  levels,
  prices,
}) => {
  return (
    <form className="flex flex-col w-max mx-auto md:flex-row gap-y-5 md:gap-x-5 md:mx-0">
      <SelectInput label="Languages" options={languages} width="202px" />
      <SelectInput label="Level of knowledge" options={levels} width="239px" />
      <SelectInput
        label="Price"
        options={prices.map((price) => `${price} $`)}
        width="115px"
      />
    </form>
  );
};
