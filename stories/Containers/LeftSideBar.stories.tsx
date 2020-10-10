import React from 'react';
import { LeftSideBar, LeftSideBarProps, LeftSideBarInterface } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('LeftSideBar'),
    component: LeftSideBar,
    args: {

    }
} as Meta;

export const Basic: Story<LeftSideBarProps> = (args) => (
    <LeftSideBar 
        {...args}  
    />
);