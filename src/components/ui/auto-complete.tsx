"use client";

import React from "react";
import BaseSelect from "react-select";

export const AutoComplete = ({
  id,
  name,
  options,
  value,
  onChange,
  placeholder,
  clearable = true,
  required,
}: {
  id?: string;
  name?: string;
  options: { value: string; label: string | React.ReactNode }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string | React.ReactNode;
  clearable?: boolean;
  required?: boolean;
}) => {
  const [inputValue, setInputValue] = React.useState(value);

  const displayValue = inputValue
    ? options.find((c) => c.value === inputValue)
    : null;

  const handleChange = (value: string) => {
    setInputValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <input type="hidden" name={name} value={inputValue ?? ""} />
      <BaseSelect
        id={id}
        classNames={{
          control: ({ isFocused }) =>
            `!h-9 !min-h-9 flex rounded-lg border ${
              isFocused
                ? "!border-primary !ring-0 !ring-primary"
                : "border-gray-300 dark:border-gray-600"
            } shadow-sm !bg-transparent !rounded-md !border !border-input dark:!bg-input/30`,
          menu: () =>
            "mt-2 rounded-lg border border-gray-300 dark:border-gray-600 !bg-background shadow-lg",
          option: ({ isSelected, isFocused }) =>
            `px-4 py-2 cursor-pointer transition !text-base md:!text-sm ${
              isSelected
                ? "!bg-primary text-white"
                : isFocused
                  ? "!bg-primary/60"
                  : "!bg-transparent"
            }`,
          singleValue: () =>
            "text-gray-800 dark:!text-gray-100 !text-base md:!text-sm",
          placeholder: () => "!text-muted-foreground !text-base md:!text-sm",
          dropdownIndicator: () =>
            "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
          clearIndicator: () =>
            "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
        }}
        options={options}
        placeholder={placeholder}
        value={displayValue}
        onChange={(val) => handleChange(val ? val.value : "")}
        isClearable={clearable}
        required={required}
      />
    </>
  );
};
