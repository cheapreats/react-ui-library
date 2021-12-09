import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DisplayItem, DisplayItemProps } from '../../index';


export default {
    title: 'Components/Display Item',
    component: DisplayItem,
    args: {
        label: 'DisplayItemLabel',
        value: 'DisplayItemValue',
    },
} as Meta;

export const Basic: Story<DisplayItemProps> = (args) => (
    <DisplayItem {...args} />
);
