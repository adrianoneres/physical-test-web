import { InputHTMLAttributes, ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

export interface TextInputRootProps {
  children: ReactNode;
  readonly?: boolean;
  error?: string;
}

function TextInputRoot({
  children,
  readonly = false,
  error,
}: TextInputRootProps) {
  return (
    <>
      <div
        className={clsx(
          'w-full flex items-center gap-3 py-4 px-3 h-12 rounded border-2 bg-white border-slate-300 text-slate-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-300 focus-within:text-black transition-colors',
          {
            'bg-slate-100': readonly,
          },
        )}
      >
        {children}
      </div>
      {error ? <span className="mt-2 text-red-500">{error}</span> : <span />}
    </>
  );
}

TextInputRoot.displayName = 'TextInput.Root';

export interface TextInputIconProps {
  children: ReactNode;
}

function TextInputIcon({ children }: TextInputIconProps) {
  return <Slot className="w-6 h-6">{children}</Slot>;
}

TextInputIcon.displayName = 'TextInput.Icon';

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any, any>;
  name: string;
  info?: string;
}

function TextInputInput({ control, name, info, ...rest }: TextInputInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => (
        <>
          <input
            className="bg-transparent flex-1 outline-none text-black text-xs placeholder:text-slate-300"
            value={value}
            onChange={onChange}
            {...rest}
          />
          {info && (
            <span className="font-sans text-sm text-slate-300">{info}</span>
          )}
        </>
      )}
    />
  );
}

TextInputInput.displayName = 'TextInput.Input';

export const TextInput = {
  Root: TextInputRoot,
  Input: TextInputInput,
  Icon: TextInputIcon,
};
