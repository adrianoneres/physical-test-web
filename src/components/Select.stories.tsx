import { Meta, StoryObj } from '@storybook/react';
import { UserCircle } from 'phosphor-react';

import { Select, SelectRootProps } from './Select';

export default {
  title: 'Components/Select',
  component: Select.Root,
  args: {
    placeholder: 'Select an option',
    options: (
      <Select.Options
        items={[
          { value: '1', label: 'First option' },
          { value: '2', label: 'Second option' },
        ]}
      />
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
    options: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<SelectRootProps>;

export const Default: StoryObj<SelectRootProps> = {};

export const Custom: StoryObj<SelectRootProps> = {
  args: {
    icon: UserCircle,
    options: (
      <Select.Options
        items={[
          { value: '1', label: 'First option' },
          { value: '2', label: 'Second option' },
        ]}
      />
    ),
  },
};
