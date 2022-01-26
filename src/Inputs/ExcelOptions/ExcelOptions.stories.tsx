import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ExcelOptions, ExcelOptionsProps } from '../../index';


export default {
    title: 'Dashboard/Excel options',
    component: ExcelOptions,
    argTypes: { onResult: { action: 'data' } },
    args: {
        headers: [
            'header 1',
            'header 2',
            'header 3',
            'header 4',
            'header 5',
            'header 6',
        ],
        defaultHeaders: ['header 1', 'header 2', 'header 3'],
    },
} as Meta;

export const Basic: Story<ExcelOptionsProps> = (args) => (
    <ExcelOptions {...args} />
);
