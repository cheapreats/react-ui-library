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
            nonFocusedIcon: '#ddd',
            focusedIcon: '#f00',
            nonFocusedText: '#aaa',
            focusedText: '#555',
        },
        currIndex: 0,
        size: '3em',
    },
} as Meta;

export const Basic: Story<OrderTrackerProps> = (args) => (
    <OrderTracker {...args} />
);
