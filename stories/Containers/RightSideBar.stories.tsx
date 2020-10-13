import React from 'react';
import { RightSideBar, RequirementProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Right Side Bar'),
    component: RightSideBar,
    args: {
    }
} as Meta;

export const Basic: Story<RequirementProps> = (args) => (
    <RightSideBar {...args}/>
); 