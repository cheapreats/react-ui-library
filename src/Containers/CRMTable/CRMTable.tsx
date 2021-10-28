import React from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';

export interface ICRMTableProps extends React.HTMLAttributes<HTMLTableElement> {
    // TODO: Replace 'Object' with the appropriate interfaces from the Header and Row Components when available.
    data: Array<Object>; 
    columns: Array<Object>;
}

export const CRMTable: React.FC<ICRMTableProps> = ({
    columns,
    data,
    ...props
}): React.ReactElement => {
    // The Header Component will be replaced with the Appropraite Header Component when available
    const buildHeader = (columnsData: Array<Object>) => columnsData.map((column) => <Header {...column} />);
    const buildRows = (rowsData: Array<Object>) => rowsData.map((row) => <Data {...row} />);

    return(
        <CRMMainTable {...props}>
            <CRMTableHeader>
                {buildHeader(columns)}
            </CRMTableHeader>
            <CRMTableBody>
                {buildRows(data)}
            </CRMTableBody>
        </CRMMainTable>
    );
}

const Data = styled.tr<Object>`

`;

const Header = styled.th<Object>`

`;

const CRMMainTable = styled.table`
    border: 1px solid black;
`;

const CRMTableHeader = styled.thead`

`;

const CRMTableBody = styled.tbody`

`;