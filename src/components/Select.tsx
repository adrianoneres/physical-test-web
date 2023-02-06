import { forwardRef, ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import { CaretDown, Check, Icon } from 'phosphor-react';
import clsx from 'clsx';
import * as SelectPrimitive from '@radix-ui/react-select';

export interface SelectRootProps {
  control: Control<any, any>;
  name: string;
  options: ReactNode;
  placeholder?: string;
  icon?: Icon;
  error?: string;
}

function SelectRoot({
  control,
  name,
  options,
  placeholder,
  icon,
  error,
}: SelectRootProps) {
  const ButtonIcon: Icon | undefined = icon;

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <SelectPrimitive.Root onValueChange={onChange}>
            <SelectPrimitive.Trigger
              defaultValue={value}
              className={clsx(
                'w-full relative flex justify-between items-center gap-3 py-4 px-3 h-12 rounded border-2 bg-white border-slate-300 text-slate-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-300 focus-within:text-black transition-colors',
                { 'text-black': !!value },
              )}
            >
              {ButtonIcon && <ButtonIcon size={24} />}
              <div className="flex flex-1 justify-between">
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon>
                  <CaretDown size={24} />
                </SelectPrimitive.Icon>
              </div>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                position="item-aligned"
                className="bg-white rounded shadow-md w-max"
              >
                <SelectPrimitive.Viewport>{options}</SelectPrimitive.Viewport>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>
        )}
      />
      {error ? <span className="mt-2 text-red-500">{error}</span> : <span />}
    </>
  );
}

export interface SelectItemProps {
  value: string;
  label: string;
}

const SelectItem = forwardRef(({ children, ...props }: any, forwardedRef) => (
  <SelectPrimitive.Item
    className="pl-12 font-sans cursor-default h-12 py-4 px-3 flex items-center rounded hover:bg-blue-500 hover:outline-none hover:text-white"
    {...props}
    ref={forwardedRef}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute left-6 w-full">
      <Check size={24} />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));

SelectRoot.displayName = 'Select.Root';

export interface SelectOptionProps {
  items: SelectItemProps[];
}

function SelectOptions({ items }: SelectOptionProps) {
  return (
    <SelectPrimitive.Group className="p-2">
      {items?.map(item => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </SelectPrimitive.Group>
  );
}

SelectOptions.displayName = 'Select.Options';

export const Select = {
  Root: SelectRoot,
  Options: SelectOptions,
};
