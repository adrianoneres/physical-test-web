/* eslint-disable no-console */
import { Meta, StoryObj } from '@storybook/react';
import { PlusCircle } from 'phosphor-react';

import { Link, LinkProps } from './Link';

export default {
  title: 'Components/Link',
  component: Link,
  args: {
    value: 'Value',
  },
  argTypes: {},
} as Meta<LinkProps>;

export const Default: StoryObj<LinkProps> = {
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

export const Custom: StoryObj<LinkProps> = {
  args: {
    action: () => console.log('Custom'),
    icon: PlusCircle,
  },
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
};
