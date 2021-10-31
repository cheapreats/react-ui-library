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
                dateCreated: {dateCreated: "June 29, 2007"},
                tags: {tags: [
                    {children: 'Hello'},
                    {children: 'Goodbye'},
                    {children: 'You say goodbye and I say hello'},
                    {children: 'hello hello'}
                ]},
                customerProfile: {profileName: "Amy Johnson", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
            },
            {
                dateCreated: {dateCreated: "June 29, 2007"},
                tags: {tags: [
                    {children: 'Hello'},
                    {children: 'Goodbye'},
                    {children: 'You say goodbye and I say hello'},
                    {children: 'hello hello'}
                ]},
                customerProfile: {profileName: "Amy Johnson", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
            },
            {
                dateCreated: {dateCreated: "June 29, 2007"},
                tags: {tags: [
                    {children: 'Hello'},
                    {children: 'Goodbye'},
                    {children: 'You say goodbye and I say hello'},
                    {children: 'hello hello'}
                ]},
                customerProfile: {profileName: "Amy Johnson", profileImage: "https://i.imgur.com/dt6SAxE.jpeg"}
            }
        ],
        columns: [
            {
                title: "Client",
                accessor: "customerProfile",
                isFiltered: true,
                style: {width: "30%"}
            },
            {
                title: "Groups",
                accessor: "tags",
                isFiltered: true,
                style: {width: "60%"}
            },
            {
                title: "Created",
                accessor: "dateCreated",
                isFiltered: true,
                style: {width: "auto"}
            },
        ],
    },
} as Meta;

export const Basic: Story<ICRMTableProps> = (args) => <CRMTable {...args} />;
