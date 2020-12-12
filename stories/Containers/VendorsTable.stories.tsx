import React from 'react';
import styled from 'styled-components';
import { 
    VendorsTable, 
    IVendorsTableProps, 
    Profile, 
    TagContainer,
    SmallText, 
} from '../../src';
import { createStoryTitle } from '../Constants';
import { Story, Meta } from '@storybook/react';

export default {
    title: createStoryTitle('Vendors Table'),
    component: VendorsTable,
} as Meta;

const hasHoverMode = false;

const getVendorsTableProps = () => ({
    // columns and data must be memoized
    columns: [
        {
            Header: 'Client',
            accessor: 'col_client',
            Cell: cell => (
                <Profile 
                    key={cell.row.original.id} 
                    name={cell.row.original.name} 
                    email={cell.row.original.email} 
                    imageUrl={cell.row.original?.imageUrl} 
                />
            )
        },
        {
            Header: 'Tags',
            accessor: 'col_tags',
            Cell: cell => (
                <TagContainer 
                    tags={cell.row.original.tags} 
                    hasHoverMode={hasHoverMode} 
                />
            )
        },
        {
            Header: 'Created At',
            accessor: 'col_created',
            Cell: cell => (
                <div style={{ marginTop: '10px' }}>
                    <SmallText>
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

const Template: Story<IVendorsTableProps> = (args) => (
    <VendorsTable {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorsTableProps();