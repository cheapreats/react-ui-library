import React from 'react';
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TableRowProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    labels: string[];
}

export const TableRow: React.FC<TableRowProps> = ({
    labels,
    ...props
}): React.ReactElement => (
    <Tr {...props}>
        <td>
            {labels.map((label) => (
                <Td key={label}>{label}</Td>
            ))}
        </td>
    </Tr>
);

const Tr = styled.tr`
    text-align: left;
`;
const Td = styled.div`
    display: inline-block;
    padding: 5px 27px;
`;
