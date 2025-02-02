import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Downloads',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Downloads',
  },
};
