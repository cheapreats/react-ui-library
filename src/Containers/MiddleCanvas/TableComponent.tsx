import React from 'react';
import styled from 'styled-components';
import { TableRow } from './TableRow';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TableComponentProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][];
    isPreview?: boolean;
}

const FIRST_LABEL = 0;

export const TableComponent: React.FC<TableComponentProps> = ({
    droppableLabels,
    isPreview,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Table isPreview={isPreview}>
            {droppableLabels.map((row) => (
                <TableRow key={row[FIRST_LABEL]} labels={row} />
            ))}
        </Table>
    </Wrapper>
);

const Wrapper = styled.div`
    margin: 10px;
`;

interface TableProps {
    isPreview?: boolean;
}
const Table = styled.table<TableProps>`
    width: 90%;
    height: 20%;
    margin: auto;
    border-radius: 6px;
    border-collapse: collapse;
    ${({ theme, isPreview }): string => `
        border: ${isPreview ? '' : `solid 1px ${theme.colors.text}`};
        background-color: ${
            isPreview ? theme.colors.background : theme.colors.input.default
        };
    `};
`;
