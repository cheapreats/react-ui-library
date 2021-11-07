import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OrderID, IOrderIDProps } from './OrderID';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Order ID'),
    component: OrderID,
    args: {
        orderID: 'e2c3',
    },
} as Meta;

export const Basic: Story<IOrderIDProps> = (args) => <OrderID {...args} />;
