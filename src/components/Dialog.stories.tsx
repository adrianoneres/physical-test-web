import { Meta, StoryObj } from '@storybook/react';
import { PlusCircle } from 'phosphor-react';

import { Dialog, DialogProps } from './Dialog';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    anchorValue: 'Value',
    anchorSize: 'hug',
    title: 'Title',
    description: 'Description',
  },
  argTypes: {
    anchorSize: {
      options: ['hug', 'full'],
      control: {
        type: 'inline-radio',
      },
    },
    anchorState: {
      options: ['empty', 'filled'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<DialogProps>;

export const Default: StoryObj<DialogProps> = {
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
};

export const Custom: StoryObj<DialogProps> = {
  args: {
    anchorValue: 'Value',
    anchorSize: 'hug',
    title: 'Title',
    description: 'Description',
    icon: PlusCircle,
  },
  argTypes: {
    anchorSize: {
      options: ['hug', 'full'],
      control: {
        type: 'inline-radio',
      },
    },
    anchorState: {
      options: ['empty', 'filled'],
      control: {
        type: 'inline-radio',
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
};
