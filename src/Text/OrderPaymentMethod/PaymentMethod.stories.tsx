import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
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

export const Basic: Story = (args) => <OrderPaymentMethod {...args} />;
