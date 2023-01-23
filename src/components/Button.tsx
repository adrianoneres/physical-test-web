import { Icon } from 'phosphor-react';
import { clsx } from 'clsx';
import { MouseEventHandler } from 'react';

export interface ButtonProps {
  value: string;
  type?: 'button' | 'submit';
  action?: MouseEventHandler<HTMLButtonElement>;
  icon?: Icon;
  size?: 'hug' | 'full';
}

export function Button({
  value,
  action = () => {},
  type = 'button',
  icon,
  size = 'hug',
}: ButtonProps) {
  const ButtonIcon: Icon | undefined = icon;

  return (
    <button
      type={type}
      onClick={action}
      className={clsx(
        'min-w-[200px] py-3 px-4 h-12 rounded bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-colors flex',
        {
          '': size === 'hug',
          'w-full': size === 'full',
          'justify-center': !icon,
          'justify-between': value && icon,
        },
      )}
    >
      {<span className={ButtonIcon ? 'w-6 h-6' : ''}></span>}
      {value}
      {ButtonIcon ? <ButtonIcon size={24} /> : <span></span>}
    </button>
  );
}
