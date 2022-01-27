import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import React, { isValidElement } from 'react';
import { SmallText, TextLayoutProps } from 'index';
import styled from 'styled-components';

export interface SpecialTextProps extends TextLayoutProps{
    children: string;
    onClick?: React.MouseEventHandler;
}

export const SpecialText: React.FC<SpecialTextProps> = ({
    children,
    type = 'span',
    size = 'small',
    color = 'orange',
    ...props
}): React.ReactElement => {
    return (
        <StyledSmallText type={type} size={size} color={color} {...props}>
            {children}
        </StyledSmallText>
    );
};

const StyledSmallText = styled(SmallText)`
    &: hover {
        font-weight: bold;
        cursor: pointer;
    }
`;

export default SpecialText;
