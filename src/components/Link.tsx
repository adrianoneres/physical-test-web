import { MouseEventHandler } from 'react';
import { Icon } from 'phosphor-react';
import { clsx } from 'clsx';

export interface LinkProps {
  value: string;
  icon?: Icon;
  action?: MouseEventHandler<HTMLButtonElement>;
}

export function Link({ value, action = () => {}, icon }: LinkProps) {
  const LinkIcon: Icon | undefined = icon;

  return (
    <button
      type="button"
      onClick={action}
      className={clsx(
        'text-blue-500 text-sm hover:underline transition-colors flex items-center',
      )}
    >
      {LinkIcon ? <LinkIcon size={18} className="mr-1" /> : <span></span>}
      {value}
      {<span className={LinkIcon ? 'w-6 h-6' : ''}></span>}
    </button>
  );
}
