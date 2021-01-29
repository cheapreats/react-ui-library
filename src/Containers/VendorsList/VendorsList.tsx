import React, {useMemo} from 'react';
import styled from 'styled-components';
import { 
    useTable, 
    usePagination, 
    useFilters, 
    Column,
    useGlobalFilter,
    Row,
    ColumnWithLooseAccessor
} from 'react-table';
import { Import } from '@styled-icons/boxicons-regular/Import';
import { Add } from '@styled-icons/ionicons-sharp/Add';
import { ListProps } from '@Containers/List';
import moment from 'moment';
import { VendorsFilter, IFilterItems } from './VendorsFilter';
import { VendorsHeader } from './VendorsHeader';
import { INavigationItemProps } from './NavigationItem';
import { NavigationBar } from './NavigationBar';
import { DefaultFilter } from './DefaultFilter';
import { ReactTable, IVendorsData } from '../ReactTable/ReactTable';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

export interface IVendorsListProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
            filterItems: IFilterItems[];
            data: any[];
            columns: Column<any>[];
            navigationBarItems: INavigationItemProps[];
            headerRightButtonText: string;
            headerText: string;
            filterButtonText: string;
            filterTitleText: string;
            onSelectRow: (original: any) => void;
            listProps: ListProps;
            tableHeight?: string;
            globalFilterMethod?: (rows: Row<object>[], theColumns: string[], filterValue: any) => Row<object>[];
            selectedNavLabel: string;
            groups: string[];
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
    onSelectRow,
    listProps,
    tableHeight,
    globalFilterMethod,
    selectedNavLabel,
    ...props
}): React.ReactElement => {
    const defaultColumn = useMemo(()=>({ Filter: DefaultFilter}), [])
    const memoColumns = useMemo(()=> columns, [])
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
        preGlobalFilteredRows,
        filteredRows,
        setGlobalFilter,
        state: { globalFilter, pageIndex, pageSize }
    } = useTable(
        {
            columns: memoColumns,
            data,
            defaultColumn,
            initialState: { 
                pageIndex: 0, 
                pageSize: 5
            },
            globalFilter: globalFilterMethod
        },
        useFilters, 
        useGlobalFilter,
        usePagination
    );

    return (
        <Wrapper {...props}>
            <WrapperRow>
                <SVendorsFilter
                    headerGroups={headerGroups}
                    headingTitle={filterTitleText}
                    buttonText={filterButtonText}
                    filterItems={filterItems}
                    listProps={listProps}
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={globalFilter}
                    headingProps={{ style: { padding: '20px 0 0 20px' } }}
                    buttonProps={{ style: { margin: '20px 0' } }}
                    collapsibleHeadingProps={{ style: { marginTop: '20px' } }}
                />
            </WrapperRow>
            <WrapperRow>
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
                    selectedNavLabel={selectedNavLabel}
                />
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
                    filteredRows={filteredRows}
                    pageSelectOptions={[5, 10, 15, 20]}
                    tableHeaderProps={{ style: { marginBottom: '10px' } }}
                    tableRowProps={{ style: { padding: '10px 0' } }}
                    headingProps={{ style: { margin: '0 5px' } }}
                    // @ts-ignore
                    paginationProps={{ style: { marginTop: '10px' },
                        pageSelectorProps: { buttonProps: { style: { margin: '0 5px' } }, style: { margin: '10px 0' }, smallTextProps: {margin: '10px 0'} }, 
                        rowSelectorProps: { style: { margin: '10px 0' }, smallTextProps: { style: { margin: 'auto 5px' } },
                            selectProps: { iconProps: { style: { marginLeft: '10px' } } } } }}
                    onSelectRow={onSelectRow}
                    tableHeight={tableHeight}
                />
            </WrapperRow>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    ${flex('row')};
    height: 100%;
    width: 100%;
`;
const WrapperRow = styled.div`
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