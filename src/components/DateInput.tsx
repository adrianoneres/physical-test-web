import {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useState,
} from 'react';
import { Control, Controller } from 'react-hook-form';
import { clsx } from 'clsx';

import { differenceInYears } from 'date-fns/esm';
import { DateHelper } from '../helpers/DateHelper';

export interface DateInputRootProps {
  error?: string;
  children: ReactNode;
}

function DateInputRoot({ error, children }: DateInputRootProps) {
  return (
    <>
      <div className="w-full flex items-center gap-3 py-4 px-3 h-12 rounded border-2 bg-white border-slate-300 text-slate-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-300 focus-within:text-black transition-colors [&:has(invalid)]:ring-red">
        {children}
      </div>
      {error ? <span className="mt-2 text-red-500">{error}</span> : <span />}
    </>
  );
}

DateInputRoot.displayName = 'DateInput.Root';

export interface DateInputIconProps {
  children: ReactNode;
}

function DateInputIcon({ children }: DateInputIconProps) {
  return <span className="w-6 h-6">{children}</span>;
}

DateInputIcon.displayName = 'DateInput.Icon';

const allowedKeys = [
  'ArrowLeft',
  'ArrowRight',
  'Backspace',
  'Delete',
  'Tab',
  '-',
  '/',
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

export interface DateInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<any, any>;
  name: string;
  format?: 'yyyy-MM-dd' | 'MM-dd-yyyy' | 'dd-MM-yyyy' | 'dd/MM/yyyy';
  info?: string;
  invalidMessage?: string;
  showAge?: boolean;
  ageSuffix?: string;
}

function DateInputInput({
  control,
  name,
  format = 'yyyy-MM-dd',
  invalidMessage = 'Invalid date',
  showAge = false,
  ageSuffix = 'years old',
  info,
  ...rest
}: DateInputInputProps) {
  const [isValid, setValid] = useState(true);
  const [infoMessage, setInfoMessage] = useState(info);

  const checkCharacters = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (!allowedKeys.includes(key)) event.preventDefault();
  };

  const checkValue = (event: ChangeEvent<HTMLInputElement>, callback: any) => {
    callback(event);
    const { value } = event.target;

    if (value.length === 10) {
      const isValidDate = DateHelper.isValid(value, format);
      setValid(isValidDate);

      if (isValidDate) {
        if (showAge) {
          const age = differenceInYears(
            new Date(),
            DateHelper.to(value, format),
          );
          const ageMessage = `${age} ${ageSuffix}`;
          setInfoMessage(ageMessage);
        }
      } else {
        setInfoMessage(invalidMessage);
      }
    } else {
      setValid(true);
      setInfoMessage(info);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => (
        <>
          <input
            className={clsx(
              'bg-transparent flex-1 outline-none text-black text-xs placeholder:text-slate-300',
              {
                invalid: !isValid,
              },
            )}
            value={value}
            maxLength={10}
            onKeyDown={checkCharacters}
            onChange={event => checkValue(event, onChange)}
            {...rest}
          />
          {infoMessage && (
            <span
              className={clsx('font-sans text-sm text-slate-300', {
                'text-red-500': !isValid,
              })}
            >
              {infoMessage}
            </span>
          )}
        </>
      )}
    />
  );
}

DateInputInput.displayName = 'DateInput.Input';

export const DateInput = {
  Root: DateInputRoot,
  Input: DateInputInput,
  Icon: DateInputIcon,
};
