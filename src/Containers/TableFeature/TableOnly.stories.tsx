import React from 'react';
import { Meta, Story } from '@storybook/react'; 
import { TableOnly, TableOnlyProps } from '../../index';
import { createStoryTitle } from '../../Constants';

const data = [ 
    {
        colOne: 'Col One',  
        colTwo: 'Col Two', 
        colThree: 'Col Three',
    },
    {
        colOne: 'Col One',  
        colTwo: 'Col Two', 
        colThree: 'Col Three',
    },
    {
        colOne: 'Col One',  
        colTwo: 'Col Two', 
        colThree: 'Col Three',
    },
];

export default {
    title: createStoryTitle('TableOnly'),
    component: TableOnly,
    args: {
        headingColOne: 'Test',
        headingColTwo: 'Test', 
        data,
        rowsVisible: 3,
    },
} as Meta;

export const Basic: Story<TableOnlyProps> = (args) => (
    <TableOnly {...args} />
);
