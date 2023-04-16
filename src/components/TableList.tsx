import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Icon } from './Icon';
import { Modal } from './Modal';

export interface TableListProps {
  route: string;
  itemLabel: string;
  columns: {
    field: string;
    label: string;
    className?: string;
  }[];
  items: {
    data: {
      id: string;
      [key: string]: string | number | boolean;
    }[];
    pagination: {
      page: number;
      pages: number;
      size: number;
      total: number;
    };
  };
  actionLoad: Function;
  actionDelete?: Function;
  filter?: {
    [key: string]: any;
  };
  showEdit?: boolean;
  showDelete?: boolean;
}

export function TableList({
  route,
  itemLabel,
  columns,
  items,
  filter,
  actionLoad,
  actionDelete,
  showEdit = true,
  showDelete = true,
}: TableListProps) {
  const handlePreviousPage = () => {
    actionLoad({ ...filter, page: items.pagination.page - 1 });
  };

  const handleNextPage = () => {
    actionLoad({ ...filter, page: items.pagination.page + 1 });
  };

  return (
    <>
      {items && (
        <>
          <div className="mt-4 p-4 border border-gray-300 bg-white rounded-lg">
            <table className="w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columns.map(column => (
                    <th
                      key={column.label}
                      className={`py-2 px-4 text-xs text-left text-gray-500 uppercase ${column.className}`}
                    >
                      {column.label}
                    </th>
                  ))}
                  {(showEdit || showDelete) && (
                    <th className="w-24 py-2 px-4 text-xs text-left text-gray-500 uppercase"></th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.data?.map(item => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-100 rounded-lg cursor-default"
                  >
                    {columns.map((column, index) => (
                      <td
                        key={column.field}
                        className="py-2 px-4 text-sm text-slate-600"
                      >
                        {index === 0 && showEdit && (
                          <Link
                            href={`${route}/${item.id}/edit`}
                            className="font-bold"
                          >
                            {item[column.field]}
                          </Link>
                        )}
                        {index === 0 && !showEdit && item[column.field]}
                        {index !== 0 && item[column.field]}
                      </td>
                    ))}
                    {showDelete && (
                      <td>
                        <Modal
                          trigger="Excluir"
                          title={`Excluir ${itemLabel}`}
                          content={`Tem certeza de que deseja excluir ${
                            item[columns[0].field]
                          }?`}
                          action={() => actionDelete?.(item.id)}
                          actionLabel="Excluir"
                          cancelLabel="Cancelar"
                          className="text-sm"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-4 flex items-center justify-end text-sm">
            {items.pagination?.page !== 1 && (
              <button type="button" onClick={handlePreviousPage}>
                <Icon
                  name={ChevronLeftIcon}
                  className="h-5 w-5 text-blue-500 hover:text-blue-600 transition-colors"
                />
              </button>
            )}
            {items.pagination?.page === 1 && <span className="w-5"></span>}

            <span className="text-black mx-4">
              {items.pagination?.page}/{items.pagination?.pages}
            </span>

            {items.pagination?.page !== items.pagination?.pages && (
              <button type="button" onClick={handleNextPage}>
                <Icon
                  name={ChevronRightIcon}
                  className="h-5 w-5 text-blue-500 hover:text-blue-600 transition-colors"
                />
              </button>
            )}
            {items.pagination?.page === items.pagination?.pages && (
              <span className="w-5"></span>
            )}
          </div>
        </>
      )}
      {!items && <span>Nenhum resultado encontrado</span>}
    </>
  );
}
