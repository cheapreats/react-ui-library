import React from 'react';
import { Meta, Story } from '@storybook/react';
import CardText from './CardText';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Order Item'),
    component: CardText,
    args: {
        leftText: 'Test',
        rightText: '$11.11',
    },
} as Meta;

export const Basic: Story = (args) => <CardText {...args} />;