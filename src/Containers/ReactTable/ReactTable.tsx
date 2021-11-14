import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
    Row,
    Column,
    Cell,
    HeaderGroup,
    TableProps,
    TableHeaderProps,
    TableRowProps,
} from 'react-table';
import { Pagination, IPaginationProps } from './Pagination';
import { IProfileProps } from '../VendorsList/Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { media, scroll } from '../../Utils/Mixins';

export interface IVendorsData extends IProfileProps {
    tags?: string[];
    createdAt?: string;
}

export interface IReactTableProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    columns: Column<any>[];
    tableProps?: TableProps;
    tableHeaderProps?: Omit<TableHeaderProps, 'key'>;
    tableRowProps?: Omit<TableRowProps, 'key'>;
    paginationProps?: Partial<IPaginationProps>;
    pageSelectOptions: number[];
    isPaginated?: boolean;
    getTableProps: Function;
    getTableBodyProps: Function;
    headerGroups: HeaderGroup<any>[];
    prepareRow: (row: Row<any>) => void;
    page: any;
    pageCount: number;
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (pageSize: number) => void;
    pageIndex: number;
    pageSize: number;
    onSelectRow: (original: any) => void;
    tableHeight?: string;
    mediaMixin?: string;
    mediaHeight?: string;
    filteredRows: any[];
}

export const ReactTable: React.FC<IReactTableProps> = ({
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
    onSelectRow,
    filteredRows,
    tableHeight,
    mediaMixin,
    mediaHeight,
    ...props
}: IReactTableProps): React.ReactElement => {
    const pageOptionsLength = filteredRows.length;
    const getHeaderGroup = useCallback(
        () =>
            headerGroups.map((headerGroup) => (
                <SHeadTableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <STableHeader
                            {...tableHeaderProps}
                            {...column.getHeaderProps()}
                        >
                            {column.render('Header')}
                        </STableHeader>
                    ))}
                </SHeadTableRow>
            )),
        [headerGroups],
    );

    const getRowComponent = useCallback(
        () =>
            page.map((row: Row<any>) => {
                prepareRow(row);
                return (
                    <STableRow
                        {...row.getRowProps()}
                        onClick={() => onSelectRow(row.original)}
                        {...tableRowProps}
                    >
                        {row.cells.map((cell: Cell<any>) => (
                            <STableData {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </STableData>
                        ))}
                    </STableRow>
                );
            }),
        [page],
    );

    return (
        <Wrapper {...props}>
            <TableWrapper>
                <table {...getTableProps()} {...tableProps}>
                    <STableHead>{getHeaderGroup()}</STableHead>
                    <tbody {...getTableBodyProps()}>
                        <Scrollable
                            height={tableHeight}
                            mediaMixin={mediaMixin}
                            mediaHeight={mediaHeight}
                        >
                            {getRowComponent()}
                        </Scrollable>
                    </tbody>
                </table>
            </TableWrapper>
            {isPaginated && (
                <Pagination
                    goToPreviousPage={previousPage}
                    goToNextPage={nextPage}
                    goToPage={gotoPage}
                    pageCount={pageCount}
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

const TableWrapper = styled.div`
    overflow-x: auto;
    ${scroll}
`;

interface IScrollable {
    height?: string;
    mediaMixin?: string;
    mediaHeight?: string;
}

const Scrollable = styled.div<IScrollable>`
    ${({ theme, height, mediaMixin, mediaHeight }) => `
        overflow-y: auto;
        overflow-x: hidden;
        height: ${height};
        ${
            mediaMixin &&
            `@media (max-width: ${theme.media[mediaMixin] || mediaMixin}px) {
            height: ${mediaHeight}
        }`
        }
    `};
    ${scroll}
`;

const Wrapper = styled.div`
    ${({ theme }): string => `
        border-top: 2px solid ${theme.colors.input.default};
    `};
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
    margin-left: 10px;
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
    grid-template-columns: 2fr 2fr 1fr;
    ${({ theme }): string => `
        border-bottom: 1.5px solid ${theme.colors.border};
    `};
    ${media(
        'tablet',
        `
       grid-template-columns: 2fr 1fr 1fr; 
    `,
    )}
`;
const STableRow = styled(SHeadTableRow)`
    align-items: center;
    justify-content: left;
    ${({ theme }): string => `
        :hover {
            transform: scale(1.01);
            box-shadow: ${theme.depth[2]}
        }
    `};
`;
