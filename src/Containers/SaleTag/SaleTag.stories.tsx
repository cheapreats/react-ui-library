import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SaleTag, SaleTagProps } from '../../index';


export default {
    title: 'Components/SaleTag',
    component: SaleTag,
    args: {
        saleAmount: 2,
    },
} as Meta;

export const Basic: Story<SaleTagProps> = (args) => (
    <SaleTag {...args}/>
);