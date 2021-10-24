import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SaleTag, SaleTagProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('SaleTag'),
    component: SaleTag,
    args: {
        amount: 2,
    },
} as Meta;

export const Basic: Story<SaleTagProps> = (args) => (
    <SaleTag {...args}/>
);