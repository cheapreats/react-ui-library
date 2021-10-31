import React from 'react';
import styled from 'styled-components';
import {
    Column,
    HeaderGroup,
    Row,
    useTable
} from 'react-table';
import { CRMRowProps } from '../CRMRow/CRMRow';
import { TableHeaderCellProps, TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';

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
        <CRMTableHeaderRow>
            {headerGroup.headers.map((column) => <TableHeaderCell {...column} />}
        </CRMTableHeaderRow>
    ));

    const buildHeader = (headerGroup: HeaderGroup<CRMRowProps>) => );
    const buildRows = () => rows.map((row: Row<CRMRowProps>) => {
        prepareRow(row);
        return <CRMRow {...row.getRowProps()} {...row}/>;
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