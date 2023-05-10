export interface CardProps {
  value: string | number;
  description: string;
  action?: Function;
}

export function Card({ value, description, action }: CardProps) {
  const handleClick = () => {
    action?.();
  };

  return (
    <article
      onClick={handleClick}
      className="flex flex-col items-center justify-between w-56 h-72 px-2 py-8 rounded bg-white cursor-pointer shadow-lg hover:shadow transition-all"
    >
      <h1 className="text-[5rem] text-black">{value}</h1>
      <span className="w-full text-center text-lg text-slate-600">
        {description}
      </span>
    </article>
  );
}
