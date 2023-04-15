import { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import clsx from 'clsx';

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any, any>;
  label: string;
  name: string;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
}

export function Input({
  control,
  label,
  name,
  error,
  placeholder = '',
  readonly = false,
  ...rest
}: InputTextProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => (
        <div className="w-full flex flex-col my-4">
          <label htmlFor={name} className="ml-1 mb-1 text-sm text-gray-500">
            {label}
          </label>
          <div
            className={clsx(
              'w-full h-9 gap-2 py-0 px-3 flex items-center rounded-lg shadow border-gray-300 bg-white text-gray-300 focus-within:ring focus-within:ring-blue-300 focus-within:border-blue-500 focus-within:text-black transition-colors',
              {
                'bg-slate-100': readonly,
                'border-danger-500': !!error,
              },
            )}
          >
            <input
              id={name}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              {...rest}
              className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-gray-300"
            />
          </div>
          {!!error && (
            <span className="ml-1 mt-1 font-sans text-sm text-danger-500">
              {error}
            </span>
          )}
        </div>
      )}
    />
  );
}
