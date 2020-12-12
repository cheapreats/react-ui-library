import React from 'react';
import styled from 'styled-components';
import { useTable, Column } from 'react-table';
import { IProfileProps } from './Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';


export interface IVendorsData extends IProfileProps {
    tags: string[];
    createdAt: string;
};

export interface IVendorsTableProps extends MainInterface, ResponsiveInterface,React.HTMLAttributes<HTMLDivElement> {
    data: IVendorsData[];
    columns: Column<IVendorsData>[];
};

export const VendorsTable: React.FC<IVendorsTableProps> = ({
    data,
    columns,
    ...props
}): React.ReactElement => {
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

    return (
        <table {...getTableProps()} {...props}>
            <STableHead>
                {headerGroups.map((headerGroup, index) => (
                    <SHeadTableRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.headers[index].Header?.toString()}>
                        {headerGroup.headers.map(column => (
                            <STableHeader {...column.getHeaderProps()} key={column.Header?.toString()}>
                                {column.render('Header')}
                            </STableHeader>
                        ))}
                    </SHeadTableRow>
                ))}
            </STableHead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <STableRow {...row.getRowProps()} key={row.original.id}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </STableRow>
                    )
                })}
            </tbody>
        </table>
    );
};

const STableHead = styled.thead`
    display: block;
`;
const STableHeader = styled.th`
    text-align: left;
`;
const SHeadTableRow = styled.tr`
    display: grid;
    grid-template-columns: 3fr 3fr 1fr;
    ${({ theme }): string => `
        border-bottom: 1.5px solid ${theme.colors.border};
    `};
`;
const STableRow = styled(SHeadTableRow)`
    ${({ theme }): string => `
        :hover {
            transform: scale(1.01);
            box-shadow: ${theme.depth[2]}
        }
    `};
`;