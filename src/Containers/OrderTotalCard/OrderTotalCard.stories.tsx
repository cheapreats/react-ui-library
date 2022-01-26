import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OrderTotalCard, IOrderTotalCardProps } from './OrderTotalCard';


export default {
    title: 'Terminal/Orders/Order Payment Card',
    component: OrderTotalCard,
    args: {
        orderCardContents: [
            {
                name: 'Subtotal',
                price: '$1.00',
            },
            {
                name: 'Fees & Taxes',
                price: '$1.00',
            },
            {
                name: 'Tip',
                price: '$1.00',
            },
            {
                name: 'Total Cost',
                price: '$3.00',
                isBold: true,
            },
        ] as IOrderTotalCardProps['orderCardContents'],
    },
} as Meta;

const Template: Story<IOrderTotalCardProps> = (args) => (
    <OrderTotalCard {...args} />
);

export const SinglePersonOrder = Template.bind({});

export const MultiGroupOrder = Template.bind({});
MultiGroupOrder.args = {
    orderCardContents: [
        {
            name: 'Subtotal',
            price: '$3.00',
        },
        {
            name: 'Person 1',
            price: '$1.00',
        },
        {
            name: 'Person 2',
            price: '$1.00',
        },
        {
            name: 'Person 3',
            price: '$1.00',
        },
        {
            name: 'Fees & Taxes',
            price: '$1.00',
        },
        {
            name: 'Tip',
            price: '$1.00',
        },
        {
            name: 'Total Cost',
            price: '$5.00',
            isBold: true,
        },
    ],
};
