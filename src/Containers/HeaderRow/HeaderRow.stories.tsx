import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HeaderRow, HeaderRowProps } from '../../index';


export default {
    title: 'Components/Other/Header Row',
    component: HeaderRow,
    args: {
        label: 'Header label',
        display: 'column',
        type: 'h2',
        padding: '0 0 0 5px',
        width: 200,
        children: 'Header row children',
    },
} as Meta;

export const Basic: Story<HeaderRowProps> = (args) => <HeaderRow {...args} />;
