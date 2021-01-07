import React from 'react';
import styled from 'styled-components';
import { Column } from 'react-table';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { VendorsFilter, IFilterItems } from './VendorsFilter';
import { VendorsHeader } from './VendorsHeader';
import { INavigationItemProps } from './NavigationItem';
import { NavigationBar } from './NavigationBar';
import { ReactTable, IVendorsData } from '../ReactTable/ReactTable';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
            filterItems: IFilterItems[];
            navigationBarItems: INavigationItemProps[];
            data: IVendorsData[];
            columns: Column<IVendorsData>[];
            rightButtonText: string;
            vendorsHeaderText: string;
            filterButtonText: string;
            filterTitleText: string;
};

export const VendorsList: React.FC<IVendorsListProps> = ({
    data,
    columns,
    filterItems,
    navigationBarItems,
    rightButtonText,
    vendorsHeaderText,
    filterButtonText,
    filterTitleText,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Row>
            <SVendorsFilter
                headingTitle={filterTitleText}
                buttonText={filterButtonText}
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
                headerText={vendorsHeaderText}
                rightButtonText={rightButtonText}
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
                tableRowProps={{ style: { padding: '5px 0' } }}
                paginationProps={{ style: { marginTop: '20px' },
                    pageSelectorProps: { buttonProps: { style: { margin: '0 2px' } }, style: { margin: '5px 0' } }, 
                    rowSelectorProps: { style: { margin: '20px 0' }, smallTextProps: { style: { margin: '5px 5px 0 5px' } } } }}
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
    margin: 20px 10px;
`;
const SVendorsFilter = styled(VendorsFilter)`
    padding: 20px;
`;
const SReactTable = styled(ReactTable)`
    margin-top: 20px;
`;