import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

interface IDropdownItemProps {
    children: ReactNode;
}

const DropdownItem = ({
    children,
    ...props
}: IDropdownItemProps): ReactElement => (
    <StyledListItem {...props}>{children}</StyledListItem>
);

const StyledListItem = styled.li`
    list-style: none;
    margin-left: 10px;
    ${({ theme }) => `
    font-weight: bold;
    &:hover {
        color: ${theme.colors.primary}; 
    }
    `}
`;

export default DropdownItem;
