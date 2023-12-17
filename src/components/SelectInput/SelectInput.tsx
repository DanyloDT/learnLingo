"use client";
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { FC } from "react";
import { getSelectStyles } from "@/utils/getSelectStyles";

interface SelectInputProps {
  label: string;
  options: string[];
  width: string;
}

interface OptionType {
  value: string;
  label: string;
}

export const SelectInput: FC<SelectInputProps> = ({
  label,
  options,
  width,
}) => {
  const queryParams = label.split(" ")[0].toLowerCase();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedValue = searchParams.get(queryParams) || "";

  const handleChange = (
    selectedOption: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    const singleValueOption = selectedOption as SingleValue<OptionType>;
    const value = singleValueOption ? singleValueOption.value : "";
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryParams, value);

    replace(`${pathname}?${params.toString()}`);
  };

  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const selectStyles = getSelectStyles({ width });

  return (
    <div className="flex flex-col w-max gap-y-2 ">
      <label className="text-greyLabel text-sm leading-[18px] font-medium ">
        {label}
      </label>
      <ReactSelect
        styles={selectStyles}
        options={selectOptions}
        onChange={handleChange}
        value={selectOptions.find((option) => option.value === selectedValue)}
        placeholder="-------"
      />
    </div>
  );
};
