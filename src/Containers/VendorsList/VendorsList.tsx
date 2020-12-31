import React from 'react';
import styled from 'styled-components';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { TableView } from '@styled-icons/material/TableView';
import { List } from '@styled-icons/bootstrap/List';
import { ViewGrid } from '@styled-icons/heroicons-solid/ViewGrid';
import { VendorsFilter } from './VendorsFilter';
import { VendorsHeader } from './VendorsHeader';
import { NavigationBar } from './NavigationBar';
import { ReactTable } from '../ReactTable/ReactTable';
import { Profile } from './Profile'; 
import { TagContainer } from './TagContainer';
import { SmallText } from '../../Text/SmallText';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {

};

const isHoverable = false;

const filterItems = [
    {
        title: 'Email',
        selectOptions: ['Contains', 'Equals'],
        placeholder: 'Add email'
    },
    {
        title: 'First Name',
        selectOptions: ['Starts with', 'Equals'],
        placeholder: 'Add first name'
    },
    {
        title: 'Last Name',
        selectOptions: ['Starts with', 'Equals'],
        placeholder: 'Add last name'
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
];

const navigationBarItems = [
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
];

const columns = [
    {
        Header: 'Client',
        accessor: 'col_client',
        profileStyleProps: {
            style: { marginTop: '10px' }
        },
        Cell: (cell: any) => (
            <Profile
                key={cell.row.original.id}
                name={cell.row.original.name}
                email={cell.row.original.email}
                imageUrl={cell.row.original?.imageUrl}
                profileProps={{ style: { marginTop: 'tpx' } }}
            />
        ),
    },
    {
        Header: 'Tags',
        accessor: 'col_tags',
        Cell: (cell: any) => (
            <TagContainer 
                tags={cell.row.original.tags} 
                isHoverable={isHoverable} 
                style={{ padding: '10px 0' }}
                tagProps={{ style: { margin: '5px 10px 0 0' }}}
            />
        ),
    },
    {
        Header: 'Created',
        accessor: 'col_created',
        Cell: (cell: any) => (
            <div style={{ padding: '10px 0' }}>
                <SmallText style={{ padding: '0 10px' }}>
                    {cell.row.original.createdAt}
                </SmallText>
            </div>
        ),
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
        createdAt: '24/05/2019',
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
        createdAt: '24/05/2019',
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
];

export const VendorsList: React.FC<IVendorsListProps> = ({
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Row>
            <SVendorsFilter
                headingTitle="Filters"
                buttonText="Apply"
                filterItems={filterItems}
                headingProps={{ style: { padding: '20px 0 0 20px' } }}
                buttonProps={{ style: { margin: '20px 0' }} }
                collapsibleHeadingProps={{ style: { marginBottom: '20px' } }}
                filterSelectProps={{ inputProps: { style: { margin: '10px 0'} },
                    tagProps: { style: { margin: '10px 0'} } }}
            />
        </Row>
        <Row>
            <SVendorsHeader 
                headerText="Clients"
                rightButtonText="Add Client"
                leftButtonProps={{ icon: Import, style: { margin: '0 20px' } }}
                rightButtonProps={{ icon: Add, primary: true }}
            />
            <NavigationBar
                navigationItemProps={{ iconProps: { style: { paddingRight: '5px' } },
                    style: { margin: '0 20px', paddingBottom: '5px' } }}
                navigationBarItems={navigationBarItems}
            />
            <SReactTable 
                data={data}
                columns={columns}
                pageSelectOptions={[5, 10, 15, 20]}
                tableHeaderProps={{ style: { marginBottom: '10px' } }}
                headingProps={{ style: { margin: '0 5px' } }}
                paginationProps={{ style: { marginTop: '10px' },
                    pageSelectorProps: { buttonProps: { style: { margin: '0 2px' } }, style: { margin: '5px 0' } } 
                    rowSelectorProps: { style: { margin: '5px 0' }, smallTextProps: { style: { margin: '5px 5px 0 5px' } } } }}
            />
        </Row>
    </Wrapper>
);

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    ${media(
        'phone',
        `
        ${flex('column', 'center')};
    `,
    )};
`;
const Row = styled.div`
    ${flex('column')};
`;
const SVendorsHeader = styled(VendorsHeader)`
    margin: 20px 20px 30px 10px;
`;
const SVendorsFilter = styled(VendorsFilter)`
    padding: 20px;
`;
const SReactTable = styled(ReactTable)`
    margin-top: 20px;
`;