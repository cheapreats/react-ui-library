import React from 'react';
import { Meta, Story } from '@storybook/react';
import OrderDetailsContent  from './OrderDetailsContent'
import { createStoryTitle } from '../../Constants';

export default { 
    title: createStoryTitle('Order Details Content'),
    component: OrderDetailsContent,
    args: {
        items: [
            {
                name: "Burger",
                price: 6.49,
                modifiers: [
                    {
                        name: "Modifier Test",
                        choices: [
                            {
                                name: "test1",
                                price: 1.10,
                            }
                        ]
                    }
                ]
            },
            {
                name: "Wrap",
                price: 4.98,
                modifiers: []
            },
            {
                name: "Cookie",
                price: 3.00,
                modifiers: []
            }
        ],
    }
} as Meta

export const Basic: Story = (args) => (
    <OrderDetailsContent {...args}/>
)