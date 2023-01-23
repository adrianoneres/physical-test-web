import { Meta, StoryObj } from '@storybook/react';
import { Check } from 'phosphor-react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    value: 'Value',
    size: 'hug',
  },
  argTypes: {
    size: {
      options: ['hug', 'full'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<ButtonProps>;

export const Default: StoryObj<ButtonProps> = {
  args: {
    action: () => console.log('Default'),
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
};

export const Custom: StoryObj<ButtonProps> = {
  args: {
    action: () => console.log('Custom'),
    icon: Check,
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
};
