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
};

interface IOriginalValues {email: string, name: string, tags: string[], created_at: string};


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
    ...props
}): React.ReactElement => {
    const defaultColumn = useMemo(()=>({ Filter: DefaultFilter}), [])
    const memoColumns = useMemo(()=> columns, [])
    const globalFilterMethod =  (rows: Row<object>[], theColumns: string[], filterValue: any) => {
        console.log(rows, theColumns, filterValue, "globalFilter")
        const stringRegexMatch = new RegExp(filterValue, 'gi')
        const filteredRows = rows.filter((row) => {
            const {email, name, tags, created_at} : IOriginalValues = row.original as IOriginalValues;
            const emailMatch = stringRegexMatch.test(email);
            const nameMatch = stringRegexMatch.test(name);
            const tagsMatch = stringRegexMatch.test(tags.join(''));
            const createdAtMatch = stringRegexMatch.test(created_at);
            console.log(emailMatch,nameMatch,tagsMatch, email, name, tags, ' filtering')
            if(emailMatch || nameMatch || tagsMatch || createdAtMatch) {
                return true;
            }
        })
        return filteredRows
    }
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

    // global filter value not updating
    return (
        <Wrapper {...props}>
            <Row>
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
                    collapsibleHeadingProps={{ style: { marginBottom: '20px' } }}
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
            </Row>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    ${flex('row')};
    height: 100%;
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