import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ReactTable, IReactTableProps, IVendorsData } from './ReactTable';
import { Profile, TagContainer } from '../VendorsList'; 
import { SmallText } from '../../Text/SmallText';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('React Table'),
    component: ReactTable,
} as Meta;

const isHoverable = false;

const getReactTableProps = () => ({
    pageSelectOptions: [10, 20, 30],
    tableHeaderProps: {
        style: {
            marginBottom: '10px',
        }
    },
    paginationProps: {
        style: {
            marginTop: '10px'
        },
        buttonProps: {
            style: {
                margin: '0 2px'
            }
        },
        smallTextProps: {
            style: {
                margin: '5px 5px 0 5px'
            }
        },
        headingProps: {
            style: {
                margin: '0 5px'
            }
        }
    },
    columns: [
        {
            Header: 'Client',
            accessor: 'col_client',
            profileStyleProps: {
                style: { marginTop: '5px' }
            },
            Cell: (cell) => (
                <Profile 
                    key={cell.row.original.id} 
                    name={cell.row.original.name} 
                    email={cell.row.original.email} 
                    imageUrl={cell.row.original?.imageUrl}
                    profileProps={{ style: { marginTop: '5px' } }}
                />
            )
        },
        {
            Header: 'Tags',
            accessor: 'col_tags',
            Cell: (cell) => (
                <TagContainer 
                    tags={cell.row.original.tags} 
                    isHoverable={isHoverable} 
                    style={{ marginTop: '5px' }}
                    tagProps={{ style: { margin: '5px 10px 0 0' }}}
                />
            )
        },
        {
            Header: 'Created',
            accessor: 'col_created',
            Cell: (cell) => (
                <div style={{ marginTop: '10px' }}>
                    <SmallText style={{ padding: '0 10px' }}>
                        {cell.row.original.createdAt}
                    </SmallText>
                </div>
            )
        }
    ],
    data: [
        {
            id: 1,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 2,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 3,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 4,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 5,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 6,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 7,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 8,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 9,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 10,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 11,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 12,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 13,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 14,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 15,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 16,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 17,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
        {
            id: 18,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 19,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 20,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 21,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 22,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 23,
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            createdAt: '24/05/2019'
        },
        {
            id: 24,
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            createdAt: '24/05/2019'
        },
    ],
});

const Template: Story<IReactTableProps<IVendorsData>> = (args) => (
    <ReactTable {...args} />
);

export const Basic = Template.bind({});
Basic.args = getReactTableProps();