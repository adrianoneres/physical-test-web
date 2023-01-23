import { Meta, StoryObj } from '@storybook/react';

import { Heading, HeadingProps } from './Heading';

export default {
  title: 'Components/Heading',
  component: Heading,
  args: {
    children: 'Header',
    size: 'md',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<HeadingProps>;

export const Default: StoryObj<HeadingProps> = {
  argTypes: {
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export const Custom: StoryObj<HeadingProps> = {
  args: {
    asChild: true,
    children: <h1>Header with h1 tag</h1>,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};
