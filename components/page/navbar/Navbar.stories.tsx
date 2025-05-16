import { Meta, StoryObj } from '@storybook/react';
 
import Navbar from './Navbar';
 
const meta: Meta<typeof Navbar> = {
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};
export default meta;
 
type Story = StoryObj<typeof Navbar>;
 
// If you have the actions addon,
// you can interact with the links and see the route change events there
export const Example: Story = {
  parameters: {
    nextjs: {},
  },
};