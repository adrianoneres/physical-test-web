import { CaretLeft, CaretRight } from 'phosphor-react';

export interface PaginatorProps {
  page: number;
  pages: number;
  pageSelect: Function;
  filter?: {
    [key: string]: any;
  };
}

export function Paginator({ page, pages, filter, pageSelect }: PaginatorProps) {
  const handlePreviousPage = () => {
    pageSelect({ ...filter, page: page - 1 });
  };

  const handleNextPage = () => {
    pageSelect({ ...filter, page: page + 1 });
  };

  return (
    <div className="w-full mt-8 flex items-center justify-center">
      {page !== 1 && (
        <button type="button" onClick={handlePreviousPage}>
          <CaretLeft />
        </button>
      )}

      <span className="text-black mx-4">{`${page}/${pages}`}</span>

      {page !== pages && (
        <button type="button" onClick={handleNextPage}>
          <CaretRight />
        </button>
      )}
    </div>
  );
}
