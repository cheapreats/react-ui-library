import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NavigationFootnote, NavigationFootnoteProps } from '../../src';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('NavigationFootnote'),
    component: NavigationFootnote,
    args: {
        text: 'Link To Somewhere',
    },
} as Meta;

export const Basic: Story<NavigationFootnoteProps> = (args) => (
    <NavigationFootnote {...args} />
);
