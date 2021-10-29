import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    ShoppingBag,
    Payment,
    Food,
} from '@styled-icons/fluentui-system-filled';
import { OrderTracker, OrderTrackerProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('OrderTracker'),
    component: OrderTracker,
    args: {
        statuses: [
            { icon: ShoppingBag, text: 'Order' },
            { icon: Payment, text: 'Payment' },
            { icon: Food, text: 'Food' },
        ],
        colors: {
            iconNonFocusedColor: '#ddd',
            iconFocusedColor: '#f00',
            textNonFocusedColor: '#aaa',
            textFocusedColor: '#555',
        },
        currIndex: 0,
        size: '3em',
    },
} as Meta;

export const Basic: Story<OrderTrackerProps> = (args) => (
    <OrderTracker {...args} />
);

export const NoText = Basic.bind({});
NoText.args = {
    ...NoText.args,
    statuses: [
        { icon: ShoppingBag, text: '' },
        { icon: Payment, text: '' },
        { icon: Food, text: '' },
    ],
};

export const LongText = Basic.bind({});
LongText.args = {
    ...LongText.args,
    statuses: [
        {
            icon: ShoppingBag,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        },
        {
            icon: Payment,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        },
        {
            icon: Food,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        },
    ],
};
