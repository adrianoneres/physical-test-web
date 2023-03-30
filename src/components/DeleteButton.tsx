import { useState } from 'react';
import { Trash } from 'phosphor-react';

export interface DeleteButtonProps {
  action?: Function;
  message?: string;
}

export function DeleteButton({
  action = () => {},
  message = 'Tem certeza de que deseja excluir este registro?',
}: DeleteButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    action();
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        type={'button'}
        onClick={handleClick}
        className="py-3font-semibold text-lg text-red-500"
      >
        <Trash />
      </button>
      {showConfirmation && (
        <>
          <div className="absolute z-40 w-full h-full top-0 bottom-0 left-0 right-0 bg-black opacity-50"></div>
          <div className="absolute z-50 w-full h-screen top-0 bottom-0 left-0 right-0 overflow-x-hidden overflow-y-hidden bg-transparent">
            <div className="relative top-1/2 bottom-1/2 -translate-y-1/2 m-auto max-w-[600px] h-60 bg-white rounded-lg p-4 drop-shadow-lg">
              <div className="relative flex flex-col h-full justify-between">
                <div className="w-full text-start text-lg p-4">{message}</div>
                <div className="w-full flex items-center justify-center mt-8 mb-4 gap-4">
                  <button
                    onClick={handleDelete}
                    className="py-3 px-4 h-12 rounded bg-red-500 text-white font-semibold text-sm hover:bg-red-600 focus:ring focus:ring-blue-300 transition-colors flex"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={handleCancel}
                    className="py-3 px-4 h-12 rounded bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 focus:ring focus:ring-blue-300 transition-colors flex"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
