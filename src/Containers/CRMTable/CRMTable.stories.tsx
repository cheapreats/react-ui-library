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
            }
        ],
        columns: [
            {
                Header: 'Client',
                accessor: "customerProfile",
            },
            {
                Header: 'Tags',
                accessor: "tags",
            },
            {
                Header: 'Date Joined',
                accessor: "dateCreated",
            }
        ],
    },
} as Meta;

export const Basic: Story<ICRMTableProps> = (args) => <CRMTable {...args} />;
