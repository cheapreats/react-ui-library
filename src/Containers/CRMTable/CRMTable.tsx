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

    const instance = useTable<CRMRowProps>({ columns, data})

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = instance

    const buildHeaderGroups = () => headerGroups.map((headerGroup) => (
        <CRMTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
                <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                </th>
            })}
        </CRMTableHeaderRow>
    ));

    const buildRows = () => rows.map((row: Row<CRMRowProps>) => {
        prepareRow(row);
        return (
            <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                    <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </td>
                })}
            </tr>
        );
    });

    return (
        <CRMMainTable {...props} {...getTableProps()}>
            <CRMTableHeader>
                {buildHeaderGroups}
            </CRMTableHeader>
            <CRMTableBody {...getTableBodyProps()}>
                {buildRows()}
            </CRMTableBody>
        </CRMMainTable>
    );
}

const CRMMainTable = styled.table`
    border: 1px solid black;
    width: 100%;
`;

const CRMTableHeader = styled.thead`

`;

const CRMTableBody = styled.tbody`

`;

const CRMTableHeaderRow = styled.tr`

`;