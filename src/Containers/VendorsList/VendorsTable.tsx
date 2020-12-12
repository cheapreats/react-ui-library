import React from 'react';
import styled from 'styled-components';
import { useTable, Column } from 'react-table';
import { IProfileProps } from './Profile';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex, media } from '../../Utils/Mixins';

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
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.headers[index].Header?.toString()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} key={column.Header?.toString()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.original.id}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};