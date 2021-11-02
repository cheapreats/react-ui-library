import React from 'react';
import styled from 'styled-components';
import {
    Column,
    Row,
    useTable
} from 'react-table';
import { CRMRowProps } from '../CRMRow/CRMRow';


export interface ICRMTableProps extends React.HTMLAttributes<HTMLTableElement> {
    data: Array<CRMRowProps>; 
    columns: Array<Column<CRMRowProps>>;
}

export const CRMTable: React.FC<ICRMTableProps> = ({
    columns,
    data,
    ...props
}): React.ReactElement => {
    

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow 
    } = useTable({ columns, data });

    const buildHeaderGroups = () => headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                </th>
            ))}
        </tr>
    ));

    const buildRows = () => rows.map((row) => {
        prepareRow(row);
        return (
            <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </td>
                ))}
            </tr>
        );
    });

    return (
        <CRMMainTable {...props} {...getTableProps()}>
            <thead>
                {buildHeaderGroups()}
            </thead>
            <tbody {...getTableBodyProps()}>
                {buildRows()}
            </tbody>
        </CRMMainTable>
    );
}

const CRMMainTable = styled.table`
    border: 1px solid black;
    min-height: 25px;
    width: 100%;
`;

const CRMTableHeader = styled.thead`

`;

const CRMTableBody = styled.tbody`

`;

const CRMTableHeaderRow = styled.tr`

`;