import React from 'react';
import styled from 'styled-components';
import {ArrowDown} from '@styled-icons/bootstrap'

export interface TableHeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
    /*  Name of the cell  */
    title: string,
    /* Boolean if filter is present */
    isFiltered: boolean
}

export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
    title,
    isFiltered = false,
    ...props
}): React.ReactElement => (
    <HeaderCell {...props}>
        <TextBold>
            {title}
        </TextBold>
        {isFiltered && <DownArrow/>}
    </HeaderCell>
);

const HeaderCell = styled.div`
    ${({ theme }) => `
        color: ${theme.colors.text};
        font-size: ${theme.font.size.h5}
    `}
    padding: 2px;
    margin: 2px;
    text-align: left;
`;

const TextBold = styled.div`
    display: inline;
    font-weight: bold;
    margin: 2px;
`;

const DownArrow = styled(ArrowDown)`
    margin: 2px;
    height: 18px;
    width: 18px;
    padding: 2px;
`;
