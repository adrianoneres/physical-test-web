import { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface CardProps {
  action: () => void;
  children: ReactNode;
}

function CardRoot({ action, children }: CardProps) {
  const handleClick = () => {
    action();
  };

  return (
    <section
      onClick={handleClick}
      className="w-[222px] h-[280px] bg-white border-slate-100 rounded drop-shadow-xl hover:cursor-pointer hover:drop-shadow transition-all flex flex-col items-center text-slate-800"
    >
      {children}
    </section>
  );
}

CardRoot.displayName = 'Card.Root';

export interface CardIconProps {
  children: ReactNode;
}

function CardIcon({ children }: CardIconProps) {
  return (
    <div className="h-[140px] flex items-center justify-center">
      <Slot className="w-14 h-14">{children}</Slot>
    </div>
  );
}

CardIcon.displayName = 'Card.Icon';

export interface CardLabelProps {
  value: string;
}

function CardLabel({ value }: CardLabelProps) {
  return (
    <div className="h-[140px] flex items-center justify-center">
      <span className="text-xl px-3 text-center font-bold">{value}</span>
    </div>
  );
}

CardLabel.displayName = 'Card.Label';

export const Card = {
  Root: CardRoot,
  Icon: CardIcon,
  Label: CardLabel,
};
