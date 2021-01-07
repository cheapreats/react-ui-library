// @ts-nocheck
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Row, Column, HeaderGroup, TableProps, TableHeaderProps, TableRowProps } from 'react-table';
import { Pagination, IPaginationProps } from './Pagination';
import { IProfileProps } from '../VendorsList/Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { media, scroll, flex } from '../../Utils/Mixins';

export interface IVendorsData extends IProfileProps {
    tags?: string[];
    createdAt?: string;
}

export interface IReactTableProps<T extends IVendorsData>
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: Column<T>[];
    tableProps?: TableProps;
    tableHeaderProps?: Omit<TableHeaderProps, 'key'>;
    tableRowProps?: Omit<TableRowProps, 'key'>;
    paginationProps?: IPaginationProps;
    pageSelectOptions: number[];
    isPaginated?: boolean;
    getTableProps: Function;
    getTableBodyProps: Function;
    headerGroups: HeaderGroup<T>[];
    prepareRow: (row: Row<T>) => void
    page: any;
    pageCount: number;
    gotoPage: () => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: () => void;
    pageIndex: number;
    pageSize: number;
};

export const ReactTable = <T extends IVendorsData>({
    data,
    columns,
    tableProps,
    tableHeaderProps,
    tableRowProps,
    paginationProps,
    pageSelectOptions,
    isPaginated = true,
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
    pageIndex,
    pageSize,
    ...props
}: IReactTableProps<T>): React.ReactElement => {
    const pageOptionsLength = data.length;

    const getHeaderGroup = useCallback(
        () =>
            headerGroups.map((headerGroup, index) => (
                <SHeadTableRow
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.headers[index].Header?.toString()}
                >
                    {headerGroup.headers.map((column) => (
                        <>
                            <STableHeader
                                {...column.getHeaderProps()}
                                key={column.Header?.toString()}
                                {...tableHeaderProps}
                            >
                                {column.render('Header')}
                            </STableHeader>
                        </>
                    ))}
                </SHeadTableRow>
            )),
        [headerGroups],
    );

    const getRowComponent = useCallback(
        () => page.map((row: any) => {
            prepareRow(row);
            return (
                <STableRow {...row.getRowProps()} key={row.original.id} {...tableRowProps}>
                    {row.cells.map((cell: any) => (
                        <STableData key={cell.row.original.id} {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </STableData>
                    ))}
                </STableRow>
            );
        }), [page]
    );

    return (
        <Wrapper {...props}>
            <table {...getTableProps()} {...tableProps}>
                <STableHead>
                    {getHeaderGroup()}
                </STableHead>
                <tbody {...getTableBodyProps()}>
                    {getRowComponent()}
                </tbody>
            </table>
            {!!isPaginated && (
                <Pagination 
                    goToPreviousPage={previousPage}
                    goToNextPage={nextPage}
                    goToPage={gotoPage}
                    pageLength={pageCount}
                    pageOptionsLength={pageOptionsLength}
                    pageSelectOptions={pageSelectOptions}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageIndex={pageIndex}
                    {...paginationProps}
                />
            )}
        </Wrapper>
    );
};
 
const Wrapper = styled.div`
    width: 60%;
    ${media(
        'tabletLarge',
        `
        width: 95%;
        ${flex('column', 'center')};
        `,
    )}
`;
const STableHead = styled.thead`
    display: block;
`;
const STableData = styled.td`
    ${({ theme }): string => `
        ${media(
        'phone',
        `
        font-size: ${theme.font.size.small};
        `,
    )}
    `};
`;
const STableHeader = styled.th`
    text-align: left;
    ${({ theme }): string => `
        ${media(
        'phone',
        `
        font-size: ${theme.font.size.small};
        `,
    )}
    `};
`;
const SHeadTableRow = styled.tr`
    display: grid;
    grid-template-columns: 3fr 3fr 1fr;
    ${({ theme }): string => `
        border-bottom: 1.5px solid ${theme.colors.border};
    `};
    ${media(
        'tablet',
        `
       grid-template-columns: 2fr 1fr 1fr; 
    `,
    )}
    ${scroll}
`;
const STableRow = styled(SHeadTableRow)`
    align-items: center;
    ${({ theme }): string => `
        align-items: center;
        :hover {
            transform: scale(1.01);
            box-shadow: ${theme.depth[2]}
        }
    `};
`;
