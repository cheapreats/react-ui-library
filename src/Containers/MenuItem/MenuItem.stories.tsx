import React from 'react';
import { Meta, Story } from '@storybook/react';
import { MenuItem, IMenuItemProps } from './MenuItem';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Menu Item'),
    component: MenuItem,
    args: {
        name: 'Hamburger',
        price: '$3.49',
    },
} as Meta;

const Template: Story<IMenuItemProps> = (args) => <MenuItem {...args} />;

export const NoModifiers = Template.bind({});

export const Modifiers = Template.bind({});
Modifiers.args = {
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
};
