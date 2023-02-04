import { MouseEventHandler } from 'react';
import { Icon } from 'phosphor-react';
import { clsx } from 'clsx';

export interface ButtonProps {
  value: string;
  type?: 'button' | 'submit';
  icon?: Icon;
  size?: 'hug' | 'full';
  action?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  value,
  type = 'button',
  icon,
  size = 'hug',
  action = () => {},
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
      <span className={ButtonIcon ? 'w-6 h-6' : ''} />
      {value}
      {ButtonIcon ? <ButtonIcon size={24} /> : <span />}
    </button>
  );
}
