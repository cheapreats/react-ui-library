import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CRMRow, CRMRowProps } from '../../index';


export default {
    title: 'Dashboard/CRM/CRMRow',
    component: CRMRow,
    args: {
        dateCreated: {dateCreated: "June 29, 2007"},
        tags: {tags: [
            {children: 'Hello'},
            {children: 'Goodbye'},
            {children: 'You say goodbye and I say hello'},
            {children: 'hello hello'}
        ]},
        customerProfile: {profileName: "Amy Johnson", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
    }
} as Meta

export const Basic: Story<CRMRowProps> = (args) => <CRMRow {...args} />;