import clsx from 'clsx';

import { Control, Controller } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectRootProps {
  control: Control<any, any>;
  name: string;
  options: SelectOption[];
  onSelectionChange?: any;
  error?: string;
}

export function Select({
  control,
  name,
  options,
  onSelectionChange,
  error,
}: SelectRootProps) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <div
            className={clsx(
              'w-full relative flex justify-between items-center gap-3 h-12 rounded border-2 bg-white border-slate-300 text-slate-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-300 focus-within:text-black transition-colors ',
              { 'text-black': !!value },
            )}
          >
            <select
              id={name}
              value={value}
              className="w-[calc(100%-16px)] h-full px-3 outline-0"
              onChange={e => {
                onChange(e);

                if (onSelectionChange) {
                  onSelectionChange();
                }
              }}
            >
              <option value="">Selecione</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      />
      {error ? <span className="mt-2 text-red-500">{error}</span> : <span />}
    </>
  );
}
