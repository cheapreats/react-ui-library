import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    IPaymentMethodProps,
    OrderPaymentMethod,
    OrderPaymentMethodTypes,
} from './OrderPaymentMethod';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Order Payment Method'),
    component: OrderPaymentMethod,
    argTypes: {
        paymentMethod: {
            control: {
                type: 'radio',
                options: OrderPaymentMethodTypes,
            },
        },
    },
    args: {
        paymentMethod: 'WALLET',
    },
} as Meta;

export const Basic: Story<IPaymentMethodProps> = (args) => (
    <OrderPaymentMethod {...args} />
);
