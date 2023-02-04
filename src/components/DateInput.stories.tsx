import { Meta, StoryObj } from '@storybook/react';
import { CalendarBlank } from 'phosphor-react';

import { DateInput, DateInputRootProps } from './DateInput';

export default {
  title: 'Components/DateInput',
  component: DateInput.Root,
  args: {
    children: <DateInput.Input placeholder="1990-10-31" />,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<DateInputRootProps>;

export const Default: StoryObj<DateInputRootProps> = {};

export const Custom: StoryObj<DateInputRootProps> = {
  args: {
    children: [
      <DateInput.Icon key="custom-icon">
        <CalendarBlank />
      </DateInput.Icon>,
      <DateInput.Input
        key="custom-input"
        placeholder="1990-10-31"
        info="Age"
        showAge
      />,
    ],
  },
};
