import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTable, Column, TableHeaderProps, TableRowProps } from 'react-table';
import { IProfileProps } from './VendorsList/Profile';
import { MainInterface, ResponsiveInterface } from '../Utils/BaseStyles';
import { media, scroll } from '../Utils/Mixins';

export interface IVendorsData extends IProfileProps {
    tags?: string[];
    createdAt?: string;
};

export interface IReactTableProps<T extends IVendorsData> extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: Column<T>[];
    tableHeaderProps?: TableHeaderProps;
    tableRowProps?: TableRowProps;
};

export const ReactTable = <T extends IVendorsData>({data,
    columns,
    tableHeaderProps,
    tableRowProps,
    ...props
}: IReactTableProps<T>): React.ReactElement => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns, 
        data
    });

    const getHeaderGroup = useCallback(
        () => headerGroups.map((headerGroup, index) => (
            <SHeadTableRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.headers[index].Header?.toString()}>
                {headerGroup.headers.map(column => (
                    <STableHeader {...column.getHeaderProps()} key={column.Header?.toString()} {...tableHeaderProps}>
                        {column.render('Header')}
                    </STableHeader>
                ))}
            </SHeadTableRow>
        )), [headerGroups]
    );

    const getRowComponent = useCallback(
        () => rows.map((row) => {
            prepareRow(row);
            return (
                <STableRow {...row.getRowProps()} key={row.original.id} {...tableRowProps}>
                    {row.cells.map(cell => (
                        <STableData {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </STableData>
                    ))}
                </STableRow>
            );
        }), [rows]
    );

    return (
        <table {...getTableProps()} {...props}>
            <STableHead>
                {getHeaderGroup()}
            </STableHead>
            <tbody {...getTableBodyProps()}>
                {getRowComponent()}
            </tbody>
        </table>
    );
};

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
    ${({ theme }): string => `
        :hover {
            transform: scale(1.01);
            box-shadow: ${theme.depth[2]}
        }
    `};
`;