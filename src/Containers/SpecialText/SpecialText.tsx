import Dropdown, { IDropdownProps } from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import React, { isValidElement } from 'react';
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

export const SpecialText: React.FC<SpecialTextProps> = ({
    text,
    children,
    dropDownProps,
    ...props
}): React.ReactElement => {
    /**
     * Maps SpecialText children to DropdownItems in DropDown
     * @returns {React.ReactNode[]} - Array of valid DropdownItems
     */
    const formatList = (): React.ReactNode[] =>
        children.map((dropDownItems): React.ReactElement | null => {
            if (dropDownItems && isValidElement(dropDownItems)) {
                return <DropdownItem {...dropDownItems.props} children={dropDownItems} />;
            } else return null;
        });

    return (
        <StyledDiv {...props}>
            <Dropdown
                dropdownButton={<StyledDropDownText>{text}</StyledDropDownText>}
                {...dropDownProps}
            >
                {formatList()}
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
