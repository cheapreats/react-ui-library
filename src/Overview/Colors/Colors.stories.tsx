import React from 'react';
import { Meta, Story } from '@storybook/react';
import Colors, { ColorsProps } from './Colors';

export default {
    title: 'Design System/Colors',
    component: Colors,
} as Meta;

export const Overview: Story<ColorsProps> = (args) => (
    <Colors {...args} />
);