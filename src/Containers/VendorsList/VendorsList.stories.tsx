import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TableView } from '@styled-icons/material/TableView';
import { List } from '@styled-icons/bootstrap/List';
import { ViewGrid } from '@styled-icons/heroicons-solid/ViewGrid';
import { DefaultFilter } from './DefaultFilter';
import { Profile } from './Profile'; 
import { TagContainer } from './TagContainer';
import { SmallText } from '../../Text/SmallText';
import { VendorsList, IVendorsListProps } from './VendorsList';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('Vendors List'),
    component: VendorsList,
} as Meta;

const getVendorsListProps = (): IVendorsListProps => ({
    filterButtonText: 'Apply',
    filterTitleText: 'Filters',
    headerText: 'Clients',
    headerRightButtonText: 'Add Client',
    navigationBarItems: [
        {
            icon: TableView,
            label: 'Overview',
        },
        {
            icon: List,
            label: 'List View',
        },
        {
            icon: ViewGrid,
            label: 'Segment',
        },
    ],    
    filterItems:  [
        {
            title: 'Name',
            selectOptions: ['Contains', 'Equals'],
            placeholder: 'Add email'
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
    ],
    columns: [
        {
            Header: 'Client',
            accessor: 'name',
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
                <SmallText style={{ padding: '0 10px' }} key={cell.row.original.created_at}>
                    {cell.row.original.created_at}
                </SmallText>
            ),
            Filter: DefaultFilter
        },
    ],    
    data: [
        {
            key: 1,
            id: '1',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            created_at: '24/05/2019',
        },
        {
            key: 2,
            id: '2',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '01/10/2020',
        },
        {
            key: 3,
            id: '3',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter', 'Pizza Fanatic'],
            created_at: '24/05/2019',
        },
        {
            key: 4,
            id: '4',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '23/05/2019',
        },
        {
            key: 5,
            id: '5',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl:
                'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            created_at: '24/05/2019',
        },
        {
            key: 6,
            id: '6',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client', 'Dog Lover'],
            created_at: '24/05/2019'
        },
        {
            key: 6,
            id: '7',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '02/30/2018'
        },
        {
            key: 8,
            id: '8',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '24/05/2019'
        },
        {
            key: 9,
            id: '9',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client'],
            created_at: '23/05/2019'
        },
        {
            key: 10,
            id: '10',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '24/05/2019'
        },
        {
            key: 11,
            id: '11',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '24/05/2019'
        },
        {
            key: 12,
            id: '12',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            created_at: '24/05/2019'
        },
        {
            key: 13,
            id: '13',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            created_at: '24/05/2019'
        },
        {
            key: 14,
            id: '14',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '24/05/2019'
        },
        {
            key: 15,
            id: '15',
            name: 'Emy Jackson',
            email: 'emy_jac@upmind.com',
            imageUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg',
            tags: ['VIP Client', 'Early Adopter'],
            created_at: '24/05/2019'
        },
        {
            key: 16,
            id: '16',
            name: 'Amy Jackson',
            email: 'amy_jac@upmind.com',
            tags: ['VIP Client'],
            created_at: '24/05/2019'
        }
    ],
    onSelectRow: (original) => console.log(original, 'contact clicked'),
    listProps: {
        id: 'vendor_list',
        columnWidth: '300px',
        loading: false,
        cssPosition: 'relative',
        margin: '0',
        left: '0',
        right: 'auto',
        mediaMixin: 'tablet',
        mediaCssPosition: 'absolute',
        mediaLeft: '0',
        mediaRight: 'auto',
        mediaMargin: 'auto',
        mediaOnCloseTranslateXAxis: '-100%',
        zIndex: 3
    },
    tableHeight: '50vh'
});

const Template: Story<IVendorsListProps> = (args) => (
    <VendorsList {...args} />
);

export const Basic = Template.bind({});
Basic.args = getVendorsListProps();
