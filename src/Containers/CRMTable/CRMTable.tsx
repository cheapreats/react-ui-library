import React from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';

export interface ICRMTableProps extends React.HTMLAttributes<HTMLTableElement> {
    data: Object;
    columns: Object;
}

export const CRMTable: React.FC<ICRMTableProps> = ({
    columns,
    data,
    ...props
}): React.ReactElement => {
    const populateRow = () => "";

    return(
        <CRMMainTable {...props}>
            <CRMTableHeader>
                {columns}
            </CRMTableHeader>
            <CRMTableBody>
                {data}
            </CRMTableBody>
        </CRMMainTable>
    );
}

const CRMMainTable = styled.table`
    border: 1px solid black;
`;

const CRMTableHeader = styled.thead`

`;

const CRMTableBody = styled.tbody`

`;