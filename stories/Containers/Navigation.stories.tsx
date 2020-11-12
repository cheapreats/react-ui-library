import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    NavigationOld,
    NavigationOldProps,
    NavigationFootnote,
} from '../../src';
import { createStoryTitle } from '../Constants';

export default {
    title: createStoryTitle('NavigationOld'),
    component: NavigationOld,
    args: {
        footer: <NavigationFootnote url="" text="To Other Place" />,
    },
} as Meta;

export const Basic: Story<NavigationOldProps> = (args) => (
    <NavigationOld {...args} />
);
