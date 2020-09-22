import React from 'react';
import {Status, StatusProps} from '../../src';
import {createStoryTitle} from "../Constants";
import {Story, Meta} from "@storybook/react";

export default {
    title: createStoryTitle('Status'),
    component: Status,
    argTypes: {
        status: {
            control: {
                type: 'radio',
                options: ['prepared', 'preparing', 'placed', 'cancelled', 'complete'],
            },
        },
    },
    args: {
        large: false
    }
} as Meta;

export const Basic: Story<StatusProps> = (args) => <Status {...args}>Test</Status>;