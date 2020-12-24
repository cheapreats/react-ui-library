import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DisplayItem, DisplayItemProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Display Item'),
    component: DisplayItem,
    args: {
        label: 'DisplayItemLabel',
        value: 'DisplayItemValue',
    },
} as Meta;

export const Basic: Story<DisplayItemProps> = (args) => (
    <DisplayItem {...args} />
);
