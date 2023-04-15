import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

export interface DatePickerProps {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder?: string;
}

export function DatePicker({
  control,
  name,
  label,
  placeholder = 'dd/mm/yyyy',
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
        <div className="w-full flex flex-col my-4">
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
        </div>
      )}
    />
  );
}
