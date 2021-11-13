import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IOrderItems, OrderItemList } from './OrderItemList';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Order List'),
    component: OrderItemList,
    args: {
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
                price: '$3.0',
            },
        ],
    },
} as Meta;

export const Basic: Story<IOrderItems> = (args) => <OrderItemList {...args} />;
