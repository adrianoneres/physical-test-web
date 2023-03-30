import { CaretRight, House } from 'phosphor-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface BreadcrumbProps {
  children?: ReactNode;
}

function BreadcrumbRoot({ children }: BreadcrumbProps) {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <section className="flex items-center my-4 text-blue-500 bg-slate-200 p-4 rounded">
      <button
        type="button"
        onClick={handleNavigateHome}
        className="flex items-center justify-center"
      >
        <House size={24} />
      </button>
      {children && <CaretRight size={16} className="text-slate-800 mx-2" />}
      {children}
    </section>
  );
}

BreadcrumbRoot.displayName = 'Breadcrumb.Root';

export interface BreadcrumbItemProps {
  label: string;
  route: string;
  hideDivisor?: boolean;
}

function BreadcrumbItem({
  label,
  route,
  hideDivisor = false,
}: BreadcrumbItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="flex">
      <button type="button" onClick={handleClick}>
        {label}
      </button>
      {!hideDivisor && (
        <div className="flex items-center justify-center">
          <CaretRight size={16} className="text-slate-800 mx-2" />
        </div>
      )}
    </div>
  );
}

BreadcrumbItem.displayName = 'Breadcrumb.Item';

export const Breadcrumb = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
};
