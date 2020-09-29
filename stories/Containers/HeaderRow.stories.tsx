import React from 'react';
import { HeaderRow, HeaderRowProps, Status } from '../../src';
import {createStoryTitle} from "../Constants";
import { Meta, Story } from '@storybook/react';

export default {
    title: createStoryTitle('Header Row'),
    component: HeaderRow,
    args: {
            label: 'This is a Label',
            display: 'space-between',
            type: 'h4',
            padding: '10px 10px',
            width: 300,
            status:"preparing"
    }, 
} as Meta;

export const Basic: Story<HeaderRowProps> = (args) => (
    <HeaderRow {...args}>
        <Status {...args}>Item</Status>
    </HeaderRow>
);
