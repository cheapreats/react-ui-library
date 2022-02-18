import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OrderID, IOrderIDProps } from './OrderID';


export default {
    title: 'Terminal/Orders/ID',
    component: OrderID,
    args: {
        orderId: 'e2c3',
    },
} as Meta;

export const Basic: Story<IOrderIDProps> = (args) => <OrderID {...args} />;
