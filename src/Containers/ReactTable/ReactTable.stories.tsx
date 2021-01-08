// @ts-nocheck
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { useTable, usePagination } from 'react-table';
import { ReactTable, IReactTableProps, IVendorsData } from './ReactTable';
import { Profile, TagContainer } from '../VendorsList'; 
import { SmallText } from '../../Text/SmallText';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('React Table'),
    component: ReactTable,
} as Meta;

const getReactTableProps = (): any => ({
    pageSelectOptions: [10, 20, 30],
    tableHeaderProps: {
        style: {
            marginBottom: '10px',
        },
    },
    paginationProps: {
        style: {
            marginTop: '10px'
        },
        pageSelectorProps: {
            buttonProps: {
                style: {
                    margin: '0 2px'
                }
            },
            style: {
                margin: '5px 0'
            }
        },
        rowSelectorProps: {
            smallTextProps: {
                style: {
                    margin: '5px 5px 0 5px'
                }
            },
            style: {
                margin: '5px 0'
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
            Cell: (cell: any) => (
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
            Cell: (cell: any) => (
                <TagContainer 
                    tags={cell.row.original.tags} 
                    isHoverable={false} 
                    tagProps={{ style: { marginRight: '10px' }}}
                />
            )
        },
        {
            Header: 'Created',
            Cell: (cell: any) => (
                <SmallText style={{ padding: '0 10px' }}>
                    {cell.row.original.createdAt}
                </SmallText>
            )
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
    ],
});

const Template: Story<IReactTableProps<IVendorsData>> = (args) => {
    const { columns, data } = args;
    console.log(columns)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { 
                pageIndex: 0, 
                pageSize: 5
            }
        },
        usePagination
    );
    return (
        <ReactTable 
            data={data}
            columns={columns}
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            page={page}
            prepareRow={prepareRow}
            pageCount={pageCount}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
            {...args}
        />
    );
}

export const Basic = Template.bind({});
Basic.args = getReactTableProps();