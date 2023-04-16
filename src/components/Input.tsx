import { InputHTMLAttributes, KeyboardEvent } from 'react';
import { Control, Controller } from 'react-hook-form';
import clsx from 'clsx';

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any, any>;
  label: string;
  name: string;
  type?: 'text' | 'number';
  decimal?: boolean;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
}

const allowedDefaultCharacters = [
  'Tab',
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];
const allowdSpecialCharacters = ['.', ','];

export function Input({
  control,
  label,
  name,
  error,
  placeholder = '',
  type = 'text',
  readonly = false,
  decimal = false,
  className,
  ...rest
}: InputTextProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isNumber = type === 'number';
    const isTypedNumber = allowedDefaultCharacters.includes(e.key);
    const isTypedSpecialCharacter = allowdSpecialCharacters.includes(e.key);

    if (isNumber) {
      if (decimal && !isTypedNumber && !isTypedSpecialCharacter) {
        e.preventDefault();
      }
      if (!decimal && !isTypedNumber) {
        e.preventDefault();
      }
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => (
        <div className={`w-full flex flex-col mt-4 ${className}`}>
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
              onKeyDown={event => handleKeyDown(event)}
              onChange={onChange}
              type={type}
              {...rest}
              className="flex-1 bg-transparent outline-none text-sm text-black placeholder:text-gray-300"
            />
          </div>
          <span className="h-5 ml-1 mt-1 font-sans text-sm text-danger-500">
            {!!error && error}
          </span>
        </div>
      )}
    />
  );
}
