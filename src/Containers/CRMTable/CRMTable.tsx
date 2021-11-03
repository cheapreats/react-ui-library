import React from 'react';
import styled from 'styled-components';
import {
    Column,
    useFilters,
    useTable
} from 'react-table';
import { CRMRowProps } from '../CRMRow/CRMRow';


export interface ICRMTableProps extends React.HTMLAttributes<HTMLTableElement> {
    data: Array<CRMRowProps>; 
    columns: Array<Column<CRMRowProps>>;
    defaultColumn?: any,
    onRowClick: (original: CRMRowProps) => void;
}

export const CRMTable: React.FC<ICRMTableProps> = ({
    columns,
    data,
    defaultColumn,
    onRowClick,
    ...props
}): React.ReactElement => {
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow 
    } = useTable({ columns, data, defaultColumn }, useFilters);

    const buildHeaderGroups = () => headerGroups.map((headerGroup) => (
        <CRMTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <CRMTableHeaderCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                </CRMTableHeaderCell>
            ))}
        </CRMTableHeaderRow>
    ));

    const buildRows = () => rows.map((row) => {
        prepareRow(row);
        return (
            <CRMTableDataRow {...row.getRowProps()} onClick={() => onRowClick(row.original)}>
                {row.cells.map((cell) => (
                    <CRMTableData {...cell.getCellProps()}>
                        {cell.render('Cell')}
                    </CRMTableData>
                ))}
            </CRMTableDataRow>
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
    border-collapse: collapse;
    min-height: 25px;
    width: 100%;
`;

const CRMTableHeaderRow = styled.tr`
    ${({theme}) => `
        border-bottom: 2px solid ${theme.colors.border};
        }
    `}
`;

const CRMTableDataRow = styled.tr`
    ${({theme}) => `
        border-bottom: .75px solid ${theme.colors.border};
        
        :hover{
            border: none;
            
            transform: scale(1.015, 1.05);
            box-shadow: ${theme.depth[1]};
    `}
`;

const CRMTableHeaderCell = styled.th`
    ${({theme}) => `
        padding: ${theme.dimensions.padding.default};
    `}

    text-align: left;
`;



const CRMTableData = styled.td`
    ${({theme}) => `
        padding: ${theme.dimensions.padding.default};
    `}
`