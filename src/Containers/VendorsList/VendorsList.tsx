// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { 
    useTable, 
    usePagination, 
    useFilters, 
    Column,
} from 'react-table';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { VendorsFilter, IFilterItems } from './VendorsFilter';
import { VendorsHeader } from './VendorsHeader';
import { INavigationItemProps } from './NavigationItem';
import { NavigationBar } from './NavigationBar';
import { DefaultFilter } from './DefaultFilter';
import { ReactTable, IVendorsData } from '../ReactTable/ReactTable';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

interface ColumnData extends Column<IVendorsData> {
    accessor: string;
}

export interface IVendorsListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
            filterItems: IFilterItems[];
            data: IVendorsData[];
            columns: ColumnData<IVendorsData>;
            navigationBarItems: INavigationItemProps[];
            headerRightButtonText: string;
            headerText: string;
            filterButtonText: string;
            filterTitleText: string;
};

export const VendorsList: React.FC<IVendorsListProps> = ({
    data,
    columns,
    filterItems,
    navigationBarItems,
    headerRightButtonText,
    headerText,
    filterButtonText,
    filterTitleText,
    ...props
}): React.ReactElement => {
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
            defaultColumn: { Filter: DefaultFilter },
            initialState: { 
                pageIndex: 0, 
                pageSize: 5
            }
        },
        useFilters, 
        usePagination
    );
    return (
        <Wrapper {...props}>
            <Row>
                <SVendorsFilter
                    headerGroups={headerGroups}
                    headingTitle={filterTitleText}
                    buttonText={filterButtonText}
                    filterItems={filterItems}
                    headingProps={{ style: { padding: '20px 0 0 20px' } }}
                    buttonProps={{ style: { margin: '20px 0' } }}
                    collapsibleHeadingProps={{ style: { marginBottom: '20px' } }}
                    filterSelectProps={{ inputProps: { style: { margin: '10px 0'} },
                        tagProps: { style: { margin: '10px 0'} } }}
                />
            </Row>
            <Row>
                <SVendorsHeader 
                    headerText={headerText}
                    rightButtonText={headerRightButtonText}
                    leftButtonProps={{ icon: Import, style: { margin: '0 20px' } }}
                    rightButtonProps={{ icon: Add, primary: true }}
                />
                <SNavigationBar
                    navigationItemProps={{ iconProps: { style: { paddingRight: '5px' } },
                        style: { margin: '0 20px', paddingBottom: '5px' } }}
                    navigationBarItems={navigationBarItems}
                />
                <SReactTable 
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
                    pageSelectOptions={[5, 10, 15, 20]}
                    tableHeaderProps={{ style: { marginBottom: '10px' } }}
                    tableRowProps={{ style: { padding: '10px 0' } }}
                    headingProps={{ style: { margin: '0 5px' } }}
                    paginationProps={{ style: { marginTop: '10px' },
                        pageSelectorProps: { buttonProps: { style: { margin: '0 2px' } }, style: { margin: '10px 0' } }, 
                        rowSelectorProps: { style: { margin: '10px 0' }, smallTextProps: { style: { margin: '5px 5px 0 5px' } },
                            selectProps: { iconProps: { style: { marginLeft: '5px' } } } } }}
                />
            </Row>
        </Wrapper>
    );
}

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
    height: 100%;
`;
const SNavigationBar = styled(NavigationBar)`
    margin-bottom: 15px;
`;
const SReactTable = styled(ReactTable)`
    margin-top: 20px;
`;