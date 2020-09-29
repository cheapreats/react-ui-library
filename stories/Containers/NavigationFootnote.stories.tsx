import React from 'react';
import { NavigationFootnote, NavigationFootnoteProps } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Navigation'),
    component: NavigationFootnote,
    args: {
        text: 'Link To Somewhere',
    },
} as Meta;

export const Basic: Story<NavigationFootnoteProps> = (args) => (
    <NavigationFootnote {...args} />
);
