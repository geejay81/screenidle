import { Meta, StoryObj } from '@storybook/react';
 
import Footer from './Footer';
 
const meta: Meta<typeof Footer> = {
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;
 
type Story = StoryObj<typeof Footer>;
 
export const Example: Story = {
  parameters: {
    nextjs: {},
  },
};