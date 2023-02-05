import { Meta, StoryObj } from '@storybook/react';
import { Control } from 'react-hook-form';
import { UserCircle } from 'phosphor-react';

import { TextInput, TextInputRootProps } from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput.Root,
  args: {
    children: (
      <TextInput.Input
        control={{} as Control}
        name="test"
        placeholder="Placeholder"
      />
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<TextInputRootProps>;

export const Default: StoryObj<TextInputRootProps> = {};

export const Custom: StoryObj<TextInputRootProps> = {
  args: {
    children: [
      <TextInput.Icon key="custom-icon">
        <UserCircle />
      </TextInput.Icon>,
      <TextInput.Input
        key="custom-input"
        control={{} as Control}
        name="test"
        placeholder="Placeholder"
        info="Nice name"
      />,
    ],
  },
};
