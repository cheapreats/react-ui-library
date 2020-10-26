import React from 'react';
import { RightSideBar, RightSideBarProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Right Side Bar'),
    component: RightSideBar,
    args: {
        isStandardChosen: false,
        isAlternativeChosen: false,
        onText: false,
        onImage: false,
    },
} as Meta;

export const Basic: Story<RightSideBarProps> = (args) => (
    <RightSideBar {...args} />
);
