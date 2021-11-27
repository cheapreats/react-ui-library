import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Status, StatusProps, StatusColors } from '../../index';


export default {
    title: 'Components/Status',
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
