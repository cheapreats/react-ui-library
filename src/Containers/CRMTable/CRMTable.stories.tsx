import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CRMTable, ICRMTableProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CRM Table'),
    component: CRMTable,
    args: {
        data: [
            {
                dateCreated: "June 29, 2007",
                tags: "Yes",
                customerProfile: "Amy Johnson"
            },
            {
                dateCreated: "January 13, 2017",
                tags: "No",
                customerProfile: "Maddie Johnson"
            },
            {
                dateCreated: "June 4, 1998",
                tags: "Music",
                customerProfile: "Amy Joe"
            },
            {
                dateCreated: "June 1, 2011",
                tags: "Food",
                customerProfile: "Joe Joe"
            }
        ],
        columns: [
            {
                Header: 'Client',
                accessor: "customerProfile",
                width: "40%"
            },
            {
                Header: 'Tags',
                accessor: "tags",
                width: "40%"
            },
            {
                Header: 'Date Joined',
                accessor: "dateCreated",
                width: "20%"
            }
        ],
    },
} as Meta;

export const Basic: Story<ICRMTableProps> = (args) => <CRMTable {...args} />;
