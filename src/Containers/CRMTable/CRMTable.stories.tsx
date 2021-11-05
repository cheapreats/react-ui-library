import React from 'react';
import { HeaderProps } from 'react-table';
import { Meta, Story } from '@storybook/react';
import { 
    CreatedDate,
    CRMTable, 
    CustomerProfile,
    ICRMTableProps, 
    TableHeaderCell,
    TagGroup
} from '../../index';
import { createStoryTitle } from '../../Constants';
import { CRMRowProps } from '../CRMRow/CRMRow';


const TextFilter: React.FC<HeaderProps<CRMRowProps>> = ({
    column: {
        filterValue,
        setFilter,
    }
}): React.ReactElement => (
    <input
        value={filterValue || ''}
        onChange={e => {
            setFilter(e.target.value || undefined)
        }}
    />
);

export default {
    title: createStoryTitle('CRM Table'),
    component: CRMTable,
    argTypes: { onRowClick: { action: 'Row was clicked' } },
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
                accessor: "customerProfile"
            },
            {
                Header: 'Tags',
                accessor: "tags"
            },
            {
                Header: 'Date Joined',
                accessor: "dateCreated"
            }
        ],
        defaultColumn: {
            Filter: TextFilter,
            filter: 'text'
        }
    },
} as Meta;

export const Basic: Story<ICRMTableProps> = (args) => <CRMTable {...args} />;

export const WithComponents = Basic.bind({});
WithComponents.args = {
    ...WithComponents.args,
    columns: [
        {
            Header: (() => (<TableHeaderCell title="Client" isFiltered/>)),
            accessor: "customerProfile",
            Cell: (({ value }) => (<CustomerProfile {...value} />)),
            disableFilters: true
        },
        {
            Header: (() => (<TableHeaderCell title="Tags" />)),
            accessor: "tags",
            Cell: (({ value }) => (<TagGroup {...value} />)),
            disableFilters: true

        },
        {
            Header: (() => (<TableHeaderCell title="Date Joined" isFiltered/>)),
            accessor: "dateCreated",
            Cell: (({ value }) => (<CreatedDate {...value} />)),
            Filter: TextFilter,
            filter: 'text'
        }
    ],
    data: [
        {
            dateCreated: {dateCreated: "June 29, 2007"},
            tags: {tags: [
                {children: 'Hello'},
                {children: 'Goodbye'},
                {children: 'You say goodbye and I say hello'},
            ]},
            customerProfile: {profileName: "Amy Johnson", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
        },
        {
            dateCreated: {dateCreated: "January 13, 2017"},
            tags: {tags: [
                {children: 'Hello'},
                {children: 'Goodbye'},
            ]},
            customerProfile: {profileName: "Maddie Johnson", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
        },
        {
            dateCreated: {dateCreated: "June 4, 1998"},
            tags: {tags: [
                {children: 'Hello'},
                {children: 'hello hello'}
            ]},
            customerProfile: {profileName: "Amy Joe", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
        },
        {
            dateCreated: {dateCreated: "June 1, 2011"},
            tags: {tags: [
                {children: 'Goodbye'},
            ]},
            customerProfile: {profileName: "Joe Joe"}
        }
    ],
    defaultColumn: {
        Filter: TextFilter,
        filter: 'text'
    }
}
