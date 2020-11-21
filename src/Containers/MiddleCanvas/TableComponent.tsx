import React from 'react';
import styled from 'styled-components';
import { TableRow } from './TableRow';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TableComponentProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string [][],
    isPreview?: boolean
};

export const TableComponent: React.FC<TableComponentProps> = ({
    droppableLabels,
    isPreview,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper {...props}>
            <Table isPreview={isPreview}>
                {droppableLabels.map(row => (
                    <TableRow 
                        labels={row} 
                    />
                ))}
            </Table>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 10px;
`;

interface TableProps {
    isPreview?: boolean
}
const Table = styled.table<TableProps>`
    width: 330px;
    height: 120px;
    margin: auto;
    border-radius: 6px;
    border-collapse: collapse;
    ${({ theme, isPreview }): string | undefined => `
        border: ${isPreview ? '' : `solid 1px ${theme.colors.text}`};
        background-color: ${isPreview ? theme.colors.background : theme.colors.input.default};
    `};
`;