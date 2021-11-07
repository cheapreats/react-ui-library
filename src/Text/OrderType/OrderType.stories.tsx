import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OrderType, OrderTypeIdentifier, IOrderTypeProps } from './OrderType';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Order Type'),
    component: OrderType,
    argTypes: {
        orderType: {
            control: {
                type: 'radio',
                options: OrderTypeIdentifier,
            },
        },
    },
    args: {
        orderType: 'EAT_IN',
    },
} as Meta;

export const Basic: Story<IOrderTypeProps> = (args) => <OrderType {...args} />;
