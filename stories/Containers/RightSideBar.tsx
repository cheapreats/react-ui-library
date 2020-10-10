import React from 'react';
import { RightSideBar } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('RightSideBar'),
    component: RightSideBar,
    args: {
    }
} as Meta;

export const Basic: Story = (args) => (
    <RightSideBar 
        {...args}  
    />
); 