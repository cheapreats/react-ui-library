import React from 'react';
import { Status, StatusProps, StatusColors } from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Status'),
    component: Status,
    argTypes: {
        statusColor: {
            control: {
                type: 'radio',
                options: StatusColors,
            },
        },
    },
    args: {
        large: false,
    },
} as Meta;

export const Basic: Story<StatusProps> = (args) => (
    <Status {...args}>Test</Status>
);
