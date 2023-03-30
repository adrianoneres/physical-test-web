import { useState } from 'react';
import { Pencil } from 'phosphor-react';

export interface EditButtonProps {
  action?: Function;
}

export function EditButton({ action = () => {} }: EditButtonProps) {
  return (
    <>
      <button
        type={'button'}
        onClick={() => action()}
        className="py-3font-semibold text-lg text-blue-500"
      >
        <Pencil />
      </button>
    </>
  );
}
