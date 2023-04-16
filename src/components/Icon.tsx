import React from 'react';

export type IconType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export interface IconProps {
  name: IconType;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconElement: IconType = name;

  return <IconElement className={className} aria-hidden="true" />;
}
