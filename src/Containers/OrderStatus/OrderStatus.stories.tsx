import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    OrderStatus,
    OrderStatusIdentifier,
    IOrderStatusProps,
} from './OrderStatus';


export default {
    title: 'Terminal/Orders/Order Status',
    component: OrderStatus,
    argTypes: {
        orderStatus: {
            control: {
                type: 'radio',
                options: OrderStatusIdentifier,
            },
        },
    },
    args: {
        orderStatus: 'PLACED',
    },
} as Meta;

export const Basic: Story<IOrderStatusProps> = (args) => (
    <OrderStatus {...args} />
);
