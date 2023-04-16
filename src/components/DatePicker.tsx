import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import clsx from 'clsx';

export interface DatePickerProps {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function DatePicker({
  control,
  name,
  label,
  error,
  placeholder = 'dd/mm/yyyy',
  className,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(control._formValues[name]);

  registerLocale('pt', ptBR);

  useEffect(() => {
    const selectedValue = control._formValues[name];
    setSelectedDate(selectedValue);
  }, [control._formValues, name]);

  const handleSelect = (selectedValue: Date | null, onChange: any) => {
    setSelectedDate(selectedValue);
    onChange(selectedValue);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <div
          className={clsx(`w-full flex flex-col mt-4 ${className}`, {
            'border-danger-500': !!error,
          })}
        >
          <label htmlFor={name} className="ml-1 mb-1 text-sm text-gray-500">
            {label}
          </label>
          <ReactDatePicker
            id={name}
            selected={selectedDate}
            onChange={selectedValue => handleSelect(selectedValue, onChange)}
            locale="pt"
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder}
            todayButton="Hoje"
            showYearDropdown
            onKeyDown={e => e.preventDefault()}
          />
          <span className="h-5 ml-1 mt-1 font-sans text-sm text-danger-500">
            {!!error && error}
          </span>
        </div>
      )}
    />
  );
}
