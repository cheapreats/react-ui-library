import React from 'react';
import { RightSideBar, RightSideBarProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Right Side Bar'),
    component: RightSideBar,
    args: {
        title: 'requirement',
        checkboxArr: {'Name of Business': false}
    }
} as Meta;

export const Basic: Story<RightSideBarProps> = (args) => (
    <RightSideBar {...args}>Hi</RightSideBar>
); 