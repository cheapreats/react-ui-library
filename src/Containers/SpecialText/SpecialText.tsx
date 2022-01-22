import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import React, { Children, isValidElement, useCallback, useState } from 'react';
import { SmallText } from 'index';
import styled from 'styled-components';

export interface SpecialTextProps {
    text: string;
    children: React.ReactNode[];
}

const formatList = (
    children: React.ReactNode[]
    ): React.ReactNode[] => 
    children.map((child): React.ReactElement | null => {
        if (child && isValidElement(child)) {
            const val = child.props.value;
            return (
                <DropdownItem 
                    {...child.props}
                    children={child} 
                    key={val} 
                    />
            );
        }
        else return null;
    });

export const SpecialText: React.FC<SpecialTextProps> = ({
    text,
    children,
    ...props
}): React.ReactElement => {
    const options = Children.toArray(children)

    return (
        <StyledDiv {...props}>
            <Dropdown dropdownButton={
                <StyledDropDownText>{text}</StyledDropDownText>
            }>
                {formatList(options)}
            </Dropdown>
        </StyledDiv>
    );
};

const StyledDiv = styled.div``;

const StyledDropDownText = styled(SmallText)`
    &:hover {
        font-weight: bold;
    }

    ${({ theme }): string => `
        color: ${theme.colors.statusColors.orange};
    `}
`;

export default SpecialText;
