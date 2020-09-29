import React from 'react';
import { Navigation, NavigationProps, NavigationFootnote } from '../../src';
import { createStoryTitle } from '../Constants';
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Navigation'),
    component: Navigation,
    args: {
        footer: <NavigationFootnote url="" text="To Other Place" />,
    },
} as Meta;

export const Basic: Story<NavigationProps> = (args) => <Navigation {...args} />;
