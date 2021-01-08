// @ts-nocheck
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useTable, useFilters } from "react-table";
import { DefaultFilter } from './DefaultFilter';
import { Profile } from './Profile'; 
import { TagContainer } from './TagContainer';
import { SmallText } from '../../Text/SmallText';
import { VendorsFilter, IVendorsFilterProps } from '../../index';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Vendors Filter'),
    component: VendorsFilter,
} as Meta;

const getVendorFilterProps = () => ({
    headingTitle: 'Filters',
    buttonText: 'Apply',
    style: {
        padding: '20px'
    },
    headingProps: {
        style: {
            padding: '20px 0 0 20px'
        }
    },
    buttonProps: {
        style: {
            margin: '20px 0'
        }
    },
    collapsibleHeadingProps: {
        style: {
            marginBottom: '20px'
        }
    },
    filterSelectProps: {
        inputProps:{
            style: { 
                margin: '10px 0' 
            } 
        },
        tagProps: {
            style: { 
                margin: '10px 0' 
            }
        }
    },
    filterItems: [
        {
            title: 'Name',
            selectOptions: ['Contains', 'Equals'],
            placeholder: 'Add name'
        },
        {
            title: 'Tag',
            selectOptions: ['Contains', 'Equals'],
            placeholder: 'Add tag'
        },
        {
            title: 'Created',
            selectOptions: ['Created earlier than', 'Created on', 'Created later than'],
            placeholder: 'Select date'
        }
    ]
});

const Template: Story<IVendorsFilterProps> = (args) => {
    const columns = [
        {
            Header: 'Client',
            accessor: 'client',
            Cell: (cell: any) => (
                <Profile
                    key={cell.row.original.id}
                    name={cell.row.original.name}
                    email={cell.row.original.email}
                    imageUrl={cell.row.original?.imageUrl}
                />
            ),
            Filter: DefaultFilter
        },
        {
            Header: 'Tags',
            accessor: 'tags',
            Cell: (cell: any) => (
                <TagContainer 
                    tags={cell.row.original.tags} 
                    isHoverable={false} 
                    tagProps={{ style: { marginRight: '10px' }}}
                />
            ),
            Filter: DefaultFilter
        },
        {
            Header: 'Created',
            accessor: 'created_at',
            Cell: (cell: any) => (
                <SmallText style={{ padding: '0 10px' }}>
                    {cell.row.original.createdAt}
                </SmallText>
            ),
            Filter: DefaultFilter
        },
    ];   
    const data = [
        {
            key: 1,
            id: '1',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019',
        },
        {
            key: 2,
            id: '2',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '23/05/2019',
        },
        {
            key: 3,
            id: '3',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019',
        },
        {
            key: 4,
            id: '4',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '23/05/2019',
        },
        {
            key: 5,
            id: '5',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019',
        },
        {
            key: 6,
            id: '6',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            key: 6,
            id: '7',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            key: 8,
            id: '8',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            key: 9,
            id: '9',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client'],
            createdAt: '23/05/2019'
        },
        {
            key: 10,
            id: '10',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            key: 11,
            id: '11',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            key: 12,
            id: '12',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            key: 13,
            id: '13',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            key: 14,
            id: '14',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            key: 15,
            id: '15',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            key: 16,
            id: '16',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        }
    ];

    const { headerGroups } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultFilter }
        },
        useFilters
    );
    return (
        <VendorsFilter 
            headerGroups={headerGroups}
            {...args} 
        />
    )
}

export const Basic = Template.bind({});
Basic.args = getVendorFilterProps();
