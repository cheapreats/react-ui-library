import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CreatedDate, CreatedDateProps } from '../../index';


export default {
    title: 'Dashboard/CRM/CreatedDate',
    component: CreatedDate,
    args: {
        dateCreated: "June 29, 2007"
    }
} as Meta

export const Basic: Story<CreatedDateProps> = (args) => <CreatedDate {...args} />;