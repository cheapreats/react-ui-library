import React from 'react';
import styled from 'styled-components';
import { StyledIcon } from '@styled-icons/styled-icon';
import { Heading, HeadingProps } from '../../Text/Heading';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';
import { flex } from '../../Utils/Mixins';

export interface INavigationItemProps
    extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement> {
    icon?: StyledIcon;
    label: string;
    selectedItem?: string;
    headingProps?: HeadingProps;
}

export const NavigationItem: React.FC<INavigationItemProps> = ({
    icon,
    label,
    selectedItem,
    headingProps,
    ...props
}): React.ReactElement => {
    return (
        <Wrapper selectedItem={selectedItem} label={label} {...props}>
            <Icon as={icon} />
            <Heading type="h6" {...headingProps}>
                {label}
            </Heading>
        </Wrapper>
    );
};

const Wrapper = styled.div<
    Pick<INavigationItemProps, 'selectedItem' | 'label'>
>`
    ${flex('row')};
    ${({ theme, selectedItem, label }): string | false =>
        selectedItem === label &&
        `
        border-bottom: solid 3px ${theme.colors.primary};
    `};
`;

const Icon = styled.svg`
    width: 30px;
    height: 30px;
`;
