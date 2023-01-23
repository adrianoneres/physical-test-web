import {
  ChangeEvent,
  Fragment,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useState,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { clsx } from 'clsx';

import { DateHelper } from '../helpers/DateHelper';
import { differenceInYears } from 'date-fns/esm';

export interface DateInputRootProps {
  children: ReactNode;
}

function DateInputRoot({ children }: DateInputRootProps) {
  return (
    <div className="w-full flex items-center gap-3 py-4 px-3 h-12 rounded border-2 bg-white border-slate-300 text-slate-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-300 focus-within:text-black transition-colors [&:has(invalid)]:ring-red">
      {children}
    </div>
  );
}

DateInputRoot.displayName = 'DateInput.Root';

export interface DateInputIconProps {
  children: ReactNode;
}

function DateInputIcon({ children }: DateInputIconProps) {
  return <Slot className="w-6 h-6">{children}</Slot>;
}

DateInputIcon.displayName = 'DateInput.Icon';

const allowedKeys = [
  'ArrowLeft',
  'ArrowRight',
  'Backspace',
  'Delete',
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
  format?: 'yyyy-MM-dd' | 'MM-dd-yyyy' | 'dd-MM-yyyy' | 'dd/MM/yyyy';
  info?: string;
  invalidMessage?: string;
  showAge?: boolean;
  ageSuffix?: string;
}

function DateInputInput({
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

  const checkValue = (event: ChangeEvent<HTMLInputElement>) => {
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
    <Fragment>
      <input
        className={clsx(
          'bg-transparent flex-1 outline-none text-black text-xs placeholder:text-slate-300',
          {
            invalid: !isValid,
          },
        )}
        maxLength={10}
        onKeyDown={checkCharacters}
        onChange={checkValue}
        {...rest}
      />
      {infoMessage && (
        <span
          className={clsx('font-sans text-sm text-slate-300', {
            'text-red': !isValid,
          })}
        >
          {infoMessage}
        </span>
      )}
    </Fragment>
  );
}

DateInputInput.displayName = 'DateInput.Input';

export const DateInput = {
  Root: DateInputRoot,
  Input: DateInputInput,
  Icon: DateInputIcon,
};
