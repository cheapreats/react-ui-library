import React from 'react';
import { Meta, Story } from '@storybook/react';
import {LeftRightText} from './LeftRightText';


export default {
    title: 'Components/Order Item',
    component: LeftRightText,
    args: {
        leftText: 'Test',
        rightText: '$11.11',
    },
} as Meta;

export const Basic: Story = (args) => <LeftRightText {...args} />;
