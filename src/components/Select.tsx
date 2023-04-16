import { Fragment, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { Icon } from './Icon';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  control: Control<any, any>;
  label: string;
  name: string;
  options: SelectOption[];
  onSelectionChange?: any;
  error?: string;
  placeholder?: string;
  className?: string;
}

export function Select({
  control,
  label,
  name,
  options,
  onSelectionChange,
  error,
  placeholder,
  className,
}: SelectProps) {
  const [selected, setSelected] = useState<SelectOption | null>(null);

  useEffect(() => {
    const selectedValue = control._formValues[name];
    const selectedOption =
      options.find(option => option.value === selectedValue) || null;
    setSelected(selectedOption);
  }, [control._formValues, name, options]);

  const handleSelect = (value: any, onChange: any) => {
    const selectedOption: SelectOption | null =
      options.find(option => option.value === value) || null;

    onChange(value);
    setSelected(selectedOption);

    if (onSelectionChange) {
      onSelectionChange();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div className={`w-full flex flex-col mt-4 ${className}`}>
          <label htmlFor={name} className="ml-1 mb-1 text-sm text-gray-500">
            {label}
          </label>
          <Listbox
            value={selected}
            onChange={selectedValue => handleSelect(selectedValue, onChange)}
          >
            <div className="relative">
              <Listbox.Button
                id={name}
                className="h-[36px] relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
              >
                {selected && (
                  <span className="block truncate text-black">
                    {selected.label}
                  </span>
                )}
                {!selected && (
                  <span className="block truncate text-gray-300">
                    {placeholder || 'Selecione'}
                  </span>
                )}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Icon
                    name={ChevronUpDownIcon}
                    className="h-5 w-5 text-gray-300"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto z-10 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map(option => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
                        }`
                      }
                      value={option.value}
                    >
                      <>
                        <span
                          className={`block truncate ${
                            selected?.value === option.value
                              ? 'font-medium'
                              : 'font-normal'
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected?.value === option.value ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <Icon
                              name={CheckIcon}
                              className="h-5 w-5 text-blue-500"
                            />
                          </span>
                        ) : null}
                      </>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <span className="h-5 ml-1 mt-1 font-sans text-sm text-danger-500">
            {!!error && error}
          </span>
        </div>
      )}
    />
  );
}
