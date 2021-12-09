import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OrderPaymentMethodTypes } from '@Text/OrderPaymentMethod/OrderPaymentMethod';
import { OrderStatusIdentifier } from '@Containers/OrderStatus/OrderStatus';
import { OrderTypeIdentifier } from '@Text/OrderType/OrderType';

import { OrderTemplate, IOrderTemplateProps } from './OrderTemplate';

export default {
    title: 'Components/Order Template',
    component: OrderTemplate,
    argTypes: {
        paymentMethod: {
            control: {
                type: 'radio',
                options: OrderPaymentMethodTypes,
            },
        },
        status: {
            orderStatus: {
                control: {
                    type: 'radio',
                    options: OrderStatusIdentifier,
                },
            },
        },
        orderType: {
            control: {
                type: 'radio',
                options: OrderTypeIdentifier,
            },
        },
    },
    args: {
        orderId: '2a3e',
        items: [
            {
                name: 'Burger',
                price: '$6.49',
                modifiers: [
                    {
                        choices: [
                            {
                                name: 'Cheese',
                                price: '$1.10',
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Wrap',
                price: '$4.98',
            },
            {
                name: 'Cookie',
                price: '$3.00',
            },
        ],
        paymentMethod: 'WALLET',
        status: 'PLACED',
        orderType: 'EAT_IN',

        orderCost: [
            { name: 'Subtotal', price: '$1.00' },
            { name: 'Fees & Taxes', price: '$1.00' },
            { name: 'Tip', price: '$1.00' },
            { name: 'Total Cost', price: '$3.00', isBold: true },
        ],
        profileDetails: {
            profileImage:
                'https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif',
            visitCount: 4,
            profileName: 'Ashley Tisdale The Third',
            lastVisitedDate: '23 Days Ago',
            isFavoriteStore: true,
        },
    },
} as Meta;

const Template: Story<IOrderTemplateProps> = (args) => (
    <OrderTemplate {...args} />
);

export const Basic = Template.bind({});
