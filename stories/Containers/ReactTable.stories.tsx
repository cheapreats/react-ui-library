import React from 'react';
import { 
    ReactTable, 
    IReactTableProps, 
    Profile, 
    TagContainer,
    SmallText,
} from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('React Table'),
    component: ReactTable,
} as Meta;

const isHoverable = false;

const getReactTableProps = () => ({
    tableHeaderProps: {
        style: {
            marginBottom: '10px',
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
            Cell: (cell, { tagStyleProps }) => (
                <TagContainer 
                    tags={cell.row.original.tags} 
                    isHoverable={isHoverable} 
                    style={{ marginTop: '10px' }}
                    tagProps={{ style: { margin: '5px 10px 0 0' }} }
                />
            )
        },
        {
            Header: 'Created',
            accessor: 'col_created',
            Cell: cell => (
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
        }
    ],
});

const Template: Story<IReactTableProps> = (args) => (
    <ReactTable {...args} />
);

export const Basic = Template.bind({});
Basic.args = getReactTableProps();