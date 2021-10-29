import React from 'react';
import styled from 'styled-components';
import {ArrowDown} from '@styled-icons/bootstrap'

export interface TableHeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    /*  Header for profile image  */
    title: string,
    accessor: string,
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

const HeaderCell = styled.th`
    ${({ theme }) => `
        background-color: ${theme.colors.border};
        color: ${theme.colors.text};
    `}
    display: inline-flex;
    padding: 2px;
    padding-left: 1rem;
    margin: 2px;
`;

const TextBold = styled.div`
    font-weight: bold;
    margin: 2px;
`;

const DownArrow = styled(ArrowDown)`
    margin: 2px;
    height: 18px;
    width: 18px;
    padding: 2px;
`;
