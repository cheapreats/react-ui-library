import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Heading, HeadingProps } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface INavigationItemProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    icon?: StyledIcon,
    label: string,
    selectedItem: string,
    headingProps?: HeadingProps,
    iconProps?: IIconProps,
};

export const NavigationItem: React.FC<INavigationItemProps> = ({
    icon,
    label,
    selectedItem,
    headingProps,
    iconProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper isSelected={selectedItem === label} {...props}>
            <Icon as={icon} {...iconProps} />
            <Heading type='h6' {...headingProps}>
                {label}
            </Heading>
        </Wrapper>
    );
};

interface IWrapperProps{
    isSelected: boolean
};
const Wrapper = styled.div<IWrapperProps>`
    ${flex('row')};
    ${({ theme, isSelected }) => `
        border-bottom: ${isSelected ? `solid 4px ${theme.colors.primary}` : ''};
    `}
`;

interface IIconProps {};
const Icon = styled.svg`
    width: 30px;
    height: 30px;
`;
