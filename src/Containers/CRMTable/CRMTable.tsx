import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import {
    TableOptions,
    useFilters,
    useTable,
    useRowSelect,
    Row
} from 'react-table';
import { CRMRowProps } from '../CRMRow/CRMRow';
import { Checkbox } from '../../Inputs/CheckBox/Checkbox';

export interface ICRMTableProps extends TableOptions<CRMRowProps> {
    /* A click on the row itself */
    onRowClick: (rowData: CRMRowProps) => void;
    /* A click on a checkbox in a row */
    onCheckboxClick: () => void;
    /* A click on a checkbox in the table header */
    onHeaderCheckboxClick: () => void;
}

export const CRMTable: React.FC<ICRMTableProps> = ({
    columns,
    data,
    defaultColumn,
    onRowClick,
    onCheckboxClick,
    onHeaderCheckboxClick,
    ...props
}): React.ReactElement => {
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
    } = useTable({ columns, data, defaultColumn },
        useFilters,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(( tableColumns ) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <TableHeaderCheckboxCell>
                            <Checkbox {...getToggleAllRowsSelectedProps()} onChange={onHeaderCheckboxClick} 
                                onClick={(event: SyntheticEvent<HTMLInputElement>): void => {
                                    event.stopPropagation();
                                }}/>
                        </TableHeaderCheckboxCell>
                    ),
                    Cell: ({ row }: {row: Row}) => (
                        <TableBodyCheckboxCell>
                            <Checkbox {...row.getToggleRowSelectedProps()} onChange={onCheckboxClick} 
                                onClick={(event: SyntheticEvent<HTMLInputElement>): void => {
                                    event.stopPropagation();
                                }}/>
                        </TableBodyCheckboxCell>
                    )
                },
                ...tableColumns,
            ])
        })

    const buildHeaderGroups = () => headerGroups.map((headerGroup) => (
        <CRMTableHeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
                <CRMTableHeaderCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter && column.render('Filter')}</div>
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

const TableHeaderCheckboxCell = styled.div`

`;

const TableBodyCheckboxCell = styled.div`

`;