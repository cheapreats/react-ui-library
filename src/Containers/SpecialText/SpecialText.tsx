import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import React, { Children, isValidElement, useCallback, useState } from 'react';
import { SmallText } from 'index';
import styled from 'styled-components';

/**
 * Properties for SpecialText
 * @param {string} text - Highlighted text
 * @param {React.ReactNode[]} children - List of elements in DropDown
 * @param {IDropdownProps} dropDownProps
 */
export interface SpecialTextProps {
    text: string;
    children: React.ReactNode[];
    dropDownProps?: IDropdownProps[];
}

/**
 * Maps SpecialText children to DropdownItems in DropDown
 * @param {React.ReactNode[0]} children - Elements in the DropDown
 * @returns {React.ReactNode[]} - Array of valid DropdownItems
 */
const formatList = (children: React.ReactNode[]): React.ReactNode[] =>
    children.map((child): React.ReactElement | null => {
        if (child && isValidElement(child)) {
            const val = child.props.value;
            return <DropdownItem {...child.props} children={child} key={val} />;
        } else return null;
    });

export const SpecialText: React.FC<SpecialTextProps> = ({
    text,
    children,
    dropDownProps,
    ...props
}): React.ReactElement => {
    const dropDownOptions = Children.toArray(children);

    return (
        <StyledDiv {...props}>
            <Dropdown
                dropdownButton={<StyledDropDownText>{text}</StyledDropDownText>}
                {...dropDownProps}
            >
                {formatList(dropDownOptions)}
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
