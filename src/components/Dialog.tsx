import { ReactNode } from 'react';
import { Icon, X } from 'phosphor-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';

export interface DialogProps {
  anchorValue: string;
  anchorSize?: 'hug' | 'full';
  anchorState: 'empty' | 'filled';
  title: string;
  description?: string;
  icon?: Icon | null;
  children?: ReactNode;
}

export function Dialog({
  anchorValue,
  anchorSize = 'hug',
  anchorState = 'empty',
  title,
  description,
  icon,
  children,
}: DialogProps) {
  const AnchorIcon: Icon | undefined | null = icon;

  const preventClose = (event: any) => {
    const currentTarget = event.currentTarget as HTMLElement;

    if (event.detail.originalEvent.offsetX > currentTarget.clientWidth) {
      event.preventDefault();
    }
  };
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button
          className={clsx(
            'min-w-[100px] p-4 flex items-center justify-center',
            {
              'w-full': anchorSize === 'full',
              'text-slate-300': anchorState === 'empty',
              'text-slate-800': anchorState === 'filled',
            },
          )}
        >
          {AnchorIcon ? (
            <AnchorIcon size={24} className="mr-2" />
          ) : (
            <span></span>
          )}
          {anchorValue}
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed bg-black inset-0 opacity-40"
          onClick={event => {
            event.preventDefault();
          }}
        />
        <DialogPrimitive.Content
          className="w-full max-w-md h-full max-h-72 fixed rounded bg-white shadow top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] focus:outline-none"
          onPointerDownOutside={preventClose}
        >
          <DialogPrimitive.Title className="h-12 m-0 px-4 rounded-t bg-black font-sans font-semibold text-white flex items-center justify-between">
            <span className="2-6 h-6"></span>
            {title}
            <DialogPrimitive.Close asChild>
              <button aria-label="Close">
                <X size={24} className="cursor-pointer" />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className="font-sans text-xs text-slate-800 mt-2 mb-6 flex items-center justify-center">
              {description}
            </DialogPrimitive.Description>
          )}
          <div>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
